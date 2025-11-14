import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonRange,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonList,
  IonChip,
  IonIcon
} from '@ionic/react';
import { close } from 'ionicons/icons';

interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  marca: string;
  rating: number;
}

interface FilterComponentProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ 
  isOpen, 
  onClose, 
  products,
  onFilterChange
}) => {
  const [filterOptions, setFilterOptions] = useState({
    categorias: [] as string[],
    precios: { min: 0, max: 1000 }
  });
  
  const [selectedFilters, setSelectedFilters] = useState({
    categorias: [] as string[],
    precioRango: [0, 1000] as [number, number],
    searchTerm: ''
  });

  useEffect(() => {
    if (products.length > 0) {
      // Extraer categorías únicas
      const categoriasUnicas = [...new Set(products.map(p => p.categoria))];
      
      // Extraer rango de precios
      const precios = products.map(p => p.precio);
      const minPrecio = Math.min(...precios);
      const maxPrecio = Math.max(...precios);

      setFilterOptions({
        categorias: categoriasUnicas,
        precios: { min: minPrecio, max: maxPrecio }
      });

      setSelectedFilters(prev => ({
        ...prev,
        precioRango: [minPrecio, maxPrecio]
      }));
    }
  }, [products]);

  const handleCategoriaChange = (categoria: string, checked: boolean) => {
    const nuevasCategorias = checked
      ? [...selectedFilters.categorias, categoria]
      : selectedFilters.categorias.filter(c => c !== categoria);
    
    const newFilters = {
      ...selectedFilters,
      categorias: nuevasCategorias
    };
    
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const handlePrecioChange = (event: any) => {
    const rango: [number, number] = [event.detail.value.lower, event.detail.value.upper];
    const newFilters = {
      ...selectedFilters,
      precioRango: rango
    };
    
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSearch = (event: any) => {
    const searchTerm = event.detail.value || '';
    const newFilters = {
      ...selectedFilters,
      searchTerm
    };
    
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters: typeof selectedFilters) => {
    let filtered = [...products];

    // Filtro por categoría
    if (filters.categorias.length > 0) {
      filtered = filtered.filter(product => 
        filters.categorias.includes(product.categoria)
      );
    }

    // Filtro por precio
    filtered = filtered.filter(product => 
      product.precio >= filters.precioRango[0] && 
      product.precio <= filters.precioRango[1]
    );

    // Filtro por búsqueda
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(term) ||
        product.categoria.toLowerCase().includes(term)
      );
    }

    onFilterChange(filtered);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      categorias: [] as string[],
      precioRango: [filterOptions.precios.min, filterOptions.precios.max] as [number, number],
      searchTerm: ''
    };
    
    setSelectedFilters(defaultFilters);
    applyFilters(defaultFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filtros</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Filtros activos */}
        <IonList>
          <IonItem>
            <IonLabel>Filtros Activos</IonLabel>
            <IonButton fill="clear" onClick={clearAllFilters}>
              Limpiar Todo
            </IonButton>
          </IonItem>
          
          {/* Chips de categorías activas */}
          {selectedFilters.categorias.map(categoria => (
            <IonChip key={categoria} onClick={() => handleCategoriaChange(categoria, false)}>
              <IonLabel>{categoria}</IonLabel>
            </IonChip>
          ))}
        </IonList>

        {/* Búsqueda */}
        <IonSearchbar
          placeholder="Buscar productos..."
          onIonInput={handleSearch}
          value={selectedFilters.searchTerm}
        />

        {/* Filtro por categoría */}
        <IonAccordionGroup>
          <IonAccordion value="categorias">
            <IonItem slot="header">
              <IonLabel>Categorías</IonLabel>
            </IonItem>
            <div slot="content">
              {filterOptions.categorias.map(categoria => (
                <IonItem key={categoria}>
                  <IonCheckbox
                    checked={selectedFilters.categorias.includes(categoria)}
                    onIonChange={e => handleCategoriaChange(categoria, e.detail.checked)}
                  >
                    {categoria}
                  </IonCheckbox>
                </IonItem>
              ))}
            </div>
          </IonAccordion>

          {/* Filtro por precio */}
          <IonAccordion value="precio">
            <IonItem slot="header">
              <IonLabel>Precio</IonLabel>
            </IonItem>
            <div slot="content">
              <IonRange
                dualKnobs={true}
                min={filterOptions.precios.min}
                max={filterOptions.precios.max}
                value={{
                  lower: selectedFilters.precioRango[0],
                  upper: selectedFilters.precioRango[1]
                }}
                onIonChange={handlePrecioChange}
              >
                <IonLabel slot="start">${selectedFilters.precioRango[0]}</IonLabel>
                <IonLabel slot="end">${selectedFilters.precioRango[1]}</IonLabel>
              </IonRange>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </>
  );
};

export default FilterComponent;
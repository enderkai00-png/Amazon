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
  IonIcon,
  IonRadioGroup,
  IonRadio,
  IonText
} from '@ionic/react';
import { close, star, filter } from 'ionicons/icons';

interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  marca: string;
  rating: number;
}

interface AmazonFilterComponentProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const AmazonFilterComponent: React.FC<AmazonFilterComponentProps> = ({ 
  isOpen, 
  onClose, 
  products,
  onFilterChange
}) => {
  const [filterOptions, setFilterOptions] = useState({
    categorias: [] as string[],
    marcas: [] as string[],
    precios: { min: 0, max: 1000 }
  });
  
  const [selectedFilters, setSelectedFilters] = useState({
    categorias: [] as string[],
    precioRango: [0, 1000] as [number, number],
    valoracionMinima: 0,
    envioGratis: false,
    prime: false,
    marcas: [] as string[],
    orden: 'relevancia',
    searchTerm: '',
    ubicacion: 'Datos Virtual del Roteado (612)'
  });

  useEffect(() => {
    if (products.length > 0) {
      // Extraer categorías únicas
      const categoriasUnicas = [...new Set(products.map(p => p.categoria))];
      
      // Extraer marcas únicas
      const marcasUnicas = [...new Set(products.map(p => p.marca).filter(Boolean))] as string[];
      
      // Extraer rango de precios
      const precios = products.map(p => p.precio);
      const minPrecio = Math.min(...precios);
      const maxPrecio = Math.max(...precios);

      setFilterOptions({
        categorias: categoriasUnicas,
        marcas: marcasUnicas,
        precios: { min: minPrecio, max: maxPrecio }
      });
      
      setSelectedFilters(prev => ({
        ...prev,
        precioRango: [minPrecio, maxPrecio]
      }));
    }
  }, [products]);

  const handleFilterChange = (updates: Partial<typeof selectedFilters>) => {
    const newFilters = {
      ...selectedFilters,
      ...updates
    };
    
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleCategoriaChange = (categoria: string, checked: boolean) => {
    const nuevasCategorias = checked
      ? [...selectedFilters.categorias, categoria]
      : selectedFilters.categorias.filter(c => c !== categoria);
    
    handleFilterChange({ categorias: nuevasCategorias });
  };

  const handleMarcaChange = (marca: string, checked: boolean) => {
    const nuevasMarcas = checked
      ? [...selectedFilters.marcas, marca]
      : selectedFilters.marcas.filter(m => m !== marca);
    
    handleFilterChange({ marcas: nuevasMarcas });
  };

  const handlePrecioChange = (event: any) => {
    const rango: [number, number] = [event.detail.value.lower, event.detail.value.upper];
    handleFilterChange({ precioRango: rango });
  };

  const handleValoracionChange = (valoracion: number) => {
    handleFilterChange({ valoracionMinima: valoracion });
  };

  const handleOrdenChange = (orden: string) => {
    handleFilterChange({ orden });
  };

  const handleSearch = (event: any) => {
    handleFilterChange({ searchTerm: event.detail.value || '' });
  };

  const applyFilters = (filters: typeof selectedFilters) => {
    let filtered = [...products];

    // Filtro por categorías
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

    // Filtro por valoración
    if (filters.valoracionMinima > 0) {
      filtered = filtered.filter(product => 
        product.rating >= filters.valoracionMinima
      );
    }

    // Filtro por marcas
    if (filters.marcas.length > 0) {
      filtered = filtered.filter(product => 
        filters.marcas.includes(product.marca)
      );
    }

    // Filtro por búsqueda
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(term) ||
        product.marca.toLowerCase().includes(term) ||
        product.categoria.toLowerCase().includes(term)
      );
    }

    // Ordenamiento
    if (filters.orden === 'precio-bajo') {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (filters.orden === 'precio-alto') {
      filtered.sort((a, b) => b.precio - a.precio);
    }

    onFilterChange(filtered);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      categorias: [] as string[],
      precioRango: [filterOptions.precios.min, filterOptions.precios.max] as [number, number],
      valoracionMinima: 0,
      envioGratis: false,
      prime: false,
      marcas: [] as string[],
      orden: 'relevancia',
      searchTerm: '',
      ubicacion: 'Datos Virtual del Roteado (612)'
    };
    
    setSelectedFilters(defaultFilters);
    applyFilters(defaultFilters);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<IonIcon key={i} icon={star} color="warning" />);
      } else {
        stars.push(<IonIcon key={i} icon={star} color="medium" />);
      }
    }
    return stars;
  };

  if (!isOpen) return null;

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonIcon icon={filter} /> Filtros Avanzados
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          placeholder="Buscar en Amazon..."
          onIonInput={handleSearch}
          value={selectedFilters.searchTerm}
        />

        <IonItem>
          <IonLabel>
            <small>Enviar a</small>
            <br />
            <strong>{selectedFilters.ubicacion}</strong>
          </IonLabel>
        </IonItem>

        {/* Ordenamiento */}
        <IonAccordionGroup>
          <IonAccordion value="ordenar">
            <IonItem slot="header">
              <IonLabel>Ordenar por</IonLabel>
            </IonItem>
            <div slot="content">
              <IonRadioGroup 
                value={selectedFilters.orden} 
                onIonChange={e => handleOrdenChange(e.detail.value)}
              >
                <IonItem>
                  <IonRadio value="relevancia" labelPlacement="end">
                    Relevancia
                  </IonRadio>
                </IonItem>
                <IonItem>
                  <IonRadio value="precio-bajo" labelPlacement="end">
                    Precio: bajo a alto
                  </IonRadio>
                </IonItem>
                <IonItem>
                  <IonRadio value="precio-alto" labelPlacement="end">
                    Precio: alto a bajo
                  </IonRadio>
                </IonItem>
              </IonRadioGroup>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        {/* Filtros activos */}
        <IonList>
          <IonItem>
            <IonLabel>Filtros activos</IonLabel>
            <IonButton fill="clear" size="small" onClick={clearAllFilters}>
              Limpiar todo
            </IonButton>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              {selectedFilters.categorias.map(categoria => (
                <IonChip key={categoria} onClick={() => handleCategoriaChange(categoria, false)}>
                  <IonLabel>{categoria}</IonLabel>
                  <IonIcon icon={close} />
                </IonChip>
              ))}
              
              {selectedFilters.marcas.map(marca => (
                <IonChip key={marca} onClick={() => handleMarcaChange(marca, false)}>
                  <IonLabel>Marca: {marca}</IonLabel>
                  <IonIcon icon={close} />
                </IonChip>
              ))}
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Categorías */}
        <IonAccordionGroup>
          <IonAccordion value="categorias">
            <IonItem slot="header">
              <IonLabel>Departamentos</IonLabel>
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

          {/* Precio */}
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

          {/* Valoración */}
          <IonAccordion value="valoracion">
            <IonItem slot="header">
              <IonLabel>Valoración</IonLabel>
            </IonItem>
            <div slot="content">
              <IonRadioGroup 
                value={selectedFilters.valoracionMinima.toString()} 
                onIonChange={e => handleValoracionChange(parseInt(e.detail.value))}
              >
                {[4, 3, 2, 1].map(rating => (
                  <IonItem key={rating}>
                    <IonLabel>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {renderStars(rating)}
                        <IonText style={{ marginLeft: '8px' }}>& arriba</IonText>
                      </div>
                    </IonLabel>
                    <IonRadio value={rating.toString()} />
                  </IonItem>
                ))}
              </IonRadioGroup>
            </div>
          </IonAccordion>

          {/* Marcas */}
          {filterOptions.marcas.length > 0 && (
            <IonAccordion value="marcas">
              <IonItem slot="header">
                <IonLabel>Marcas</IonLabel>
              </IonItem>
              <div slot="content">
                {filterOptions.marcas.map(marca => (
                  <IonItem key={marca}>
                    <IonCheckbox
                      checked={selectedFilters.marcas.includes(marca)}
                      onIonChange={e => handleMarcaChange(marca, e.detail.checked)}
                    >
                      {marca}
                    </IonCheckbox>
                  </IonItem>
                ))}
              </div>
            </IonAccordion>
          )}

          {/* Opciones de envío */}
          <IonAccordion value="envio">
            <IonItem slot="header">
              <IonLabel>Opciones de envío</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem>
                <IonCheckbox
                  checked={selectedFilters.envioGratis}
                  onIonChange={e => handleFilterChange({ envioGratis: e.detail.checked })}
                >
                  Envío GRATIS
                </IonCheckbox>
              </IonItem>
              <IonItem>
                <IonCheckbox
                  checked={selectedFilters.prime}
                  onIonChange={e => handleFilterChange({ prime: e.detail.checked })}
                >
                  Amazon Prime
                </IonCheckbox>
              </IonItem>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </>
  );
};

export default AmazonFilterComponent;
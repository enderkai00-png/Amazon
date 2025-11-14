import { Product } from './product.service';

export class FilterService {
  getFilterOptions(products: Product[]) {
    const categorias = [...new Set(products.map(p => p.categoria))];
    const precios = products.map(p => p.precio);
    
    return {
      categorias,
      precios: {
        min: Math.min(...precios),
        max: Math.max(...precios)
      }
    };
  }

  filterProducts(products: Product[], filters: any) {
    let filtered = [...products];

    if (filters.categorias && filters.categorias.length > 0) {
      filtered = filtered.filter(product => 
        filters.categorias.includes(product.categoria)
      );
    }

    if (filters.precioRango) {
      filtered = filtered.filter(product => 
        product.precio >= filters.precioRango[0] && 
        product.precio <= filters.precioRango[1]
      );
    }

    if (filters.valoracionMinima && filters.valoracionMinima > 0) {
      filtered = filtered.filter(product => 
        product.rating >= filters.valoracionMinima
      );
    }

    if (filters.marcas && filters.marcas.length > 0) {
      filtered = filtered.filter(product => 
        filters.marcas.includes(product.marca)
      );
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(term) ||
        product.marca.toLowerCase().includes(term) ||
        product.categoria.toLowerCase().includes(term)
      );
    }

    return filtered;
  }
}
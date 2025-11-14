// Tipos de datos para la interfaz de productos
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  vendedor_id: string;
  stock: number;
  descripcion: string;
  marca: string;
  imagen?: string;
  caracteristicas?: string[];
  rating?: number;
  reviews?: number;
  envio_gratis?: boolean;
}

export interface Vendedor {
  id: string;
  nombre_tienda: string;
  email: string;
  categoria: string;
  direccion: string;
  telefono: string;
  productos: string[]; // IDs de productos
}

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

export interface FiltrosProducto {
  search: string;
  categoria: string;
  precioMin: number;
  precioMax: number;
  marca?: string;
  vendedor?: string;
  ordenar: 'precio_asc' | 'precio_desc' | 'rating' | 'nuevo';
}

export interface Direccion {
  id?: number;
  client_id?: number | null;
  nombre: string;
  apellido: string;
  direccion: string;
  direccion2?: string;
  ciudad: string;
  estado?: string;
  pais: string;
  codigo_postal: string;
  telefono?: string;
  created_at?: string;
}

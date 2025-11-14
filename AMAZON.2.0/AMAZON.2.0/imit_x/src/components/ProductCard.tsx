import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonBadge,
  IonText
} from '@ionic/react';
import { cart, star } from 'ionicons/icons';

interface ProductCardProps {
  product: {
    id: string;
    nombre: string;
    precio: number;
    categoria: string;
    stock: number;
    marca: string;
    rating: number;
  };
  onAddToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <IonCard style={{ margin: '0 0 16px 0', height: '100%' }}>
      <IonCardHeader style={{ padding: '16px 16px 8px 16px' }}>
        <IonCardTitle style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {product.nombre}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent style={{ padding: '0 16px 16px 16px' }}>
        <div style={{ 
          height: '120px', 
          background: '#f5f5f5', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px'
        }}>
          <IonIcon icon={cart} size="large" color="medium" />
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <IonBadge color="warning">
            <IonIcon icon={star} style={{ marginRight: '4px' }} />
            {product.rating}
          </IonBadge>
        </div>

        <IonText color="primary" style={{ fontSize: '18px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
          ${product.precio}
        </IonText>
        
        <IonText color="medium" style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
          {product.marca}
        </IonText>
        
        <IonText color="medium" style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
          {product.categoria}
        </IonText>
        
        <IonText color={product.stock > 0 ? 'success' : 'danger'} style={{ display: 'block', marginBottom: '12px', fontSize: '12px' }}>
          {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
        </IonText>
        
        <IonButton 
          expand="block" 
          size="small"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          <IonIcon icon={cart} slot="start" />
          Agregar al Carrito
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
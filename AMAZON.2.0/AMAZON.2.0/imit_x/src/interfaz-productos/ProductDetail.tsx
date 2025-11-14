import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonText,
  IonButtons,
  IonInput,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import { arrowBack, cart, star, heart, share, shield } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Producto, Direccion } from './types';
import './ProductDetail.css';
import AddressForm from './formularios/AddressForm';
import * as cartService from '../services/cart.service';

interface ProductDetailProps {
  product?: Producto;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [lastSavedAddress, setLastSavedAddress] = useState<Direccion | null>(null);

  // Producto de ejemplo si no viene por props
  const currentProduct: Producto = product || {
    id: '1',
    nombre: 'Smartphone Galaxy X',
    precio: 599.99,
    categoria: 'Electrónica',
    vendedor_id: 'vendor_1',
    stock: 50,
    descripcion: 'Smartphone de última generación con pantalla AMOLED 6.7", procesador de 8 núcleos, cámara de 108MP y batería de 5000mAh.',
    marca: 'Samsung',
    imagen: 'https://via.placeholder.com/400x400?text=Galaxy+X',
    caracteristicas: [
      'Pantalla AMOLED 6.7"',
      'Procesador Snapdragon 8 Gen 2',
      '12GB RAM',
      '256GB Almacenamiento',
      'Cámara Principal: 108MP',
      'Batería: 5000mAh',
      '5G Compatible'
    ],
    rating: 4.7,
    reviews: 324,
    envio_gratis: true
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      setAlertMessage('La cantidad debe ser mayor a 0');
      setShowAlert(true);
      return;
    }
    if (quantity > currentProduct.stock) {
      setAlertMessage(`Stock máximo disponible: ${currentProduct.stock}`);
      setShowAlert(true);
      return;
    }
    // Abrir modal de dirección antes de confirmar compra
    setAddressModalOpen(true);
  };

  const saveAddressAndCheckout = async (address: Direccion) => {
    try {
      // POST a backend para guardar la dirección
      const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiBase}/api/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
      });
      if (!res.ok) throw new Error('Error guardando dirección');
      const data = await res.json();
      setLastSavedAddress({ ...address, id: data.id });
      // Add to cart after saving address
      try {
        await cartService.addToCart(currentProduct.id || currentProduct.nombre, quantity);
      } catch (e) {
        console.warn('No se pudo agregar al carrito tras guardar dirección:', e);
      }
      setAddressModalOpen(false);
      setAlertMessage(`¡${currentProduct.nombre} agregado al carrito! (x${quantity})`);
      setShowAlert(true);
      setTimeout(() => history.push('/productos'), 1500);
    } catch (err) {
      console.error(err);
      setAlertMessage('Error guardando la dirección. Intenta de nuevo.');
      setShowAlert(true);
    }
  };

  const handleQuantityChange = (value: string | number | null | undefined) => {
    const num = Number(value) || 0;
    setQuantity(Math.max(1, num));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/productos')}>
              <IonIcon icon={arrowBack} slot="start" />
              Volver
            </IonButton>
          </IonButtons>
          <IonTitle>Detalle del Producto</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setLiked(!liked)}>
              <IonIcon 
                icon={heart} 
                color={liked ? 'danger' : 'medium'}
                className={liked ? 'liked' : ''}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="product-detail-content">
        {/* Imagen del producto */}
        <div className="product-image-container">
          <img 
            src={currentProduct.imagen} 
            alt={currentProduct.nombre}
            className="product-image"
          />
          {currentProduct.envio_gratis && (
            <IonBadge color="success" className="free-shipping-badge">
              ✈️ Envío Gratis
            </IonBadge>
          )}
        </div>

        <IonCard className="product-info-card">
          {/* Título y Rating */}
          <IonCardHeader>
            <IonCardTitle className="product-title">
              {currentProduct.nombre}
            </IonCardTitle>
            <div className="product-rating">
              <IonIcon icon={star} color="warning" />
              <span>{currentProduct.rating}</span>
              <span className="reviews-count">({currentProduct.reviews} reseñas)</span>
            </div>
          </IonCardHeader>

          <IonCardContent>
            {/* Marca y Categoría */}
            <div className="product-meta">
              <IonBadge color="medium">{currentProduct.marca}</IonBadge>
              <IonBadge color="secondary">{currentProduct.categoria}</IonBadge>
            </div>

            {/* Precio */}
            <div className="price-section">
              <span className="currency">$</span>
              <span className="price-main">{currentProduct.precio.toFixed(2)}</span>
              <IonBadge color="success" className="price-badge">
                Precio actual
              </IonBadge>
            </div>

            {/* Descripción */}
            <p className="product-description">
              {currentProduct.descripcion}
            </p>

            {/* Características */}
            <div className="features-section">
              <h3>Características principales:</h3>
              <ul className="features-list">
                {currentProduct.caracteristicas?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Stock */}
            <div className="stock-section">
              {currentProduct.stock > 0 ? (
                <>
                  <IonBadge color="success">
                    {currentProduct.stock} en stock
                  </IonBadge>
                  <span className="stock-text">Disponible para envío</span>
                </>
              ) : (
                <IonBadge color="danger">Agotado</IonBadge>
              )}
            </div>

            {/* Cantidad */}
            {currentProduct.stock > 0 && (
              <div className="quantity-section">
                <label>Cantidad:</label>
                <IonInput
                  type="number"
                  min={1}
                  max={currentProduct.stock}
                  value={quantity}
                  onIonChange={(e) => handleQuantityChange(e.detail.value)}
                  className="quantity-input"
                />
                <span className="quantity-info">
                  (máx. {currentProduct.stock} disponibles)
                </span>
              </div>
            )}

            {/* Beneficios */}
            <div className="benefits-section">
              <div className="benefit-item">
                <span className="benefit-emoji">📦</span>
                <div>
                  <strong>Envío Rápido</strong>
                  <p>Entrega en 2-3 días hábiles</p>
                </div>
              </div>
              <div className="benefit-item">
                <IonIcon icon={shield} color="primary" />
                <div>
                  <strong>Compra Protegida</strong>
                  <p>Garantía de satisfacción</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-emoji">↩️</span>
                <div>
                  <strong>Devoluciones</strong>
                  <p>30 días para devolver</p>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="action-buttons">
              <IonButton
                expand="block"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={currentProduct.stock === 0}
              >
                <IonIcon icon={cart} slot="start" />
                Agregar al Carrito
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                onClick={() => {
                  setAlertMessage('Producto compartido en redes sociales');
                  setShowAlert(true);
                }}
              >
                <IonIcon icon={share} slot="start" />
                Compartir
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Address modal */}
        <AddressForm
          isOpen={addressModalOpen}
          onClose={() => setAddressModalOpen(false)}
          onSave={saveAddressAndCheckout}
          defaultClientId={null}
        />

        {/* Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;

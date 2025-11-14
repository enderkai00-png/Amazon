import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonPage, IonItem, IonLabel, IonList, IonThumbnail, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { arrowBack, trashBin } from 'ionicons/icons';
import './carrito.css';
import * as cartService from '../../services/cart.service';

interface CartItem {
  id: number;
  quantity: number;
  product_id: string;
  title: string;
  price: number;
  image?: string;
}

const Carrito: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setItems(data || []);
    } catch (err) {
      console.error('Error cargando carrito', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await cartService.removeCartItem(id);
      await load();
    } catch (err) {
      console.error('Error eliminando item', err);
      alert('No se pudo eliminar el item');
    }
  };

  const subtotal = items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return (
    <IonPage>
      <IonContent>
        <div className="cart-container">
          <div className="cart-header">
            <IonButton fill="clear" routerLink="/home">
              <IonIcon icon={arrowBack} />
              Regresar
            </IonButton>
            <h1>Mi Carrito</h1>
          </div>

          <div className="cart-content">
            <IonList className="product-list">
              {loading ? (
                <div style={{ padding: 20 }}>Cargando...</div>
              ) : items.length === 0 ? (
                <div style={{ padding: 20 }}>Tu carrito está vacío</div>
              ) : (
                items.map(item => (
                  <IonItem className="product-item" key={item.id}>
                    <IonThumbnail slot="start">
                      <img alt={item.title} src={item.image || 'https://via.placeholder.com/100'} className="product-image" />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>{item.title}</h2>
                      <p>Precio: ${Number(item.price).toFixed(2)}</p>
                      <p>Cantidad: {item.quantity}</p>
                    </IonLabel>
                    <IonButton fill="clear" color="danger" onClick={() => handleRemove(item.id)}>
                      <IonIcon icon={trashBin} />
                      Eliminar
                    </IonButton>
                  </IonItem>
                ))
              )}
            </IonList>
          </div>

          <div className="cart-summary">
            <div className="total-section">
              <h2>Resumen de Compra</h2>
              <div className="price-details">
                <p>Subtotal:</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="price-details">
                <p>IVA (16%):</p>
                <p>${iva.toFixed(2)}</p>
              </div>
              <div className="price-details total">
                <h3>Total a Pagar:</h3>
                <h3>${total.toFixed(2)}</h3>
              </div>
            </div>

            <IonButton 
              expand="block" 
              color="success" 
              className="checkout-button"
              disabled={items.length === 0}
            >
              Proceder al Pago
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Carrito;

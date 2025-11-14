import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonLoading,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { checkmarkCircle, timeOutline, location, pricetag } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import '../theme/variables.css';

interface OrderItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  client_id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: OrderItem[];
  address?: string;
  created_at: string;
  estimated_delivery?: string;
}

const OrderHistory: React.FC = () => {
  const history = useHistory();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const clientId = localStorage.getItem('client_id');
      if (!clientId) {
        history.push('/login');
        return;
      }

      // Simular datos de órdenes (en una app real, esto vendría de la API)
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          client_id: clientId,
          total: 150.0,
          status: 'delivered',
          items: [
            { product_id: '1', title: 'Producto 1', price: 75, quantity: 2, image: 'https://via.placeholder.com/100' },
          ],
          address: 'Calle Principal 123, Ciudad',
          created_at: '2025-11-01',
          estimated_delivery: '2025-11-05',
        },
        {
          id: 'ORD-002',
          client_id: clientId,
          total: 89.99,
          status: 'shipped',
          items: [
            { product_id: '2', title: 'Producto 2', price: 89.99, quantity: 1, image: 'https://via.placeholder.com/100' },
          ],
          address: 'Calle Principal 123, Ciudad',
          created_at: '2025-11-10',
          estimated_delivery: '2025-11-15',
        },
        {
          id: 'ORD-003',
          client_id: clientId,
          total: 199.50,
          status: 'processing',
          items: [
            { product_id: '3', title: 'Producto 3', price: 99.75, quantity: 2, image: 'https://via.placeholder.com/100' },
          ],
          address: 'Calle Principal 123, Ciudad',
          created_at: '2025-11-12',
          estimated_delivery: '2025-11-18',
        },
      ];

      setOrders(mockOrders);
    } catch (err) {
      console.error('Error al cargar órdenes:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'warning';
      case 'processing':
        return 'primary';
      case 'pending':
        return 'medium';
      default:
        return 'medium';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'shipped':
        return 'En tránsito';
      case 'processing':
        return 'En procesamiento';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Mis Órdenes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <IonLoading isOpen={true} message="Cargando órdenes..." />
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#999', fontSize: '18px' }}>No tienes órdenes aún</p>
            <IonButton
              color="primary"
              onClick={() => history.push('/productos')}
              style={{ marginTop: '20px' }}
            >
              Ir a comprar
            </IonButton>
          </div>
        ) : (
          <div>
            {selectedOrder ? (
              // Vista detallada de la orden
              <div>
                <IonButton
                  fill="clear"
                  color="primary"
                  onClick={() => setSelectedOrder(null)}
                >
                  ← Volver
                </IonButton>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Orden #{selectedOrder.id}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem lines="none">
                      <IonIcon icon={checkmarkCircle} slot="start" color={getStatusColor(selectedOrder.status)} />
                      <IonLabel>
                        <p>Estado</p>
                        <h2>{getStatusText(selectedOrder.status)}</h2>
                      </IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                      <IonIcon icon={timeOutline} slot="start" color="primary" />
                      <IonLabel>
                        <p>Fecha de Orden</p>
                        <h2>{selectedOrder.created_at}</h2>
                      </IonLabel>
                    </IonItem>

                    {selectedOrder.estimated_delivery && (
                      <IonItem lines="none">
                        <IonIcon icon={timeOutline} slot="start" color="primary" />
                        <IonLabel>
                          <p>Entrega Estimada</p>
                          <h2>{selectedOrder.estimated_delivery}</h2>
                        </IonLabel>
                      </IonItem>
                    )}

                    {selectedOrder.address && (
                      <IonItem lines="none">
                        <IonIcon icon={location} slot="start" color="primary" />
                        <IonLabel>
                          <p>Dirección de Entrega</p>
                          <h2>{selectedOrder.address}</h2>
                        </IonLabel>
                      </IonItem>
                    )}
                  </IonCardContent>
                </IonCard>

                <IonCard style={{ marginTop: '20px' }}>
                  <IonCardHeader>
                    <IonCardTitle>Productos</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {selectedOrder.items.map((item) => (
                      <div key={item.product_id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                          )}
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{item.title}</h3>
                            <p style={{ color: '#666', marginBottom: '5px' }}>Cantidad: {item.quantity}</p>
                            <p style={{ color: '#ff9900', fontWeight: 'bold' }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee', textAlign: 'right' }}>
                      <h2 style={{ color: '#131921', margin: '0' }}>
                        Total: ${selectedOrder.total.toFixed(2)}
                      </h2>
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            ) : (
              // Lista de órdenes
              <div>
                {orders.map((order) => (
                  <IonCard key={order.id} style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>
                    <IonCardContent>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <div>
                          <h2 style={{ margin: '0 0 5px 0', color: '#131921' }}>Orden #{order.id}</h2>
                          <p style={{ color: '#666', margin: '0' }}>{order.created_at}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ color: '#ff9900', fontSize: '18px', fontWeight: 'bold', margin: '0' }}>
                            ${order.total.toFixed(2)}
                          </p>
                          <span
                            style={{
                              backgroundColor:
                                order.status === 'delivered'
                                  ? '#4CAF50'
                                  : order.status === 'shipped'
                                  ? '#FF9800'
                                  : order.status === 'processing'
                                  ? '#2196F3'
                                  : '#999',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
                        <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>
                          {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default OrderHistory;

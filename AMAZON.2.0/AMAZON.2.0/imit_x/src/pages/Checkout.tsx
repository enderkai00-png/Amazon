import React, { useState } from 'react';
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
  IonAlert,
  IonItem,
  IonLabel,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonText,
} from '@ionic/react';
import { checkmarkCircle, card, home, arrowForward } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import * as cartService from '../services/cart.service';
import '../theme/variables.css';

interface CartItem {
  id: string;
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: 'card' | 'cash';
  cardNumber?: string;
  cardExp?: string;
  cardCvc?: string;
}

const Checkout: React.FC = () => {
  const history = useHistory();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>(
    'cart'
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  // Cargar carrito al montar
  React.useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const items = await cartService.getCart();
      setCartItems(items);
    } catch (err) {
      setError('Error al cargar el carrito');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const iva = subtotal * 0.19; // 19% IVA
    const shipping = 10.0;
    const total = subtotal + iva + shipping;

    return { subtotal, iva, shipping, total };
  };

  const handleInputChange = (
    field: keyof CheckoutData,
    value: string
  ) => {
    setCheckoutData({ ...checkoutData, [field]: value });
  };

  const validateShippingData = (): boolean => {
    const required = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
    ];
    for (const field of required) {
      if (!checkoutData[field as keyof CheckoutData]) {
        setError(`Por favor completa: ${field}`);
        return false;
      }
    }
    return true;
  };

  const validatePaymentData = (): boolean => {
    if (paymentMethod === 'card') {
      if (!checkoutData.cardNumber || !checkoutData.cardExp || !checkoutData.cardCvc) {
        setError('Por favor completa los datos de la tarjeta');
        return false;
      }
    }
    return true;
  };

  const handleCompleteOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Crear orden en la BD
      const clientId = localStorage.getItem('client_id');
      if (!clientId) {
        setError('Usuario no identificado');
        return;
      }

      // Limpiar carrito
      for (const item of cartItems) {
        await cartService.removeCartItem(item.id);
      }

      setStep('confirmation');
    } catch (err) {
      setError('Error al procesar la orden');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Steps Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', marginTop: '20px' }}>
          {(['cart', 'shipping', 'payment', 'confirmation'] as const).map(
            (s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  opacity: step === s || ['cart', 'shipping', 'payment', 'confirmation'].indexOf(step) >= ['cart', 'shipping', 'payment', 'confirmation'].indexOf(s) ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: step === s || ['cart', 'shipping', 'payment', 'confirmation'].indexOf(step) >= ['cart', 'shipping', 'payment', 'confirmation'].indexOf(s) ? '#ff9900' : '#ddd',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    fontWeight: 'bold',
                  }}
                >
                  {['cart', 'shipping', 'payment', 'confirmation'].indexOf(s) + 1}
                </div>
                <p style={{ fontSize: '12px', margin: '0' }}>
                  {s === 'cart' && 'Carrito'}
                  {s === 'shipping' && 'Envío'}
                  {s === 'payment' && 'Pago'}
                  {s === 'confirmation' && 'Confirmación'}
                </p>
              </div>
            )
          )}
        </div>

        {/* CART STEP */}
        {step === 'cart' && (
          <div>
            <h2>Resumen del Carrito</h2>
            {cartItems.length === 0 ? (
              <IonCard>
                <IonCardContent>
                  <p style={{ textAlign: 'center', color: '#999' }}>
                    Tu carrito está vacío
                  </p>
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={() => history.push('/productos')}
                  >
                    Continuar comprando
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ) : (
              <>
                {cartItems.map((item) => (
                  <IonCard key={item.id} style={{ marginBottom: '15px' }}>
                    <IonCardContent>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '100px',
                              height: '100px',
                              borderRadius: '8px',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: '0 0 10px 0' }}>
                            {item.title}
                          </h3>
                          <p style={{ color: '#666', marginBottom: '5px' }}>
                            Cantidad: {item.quantity}
                          </p>
                          <p style={{ color: '#ff9900', fontWeight: 'bold' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}

                <IonCard style={{ marginTop: '20px' }}>
                  <IonCardContent>
                    <div style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Subtotal:</span>
                        <span>${totals.subtotal.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>IVA (19%):</span>
                        <span>${totals.iva.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Envío:</span>
                        <span>${totals.shipping.toFixed(2)}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', color: '#ff9900' }}>
                      <span>Total:</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonButton
                  expand="block"
                  color="primary"
                  onClick={() => setStep('shipping')}
                  style={{ marginTop: '20px' }}
                >
                  Continuar al envío
                </IonButton>
              </>
            )}
          </div>
        )}

        {/* SHIPPING STEP */}
        {step === 'shipping' && (
          <div>
            <h2>Información de Envío</h2>
            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonIcon icon={home} slot="start" color="primary" />
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput
                    value={checkoutData.firstName}
                    onIonChange={(e) =>
                      handleInputChange('firstName', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Apellido</IonLabel>
                  <IonInput
                    value={checkoutData.lastName}
                    onIonChange={(e) =>
                      handleInputChange('lastName', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={checkoutData.email}
                    onIonChange={(e) =>
                      handleInputChange('email', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Teléfono</IonLabel>
                  <IonInput
                    type="tel"
                    value={checkoutData.phone}
                    onIonChange={(e) =>
                      handleInputChange('phone', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Dirección</IonLabel>
                  <IonInput
                    value={checkoutData.address}
                    onIonChange={(e) =>
                      handleInputChange('address', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Ciudad</IonLabel>
                  <IonInput
                    value={checkoutData.city}
                    onIonChange={(e) =>
                      handleInputChange('city', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Estado/Región</IonLabel>
                  <IonInput
                    value={checkoutData.state}
                    onIonChange={(e) =>
                      handleInputChange('state', e.detail.value || '')
                    }
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Código Postal</IonLabel>
                  <IonInput
                    value={checkoutData.zipCode}
                    onIonChange={(e) =>
                      handleInputChange('zipCode', e.detail.value || '')
                    }
                  />
                </IonItem>
              </IonCardContent>
            </IonCard>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <IonButton
                expand="block"
                fill="outline"
                color="primary"
                onClick={() => setStep('cart')}
              >
                Atrás
              </IonButton>
              <IonButton
                expand="block"
                color="primary"
                onClick={() => {
                  if (validateShippingData()) {
                    setStep('payment');
                  }
                }}
              >
                Continuar al pago
              </IonButton>
            </div>
          </div>
        )}

        {/* PAYMENT STEP */}
        {step === 'payment' && (
          <div>
            <h2>Método de Pago</h2>
            <IonCard style={{ marginBottom: '20px' }}>
              <IonCardContent>
                <IonSegment
                  value={paymentMethod}
                  onIonChange={(e) => {
                    const value = e.detail.value as 'card' | 'cash';
                    setPaymentMethod(value);
                    handleInputChange('paymentMethod', value);
                  }}
                >
                  <IonSegmentButton value="card">
                    <IonIcon icon={card} slot="start" />
                    Tarjeta
                  </IonSegmentButton>
                  <IonSegmentButton value="cash">
                    <IonIcon icon={arrowForward} slot="start" />
                    Contra Entrega
                  </IonSegmentButton>
                </IonSegment>
              </IonCardContent>
            </IonCard>

            {paymentMethod === 'card' && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Datos de la Tarjeta</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Número de Tarjeta</IonLabel>
                    <IonInput
                      placeholder="1234 5678 9012 3456"
                      value={checkoutData.cardNumber}
                      onIonChange={(e) =>
                        handleInputChange('cardNumber', e.detail.value || '')
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">MM/YY</IonLabel>
                    <IonInput
                      placeholder="12/25"
                      value={checkoutData.cardExp}
                      onIonChange={(e) =>
                        handleInputChange('cardExp', e.detail.value || '')
                      }
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating">CVC</IonLabel>
                    <IonInput
                      placeholder="123"
                      value={checkoutData.cardCvc}
                      onIonChange={(e) =>
                        handleInputChange('cardCvc', e.detail.value || '')
                      }
                    />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            )}

            {paymentMethod === 'cash' && (
              <IonCard>
                <IonCardContent>
                  <IonText color="primary">
                    <p>
                      Pagarás tu orden al momento de la entrega. Tu paquete será
                      entregado en 5-7 días hábiles.
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <IonButton
                expand="block"
                fill="outline"
                color="primary"
                onClick={() => setStep('shipping')}
              >
                Atrás
              </IonButton>
              <IonButton
                expand="block"
                color="primary"
                onClick={() => {
                  if (validatePaymentData()) {
                    handleCompleteOrder();
                  }
                }}
              >
                Completar Orden
              </IonButton>
            </div>
          </div>
        )}

        {/* CONFIRMATION STEP */}
        {step === 'confirmation' && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <IonIcon
              icon={checkmarkCircle}
              style={{ fontSize: '100px', color: '#4CAF50', marginBottom: '20px' }}
            />
            <h2 style={{ color: '#131921', marginBottom: '10px' }}>
              ¡Orden Completada!
            </h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Tu orden ha sido procesada exitosamente.
            </p>

            <IonCard>
              <IonCardContent>
                <h3 style={{ marginBottom: '15px' }}>Detalles de tu Orden</h3>
                <div style={{ textAlign: 'left' }}>
                  <p>
                    <strong>Nombre:</strong> {checkoutData.firstName}{' '}
                    {checkoutData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {checkoutData.email}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {checkoutData.address},{' '}
                    {checkoutData.city}, {checkoutData.state}
                  </p>
                  <p style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                    <strong style={{ color: '#ff9900', fontSize: '18px' }}>
                      Total: ${totals.total.toFixed(2)}
                    </strong>
                  </p>
                </div>
              </IonCardContent>
            </IonCard>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexDirection: 'column' }}>
              <IonButton
                expand="block"
                color="primary"
                onClick={() => history.push('/pedidos')}
              >
                Ver mis órdenes
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                color="primary"
                onClick={() => history.push('/')}
              >
                Volver al inicio
              </IonButton>
            </div>
          </div>
        )}

        <IonLoading isOpen={loading} message="Procesando..." />

        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header="Error"
          message={error || ''}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Checkout;

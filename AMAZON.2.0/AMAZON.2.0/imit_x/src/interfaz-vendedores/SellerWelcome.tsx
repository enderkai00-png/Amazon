import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../theme/variables.css';

const SellerWelcome: React.FC = () => {
  const history = useHistory();

  const goToDashboard = () => {
    history.push('/vendedores');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido, Vendedor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Panel de vendedor</IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{ textAlign: 'center' }}>
                  {/* Muestra `public/seller_welcome.png` si existe, si no muestra un bloque informativo */}
                  <img
                    src="/seller_welcome.png"
                    alt="Seller welcome"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: 6, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
                    onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
                  />

                  <div style={{ marginTop: 20 }}>
                    <p>Accede al panel para agregar o modificar productos y precios.</p>
                    <IonButton expand="block" color="primary" onClick={goToDashboard}>
                      Abrir panel de vendedor
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SellerWelcome;

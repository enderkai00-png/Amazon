import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home_vend: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Panel del Vendedor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: '20px' }}>
          <IonCard>
            <IonCardContent style={{ textAlign: 'center', padding: '40px' }}>
              <h2>¡Bienvenido Vendedor!</h2>
              <p>Tu registro como vendedor se ha completado exitosamente.</p>
              <IonButton 
                expand="block" 
                style={{ marginTop: '20px' }}
                onClick={() => history.push('/home')}
              >
                Ir al Inicio
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home_vend;
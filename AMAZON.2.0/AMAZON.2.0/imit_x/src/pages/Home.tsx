import React, { useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { settings, cart, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/login');
    }
  }, [isAuthenticated, history]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Amazon 2.0</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/configuracion">
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding">
        
        {/* Banner de Bienvenida */}
        <IonCard color="primary">
          <IonCardContent style={{ textAlign: 'center', padding: '30px' }}>
            <h1 style={{ color: 'white', margin: '0' }}>¡Bienvenido!</h1>
            <p style={{ color: 'white', opacity: '0.8' }}>Tu tienda online de confianza</p>
          </IonCardContent>
        </IonCard>

        {/* Grid de Navegación Principal */}
        <IonGrid style={{ marginTop: '20px' }}>
          <IonRow>
            <IonCol size="6">
              <IonCard 
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => window.location.href = '/productos'}
              >
                <IonCardContent style={{ padding: '20px 10px' }}>
                  <IonIcon 
                    icon={cart} 
                    size="large" 
                    color="primary" 
                    style={{ marginBottom: '10px' }} 
                  />
                  <h3 style={{ margin: '5px 0' }}>Productos</h3>
                  <p style={{ fontSize: '0.8em', color: '#666' }}>Ver catálogo</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              {role === 'seller' ? (
                <IonCard
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => history.push('/vendedores/welcome')}
                >
                  <IonCardContent style={{ padding: '20px 10px' }}>
                    <IonIcon
                      icon={person}
                      size="large"
                      color="tertiary"
                      style={{ marginBottom: '10px' }}
                    />
                    <h3 style={{ margin: '5px 0' }}>Vendedor</h3>
                    <p style={{ fontSize: '0.8em', color: '#666' }}>Acceder al panel</p>
                  </IonCardContent>
                </IonCard>
              ) : (
                <IonCard 
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  onClick={() => window.location.href = '/configuracion'}
                >
                  <IonCardContent style={{ padding: '20px 10px' }}>
                    <IonIcon 
                      icon={person} 
                      size="large" 
                      color="secondary" 
                      style={{ marginBottom: '10px' }} 
                    />
                    <h3 style={{ margin: '5px 0' }}>Mi Cuenta</h3>
                    <p style={{ fontSize: '0.8em', color: '#666' }}>Configuración</p>
                  </IonCardContent>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Botón adicional de configuración */}
        <div style={{ marginTop: '30px' }}>
          <IonButton 
            routerLink="/configuracion" 
            expand="block" 
            fill="outline"
            size="small"
          >
            <IonIcon icon={settings} slot="start" />
            Configuración Completa
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;

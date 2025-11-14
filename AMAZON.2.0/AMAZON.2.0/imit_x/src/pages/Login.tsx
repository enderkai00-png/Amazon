import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonLoading,
  IonAlert,
} from '@ionic/react';
import { logoGoogle, mail, lockClosed } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth.service';
import '../theme/variables.css';

interface LoginCredentials {
  email: string;
  password: string;
  role: 'client' | 'seller';
}

const Login: React.FC = () => {
  const history = useHistory();
  const [segmentValue, setSegmentValue] = useState<'client' | 'seller'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, role } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password, segmentValue);

      // authService guarda la sesión en localStorage; leer desde allí garantiza
      // obtener el rol actualizado inmediatamente después del login.
      const currentRole = authService.getCurrentRole() ?? role;

      if (currentRole === 'seller') {
        history.push('/vendedores');
      } else {
        history.push('/');
      }
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>AmazON - Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#131921', fontSize: '2.5rem' }}>AmazON</h1>
          <p style={{ color: '#666' }}>Tu tienda online de confianza</p>
        </div>

        <IonCard style={{ marginTop: '30px' }}>
          <IonCardHeader>
            <IonCardTitle>Selecciona tu tipo de cuenta</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSegment
              value={segmentValue}
              onIonChange={(e) =>
                setSegmentValue(e.detail.value as 'client' | 'seller')
              }
            >
              <IonSegmentButton value="client">Cliente</IonSegmentButton>
              <IonSegmentButton value="seller">Vendedor</IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        <IonCard style={{ marginTop: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>
              {segmentValue === 'client' ? 'Iniciar sesión como cliente' : 'Iniciar sesión como vendedor'}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={mail} slot="start" color="primary" />
              <IonLabel position="floating">Correo electrónico</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value || '')}
                placeholder="tuemail@example.com"
              />
            </IonItem>

            <IonItem>
              <IonIcon icon={lockClosed} slot="start" color="primary" />
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value || '')}
                placeholder="••••••••"
              />
            </IonItem>

            <IonButton
              expand="block"
              color="primary"
              onClick={handleLogin}
              style={{ marginTop: '20px' }}
            >
              Iniciar Sesión
            </IonButton>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ marginBottom: '10px' }}>¿No tienes cuenta?</p>
              <IonButton
                fill="clear"
                color="primary"
                onClick={() => history.push('/register')}
              >
                Regístrate aquí
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonLoading isOpen={loading} message="Iniciando sesión..." />

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

export default Login;

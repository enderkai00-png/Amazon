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
import { personAdd, mail, lockClosed, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../theme/variables.css';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'client' | 'seller';
}

const Register: React.FC = () => {
  const history = useHistory();
  const [segmentValue, setSegmentValue] = useState<'client' | 'seller'>('client');
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { signup, role } = useAuth();

  const handleInputChange = (field: keyof RegisterData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await signup(formData.name, formData.email, formData.password, segmentValue);
      setSuccess(true);

      const currentRole = role || localStorage.getItem('role');

      setTimeout(() => {
        if (currentRole === 'seller') {
          history.push('/vendedores');
        } else {
          history.push('/');
        }
      }, 2000);
    } catch (err: any) {
      setError(err?.message || 'Error al registrarse');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>AmazON - Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h1 style={{ color: '#131921', fontSize: '2rem' }}>AmazON</h1>
          <p style={{ color: '#666' }}>Crea tu cuenta</p>
        </div>

        <IonCard style={{ marginTop: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>Tipo de Cuenta</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSegment
              value={segmentValue}
              onIonChange={(e) => {
                const value = e.detail.value as 'client' | 'seller';
                setSegmentValue(value);
                setFormData({ ...formData, role: value });
              }}
            >
              <IonSegmentButton value="client">Cliente</IonSegmentButton>
              <IonSegmentButton value="seller">Vendedor</IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        <IonCard style={{ marginTop: '20px' }}>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={person} slot="start" color="primary" />
              <IonLabel position="floating">Nombre Completo</IonLabel>
              <IonInput
                type="text"
                value={formData.name}
                onIonChange={(e) =>
                  handleInputChange('name', e.detail.value || '')
                }
                placeholder="Tu nombre"
              />
            </IonItem>

            <IonItem>
              <IonIcon icon={mail} slot="start" color="primary" />
              <IonLabel position="floating">Correo Electrónico</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={(e) =>
                  handleInputChange('email', e.detail.value || '')
                }
                placeholder="tuemail@example.com"
              />
            </IonItem>

            <IonItem>
              <IonIcon icon={lockClosed} slot="start" color="primary" />
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput
                type="password"
                value={formData.password}
                onIonChange={(e) =>
                  handleInputChange('password', e.detail.value || '')
                }
                placeholder="••••••••"
              />
            </IonItem>

            <IonItem>
              <IonIcon icon={lockClosed} slot="start" color="primary" />
              <IonLabel position="floating">Confirmar Contraseña</IonLabel>
              <IonInput
                type="password"
                value={formData.confirmPassword}
                onIonChange={(e) =>
                  handleInputChange('confirmPassword', e.detail.value || '')
                }
                placeholder="••••••••"
              />
            </IonItem>

            <IonButton
              expand="block"
              color="primary"
              onClick={handleRegister}
              style={{ marginTop: '20px' }}
            >
              <IonIcon icon={personAdd} slot="start" />
              Crear Cuenta
            </IonButton>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ marginBottom: '10px' }}>¿Ya tienes cuenta?</p>
              <IonButton
                fill="clear"
                color="primary"
                onClick={() => history.push('/login')}
              >
                Inicia sesión aquí
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        <IonLoading isOpen={loading} message="Creando tu cuenta..." />

        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header="Error"
          message={error || ''}
          buttons={['OK']}
        />

        <IonAlert
          isOpen={success}
          onDidDismiss={() => setSuccess(false)}
          header="¡Éxito!"
          message="Tu cuenta ha sido creada. Redirigiendo..."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;

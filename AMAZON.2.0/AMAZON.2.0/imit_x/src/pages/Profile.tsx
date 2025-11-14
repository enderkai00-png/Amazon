import React, { useEffect, useState } from 'react';
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
  IonIcon,
  IonToggle,
  IonLoading,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import { person, mail, callOutline, location, logOut, moon, sunny } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import '../theme/variables.css';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'client' | 'seller';
}

const Profile: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData(userData);
    } else {
      // Si no hay usuario, redirigir a login
      history.push('/login');
    }
  }, [history]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Aquí iría la llamada API para actualizar el perfil
      // Por ahora, solo guardamos en localStorage
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser as UserProfile);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Error al guardar los cambios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('client_id');
    history.push('/login');
  };

  if (!user) {
    return (
      <IonPage>
        <IonContent>
          <p>Cargando...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Mi Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Avatar y nombre */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#ff9900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: '32px',
              color: 'white',
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ marginTop: '15px', color: '#131921' }}>{user.name}</h2>
          <p style={{ color: '#666' }}>{user.role === 'seller' ? 'Vendedor' : 'Cliente'}</p>
        </div>

        {/* Información del usuario */}
        {!isEditing ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Información Personal</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonIcon icon={mail} slot="start" color="primary" />
                <IonLabel>
                  <p>Email</p>
                  <h2>{user.email}</h2>
                </IonLabel>
              </IonItem>

              {user.phone && (
                <IonItem lines="none">
                  <IonIcon icon={callOutline} slot="start" color="primary" />
                  <IonLabel>
                    <p>Teléfono</p>
                    <h2>{user.phone}</h2>
                  </IonLabel>
                </IonItem>
              )}

              {user.address && (
                <IonItem lines="none">
                  <IonIcon icon={location} slot="start" color="primary" />
                  <IonLabel>
                    <p>Dirección</p>
                    <h2>{user.address}</h2>
                  </IonLabel>
                </IonItem>
              )}

              <IonButton
                expand="block"
                color="primary"
                onClick={() => setIsEditing(true)}
                style={{ marginTop: '20px' }}
              >
                Editar Perfil
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Editar Perfil</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonIcon icon={person} slot="start" color="primary" />
                <IonLabel position="floating">Nombre</IonLabel>
                <IonInput
                  type="text"
                  value={formData.name}
                  onIonChange={(e) =>
                    handleInputChange('name', e.detail.value || '')
                  }
                />
              </IonItem>

              <IonItem>
                <IonIcon icon={mail} slot="start" color="primary" />
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={formData.email}
                  onIonChange={(e) =>
                    handleInputChange('email', e.detail.value || '')
                  }
                />
              </IonItem>

              <IonItem>
                <IonIcon icon={callOutline} slot="start" color="primary" />
                <IonLabel position="floating">Teléfono</IonLabel>
                <IonInput
                  type="tel"
                  value={formData.phone}
                  onIonChange={(e) =>
                    handleInputChange('phone', e.detail.value || '')
                  }
                />
              </IonItem>

              <IonItem>
                <IonIcon icon={location} slot="start" color="primary" />
                <IonLabel position="floating">Dirección</IonLabel>
                <IonInput
                  type="text"
                  value={formData.address}
                  onIonChange={(e) =>
                    handleInputChange('address', e.detail.value || '')
                  }
                />
              </IonItem>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleSaveProfile}
                >
                  Guardar
                </IonButton>
                <IonButton
                  expand="block"
                  fill="outline"
                  color="primary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Preferencias */}
        <IonCard style={{ marginTop: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>Preferencias</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={moon} slot="start" color="primary" />
              <IonLabel>Modo Oscuro</IonLabel>
              <IonToggle
                checked={darkMode}
                onIonChange={(e) => setDarkMode(e.detail.checked)}
                slot="end"
              />
            </IonItem>

            <IonItem>
              <IonIcon icon={sunny} slot="start" color="primary" />
              <IonLabel>Recibir Notificaciones</IonLabel>
              <IonToggle
                checked={notification}
                onIonChange={(e) => setNotification(e.detail.checked)}
                slot="end"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Logout */}
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
          <IonButton
            expand="block"
            color="danger"
            onClick={handleLogout}
          >
            <IonIcon icon={logOut} slot="start" />
            Cerrar Sesión
          </IonButton>
        </div>

        <IonLoading isOpen={loading} message="Guardando cambios..." />

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
          message="Cambios guardados correctamente"
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;

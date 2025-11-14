import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonAvatar,
  IonText,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonBackButton,
  IonButtons,
  IonAlert,
  IonBadge
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ConfiguracionCuenta: React.FC = () => {
  const history = useHistory();
  const { user, role, logout, switchAccount } = useAuth();
  
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    notificaciones: true,
    tema: 'claro'
  });

  const [cambiosPendientes, setCambiosPendientes] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSwitchAccountAlert, setShowSwitchAccountAlert] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        nombre: user.name,
        email: user.email,
        telefono: '',
        direccion: '',
        notificaciones: true,
        tema: 'claro'
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setCambiosPendientes(true);
  };

  const guardarCambios = async () => {
    try {
      console.log('Guardando cambios:', userData);
      setCambiosPendientes(false);
      alert('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar los cambios');
    }
  };

  const handleCancelar = () => {
    if (cambiosPendientes) {
      const confirmar = window.confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
      if (confirmar) {
        history.goBack();
      }
    } else {
      history.goBack();
    }
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  const handleSwitchAccount = () => {
    switchAccount();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Configuración de Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto 10px' }}>
                <img 
                  src="https://via.placeholder.com/80" 
                  alt="Avatar del usuario" 
                />
              </IonAvatar>
              <IonText>
                <h2 style={{ margin: '5px 0' }}>{userData.nombre}</h2>
              </IonText>
              <IonBadge color={role === 'client' ? 'primary' : 'success'} style={{ marginTop: '5px' }}>
                {role === 'client' ? 'Cliente' : 'Vendedor'}
              </IonBadge>
              <br />
              <IonButton fill="clear" size="small" color="medium">
                Cambiar Foto
              </IonButton>
            </div>

            <IonList>
              <IonItem>
                <IonLabel position="stacked">Nombre Completo</IonLabel>
                <IonInput
                  value={userData.nombre}
                  onIonInput={(e) => handleInputChange('nombre', e.detail.value!)}
                  placeholder="Ingresa tu nombre"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={userData.email}
                  onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                  placeholder="Ingresa tu email"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Teléfono</IonLabel>
                <IonInput
                  type="tel"
                  value={userData.telefono}
                  onIonInput={(e) => handleInputChange('telefono', e.detail.value!)}
                  placeholder="Ingresa tu teléfono"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Dirección</IonLabel>
                <IonInput
                  value={userData.direccion}
                  onIonInput={(e) => handleInputChange('direccion', e.detail.value!)}
                  placeholder="Ingresa tu dirección"
                />
              </IonItem>

              <IonItem>
                <IonLabel>Recibir Notificaciones</IonLabel>
                <IonToggle
                  checked={userData.notificaciones}
                  onIonChange={(e) => handleInputChange('notificaciones', e.detail.checked)}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Tema de la App</IonLabel>
                <IonSelect
                  value={userData.tema}
                  placeholder="Selecciona tema"
                  onIonChange={(e) => handleInputChange('tema', e.detail.value)}
                >
                  <IonSelectOption value="claro">Claro</IonSelectOption>
                  <IonSelectOption value="oscuro">Oscuro</IonSelectOption>
                  <IonSelectOption value="auto">Automático</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>

            <div style={{ padding: '20px 0' }}>
              <IonButton 
                expand="block" 
                onClick={guardarCambios}
                disabled={!cambiosPendientes}
              >
                {cambiosPendientes ? 'Guardar Cambios' : 'Sin Cambios'}
              </IonButton>
              
              <IonButton 
                expand="block" 
                fill="outline" 
                style={{ marginTop: '10px' }}
                onClick={handleCancelar}
              >
                Cancelar
              </IonButton>

              {/* Botón para cambiar de cuenta */}
              <IonButton 
                expand="block" 
                color="warning"
                fill="outline"
                style={{ marginTop: '30px' }}
                onClick={() => setShowSwitchAccountAlert(true)}
              >
                Cambiar de Cuenta
              </IonButton>

              {/* Botón para cerrar sesión */}
              <IonButton 
                expand="block" 
                color="medium"
                fill="outline"
                style={{ marginTop: '10px' }}
                onClick={() => setShowLogoutAlert(true)}
              >
                Cerrar Sesión
              </IonButton>

              <IonButton 
                expand="block" 
                fill="clear" 
                color="danger"
                style={{ marginTop: '20px' }}
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                    console.log('Eliminando cuenta...');
                  }
                }}
              >
                Eliminar Cuenta
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Alert para cerrar sesión */}
        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Cerrar Sesión"
          message="¿Estás seguro de que quieres cerrar sesión?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Cerrar Sesión',
              handler: handleLogout,
            },
          ]}
        />

        {/* Alert para cambiar de cuenta */}
        <IonAlert
          isOpen={showSwitchAccountAlert}
          onDidDismiss={() => setShowSwitchAccountAlert(false)}
          header="Cambiar de Cuenta"
          message="¿Quieres cambiar a otra cuenta? Se cerrará tu sesión actual."
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Cambiar Cuenta',
              handler: handleSwitchAccount,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ConfiguracionCuenta;

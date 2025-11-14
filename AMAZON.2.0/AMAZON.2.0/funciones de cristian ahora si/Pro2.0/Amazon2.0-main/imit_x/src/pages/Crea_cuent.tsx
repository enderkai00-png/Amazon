import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonButton, IonInput, IonItem, IonLabel, IonAlert, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Crea_cuent.css';

const Crea_cuent: React.FC = () => {
  const history = useHistory();
  const [mode, setMode] = useState<'select' | 'register' | 'login'>('select');
  const [showRoleAlert, setShowRoleAlert] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = async () => {
    // Validaciones básicas
    if (!formData.name || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        setRegisteredUserId(result.userId);
        setShowRoleAlert(true);
      } else {
        alert(result.error || 'Error al registrar usuario');
      }
    } catch (error) {
      alert('Error de conexión: ' + error);
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (result.success) {
        // Redirigir según el tipo de usuario
        if (result.userType === 'seller') {
          history.push('/home-vend');
        } else {
          history.push('/home');
        }
      } else {
        alert(result.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error de conexión: ' + error);
    }
  };

  const handleRoleSelection = (role: 'client' | 'seller') => {
    if (role === 'client') {
      history.push('/home');
    } else {
      // Guardar el userId en localStorage para usarlo en Dat_ven
      if (registeredUserId) {
        localStorage.setItem('pendingSellerId', registeredUserId.toString());
      }
      history.push('/dat-ven');
    }
  };

  if (mode === 'select') {
    return (
      <IonPage>
        <IonContent className="auth-content">
          <div className="auth-container">
            <IonCard className="auth-card">
              <IonCardContent>
                <h2 className="auth-title">Bienvenido</h2>
                <p className="auth-subtitle">¿Qué te gustaría hacer?</p>
                
                <div className="auth-buttons">
                  <IonButton 
                    expand="block" 
                    className="auth-button"
                    onClick={() => setMode('login')}
                  >
                    Iniciar Sesión
                  </IonButton>
                  
                  <IonButton 
                    expand="block" 
                    fill="outline" 
                    className="auth-button"
                    onClick={() => setMode('register')}
                  >
                    Crear Cuenta
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (mode === 'login') {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" onClick={() => setMode('select')}>
              ← Volver
            </IonButton>
            <IonTitle>Iniciar Sesión</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="form-container">
            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="stacked">Correo Electrónico</IonLabel>
                  <IonInput
                    type="email"
                    value={loginData.email}
                    onIonInput={(e) => setLoginData({...loginData, email: e.detail.value!})}
                    placeholder="tu@email.com"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={loginData.password}
                    onIonInput={(e) => setLoginData({...loginData, password: e.detail.value!})}
                    placeholder="Tu contraseña"
                  />
                </IonItem>

                <IonButton 
                  expand="block" 
                  className="submit-button"
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton fill="clear" onClick={() => setMode('select')}>
            ← Volver
          </IonButton>
          <IonTitle>Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="form-container">
          <IonCard>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Nombre</IonLabel>
                      <IonInput
                        value={formData.name}
                        onIonInput={(e) => setFormData({...formData, name: e.detail.value!})}
                        placeholder="Tu nombre"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="stacked">Apellido</IonLabel>
                      <IonInput
                        value={formData.lastName}
                        onIonInput={(e) => setFormData({...formData, lastName: e.detail.value!})}
                        placeholder="Tu apellido"
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonItem>
                  <IonLabel position="stacked">Correo Electrónico</IonLabel>
                  <IonInput
                    type="email"
                    value={formData.email}
                    onIonInput={(e) => setFormData({...formData, email: e.detail.value!})}
                    placeholder="tu@email.com"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Número Telefónico</IonLabel>
                  <IonInput
                    type="tel"
                    value={formData.phone}
                    onIonInput={(e) => setFormData({...formData, phone: e.detail.value!})}
                    placeholder="+52 123 456 7890"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={formData.password}
                    onIonInput={(e) => setFormData({...formData, password: e.detail.value!})}
                    placeholder="Mínimo 6 caracteres"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Confirmar Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={formData.confirmPassword}
                    onIonInput={(e) => setFormData({...formData, confirmPassword: e.detail.value!})}
                    placeholder="Repite tu contraseña"
                  />
                </IonItem>
              </IonGrid>

              <IonButton 
                expand="block" 
                className="submit-button"
                onClick={handleRegister}
              >
                Aceptar
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <IonAlert
          isOpen={showRoleAlert}
          onDidDismiss={() => setShowRoleAlert(false)}
          header={'¡Cuenta Creada!'}
          message={'¿Qué te gustaría ser?'}
          buttons={[
            {
              text: 'Cliente',
              handler: () => handleRoleSelection('client')
            },
            {
              text: 'Vendedor',
              handler: () => handleRoleSelection('seller')
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Crea_cuent;
import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Dat_ven.css';

const Dat_ven: React.FC = () => {
  const history = useHistory();
  const [sellerData, setSellerData] = useState({
    rfc: '',
    taxSituation: '',
    productsToSell: ''
  });

  const handleSubmit = async () => {
    if (!sellerData.rfc || !sellerData.taxSituation || !sellerData.productsToSell) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const userId = localStorage.getItem('pendingSellerId');

    if (!userId) {
      alert('Error: No se encontró información del usuario');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/update-to-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          rfc: sellerData.rfc,
          taxSituation: sellerData.taxSituation,
          productsToSell: sellerData.productsToSell
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.removeItem('pendingSellerId');
        history.push('/home-vend');
      } else {
        alert(result.error || 'Error al guardar datos');
      }
    } catch (error) {
      alert('Error de conexión: ' + error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Datos del Vendedor</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="form-container">
          <div className="form-card">
            <h2>Información Fiscal</h2>
            
            <IonItem>
              <IonLabel position="stacked">RFC</IonLabel>
              <IonInput
                value={sellerData.rfc}
                onIonInput={(e) => setSellerData({...sellerData, rfc: e.detail.value!})}
                placeholder="Ingresa tu RFC"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Constancia de Situación Fiscal</IonLabel>
              <IonInput
                value={sellerData.taxSituation}
                onIonInput={(e) => setSellerData({...sellerData, taxSituation: e.detail.value!})}
                placeholder="Número de constancia"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">¿Qué productos quieres vender?</IonLabel>
              <IonTextarea
                value={sellerData.productsToSell}
                onIonInput={(e) => setSellerData({...sellerData, productsToSell: e.detail.value!})}
                placeholder="Describe los productos que planeas vender..."
                rows={4}
              />
            </IonItem>

            <IonButton 
              expand="block" 
              className="submit-button"
              onClick={handleSubmit}
            >
              Completar Registro
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dat_ven;
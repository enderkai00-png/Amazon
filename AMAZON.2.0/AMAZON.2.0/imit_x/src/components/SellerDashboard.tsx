import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonButton,
  IonIcon,
  IonList
} from '@ionic/react';
import { save } from 'ionicons/icons';

interface SellerProduct {
  id: string;
  title: string;
  price: number;
  siteEnabled: { [site: string]: boolean };
}

const initialProducts: SellerProduct[] = [
  { id: 'P3001', title: 'Smartphone Galaxy X', price: 599.00, siteEnabled: { DE: true, ES: true, IT: true } },
  { id: 'P3002', title: "Novela 'El Susurro'", price: 18.9, siteEnabled: { DE: false, ES: true, IT: true } },
  { id: 'P3003', title: 'Zapatillas Running Pro', price: 89.99, siteEnabled: { DE: true, ES: true, IT: false } }
];

const SellerDashboard: React.FC = () => {
  const [products, setProducts] = useState<SellerProduct[]>(initialProducts);

  const updatePrice = (id: string, value: string | number | null) => {
    const price = Number(value) || 0;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price } : p));
  };

  const toggleSite = (id: string, site: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, siteEnabled: { ...p.siteEnabled, [site]: !p.siteEnabled[site] } };
    }));
  };

  const saveChanges = () => {
    // Aquí podrías llamar a la API para persistir (POST/PUT)
    console.log('Guardar cambios:', products);
    alert('Cambios guardados (simulado)');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Panel de Vendedor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid style={{ padding: 16 }}>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Filtros / Acciones</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Filtra por sitio o estado y realice cambios masivos.</p>
                  <IonButton expand="block" onClick={saveChanges}>
                    <IonIcon icon={save} slot="start" /> Guardar todo
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="8">
              <IonList>
                {products.map(p => (
                  <IonCard key={p.id} style={{ marginBottom: 12 }}>
                    <IonCardHeader>
                      <IonCardTitle>{p.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonItem>
                        <IonLabel position="stacked">ASIN / ID</IonLabel>
                        <div>{p.id}</div>
                      </IonItem>

                      <IonItem>
                        <IonLabel position="stacked">Precio</IonLabel>
                        <IonInput
                          value={p.price}
                          type="number"
                          onIonChange={(e: any) => updatePrice(p.id, (e.detail && e.detail.value) ?? null)}
                        />
                      </IonItem>

                      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                        {Object.keys(p.siteEnabled).map(site => (
                          <IonItem key={site} style={{ flex: 1 }}>
                            <IonLabel>{site}</IonLabel>
                            <IonToggle checked={p.siteEnabled[site]} onIonChange={() => toggleSite(p.id, site)} />
                          </IonItem>
                        ))}
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SellerDashboard;

import React, { useState, useEffect } from 'react';
import './SellerDashboard.css';
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
  { id: 'P3001', title: 'Smartphone Galaxy X', price: 599.0, siteEnabled: { DE: true, ES: true, IT: true } },
  { id: 'P3002', title: "Novela 'El Susurro'", price: 18.9, siteEnabled: { DE: false, ES: true, IT: true } },
  { id: 'P3003', title: 'Zapatillas Running Pro', price: 89.99, siteEnabled: { DE: true, ES: true, IT: false } }
];

const SellerDashboard: React.FC = () => {
  const [products, setProducts] = useState<SellerProduct[]>(initialProducts);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // Try to load saved products from server; if none, keep initialProducts
    const load = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/seller/products');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      } catch (err) {
        // ignore, keep defaults
        console.warn('Could not load seller products:', err);
      }
    };
    load();
  }, []);

  const updatePrice = (id: string, value: string | number | null) => {
    const price = Number(value) || 0;
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, price } : p)));
  };

  const toggleSite = (id: string, site: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, siteEnabled: { ...p.siteEnabled, [site]: !p.siteEnabled[site] } };
    }));
  };

  const saveChanges = () => {
    (async () => {
      setSaving(true);
      setStatusMessage(null);
      try {
        const res = await fetch('http://localhost:4000/api/seller/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ products })
        });
        if (!res.ok) throw new Error('Save failed');
        setStatusMessage('Cambios guardados correctamente');
      } catch (err) {
        console.error('Error saving products:', err);
        setStatusMessage('Error al guardar. Intenta de nuevo.');
      } finally {
        setSaving(false);
      }
    })();
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
                  <IonButton expand="block" onClick={saveChanges} disabled={saving}>
                    <IonIcon icon={save} slot="start" /> {saving ? 'Guardando...' : 'Guardar todo'}
                  </IonButton>
                  {statusMessage && <div style={{ marginTop: 8 }}>{statusMessage}</div>}
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

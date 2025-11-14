import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonSearchbar, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonListHeader, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonPage 
} from '@ionic/react';
import { cartOutline, locationOutline } from 'ionicons/icons';
import './Home.css'; // Importa los estilos que crearemos

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        {/* 1. BARRA DE BÚSQUEDA (Estilo Amazon) */}
        {/* Al usar 'primary', se pintará del azul que definimos en variables.scss */}
        <IonToolbar color="primary">
          <IonTitle>
            AmazON
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={cartOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar color="primary">
          <IonSearchbar animated={true} placeholder="Buscar en AmazON..."></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* 2. BARRA DE ENVÍO (Estilo Amazon) */}
        <IonItem lines="none" className="location-bar">
          <IonIcon slot="start" icon={locationOutline}></IonIcon>
          <IonLabel>
            Enviar a Danie - Villas del Poniente 66123
          </IonLabel>
        </IonItem>

        {/* Banner principal */}
        <img alt="Banner de ofertas" src="https://via.placeholder.com/600x200.png?text=Banner+Principal" />

        {/* 3. GRID DE CATEGORÍAS (Estilo Amazon) */}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard className="category-card" button={true}>
                <img alt="Categoría 1" src="https://via.placeholder.com/150.png?text=Electrónica" />
                <IonCardContent>Electrónica</IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="category-card" button={true}>
                <img alt="Categoría 2" src="https://via.placeholder.com/150.png?text=Moda" />
                <IonCardContent>Moda</IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* ... (puedes añadir más filas y columnas) ... */}
        </IonGrid>

        {/* 4. LISTA HORIZONTAL (Estilo "Carousel" de Amazon) */}
        <IonListHeader>
          <h3>Productos Destacados</h3>
        </IonListHeader>

        <div className="horizontal-scroll">
          {/* Usamos map para crear 5 productos de ejemplo */}
          {[1, 2, 3, 4, 5].map(i => (
            <IonCard className="product-card" key={i}>
              <img alt={`Producto ${i}`} src={`https://via.placeholder.com/150.png?text=Producto+${i}`} />
              <IonCardHeader>
                <IonCardTitle>$ {100 * i}.00</IonCardTitle>
                <IonCardSubtitle>Producto {i}</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          ))}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;

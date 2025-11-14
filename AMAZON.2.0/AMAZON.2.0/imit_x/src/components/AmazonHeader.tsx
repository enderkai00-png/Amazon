import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
  IonMenuButton,
  IonAvatar,
  IonBadge
} from '@ionic/react';
import { 
  filter, 
  location,
  cart,
  menu,
  person
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AmazonHeaderProps {
  productCount: number;
  onFilterClick: () => void;
}

const AmazonHeader: React.FC<AmazonHeaderProps> = ({ 
  productCount, 
  onFilterClick 
}) => {
  const history = useHistory();
  const { user, role } = useAuth();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton>
            <IonIcon icon={menu} />
          </IonMenuButton>
        </IonButtons>
        
        <IonTitle>
          <IonText>Amazon</IonText>
        </IonTitle>

        <IonButtons slot="end">
          <IonButton>
            <IonIcon icon={cart} />
          </IonButton>
          
          {/* Botón de usuario */}
          <IonButton onClick={() => history.push('/configuracion')}>
            <IonAvatar style={{ width: '24px', height: '24px', marginRight: '5px' }}>
              <IonIcon icon={person} />
            </IonAvatar>
            <IonText style={{ fontSize: '12px' }}>
              {user?.name || 'Usuario'}
            </IonText>
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Barra de ubicación */}
      <IonToolbar color="light">
        <IonButton fill="clear" size="small">
          <IonIcon icon={location} slot="start" />
          <IonText>
            <small>Enviar a</small>
            <br />
            <strong>Datos Virtual del Roteado (612)</strong>
          </IonText>
        </IonButton>
        
        {/* Badge de rol */}
        {role && (
          <IonButtons slot="end">
            <IonBadge color={role === 'client' ? 'primary' : 'success'}>
              {role === 'client' ? 'Cliente' : 'Vendedor'}
            </IonBadge>
          </IonButtons>
        )}
      </IonToolbar>

      {/* Barra de filtros */}
      <IonToolbar color="light">
        <IonButton 
          fill="clear" 
          size="small"
          onClick={onFilterClick}
        >
          <IonIcon icon={filter} slot="start" />
          <IonText>Filtrar</IonText>
          {productCount > 0 && (
            <IonText color="primary"> ({productCount})</IonText>
          )}
        </IonButton>
        
        <IonButtons slot="end">
          <IonButton fill="clear" size="small">
            <IonText>Ordenar</IonText>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AmazonHeader;
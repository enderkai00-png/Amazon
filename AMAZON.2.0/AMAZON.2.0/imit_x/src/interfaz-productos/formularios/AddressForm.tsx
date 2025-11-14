import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonList,
  IonToast
} from '@ionic/react';
import { Direccion } from '../types';

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: Direccion) => Promise<void> | void;
  defaultClientId?: number | null;
  defaultValues?: Partial<Direccion>;
}

const AddressForm: React.FC<AddressFormProps> = ({ isOpen, onClose, onSave, defaultClientId = null, defaultValues = {} }) => {
  const [nombre, setNombre] = useState(defaultValues.nombre || '');
  const [apellido, setApellido] = useState(defaultValues.apellido || '');
  const [direccion, setDireccion] = useState(defaultValues.direccion || '');
  const [direccion2, setDireccion2] = useState(defaultValues.direccion2 || '');
  const [ciudad, setCiudad] = useState(defaultValues.ciudad || '');
  const [estado, setEstado] = useState(defaultValues.estado || '');
  const [pais, setPais] = useState(defaultValues.pais || '');
  const [codigoPostal, setCodigoPostal] = useState(defaultValues.codigo_postal || '');
  const [telefono, setTelefono] = useState(defaultValues.telefono || '');
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const validate = () => {
    if (!nombre || !apellido || !direccion || !ciudad || !pais || !codigoPostal) return false;
    return true;
  };

  const handleSave = async () => {
    if (!validate()) {
      setToastMsg('Completa los campos obligatorios');
      return;
    }
    const payload: Direccion = {
      client_id: defaultClientId ?? null,
      nombre,
      apellido,
      direccion,
      direccion2,
      ciudad,
      estado,
      pais,
      codigo_postal: codigoPostal,
      telefono
    };
    try {
      setSaving(true);
      await onSave(payload);
      setToastMsg('Dirección guardada');
      setTimeout(() => {
        setSaving(false);
        onClose();
      }, 600);
    } catch (err) {
      console.error(err);
      setToastMsg('Error guardando la dirección');
      setSaving(false);
    }
  };

  return (
    <IonModal isOpen={isOpen} className="address-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Información de entrega</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Nombre *</IonLabel>
            <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Apellido *</IonLabel>
            <IonInput value={apellido} onIonChange={e => setApellido(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Dirección (calle y número) *</IonLabel>
            <IonInput value={direccion} onIonChange={e => setDireccion(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Dirección 2</IonLabel>
            <IonInput value={direccion2} onIonChange={e => setDireccion2(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Ciudad *</IonLabel>
            <IonInput value={ciudad} onIonChange={e => setCiudad(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Estado/Provincia</IonLabel>
            <IonInput value={estado} onIonChange={e => setEstado(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">País *</IonLabel>
            <IonInput value={pais} onIonChange={e => setPais(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Código Postal *</IonLabel>
            <IonInput value={codigoPostal} onIonChange={e => setCodigoPostal(e.detail.value || '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Teléfono</IonLabel>
            <IonInput value={telefono} onIonChange={e => setTelefono(e.detail.value || '')} />
          </IonItem>
        </IonList>
        <div style={{ padding: 16 }}>
          <IonButton expand="block" onClick={handleSave} disabled={saving}>
            Guardar y continuar
          </IonButton>
          <IonButton expand="block" fill="clear" onClick={onClose}>Cancelar</IonButton>
        </div>
      </IonContent>
      <IonToast isOpen={!!toastMsg} message={toastMsg} duration={1500} onDidDismiss={() => setToastMsg('')} />
    </IonModal>
  );
};

export default AddressForm;

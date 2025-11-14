import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Crea_cuent from './pages/Crea_cuent';
import Dat_ven from './pages/Dat_ven';
import Home_vend from './pages/Home_vend';
import Int_Product from './pages/Int_Product';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/crea-cuent">
          <Crea_cuent />
        </Route>
        <Route exact path="/dat-ven">
          <Dat_ven />
        </Route>
        <Route exact path="/home-vend">
          <Home_vend />
        </Route>
        <Route exact path="/product">
          <Int_Product />
        </Route>
        <Route exact path="/">
          <Redirect to="/crea-cuent" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
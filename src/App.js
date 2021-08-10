import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {LinearGradient} from './screens/LinearGradient'
import { Home } from './screens/Home';
import { Paleta } from './screens/Paleta';
import { Teste } from './screens/Teste';

function CapsLock(props){
  const textoInserido = props.children;
  const textoEmCapsLock = textoInserido.toUpperCase();
  return <div> {textoEmCapsLock}</div> 
}

function App() {
  return (
    <>
    <BrowserRouter>
        <Switch>
        <Route path="/" exact={true}  component={LinearGradient}/>
        <Route path="/home" component={Home} />
        <Route path="/paleta" component={Paleta} />
        <Route path="/linear-gradient" component={LinearGradient} />
        <Route path="/teste" component={Teste} />
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;

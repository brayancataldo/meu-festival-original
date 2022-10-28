import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LinearGradient } from "./screens/LinearGradient";
import { MyFestival } from "./screens/MyFestival";
import { Paleta } from "./screens/Paleta";
import { Teste2 } from "./screens/test";
import { Teste } from "./screens/Teste";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={MyFestival} />
          <Route path="/home" component={MyFestival} />
          <Route path="/my-festival" component={MyFestival} />
          <Route path="/teste" component={Teste} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

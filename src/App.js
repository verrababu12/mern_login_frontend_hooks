import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/home" component={Home} />
  </Switch>
);

export default App;

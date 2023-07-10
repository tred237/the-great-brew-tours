import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}
import { Switch, Route, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import HomePage from "./features/breweries/HomePage";
import BreweryPage from "./features/brewery/BreweryPage";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/breweries/:id">
          <BreweryPage />
        </Route>
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
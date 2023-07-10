import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./features/breweries/HomePage";
import BreweryPage from "./features/brewery/BreweryPage";

export default function App() {
  const state = useSelector((state) => state);
  console.log(state)
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
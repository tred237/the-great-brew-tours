// import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Breweries from "./features/breweries/Breweries";

function App() {
  // const [breweries, setBreweries] = useState([]);

  // useEffect(() => {
  //   fetch("/breweries")
  //     .then((res) => {
  //       if(res.ok) res.json().then(b => setBreweries(b)) 
  //     })
  // }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Breweries />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
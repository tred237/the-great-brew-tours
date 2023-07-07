// client/src/components/App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    fetch("/breweries")
      .then((res) => {
        if(res.ok) res.json().then(b => setBreweries(b)) 
      })
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/">
            {breweries.map(b => <p key={b.id}>{b.name}</p>)}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
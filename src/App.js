// @flow
import React from 'react';
import logo from "./logo.png";
import "./App.css";
import { Navigation } from "./component/Navigation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" style={{ width: 150 }} />
        <h1>Pokemon Pokedex</h1>
        <p>The perfect tool to record your favourite pokemon!</p>
        <Navigation />
      </header>
    </div>
  );
}

export default App;

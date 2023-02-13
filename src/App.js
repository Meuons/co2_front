import "./App.css";
import Home from "./Views/Home";
import NavMenu from "./Components/NavMenu";
import React from "react";

function App() {
  return (
    <div className="App">
      <div className="Wrapper">
        <NavMenu />
      </div>
    </div>
  );
}

export default App;

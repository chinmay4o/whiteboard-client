import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./HomePage";
import "./App.css";
import "./scss/style.css";

function App() {
  return (
    <>
      <Route exact path="/">
        <HomePage />
      </Route>
    </>
  );
}
export default App;

import React from "react";
import logo from "./logo.svg";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/chat" component={Chat} />
    </Router>
  );
}

export default App;

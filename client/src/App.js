import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Splash from "./pages/Splash";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={HomePage} />
      <Route path="/login" component={Splash} />>
    </Switch>
  );
}

export default App;

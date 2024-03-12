import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/component/pages/Users";
import NewProduct from "./products/pages/NewProduct";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/products/new" component={NewProduct} exact />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

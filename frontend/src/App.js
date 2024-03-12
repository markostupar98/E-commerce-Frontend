import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/component/pages/Users";
import NewProduct from "./products/pages/NewProduct";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/products/new" component={NewProduct} exact />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

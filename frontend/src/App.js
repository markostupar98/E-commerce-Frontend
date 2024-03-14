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
import UserProducts from "./products/pages/UserProducts";
import { UpdateProduct } from "./products/components/UpdateProduct";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:userId/products" exact component={UserProducts} />
          <Route path="/products/new" component={NewProduct} exact />
          <Route path="/products/:productId" component={UpdateProduct} />

          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

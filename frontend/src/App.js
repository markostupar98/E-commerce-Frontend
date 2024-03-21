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
import { Auth } from "./user/component/pages/Auth.js";
import { AuthContext } from "./shared/components/context/AuthContext";
import { useAuth } from "./shared/components/hooks/authHook.js";
import Footer from "./shared/components/Navigation/Footer.js";

function App() {
  const { token, login, logout, userId } = useAuth();
  // Routes...

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route
          path="/:userId/products"
          exact
          render={(props) => <UserProducts {...props} userId={userId} />}
        />
        <Route path="/products/new" component={NewProduct} exact />
        <Route path="/products/:productId" component={UpdateProduct} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/products" exact component={UserProducts} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

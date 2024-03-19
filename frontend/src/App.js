import React, { useState, useCallback } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/products" exact render={(props) => <UserProducts {...props} userId={userId} />} />
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
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

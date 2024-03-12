import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/products">My products</NavLink>
      </li>
      <li>
        <NavLink to="/products/new">Add product</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
};
export default NavLinks;

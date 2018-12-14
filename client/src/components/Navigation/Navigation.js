import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/"  activeStyle={{
              fontWeight: "bold",
              color: "brown",
              textDecoration: "none"
            }}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/presentations" activeStyle={{
              fontWeight: "bold",
              color: "brown",
              textDecoration: "none"
            }}>
            Presentations
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/presentations/addPresentation"
            activeStyle={{
              fontWeight: "bold",
              color: "brown",
              textDecoration: "none"
            }}>
            Add Presentations
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

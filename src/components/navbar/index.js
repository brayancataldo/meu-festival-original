import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      {/* <Link to="/home" className="aba">
        Home
      </Link> */}
      <Link to="/my-festival" className="aba">
        My Festival
      </Link>
      <Link to="/linear-gradient" className="aba">
        Gerador Linear-Gradient
      </Link>
      <Link to="/paleta" className="aba">
        Gerador de paleta
      </Link>
    </div>
  );
};

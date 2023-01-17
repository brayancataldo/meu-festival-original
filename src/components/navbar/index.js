import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import LogoMeuFestival from "../../assets/LogoMeuFestival.png";

export const Navbar = ({ name, image, url }) => {
  const isLogged = !!window.sessionStorage.getItem("token");
  const logout = () => {
    window.sessionStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/" className="aba">
        <img src={LogoMeuFestival} className="main-logo" />
      </Link>
      {/* <Link to="/home" className="aba">
        Home
      </Link> */}
      <a href={url} className="aba">
        CRIAR MEU LINE
      </a>
      {/* <Link to="/my-festival" className="aba">
        CRIAR MEU LINE
      </Link> */}

      <button
        className="aba"
        // to={`/profile/${id}`}
      >
        <h4>{name}</h4>
        {image != "" ? (
          <img src={image} className="profile-picture" alt={name} />
        ) : null}
      </button>
      {isLogged ? (
        <button onClick={logout} className="aba">
          SAIR
        </button>
      ) : null}
    </div>
  );
};

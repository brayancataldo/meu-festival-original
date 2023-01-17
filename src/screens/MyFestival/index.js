import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import SpotifyLogo from "../../assets/Spotify_Logo_RGB_White.png";
import LogoRTM from "../../assets/LogoRTM.png";
import SpotifyIcon from "../../assets/Spotify_Icon_RGB_White.png";
import html2canvas from "html2canvas";
import { Navbar } from "../../components/navbar";

export const MyFestival = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read&=user-read-email";
  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [user, setUser] = useState({});
  const exportRef = useRef();
  const connectSpotifyUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  useEffect(() => {
    setToken(window.sessionStorage.getItem("token"));
  }, [window.sessionStorage.getItem("token")]);

  const handleUsersData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            limit: 36,
          },
        }
      );
      const array = data.items.map((item, index) => {
        return {
          ...item,
          color:
            index % 3 == 0 ? "#F7C500" : index % 2 == 0 ? "#5BDC2F" : "#6582F0",
        };
      });
      setTopArtists(array);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserProfile = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    handleUserProfile();
    handleUsersData();
  }, [token]);

  function saveAs(uri, filename) {
    var link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  const exportImage = async () => {
    html2canvas(document.getElementById("poster"), {
      logging: true,
      letterRendering: 1,
      allowTaint: true,
      useCORS: true,
      backgroundColor: "black",
    }).then(function (canvas) {
      saveAs(canvas.toDataURL(), "MeuFestival.png");
    });
  };

  const exportImage2 = async () => {
    html2canvas(document.querySelector(".poster")).then((canvas) => {
      let poster = document.getElementById("poster");
      poster.style.width = "480px";
      let imgSrc = canvas.toDataURL();
      console.log("teste");
      // parseBase64ToString(imgSrc);
      // return;
      poster.src = imgSrc;
      poster.style.backgroundImage = imgSrc;

      let link = document.createElement("a");

      link.href = imgSrc;
      link.download = imgSrc;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    });
  };

  return (
    <div>
      <div className="container-page">
        <div className="container-festival">
          <div className="header">
            <Navbar
              name={user.display_name}
              image={user.images ? user.images[0].url : ""}
              id={user.id}
              url={connectSpotifyUrl}
            />
            {/* <div className="nav-buttons">
                <button onClick={logout} style={{ background: "#f43f5e" }}>
                  Trocar de Conta
                </button>
                <button onClick={logout} style={{ background: "#f43f5e" }}>
                  Sair
                </button>
              </div> */}
            {/* <div className="menu-hamburger">icon</div> */}
            <h2>Line-up dos Sonhos </h2>
            <p>
              Já pensou em ir no festival feito para você? Descubra agora como
              seria o seu Line-up dos Sonhos!
            </p>
          </div>

          {token ? (
            <div className="poster" id="poster" ref={exportRef}>
              <div className="poster-names">
                {topArtists
                  ? topArtists.map((each, index) => {
                      const firsts = index <= 1;
                      const handleNotTiny = index > 10 ? 14 : 26 - index + "px";
                      const fontSize = firsts ? 36 : handleNotTiny;
                      return (
                        <a
                          title={`Ir para ${each.name} no Spotify`}
                          href={`https://open.spotify.com/artist/${each.id}`}
                          target="_blank"
                          rel="noreferrer"
                          key={index}
                          className="text"
                          style={{
                            color: each.color,
                            fontSize: fontSize,
                          }}
                        >
                          {each.name.toUpperCase()}
                        </a>
                      );
                    })
                  : null}
              </div>
              <a href="https://spotify.com/" target="_blank" rel="noreferrer">
                <img
                  src={SpotifyLogo}
                  className="spotify-icon"
                  alt="Ir para Spotify"
                />
              </a>
            </div>
          ) : null}
          <div className="footer">
            <a
              href="https://www.rockthemountain.com.br/"
              className="aba"
              target="_blank"
              rel="noreferrer"
            >
              <img src={LogoRTM} className="logo-rtm" />
            </a>
            {!token ? (
              <a
                className="aba"
                href={connectSpotifyUrl}
                style={{ background: "#1DB954" }}
              >
                Entrar com Spotify
                <img
                  src={SpotifyIcon}
                  className="spotify-icon"
                  alt="Entrar com Spotify"
                />
              </a>
            ) : (
              <button
                onClick={exportImage}
                style={{ background: "#1DB954" }}
                className="aba"
              >
                Baixar imagem
              </button>
            )}
            <a
              href="https://spotify.com/"
              className="aba"
              target="_blank"
              rel="noreferrer"
              alt="go to Spotify"
            >
              <img src={SpotifyLogo} className="spotify-logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

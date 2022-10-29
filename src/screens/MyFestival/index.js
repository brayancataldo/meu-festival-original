import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import SpotifyLogo from "../../assets/Spotify_Logo_RGB_White.png";
import SpotifyIcon from "../../assets/Spotify_Icon_RGB_White.png";
import html2canvas from "html2canvas";

export const MyFestival = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";
  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const exportRef = useRef();

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

  const logout = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
  };

  const handleUsersData = async () => {
    if (!token) return;
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

  useEffect(() => {
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
            <h1>Meu Festival</h1>
            {/* <div className="nav-buttons">
                <button onClick={logout} style={{ background: "#f43f5e" }}>
                  Trocar de Conta
                </button>
                <button onClick={logout} style={{ background: "#f43f5e" }}>
                  Sair
                </button>
              </div> */}
            {/* <div className="menu-hamburger">icon</div> */}
            <h2>Line-up dos Sonhos</h2>
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
                          title={`Go to ${each.name} on Spotify`}
                          href={`https://open.spotify.com/artist/${each.id}`}
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
              <a href="https://spotify.com/">
                <img src={SpotifyLogo} className="spotify-icon" />
              </a>
            </div>
          ) : null}
          <div className="footer">
            {!token ? (
              <button
                className="spotify-button"
                onClick={() => {
                  window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
                }}
                style={{ background: "#22c55e" }}
              >
                Entrar com Spotify
                <img src={SpotifyIcon} className="spotify-icon" />
              </button>
            ) : (
              <button onClick={exportImage} style={{ background: "#1DB954" }}>
                Baixar imagem
              </button>
            )}
            <a href="https://spotify.com/">
              <img src={SpotifyLogo} className="spotify-logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import { exportComponentAsPNG } from "react-component-export-image";

export const MyFestival = () => {
  const CLIENT_ID = "09edae12570e41b3960d27508c9f81d3";
  const REDIRECT_URI = "http://localhost:3000";
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
            limit: 40,
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

  const exportImage = () => {
    exportComponentAsPNG(exportRef, {
      fileName: "MyFestival",
    });
  };

  return (
    <div>
      <div className="container-home">
        <div className="column">
          <h1>Line-up dos Sonhos</h1>
          <p>
            Já pensou em ir no festival feito para você? Descubra agora como
            seria o seu Line-up dos Sonhos!
          </p>
        </div>
        <div>
          {!token ? (
            <button
              onClick={() => {
                window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
              }}
              style={{ background: "#22c55e" }}
            >
              Conectar Spotify
            </button>
          ) : (
            <div className="container-painel">
              <div className="image" ref={exportRef}>
                <div className="painel">
                  {topArtists
                    ? topArtists.map((each, index) => {
                        const fontSize = index > 20 ? 12 : 30 - index + "px";
                        return (
                          <text
                            key={index}
                            className="text"
                            style={{
                              color: each.color,
                              fontSize: fontSize,
                            }}
                          >
                            {each.name.toUpperCase()}
                          </text>
                        );
                      })
                    : null}
                </div>
              </div>
              <button onClick={exportImage} style={{ background: "#22c55e" }}>
                Download
              </button>
              {/* <button onClick={logout} style={{ background: "#f43f5e" }}>
                Logout
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

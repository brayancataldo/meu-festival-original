import React, { useState, useRef, useEffect } from "react";
import "../../global/global.css";
import { Navbar } from "../../components/navbar";
import { ChromePicker } from "react-color";

export const LinearGradient = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false);
  const [code, setCode] = useState();
  const [angulo, setAngulo] = useState("45");
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  const [primeiraCor, setPrimeiraCor] = useState("#ffd100");
  const [segundaCor, setSegundaCor] = useState("#fe5d9f");
  const [aniScaleUp, setAniScaleUp] = useState();

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copiado!");
    setTimeout(() => setCopySuccess(""), 2500);
  }

  function inverterLados() {
    setPrimeiraCor(segundaCor);
    setSegundaCor(primeiraCor);
  }

  useEffect(() => {
    setCode(
      `background-image: linear-gradient(${angulo}deg, ${primeiraCor}, ${segundaCor})`
    );
    return () => {};
  }, [angulo, primeiraCor, segundaCor]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClick2 = () => {
    setDisplayColorPicker2(!displayColorPicker2);
  };

  const handleChangeComplete = (data) => {
    if (data.hsl !== primeiraCor) {
      setPrimeiraCor(data.hex);
    }
  };
  const handleChangeComplete2 = (data) => {
    if (data.hsl !== primeiraCor) {
      setSegundaCor(data.hex);
    }
  };

  useEffect(() => {
    setAniScaleUp("scale-up-center");
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <button onClick={handleClick}>Cor 1</button>
          {displayColorPicker ? (
            <div style={{ position: "absolute" }}>
              <ChromePicker
                color={primeiraCor}
                onChange={handleChangeComplete}
              />{" "}
            </div>
          ) : null}
          <button onClick={handleClick2}>Cor 2</button>
          {displayColorPicker2 ? (
            <div style={{ position: "absolute" }}>
              <ChromePicker
                color={segundaCor}
                onChange={handleChangeComplete2}
              />{" "}
            </div>
          ) : null}
        </div>
        <div>
          <div
            id="box1"
            className={aniScaleUp}
            style={{
              backgroundImage: `linear-gradient(${angulo}deg, ${primeiraCor}, ${segundaCor})`,
            }}
          />
          <button onClick={inverterLados}> Inverter Cores</button>
        </div>
        <div>
          <input
            className="input"
            placeholder="Ângulo"
            onChange={(e) => setAngulo(e.target.value)}
          ></input>
          <form>
            <textarea ref={textAreaRef} value={code} id="code" />
          </form>
          <button onClick={copyToClipboard}>Copiar</button>
          {copySuccess}
        </div>
      </div>
    </>
  );
};

import React, {useState, useEffect, useRef} from 'react'
import { Navbar } from '../../components/navbar'
import { ChromePicker } from 'react-color';
import '../../global/global.css'

export const Paleta = () => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    
      const [color1, setColor1] = useState("#043696");
      const [color2, setColor2] = useState("#1F6CF9");
      const [color3, setColor3] = useState("#9CBDFC");
      const [color4, setColor4] = useState("#FFFFFF");
      const [aniScaleUp, setAniScaleUp] = useState();
      const [copySuccess, setCopySuccess] = useState('');
    
      const handleChangeComplete = data => {

        function hslToHex(h, s, l) {
          l /= 100;
          const a = s * Math.min(l, 1 - l) / 100;
          const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
          };
          return `#${f(0)}${f(8)}${f(4)}`;
        }

        if (data.hsl !== color1) {
          setColor1(data.hex)
          setColor2(hslToHex(Math.round(data.hsl.h).toFixed(2), Math.round(data.hsl.s * 100).toFixed(2), (data.hsl.l.toFixed(2) * 100) + 25 ))
          setColor3(hslToHex(Math.round(data.hsl.h).toFixed(2), Math.round(data.hsl.s * 100).toFixed(2), (data.hsl.l.toFixed(2) * 100) + 50 ))
          setColor4(hslToHex(Math.round(data.hsl.h).toFixed(2), Math.round(data.hsl.s * 100).toFixed(2), (data.hsl.l.toFixed(2) * 100) + 75 ))
        }
      };

      useEffect(() => {
        setAniScaleUp("scale-up-center");
      }, [])

      function handleClick(){
        setDisplayColorPicker(!displayColorPicker);
      }

    return (
        <>
        <Navbar> </Navbar>
        <div className="container"> 
        <div className="container2">
          <div>
      <div className={aniScaleUp} id="box2" style={{background: color1, cursor: "pointer"}} onClick={ handleClick } />
      <div>{color1}<Copy toCopy={color1}/></div>
      </div>
      <div>
      <div className={aniScaleUp} id="box2" style={{background: color2}} />
      <div>{color2}<Copy toCopy={color2}/></div>
      </div>
      <div>
      <div className={aniScaleUp} id="box2" style={{background: color3}} />
      <div>{color3}<Copy toCopy={color3}/></div>
      </div>
      <div>
      <div className={aniScaleUp} id="box2" style={{background: color4}} />
      <div>{color4}<Copy toCopy={color4}/></div>
      </div>
      </div>
      { displayColorPicker ? <div style={{position: "absolute"}}> <ChromePicker color={color1} onChange={handleChangeComplete} /> </div>  : null }
      </div>
        </>
    )
}

export const Copy = (props) => {
  return (
      <svg onClick={() => {navigator.clipboard.writeText(props.toCopy)}} id="copyIcon" color="#c7c7c7" style={{width: "20px", height: "20px"}} aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" class="svg-inline--fa
       fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 
       48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 
       48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 
       26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 
       10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.
       368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
  )
}
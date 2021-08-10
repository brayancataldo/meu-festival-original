import React, {useState} from 'react'
import { Navbar } from '../../components/navbar'
import { ChromePicker } from 'react-color';

export const Paleta = () => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const [background, setBackground] = useState({
        h: 250,
        s: 0,
        l: 0.2,
        a: 1
      });
      const [opacityBg, setOpacityBg] = useState("1");
      const [colorPreview, setColorPreview] = useState("#333333");
      const [colorPreview2, setColorPreview2] = useState({
        h: 250,
        s: 300,
        l: 0.2,
        a: 0.3
      });
    
      const handleChangeComplete = data => {
        if (data.hsl !== background) {
          setColorPreview(data.hex);
          setBackground(data.hsl);
          setColorPreview2({
              h: data.hsl.h,
              s: data.hsl.s,
              l: (data.hsl.l - data.hsl.l/ 10),
              a: 1
            })
        //   setOpacityBg(data.hsl.a);
        }
      };

      const previewStyle = {
        background: colorPreview,
        // opacity: opacityBg,
        width: "50px",
        height: "50px"
      };

      const previewStyle2 = {
        background: colorPreview2,
        // opacity: opacityBg,
        width: "50px",
        height: "50px"
      };

      // h = the hue
      // s = the saturation
      // l = the lightness

    return (
        <>
        <Navbar> </Navbar>
        <div style={{backgroundColor: "rgb(42, 0, 255, 1)", width: "100px", height: "100px"}}> 
        </div>
        <div style={{backgroundColor: "rgb(100, 72, 255, 1)", width: "100px", height: "100px"}}> 
        </div>
        <div style={{backgroundColor: "rgb(130, 112, 255, 1)", width: "100px", height: "100px"}}> 
        </div>
        <div>
        <div>
            <ChromePicker color={background} onChange={handleChangeComplete} /> </div>
        </div>
        <div>
      <br />
      <p>Color Preview</p>
      <div style={previewStyle} />
      <br />
      <div style={previewStyle2} />
    </div>
        </>
    )
}
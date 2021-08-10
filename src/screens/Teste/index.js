import React, {useState} from 'react'
import { ChromePicker } from 'react-color';

export const Teste = () => {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
      };
    
      const handleClose = () => {
        setDisplayColorPicker(false);
      };
    
      const popover = {
        position: 'absolute',
        zIndex: '2',
      }
      const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }

    return (
        <div>
        <button onClick={ handleClick }>Pick Color</button>
        { displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ handleClose }/>
          <ChromePicker />
        </div> : null }
      </div>
    )
}
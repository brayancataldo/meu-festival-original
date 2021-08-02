import React,{useState, useRef, useEffect} from 'react'
import './styles.css'
import { Navbar } from '../../components/navbar'

export const LinearGradient = () => {

    const [cor1, setCor1] = useState("ffd100");
    const [cor2, setCor2] = useState("fe5d9f");
    const [code, setCode] = useState();
    const [angulo, setAngulo] = useState("45");
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copiado!');
      };

    function inverterLados(){
        setCor1(cor2);
        setCor2(cor1);
    }

    useEffect(() => {
        setCode(`background-image: linear-gradient(${angulo}deg, #${cor1}, #${cor2})`);
        return () => {
        }
    }, [cor1, cor2, angulo])


    return (
        <>
        <Navbar></Navbar>
        <div className="container"> 
        <div>
           <input className="input" placeholder="Cor 1" onChange={e => setCor1(e.target.value)} ></input>
            <div className="box1" style={{backgroundImage: `linear-gradient(${angulo}deg, #${cor1}, #${cor2})` }}/>
            <input className="input" placeholder="Cor 2" onChange={e => setCor2(e.target.value)} ></input>
            <button onClick={inverterLados}> Inverter Cores</button>
        </div>
        <div>
        <input className="input" placeholder="Ângulo" onChange={e => setAngulo(e.target.value)} ></input>
        <form>
        <textarea
          ref={textAreaRef}
          value={code}
        />
      </form>
        <button onClick={copyToClipboard}>Copiar</button> 
          {copySuccess}
          </div>
          
        </div>

        </>
    )
}


import { ChangeEvent, useEffect, useState } from 'react';
import io,{Socket} from 'socket.io-client';
import { QRCodeCanvas } from 'qrcode.react';
import { ApplicationInterface } from 'types';

let socket: Socket| undefined;

const Home = () => {
  useEffect(() => {socketInitializer()}, []);
  
  const [useNumber, setNumber] = useState<string>('');
  const [useInfo, setInfo] = useState<ApplicationInterface>();

  function changeNumber(e: ChangeEvent<HTMLInputElement>){
    const number = e.target.value;
    setNumber(number);
    socket?.emit("onChangeNumber", number);
  }

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()
    

    socket.on('connect', () => {
      console.log('connected')
    });

    socket.on("info",(info: ApplicationInterface)=> {
      setInfo(info);
    })
    
    socket.on("msg",(text: string) => {
      console.log(text);
    });
  }

  return <>
 <QRCodeCanvas
      id="qrCode"
      value={useInfo?.qrcode || ""}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
    <div className="inputGroup">
      <label htmlFor="number">Number</label>
      <input 
        onChange={changeNumber}
        value={useNumber}
         type="text" name="" id="number" />
    </div>
    <p>Application started: <br/> 
    {'>'} {`${useInfo?.started}`}</p>
  </>
}

export default Home;
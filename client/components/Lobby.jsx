import React, { useState, useEffect } from 'react';

const Lobby = props => {
  const [ text, setText ] = useState('You are alone');
  useEffect(() => {
    const mySocket = io();
    mySocket.on('connect', () => {
      mySocket.emit('intro', props.user.name); //result is length 1 => you're alone 
    });
    mySocket.on('message', (msg) => {
      console.log(msg);
    });
    mySocket.on('count', (count)=>{
      if (count === 2) {
        setText('Someone joined. We are about to start');
        props.setDisplay(2)
      }
    })
    props.setSocket(mySocket);
  }, []);

  return (
    <div>
      <p>Logged in as: {props.user.name}</p>
      <p>{text}</p>
    </div>
  );
}

export default Lobby;
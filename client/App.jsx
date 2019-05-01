import React, { useState } from 'react';

import Play from './components/Play.jsx';
import Login from './components/Login.jsx';
import Lobby from './components/Lobby.jsx';

import './styles.css';

const App = (props) => {
  const [display, setDisplay] = useState(0);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  switch (display) {
    case 0:
      return (
        <div>
          <Login {...{user, setUser, setDisplay}} />
        </div>
      )
    case 1:
      return (
        <div>
          <Lobby {...{user, socket, setSocket, setDisplay}} />
        </div>
      )
    case 2:
      return (
        <div>
          <Play socket={socket} />
        </div>
      )
    default:
      return null;
  }
  
}

export default App;
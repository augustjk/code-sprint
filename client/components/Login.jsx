import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useInput } from './hooks';

const Login = props => {
  const [ username, usernameOnChange ] = useInput('');
  const [ password, passwordOnChange ] = useInput('');

  const [ username1, usernameOnChange1 ] = useInput('');
  const [ password1, passwordOnChange1 ] = useInput('');

  const handleLogIn = e => {
    e.preventDefault();
    if (username && password){
      Axios.post('/login', { username, password })
      .then((resp)=> {
        console.log('resp after signIn', resp.data);
        props.setUser(resp.data);
        props.setDisplay(1);
      })
      .catch(err => console.log(err))
    }
  }

  const handleSignUp = e => {
    e.preventDefault();
    if (username1 && password1){
      Axios.post('/signup', { username: username1, password: password1 })
      .then((resp)=> {
        console.log('resp after sign up', resp.data);
        props.setUser(resp.data);
        props.setDisplay(2);
      })
      .catch(err => console.log(err))
    }
  }
  
  return (
    <div>
      <h1 id="title">Code Sprint</h1>
      <h2>Log in.</h2>
      <form onSubmit={handleLogIn}>
        <input className="input" type="text" placeholder="username" value={username} onChange={usernameOnChange}/>
        <input className="input" type="password" placeholder="password"value={password} onChange={passwordOnChange}/>
        <button type="submit">Log In</button>
      </form>
      <h2>Or Sign up.</h2>
      <form onSubmit={handleSignUp}>
        <input className="input" type="text" placeholder="username" value={username1} onChange={usernameOnChange1}/>
        <input className="input" type="password" placeholder="password"value={password1} onChange={passwordOnChange1}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Login;
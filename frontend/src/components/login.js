import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../LoginPage.css';
import axios from 'axios'
// import jwtDecode from 'jwt-decode'
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!username.trim() || !password.trim()){
        alert("Please enter Credentials");
        return;
    }
    try{
        const response=await axios.post('/login',{username,password});
        sessionStorage.setItem('access_token',response.data.access_token)
        if(response.status===200){
            alert('successful login')
            navigate('/home')

        }
        else{
            alert('invalid login')
        }
    }
    catch(error){
        console.log(error)
        alert('invalid login')
    }
    // TODO: Add login logic here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
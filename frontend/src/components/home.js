import {useNavigate} from 'react-router-dom';
import React,{useEffect,useState} from 'react';
// import axios from 'axios'
// import jwtDecode from 'jwt-decode'
// import 'bootstrap/dist/css/bootstrap.css'
// import { Button } from 'react-bootstrap'
import image from '../assests/police_logo.jpg';
import '../App.css';

function App() {
  const[user,setUser]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    const token=sessionStorage.getItem('access_token');
    if(token!=null){
      fetch('/protected',{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then((data)=>{
        setUser(data.name)
        if(data.status===200){
          // alert('welocome '+user)
        }
        else{
          navigate('/login')
        }
      })
      .catch((error)=>{
        console.error(error)
      })
    }else{
      navigate('/login')
    }
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="logo" />
        <p>
          Telangana State Police
          Welcome  {user}
        </p>
        <form>

        <button type="submit" value="register" className="submit-button"  onClick={()=>navigate('/register', { replace: true })} >Register Vechicle</button>
        
        <br></br>
        <button type="submit" value="challen" className="submit-button"><a href={"http://192.168.29.128:5000/detect"}>Book challan</a></button>
        </form>

        
      </header>
      
    
    </div>
   
  );
}

export default App;
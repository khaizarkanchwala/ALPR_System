import {useNavigate} from 'react-router-dom';
import React from 'react';
// import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.css'
// import { Button } from 'react-bootstrap'
import image from '../assests/police_logo.jpg';
import '../App.css';

function App() {
  const navigate=useNavigate();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="logo" />
        <p>
          Telangana State Police
        </p>
        <form>

        <button type="submit" value="register" className="submit-button"  onClick={()=>navigate('/register', { replace: true })} >Authority Login</button>
        
        <br></br>
        <button type="submit" value="challen" className="submit-button"  onClick={()=>navigate('/check', { replace: true })}>Check Challan</button>
        </form>

        
      </header>
      
    
    </div>
   
  );
}

export default App;
import {useNavigate, useParams} from 'react-router-dom';
import React, { useState,useEffect } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import { CSSProperties } from 'react';
// import * as ReactNootstrap from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
// import { Button } from 'react-bootstrap'
// import '../App.css';
import "../register.css"
function Offence() {
  const[user,setUser]=useState(null);
  const [offence, setOffence] = useState("");
  const [loading,setLoading]=useState(0);
  let {_id}=useParams()
  let {proof}=useParams()
  const navigate=useNavigate();
  const onChangeoffenceHandler = (event) => {
    setOffence(event.target.value);
  };

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

  const handleSubmit = async(event) => {
    setLoading(1)
    const data={
      vehicalno:_id,
      offence:offence,
      offence_proof:proof,
      challan_booked_by:user,
    };
    const res= await fetch("/raisechallan",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
     })
     const datastat=await res.json()
     if(datastat.status===422 ){
        alert("Vehical info not found")
        navigate('/register')
     }
     else{
        alert("challan sent successfully")
        navigate('/home')
     }
  }
  if(!loading){
  return(
    <div className="registration-container">
      <h1 className="h1">Vehicle Registration</h1>
      <p>{_id}</p>
      <img src={process.env.PUBLIC_URL+`/assets/upload/${proof}`} alt="" height="200" width="200"/>
      <div className="registration-container">
        <label>Select the Offence:</label>
        <select
          className="textInput"
          type="text"
          value={offence}
          onChange={onChangeoffenceHandler}
          required
        >
          <option>--SelectOffence--</option>
          <option>WithoutHelmet</option>
          <option>RedLightJump</option>
          <option>WrongSide</option>
          <option>NoParking</option>
          <option>RashDriving</option>
        </select>
        </div>
      <div>
        <button type="submit" onClick={handleSubmit} disabled={loading} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
}
else{
  return (
    // <div className="registration-container">
    //   {/* <p>Loading<ClipLoader
    //     color={'orange'}
    //     loading={true}
    //     size={15}
    //     aria-label="Loading Spinner"
    //     data-testid="loader"
    //   /></p> */}
    // </div>
    <div className="registration-container">Loading...
    <div id='loop' className='center'></div>
      <div id="bike-wrapper" className="center" >
        <div id="bike" className='centerBike'></div>
      </div>
    </div>
  )
}
}

export default Offence;
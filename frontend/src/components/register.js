import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "../register.css"
export default function Register() {
  const[user,setUser]=useState(null);
  const [name, setName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate()
  const onChangeNameHandler = (event) => {
    setName(event.target.value);
  };
  const onChangeVehicleNumberHandler = (event) => {
    setVehicleNumber(event.target.value);
  };
  const onChangePhoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };
  const onChangeAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const onChangeEmailHandler = (event) => {
    setEmail(event.target.value);
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
    event.preventDefault();
    if(!name.trim() || !vehicleNumber.trim() || !phoneNumber.trim() || !address.trim() || !email.trim()){
      alert("NO FIELDS CAN BE EMPTY");
      return;
  }
    const data={
      ownername:name,
      vehicalno:vehicleNumber,
      phoneno:phoneNumber,
      address:address,
      email:email,
      registedred_by:user

    };
    const res= await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
     })
     const datastat=await res.json()
     if(datastat.status===422 ){
        alert("invalid registration")
     }
     else{
        alert("data registered by "+user)
        navigate('/home')
     }
  };

  return (
    <div className="registration-container">
      <h1 className="h1">Vehicle Registration</h1>
      <div className="registration-container">
        <label>Enter your name:</label>
        <input
          className="textInput"
          type="text"
          placeholder="abcd"
          value={name}
          onChange={onChangeNameHandler}
        />
      </div>
      <br/>
      <div className="registration-container">
        <label>Enter your Vehicle Number:</label>
        <input
          className="textInput"
          type="text"
          placeholder="AB01CD2345"
          value={vehicleNumber}
          onChange={onChangeVehicleNumberHandler}
        />
      </div>
      <br/>
      <div className="registration-container">
        <label>Enter your Phone Number:</label>
        <input
          className="textInput"
          type="text"
          placeholder="xxxxxxxxxx"
          value={phoneNumber}
          onChange={onChangePhoneNumberHandler}
        />
      </div>
      <br/>
      <div className="registration-container">
        <label>Enter your Address:</label>
        <input
          className="textInput"
          type="text"
          placeholder="abcd"
          value={address}
          onChange={onChangeAddressHandler}
        />
      </div>
      <br/>
      <div className="registration-container">
        <label>Enter your Email:</label>
        <input
          className="textInput"
          type="text"
          placeholder="abcd@gmail.com"
          value={email}
          onChange={onChangeEmailHandler}
        />
      </div>
      <br/>
      <div>
        <button type="submit" onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
}
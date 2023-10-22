// Importing modules
import React, { useState} from "react"; 
// import image from "../assets/upload/AP1.jpg"
// import {useNavigate} from 'react-router-dom';
import "../App.css"
import "../DataTable.css"
function Home() {
    const [License,setLicense]=useState();
    const [dataList,setDatalis]=useState([])
    // const navigate=useNavigate()
    // const [preview,setPreview]=useState()
    // useEffect(()=>{
    //     if(!selectedFile) return;
    //     let temp=URL.createObjectURL(selectedFile)
    //     const objectUrls=temp;
    //     setPreview(objectUrls)
    //     return()=>{
    //     URL.revokeObjectURL(objectUrls)
    //     }
    // },[selectedFile])
    const handletextChange=(e)=>{
        setLicense(e.target.value)
    };
    const handleSubmit=async()=>{
        const datalis={
            licenseno:License,
          };
        if(!License){
            alert("Please select image");
            return;
        }
        try{
            const response=await fetch("/checkchallans",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify(datalis)
            });
            const data=await response.json()
            const status=data.status
            if(status===402){
                alert("No Challans on your vehicalno:"+License)
                // navigate('/check')
            }
            else{
            setDatalis(data)
            console.log(dataList)
            }
        }
            catch(error){
                console.error("Error while uploading:",error);
                alert(error)
            }
        }
  
    return (
        <div className="App">
            <input type="text" onChange={handletextChange}/>
            <button onClick={handleSubmit}>Upload</button>
            <div>
            <table className="data-table">
      <thead>
        <tr>
          <th>Vehical No</th>
          <th>Owner Name</th>
          <th>Offence</th>
          <th>Date and time</th>
          <th>Proof</th>
        </tr>
      </thead>
      <tbody>
        {dataList.map((item) => (
          <tr key={item.id}>
            <td>{item.lc_number}</td>
            <td>{item.ownername}</td>
            <td>{item.offence}</td>
            <td>{item.datetime_of_offence}</td>
            <td><img src={process.env.PUBLIC_URL+`/assets/upload/${item.proof}`} alt="" loading="lazy" width="200" height="200"/></td>
          </tr>
        ))}
      </tbody>
    </table>
            </div>
        </div>
    );
}
  
export default Home;
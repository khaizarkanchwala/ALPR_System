// Importing modules
import React, { useState} from "react"; 
import {useNavigate} from 'react-router-dom';
// import image from "../assets/upload/AP1.jpg"
import "../App.css"
function Home() {
    const navigate=useNavigate();
    const [selectedFile,setSelectedFile]=useState();
    const [file,setFilename]=useState()
    // const [preview,setPreview]=useState()
    const [total,setTotal]=useState([])
    const [text,setText]=useState([])
    let arr=Array.apply(null,{length:total}).map(Number.call,Number)
    // useEffect(()=>{
    //     if(!selectedFile) return;
    //     let temp=URL.createObjectURL(selectedFile)
    //     const objectUrls=temp;
    //     setPreview(objectUrls)
    //     return()=>{
    //     URL.revokeObjectURL(objectUrls)
    //     }
    // },[selectedFile])
    const handleFileChange=(e)=>{
        setSelectedFile(e.target.files[0])
    };
    const handleUpload=async()=>{
        if(!selectedFile){
            alert("Please select image");
            return;
        }
        const formData=new FormData();
        formData.append("file",selectedFile);
        try{
            const response=await fetch("/upload",{
                method:"POST",
                body:formData,
            });
            const data=await response.json()
            setFilename(data.upload_image)
            setTotal(data.detectno)
            setText(data.output)
            if(response.ok){
                alert("Image uploaded successful");
            }else{
                alert("Upload failed");
            }
        }
            catch(error){
                console.error("Error while uploading:",error);
                alert(error)
            }
        }
  
    return (
        <div className="App">
            <input type="file" accept="image/*" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload</button>
            <div>
                <table>
                    <tr>
                        <td>
                            <img src={process.env.PUBLIC_URL+`/assets/upload/${file}`} alt="" loading="lazy"/>
                        </td>
                        <td>
                            {arr.map(item=>{
                                return(<div>
                                    <p>{text[item]}</p>
                                    {/* <img src={process.env.PUBLIC_URL+`/assets/predict_numberplate/${item+file}`} alt="" loading="lazy" width="200" height="200"/> */}
                                    <img src={process.env.PUBLIC_URL+`/assets/plates/${item+file}`} alt="" loading="lazy" width="200" height="200"/>
                                    <button type="submit" value="challen" className="submit-button"  onClick={()=>navigate(`/offence/${text[item]}`, { replace: true })}>Book challen</button>
                                    </div>)
                            })}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
  
export default Home;
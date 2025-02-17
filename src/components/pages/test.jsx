import { useState } from "react"

export default function FileUploadTest(){

    const[file,setFile]= useState(null);
    function handleUpload(){
        if(!file){
            alert("please select a file")
            return;
        }
        console.log(file);
    }

    return(
       <div>
        <h4>File Upload test</h4>
        <input type="file" onChange={(e)=>{
            setFile(e.target.files[0])
        }}/>
        <button onClick={handleUpload}>Upload</button>
       </div> 
    )
}
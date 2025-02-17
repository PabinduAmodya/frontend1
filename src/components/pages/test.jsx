import { useState } from "react"

export default function FileUploadTest(){

    const[file,setFile]= useState(null)
    return(
       <div>
        <h1>File Upload test</h1>
        <input type="file" onChange={()=>{
            setFile(e.target.files[0])
        }}/>
        <button>Upload</button>
       </div> 
    )
}
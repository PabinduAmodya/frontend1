import { createClient } from "@supabase/supabase-js";
import { useState } from "react"

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpYXFmYXRudnNxaGxwaXBpaGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1OTY1MTEsImV4cCI6MjA1NTE3MjUxMX0.ZjXdyfRJXw1RZ2vqftjlFjRG7c6zltrUzV9tFXstfs0


`

const url="https://biaqfatnvsqhlpipihaf.supabase.co"


export default function FileUploadTest(){

    const[file,setFile]= useState(null);
    function handleUpload(){
        if(!file){
            alert("please select a file")
            return;
        }
        console.log(file);

        const fileName = file.name
        const extension =fileName.split(".")[fileName.split(".").length-1]

        if(extension != "jpg" && extension != "png"){
            alert("Please select a jpg or png file")
            return
        }

        const supabase = createClient(url,key)

        supabase.storage.from("images").upload(file.name,file,{
            cacheControl : "3600",
            upsert : false
        }).then((res)=>{
            console.log(res)
            
        })
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
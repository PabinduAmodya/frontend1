import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpYXFmYXRudnNxaGxwaXBpaGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1OTY1MTEsImV4cCI6MjA1NTE3MjUxMX0.ZjXdyfRJXw1RZ2vqftjlFjRG7c6zltrUzV9tFXstfs0
`

const url="https://biaqfatnvsqhlpipihaf.supabase.co"

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }
    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    const timestamp = new Date().getTime();

    fileName = timestamp +file.name+ "." + extension;

    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(()=>{
      const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
      resolve(publicUrl);
    }).catch((err)=>{
      reject(err);
    });
  });
}



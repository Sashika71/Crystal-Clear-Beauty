import { createClient } from "@supabase/supabase-js";

// 👇 Replace with your own Supabase project credentials
const supabase = createClient(
  "https://etdyszvaxlxjmtcmtmzw.supabase.co",  // Your Supabase project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZHlzenZheGx4am10Y210bXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDIzNTYsImV4cCI6MjA3NzkxODM1Nn0.RRGAw7ICj5O4pKDbdUopc-0Ti3ELkHj9E4YERnKDxRI"                // Your Supabase anon/public key
);

export default function mediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    }

    const timeStamp = new Date().getTime();
    const newFileName = timeStamp + file.name;

    // Upload the file to the Supabase "images" storage bucket
    supabase.storage
      .from("images")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const url = supabase.storage
          .from("images")
          .getPublicUrl(newFileName).data.publicUrl;

        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
}

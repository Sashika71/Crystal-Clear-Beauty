import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  "https://jgiwjcyhnpgvghuzecij.supabase.co",  // Your Supabase project URL (without /rest/v1/)
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaXdqY3lobnBndmdodXplY2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5OTYyMTMsImV4cCI6MjA5NDU3MjIxM30.uV1TTLhsyRMElR9aIPyyLzPY-HP7M5HHz20NQB5lXYg"                // Your Supabase anon/public key
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
      .from("Image")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const url = supabase.storage
          .from("Image")
          .getPublicUrl(newFileName).data.publicUrl;

        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
}

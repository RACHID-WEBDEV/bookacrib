import React, { useState } from "react";
import axios from "axios";

function DeleteImage({ publicId }) {
  const [status, setStatus] = useState("");

  const deleteImage = async () => {
    try {
      // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
      // Replace YOUR_API_KEY and YOUR_API_SECRET with your Cloudinary credentials
      const cloudName = "YOUR_CLOUD_NAME";
      const apiKey = "YOUR_API_KEY";
      const apiSecret = "YOUR_API_SECRET";

      // Cloudinary API URL for deleting images
      const url = ` https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

      // Base64 encode the API key and secret for Basic Auth
      const authHeader = "Basic " + btoa(`${apiKey}:${apiSecret}`);

      // Send the delete request
      const response = await axios.post(
        url,
        { public_id: publicId }, // Request body
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (response.data.result === "ok") {
        setStatus("Image deleted successfully");
      } else {
        setStatus("Failed to delete image");
      }
    } catch (error) {
      setStatus(`Error:${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={deleteImage}>Delete Image</button>
      <p>{status}</p>
    </div>
  );
}

export default DeleteImage;

// import { useState } from "react";

// import axios from "axios";
// // import cloudinary from "cloudinary/lib/cloudinary";
// import cloudinary from "cloudinary-react";

// cloudinary.config({
//   cloud_name: import.meta.env.VITE_CLOUD_NAME,
//   api_key: import.meta.env.VITE_API_KEY,
//   api_secret: import.meta.env.VITE_API_SECRET,
// });
// const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

// const TestImageApp = () => {
//   const [img, setImg] = useState("");
//   const [imageData, setimageData] = useState({ url: "", public_id: "" });

//   const updateImage = (e) => {
//     setImg(e.target.files[0]);
//   };

//   const uploadImage = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("file", img);
//     data.append("upload_preset", import.meta.env.VITE_PRESET_NAME);
//     data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
//     // data.append("folder", "your-folder-name");

//     try {
//       const resp = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         data
//       );
//       setimageData({ url: resp.data.url, public_id: resp.data.public_id });
//     } catch (err) {
//       console.log("errr : ", err);
//     }
//   };
//   const deleteImage = async (e) => {
//     e.preventDefault();
//     cloudinary.v2.uploader
//       .destroy(imageData.public_id, function (error, result) {
//         console.log(result, error);
//       })
//       .then((resp) => console.log(resp))
//       .catch((error) =>
//         console.log("Something went wrong, please try again later.", error)
//       );
//   };

//   return (
//     <>
//       <form>
//         <input
//           type="file"
//           onChange={updateImage}
//           className="form-control shadow-sm"
//           id="image"
//           name="image"
//           accept="image/*"
//         />
//         <button onClick={uploadImage}>Upload</button>
//         <button onClick={deleteImage}>Remove</button>
//       </form>
//     </>
//   );
// };

// export default TestImageApp;

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


const uploadOnCloudinary = async (imageURI) => {
    try {
        if (!imageURI) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(imageURI, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        return response;
    } catch (error) {
        return null;
    }
}



module.exports =  { 
    uploadOnCloudinary 
}
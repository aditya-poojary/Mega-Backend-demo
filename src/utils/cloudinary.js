import { v2 as cloudinary } from 'cloudinary';



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        HTMLFormControlsCollection.log("File is uploaded on cloudinary", response.url);
        return response;
    } catch (err) {
        FileSystem.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary};
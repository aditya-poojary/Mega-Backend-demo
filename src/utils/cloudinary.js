import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // console.log("File is uploaded on cloudinary", response.url);

        // Remove the locally saved temporary file after successful upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (err) {
        // Remove the locally saved temporary file even if upload failed
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

const deleteFileFromCloudinary = async (fileUrl) => {
    try {
        const parts = fileUrl.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        const publicId = fileNameWithExtension.split('.')[0];

        const folderPath = parts.slic(parts.indexOf('upload') + 1, parts, length - 1);
        const fullPublicId = folderPath ? `${folderPath}/${publicId}` : publicId;

        const result = await cloudinary.uploader.destroy(fullPublicId);
        return result;

    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting the file from cloudinary")
    }
}

export { uploadOnCloudinary, deleteFileFromCloudinary };
'use server'
import ImageKit from "imagekit";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageKit = new ImageKit({
  publicKey: "public_FGAiHAN4SFk1o+dSBfkt6RTDE20=",
  privateKey: "private_jZ1ajjFXZFqYB3UzaphTAyXg/X8=",
  urlEndpoint: "https://ik.imagekit.io/misbahul"
});

export const uploadImage = async (file: File) => {
  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: file.name,
    });
    
    if (!response || !response.url) {
      throw new Error("Failed to upload image");
    }
    
    return { url: response.url, fileId: response.fileId };
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (fileId: string) => {
  try {
    if(fileId){
      const response = await imageKit.deleteFile(fileId);
      if (!response) {
        throw new Error("Failed to delete image");
      }  
    }
    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export async function deleteVideo(videoId: string) {
  try {
    const response = await cloudinary.uploader.destroy(videoId, {
      resource_type: 'video',
    });
    console.log('Video deleted:', response);
    return response;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw new Error("Failed to delete video");
  }
}

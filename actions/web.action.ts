'use server'
import ImageKit from "imagekit";

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

'use client';
import React, { useState, } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { deleteImage, uploadImage } from '@/actions/web.action';
import { CloudUploadIcon, ImageIcon, Trash2Icon, RefreshCwIcon, CropIcon, ZoomInIcon } from 'lucide-react';
import { sleep, toBase64 } from '@/lib/utils';
import Loader from '../Loaders/Loader';
import { Button } from '../ui/button';
import { Image as TypeImage } from '@/types/web.types';
import { Slider } from '../ui/slider';

interface FormImageProps {
  image: TypeImage | null;
  setImage: React.Dispatch<React.SetStateAction<TypeImage | null>>;
  title?: string;
  shape?: 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg';
  allowEdit?: boolean;
}

const FormImage = ({ 
  image, 
  setImage, 
  title = "Profile Image",
  shape = 'circle',
  size = 'md',
  allowEdit = true
}: FormImageProps) => {
  const [loading, setLoading] = useState({
    type: '',
    status: false
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [brightness, setBrightness] = useState(100);

  console.log("hallo")

  // Size mapping
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };

  // Shape styles
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg'
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!image?.url && !loading.status) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!image?.url && !loading.status) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (image?.url || loading.status) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleUploadImage(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadImage(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleRemoveImage = async () => {
    try {
      setLoading({ type: 'remove', status: true });
      await sleep();
      if (image?.fileId) {
        // Don't pass the entire image object to the server action
        const fileId = image.fileId;
        await deleteImage(fileId);
      }
      setImage(null);
      toast.success("Image removed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove image. Please try again.");
      setImage(null);
    } finally {
      setLoading({ type: '', status: false });
      setIsEditing(false);
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      setLoading({ type: "upload", status: true });
  
      // Validasi tipe file
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        setLoading({ type: "", status: false });
        return;
      }
  
      if (file.size > 5242880) {
        toast.error("Image size should be less than 5MB.");
        setLoading({ type: "", status: false });
        return;
      }
  

      const base64Image = await toBase64(file);
  

      const res = await uploadImage(base64Image, file.name);
  
      if (res?.url) {
        setImage(res);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading({ type: "", status: false });
    }
  };
  

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setBrightness(100); 
  };

  const handleResetChanges = () => {
    setBrightness(100);
  };

  return (
    <Card className="border shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className={`relative ${sizeMap[size]} ${shapeStyles[shape]} overflow-hidden border-4 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200'} shadow-md transition-all duration-200 hover:shadow-lg`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {image?.url ? (
              <>
                <Image
                  src={image.url}
                  alt="User Avatar"
                  fill
                  className="object-cover transition-all"
                  style={{ filter: isEditing ? `brightness(${brightness}%)` : 'none' }}
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="p-2 text-white text-xs">Editing</div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-2">
                {loading.status && loading.type === 'upload' ? (
                  <Loader />
                ) : (
                  <>
                    <ImageIcon className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">
                      {isDragging ? 'Drop image here' : 'No Image'}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {image?.url ? (
              <>
                {allowEdit && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleEditMode}
                    className="flex items-center gap-1"
                  >
                    {isEditing ? (
                      <>
                        <CropIcon className="h-4 w-4" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <ZoomInIcon className="h-4 w-4" />
                        <span>Edit</span>
                      </>
                    )}
                  </Button>
                )}
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={loading.status}
                  className="flex items-center gap-1"
                >
                  {loading.status && loading.type === 'remove' ? (
                    <Loader />
                  ) : (
                    <>
                      <Trash2Icon className="h-4 w-4" />
                      <span>Remove</span>
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  disabled={loading.status}
                  onClick={() => document.getElementById('image-upload-input')?.click()}
                >
                  {loading.status && loading.type === 'upload' ? (
                    <Loader />
                  ) : (
                    <>
                      <CloudUploadIcon className="h-4 w-4" />
                      <span>Upload Image</span>
                    </>
                  )}
                </Button>
                <input
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading.status}
                />
              </div>
            )}
          </div>

          {isEditing && image?.url && (
            <div className="w-full space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Brightness</span>
                <span className="text-xs text-gray-500">{brightness}%</span>
              </div>
              <Slider
                value={[brightness]}
                min={50}
                max={150}
                step={1}
                onValueChange={(values) => setBrightness(values[0])}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleResetChanges}
                className="w-full flex items-center justify-center gap-1 mt-2"
              >
                <RefreshCwIcon className="h-4 w-4" />
                <span>Reset Changes</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormImage;
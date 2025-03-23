'use client';
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { deleteImage, uploadImage } from '@/actions/web.action';
import { CloudUploadIcon, ImageUpIcon, LoaderIcon, Trash2Icon, SparklesIcon } from 'lucide-react';
import { sleep, toBase64 } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Image as TypeImage } from '@/types/web.types';
import WEB_VALIDATION from '@/validations/web.validation';
import { motion } from 'framer-motion';

interface FormImageProps {
  image: TypeImage | null,
  setImage: React.Dispatch<React.SetStateAction<TypeImage | null>>;
}

const FormImage = ({ image, setImage }: FormImageProps) => {
  const [loading, setLoading] = useState({
    type: '',
    status: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = async () => {
    try {
      setLoading({ type: 'remove', status: true });
      await sleep();
      if (image?.fileId) await deleteImage(image.fileId);
      setImage({
        url: '',
        fileId: ''
      });
      toast.success("Image removed successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading({ type: '', status: false });
  };

  const handleUploadImage = async (file: File) => {
    try {
      setLoading({ type: 'upload', status: true });
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file.");
        setLoading({ type: '', status: false });
        return;
      }
      
      if (file.size > 5242880) { // 5MB
        toast.error("Image size should be less than 5MB.");
        setLoading({ type: '', status: false });
        return;
      }
      
      const base64Image = await toBase64(file);
  

      const res = await uploadImage(base64Image, file.name);

      console.log(res);

      if (res?.url) {
        const imageURL = WEB_VALIDATION.URL.safeParse({url: res.url});
        if(imageURL.success){
          setImage(res);
          toast.success("Image uploaded successfully!");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setLoading({ type: '', status: false });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto"
    >
      <Card className="border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-4 space-y-4">
          <div className="relative group">
            <div className="border-4 border-dashed border-gray-300 dark:border-gray-600 w-full aspect-video rounded-lg overflow-hidden transition-all duration-300 group-hover:border-primary/50">
              {image?.url ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={image.url}
                    alt="Uploaded Image"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <SparklesIcon className="text-white w-12 h-12 animate-pulse" />
                  </div>
                </motion.div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 space-y-3">
                  <ImageUpIcon className="w-16 h-16 opacity-50" />
                  <p className="text-sm font-medium text-center">No image selected</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {image?.url ? (
              <Button
                variant="destructive"
                className="group flex items-center space-x-2"
                onClick={handleRemoveImage}
                disabled={loading.status}
              >
                {loading.status && loading.type === 'remove' ? (
                  <div className="flex items-center">
                    <LoaderIcon className="mr-2 animate-spin" />
                    Removing...
                  </div>
                ) : (
                  <>
                    <Trash2Icon className="h-5 w-5 group-hover:rotate-6 transition-transform" />
                    <span>Remove Image</span>
                  </>
                )}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                type='button'
                className="group flex items-center space-x-2"
                onClick={triggerFileInput}
                disabled={loading.status}
              >
                {loading.status && loading.type === 'upload' ? (
                  <div className="flex items-center">
                    <LoaderIcon className="mr-2 animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <>
                    <CloudUploadIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>Upload Image</span>
                  </>
                )}
              </Button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleUploadImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FormImage;
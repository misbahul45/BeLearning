'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { deleteImage, uploadImage } from '@/actions/web.action';
import { CloudUploadIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { sleep } from '@/lib/utils';
import Loader from '../ui/Loader';
import { Button } from '../ui/button';
import { USER_TYPES } from '@/types/user.types';



interface FormImageProps {
  image:USER_TYPES.Image | null,
  setImage: React.Dispatch<React.SetStateAction<USER_TYPES.Image | null>>;
}


const FormImage = ({ image, setImage }: FormImageProps) => {
  const [loading, setLoading] = useState({
    type: '',
    status: false
  });


  const handleRemoveImage = async () => {
    try {
      setLoading({ type: 'remove', status: true });
      await sleep();
      if (image?.fileId) await deleteImage(image.fileId);
      setImage(null);
      toast.success("Image removed successfully!");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading({ type: '', status: false });
  };

  const handleUploadImage = async (file: File) => {
    try {
      setLoading({ type: 'upload', status: true });
      const res = await uploadImage(file);
      if (res?.url) {
        toast.success("Image uploaded successfully!");
        setImage(res);
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading({ type: '', status: false });
  };

  return (
      <Card className="border-none">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
              {image?.url ? (
                <Image
                  src={image.url}
                  alt="User Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {image?.url ? (
              <Button
                variant="destructive"
                className="flex items-center space-x-2"
                onClick={handleRemoveImage}
                disabled={loading.status}
              >
                {loading.status && loading.type === 'remove' ? (
                  <Loader />
                ) : (
                  <>
                    <Trash2Icon className="h-5 w-5" />
                    <span>Remove Image</span>
                  </>
                )}
              </Button>
            ) : (
              <div>
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center text-gray-600 hover:text-primary transition"
                >
                  {loading.status && loading.type === 'upload' ? (
                    <LoaderIcon className="h-10 w-10 text-primary animate-spin" />
                  ) : (
                    <>
                      <CloudUploadIcon className="h-10 w-10 mb-2" />
                      <span className="text-sm font-medium">Upload Avatar</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleUploadImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
  );
};

export default FormImage;

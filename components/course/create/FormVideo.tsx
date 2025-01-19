'use client';
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteVideo } from "@/actions/web.action";
import toast from "react-hot-toast";
import Loader from "@/components/Loaders/Loader";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { convertToEmbedUrl } from "@/lib/utils";

interface Props{
    videoUrl:string;
    onUpdate:(url:string,fileId:string, name:'UPLOAD'|'YOUTUBE'|undefined)=>void,
    fileId:string
}

const FormVideo = ( {videoUrl, fileId, onUpdate}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(videoUrl|| null);
  const [ytUrl, setYtUrl] = useState<string>('');
  const [isPending, setartTransition] = React.useTransition();
  const [file, setFile]= useState<File | null>(null);
  const router=useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[e.target.files.length - 1 || 0];
    if (file) {
        setFile(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  };
  
  const handleUploadVideo=()=>{
    const formdata=new FormData();
    formdata.append('video',file!);
    setFile(null);
    setartTransition(async () => {
      if(!fileId){
        try {
          const res=await fetch('/api/upload', {
            method: 'POST',
            body: formdata,
          });

          const {url, fileId}=await res.json();

          onUpdate(url, fileId,  'UPLOAD');
          toast.success('Video uploaded successfully!');
          setPreviewUrl(url);
          videoRef.current!.load();
          router.refresh()
        } catch (error) {
            toast.error((error as Error).message);
        }
      }else{
        try {
          await deleteVideo(fileId);
          onUpdate('','', undefined);
          setPreviewUrl('');
          toast.success('Video deleted successfully!');
          router.refresh()
        } catch (error) {
            toast.error((error as Error).message);
        }
      }
    })
  }

  const onChangeAddYtVideo=(url:string)=>{
    if(url.includes('youtu.be')){
      url=convertToEmbedUrl(url);
      onUpdate(url, '', 'YOUTUBE');
    }else{
      toast.error('Invalid YouTube URL');
    }
    setYtUrl(url);
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-6 h-6" />
          <p>
            Add Video <span className="text-xs text-gray-500">Optional</span>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="video">Video File</Label>
              <Button onClick={handleUploadVideo} variant={fileId?"destructive":"default"} disabled={isPending||!previewUrl} type="button">
                {isPending?
                    <Loader />
                    :
                    (videoUrl?"Delete Video":"Upload Video")
                }
              </Button>
            </div>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Input placeholder="YouTube Video URL"  disabled={!!fileId} value={ytUrl} onChange={(e) =>onChangeAddYtVideo(e.target.value)} />
              <Separator className="my-2 border" />
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
              <Label
                htmlFor="video"
                className={`flex flex-col items-center cursor-pointer border-2 border-gray-300 py-1.5 ${ytUrl && 'hidden'}`}
              >
                <Upload className="w-12 h-12 mb-2 text-gray-400" />
                <span className="text-sm">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-500">MP4, WebM, or OGG</span>
              </Label>
            </div>
          </div>

          {(previewUrl || ytUrl) && (
            <div className="space-y-2">
              <Label>Preview</Label>
              {ytUrl ? (
                <iframe src={ytUrl} className="w-full md:h-96" allowFullScreen />
              ) : (
                <video ref={videoRef} controls preload="none" className="w-full">
                  <source src={previewUrl || ''} type="video/mp4" />
                  <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
                </video>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormVideo;

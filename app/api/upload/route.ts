import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file = data.get('video') as File;
        if(!file) return new Response('No file uploaded', { status: 400 });

        const buffer=Buffer.from(await file.arrayBuffer());
        const base64Image: string = `data:${(file as File).type};base64,${buffer.toString(
            'base64'
          )}`;

        const upload=await cloudinary.uploader.upload(base64Image,{
            resource_type: 'video',
            chunk_size: 6000000,
        });
        return NextResponse.json({ url:  upload.secure_url, fileId: upload.public_id });
    } catch{
        return new Response('Error uploading file', { status: 500 });
    }
}
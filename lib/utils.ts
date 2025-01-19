import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sleep = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export function generateToken(): string {
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now().toString(36); 
  return `${randomBytes}-${timestamp}`;
}

export async function slugify(input: string): Promise<string> {
  if (!input)
      return '';

  await sleep()

  // make lower case and trim
  let slug = input.toLowerCase().trim();

  // remove accents from charaters
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, '-');

  return slug;
}

export const readingTime=(text: string) => {
  const wpm=225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time
}

export const handleRotate=(index:number)=>{
    if(index%2==0){
        return `rotate(${index * 0.8}deg)`
    }
    return `rotate(${index * -1}deg)`
}

export function convertToEmbedUrl(url: string) {
  const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:[\w\-]+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    throw new Error('Invalid YouTube URL');
  }
}
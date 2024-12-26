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
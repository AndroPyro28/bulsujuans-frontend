import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import imageCompression from "browser-image-compression";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleImageCompression = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    // console.log('before compressed', file.size / 1024 / 1024 + 'MB')
    const compressedFile = await imageCompression(file, options);
    // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    // console.log('compressed file', compressedFile)
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};
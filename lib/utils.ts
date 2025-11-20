import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const CreateFormData = <TData extends Record<string, any>>(data: TData): TData | FormData => {
  const formData = new FormData();

  (Object.keys(data) as (keyof TData)[]).forEach((key) => {
    const value = data[key];
    if (value == null) return;

    if (key === "documents") {
      if (!Array.isArray(value)) {
        throw new Error(`Expected "${String(key)}" to be an array of files`);
      }

      value.forEach((file: File) => {
        if (!(file instanceof File)) {
          throw new Error(`Each item in "${String(key)}" must be a File`);
        }
        formData.append("documents", file);
      });
    } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(String(key), String(value));
    } else {
      // For nested objects, enforce serialization
      throw new Error(`Unsupported value type for key "${String(key)}"`);
    }
  });
  return formData;
};

import { format, parseISO } from "date-fns";

export function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";

  const date = parseISO(dateString); // parse ISO string
  return format(date, "MMM dd, yyyy"); // Example: "Jan 12, 2024"
}

type FormatCase = "lower" | "capitalized" | "upper";

export function formatStatus(status: string, format: FormatCase = "capitalized") {
  // Convert ENUM style (EX: BEING_PROCESS) → array of words
  const words = status.split("_").map((word) => word.toLowerCase());

  if (format === "lower") {
    return words.join(" ");
  }

  if (format === "upper") {
    return words.join(" ").toUpperCase();
  }

  // capitalized (default)
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

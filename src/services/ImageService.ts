import { CONTENT_TYPE } from "@/constants/api/headers";
import { IMAGE_QUALITY } from "@/constants/database";
import { FETCH_IMAGE_ERROR } from "@/constants/errors/api-server-errors";
import { IMAGE_PREFIX, IMAGE_WEBP_TYPE } from "@/constants/imageTypes";
import { NOT_AN_IMAGE } from "@/constants/validation/messages/auth";
import sharp from "sharp";

class ImageService {
  static convertFromURLToBytes = async (image: string) => {
    const temp = await fetch(image);
    const contentType = temp.headers.get(CONTENT_TYPE);

    if (!temp.ok) {
      throw new Error(FETCH_IMAGE_ERROR);
    }
    if (!contentType?.startsWith(IMAGE_PREFIX)) {
      throw new Error(NOT_AN_IMAGE);
    }

    const tempArrayBuffer = await temp.arrayBuffer();
    if (contentType?.endsWith(IMAGE_WEBP_TYPE)) {
      return Buffer.from(tempArrayBuffer);
    }
    return this.convertFromBufferToWebPBuffer(tempArrayBuffer);
  };

  static convertFromFileToBytes = async (image: File) => {
    return this.convertFromBufferToWebPBuffer(await image.arrayBuffer());
  };

  static convertFromFileToBase64 = async (file: File): Promise<string> => {
    const arrayBuffer = new Uint8Array(await file.arrayBuffer());
    let binaryString = "";

    const CHUNK_SIZE = 64 * 1024;
    for (let i = 0; i < arrayBuffer.length; i += CHUNK_SIZE) {
      const chunk = arrayBuffer.slice(i, i + CHUNK_SIZE);
      binaryString += String.fromCharCode(...chunk);
    }

    return btoa(binaryString);
  };

  private static convertFromBufferToWebPBuffer = (image: ArrayBuffer) => {
    return sharp(image).webp({ quality: IMAGE_QUALITY }).toBuffer();
  };

  static convertToImage = () => {};
}

export default ImageService;

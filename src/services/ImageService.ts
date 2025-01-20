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

  static convertFromFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file"));
      };

      reader.readAsDataURL(file);
    });
  };

  private static convertFromBufferToWebPBuffer = (image: ArrayBuffer) => {
    return sharp(image).webp({ quality: IMAGE_QUALITY }).toBuffer();
  };

  static convertToImage = () => {};
}

export default ImageService;

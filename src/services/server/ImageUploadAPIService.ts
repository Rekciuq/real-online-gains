import prisma from "@/lib/prisma";
import ImageService from "@/services/ImageService";
import { IMAGE_WEBP_TYPE } from "@/constants/imageTypes";
import { promises } from "fs";
import fs from "fs";
import path from "path";
import { handlePromiseServer } from "@/utils/handlePromiseServer";
import { Image } from "@prisma/client";
import { IMAGE_FS_NOT_FOUND } from "@/constants/errors/api-server-errors";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
class ImageUploadAPIService {
  static createImage = async (imageUrl: Blob) => {
    const imageBuffer = await ImageService.convertFromBlobToBuffer(imageUrl);

    const fileName = await this.writeImage(imageBuffer);

    const [error, response] = await handlePromiseServer(() =>
      prisma.image.create({
        data: {
          url: `/uploads/${fileName}`,
        },
      }),
    );

    return { error, response };
  };

  private static writeImage = async (imageBuffer: Buffer) => {
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${IMAGE_WEBP_TYPE}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    await promises.mkdir(UPLOAD_DIR, { recursive: true });

    await promises.writeFile(filePath, imageBuffer);
    return fileName;
  };

  static deleteImage = async (image: Image) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.image.delete({
        where: {
          id: image.id,
        },
      }),
    );

    const isDeletedFromFs = this.unwriteImage(image.url);

    if (!isDeletedFromFs) {
      return { error: IMAGE_FS_NOT_FOUND, response: null };
    }

    return { error, response };
  };

  private static unwriteImage = (imageUrl: string) => {
    const filePath = path.join(process.cwd(), "public", imageUrl);

    if (!fs.existsSync(filePath)) {
      return false;
    }

    fs.unlinkSync(filePath);
    return true;
  };
}

export default ImageUploadAPIService;

"use client";
import { IMAGES_API_ROUTE } from "@/constants/api/routes";
import HttpService from "../HttpService";
import { Image } from "@prisma/client";

class ImageClientService extends HttpService {
  constructor() {
    super(IMAGES_API_ROUTE);
  }
  getImage = (imageId: number) => this.get<Image>({ url: `/${imageId}` });
  deleteImage = (imageId: number) => this.delete({ url: `/${imageId}` });
}

export default ImageClientService;

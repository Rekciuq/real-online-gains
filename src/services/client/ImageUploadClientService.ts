"use client";
import { UPLOAD_IMAGE_API_ROUTE } from "@/constants/api/routes";
import HttpService from "../HttpService";

class ImageUploadClientService extends HttpService {
  constructor() {
    super(UPLOAD_IMAGE_API_ROUTE);
  }
  createImage = (image: FormData) => this.postForm({ image });
}

export default ImageUploadClientService;

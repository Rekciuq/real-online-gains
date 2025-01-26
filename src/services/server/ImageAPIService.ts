import prisma from "@/lib/prisma";
import { handlePromiseServer } from "@/utils/handlePromiseServer";

class ImageAPIService {
  static getImage = async (id: number) => {
    const [error, response] = await handlePromiseServer(() =>
      prisma.image.findUniqueOrThrow({
        where: { id },
      }),
    );

    return { error, response };
  };
}

export default ImageAPIService;

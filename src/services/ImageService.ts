class ImageService {
  static convertFromURLToBytes = async (image: string) => {
    const temp = await fetch(image);
    if (!temp.ok) {
      throw new Error(`Failed to fetch image: ${temp.statusText}`);
    }
    const tempArrayBuffer = await temp.arrayBuffer();
    return Buffer.from(new Uint8Array(tempArrayBuffer));
  };
  static convertToImage = () => {};
}

export default ImageService;

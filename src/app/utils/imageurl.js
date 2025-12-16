// utils/image.ts or image.js
export const getImageUrl = (imageName) => {
  if (!imageName) return null;

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_IMAGE_BASE_URL is not defined");
    return null;
  }

  return `${baseUrl}/${imageName}`;
};

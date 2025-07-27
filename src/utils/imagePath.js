import { API_URL } from "./Api";

/**
 * Constructs a complete image URL from a relative path
 * @param {string} imagePath - The relative image path from the API
 * @returns {string} Complete image URL
 */
export const constructImagePath = (imagePath) => {
  if (!imagePath) return "";

  // Remove any leading slashes to prevent double slashes in URL
  const cleanedPath = imagePath.startsWith("/")
    ? imagePath.substring(1)
    : imagePath;

  return `${API_URL}${cleanedPath}`;
};

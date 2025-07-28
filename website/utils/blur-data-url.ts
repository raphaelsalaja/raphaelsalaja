import { useEffect, useState } from "react";

/**
 * Generates a blur data URL from an image URL
 * This creates a low-quality placeholder that loads instantly
 * while the full image loads in the background
 */
export async function generateBlurDataURL(imageUrl: string): Promise<string> {
  try {
    // Create a canvas to generate the blur data URL
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    // Set canvas size (small for blur effect)
    canvas.width = 8;
    canvas.height = 8;

    // Create image element
    const img = new Image();
    img.crossOrigin = "anonymous";

    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          // Draw image to canvas (scaled down)
          ctx.drawImage(img, 0, 0, 8, 8);

          // Convert to data URL with low quality
          const blurDataURL = canvas.toDataURL("image/jpeg", 0.1);
          resolve(blurDataURL);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = imageUrl;
    });
  } catch (error) {
    console.warn("Failed to generate blur data URL:", error);
    // Return a fallback blur data URL
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";
  }
}

/**
 * Hook to generate and cache blur data URLs
 */
export function useBlurDataURL(imageUrl?: string) {
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!imageUrl) {
      setBlurDataURL(undefined);
      return;
    }

    // Check if we have a cached blur data URL
    const cacheKey = `blur-${imageUrl}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setBlurDataURL(cached);
      return;
    }

    // Generate new blur data URL
    setIsGenerating(true);
    generateBlurDataURL(imageUrl)
      .then((blurUrl) => {
        setBlurDataURL(blurUrl);
        // Cache it for the session
        sessionStorage.setItem(cacheKey, blurUrl);
      })
      .catch((error) => {
        console.warn("Failed to generate blur data URL:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }, [imageUrl]);

  return { blurDataURL, isGenerating };
}

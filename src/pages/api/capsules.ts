// src/pages/api/capsules.ts
export interface Capsule {
  name: string;
  flickr_images: string[];
  description: string;
}

export const fetchCapsules = async (): Promise<Capsule[]> => {
  const response = await fetch('https://api.spacexdata.com/v4/rockets');
  const data: Capsule[] = await response.json();
  return data;
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  longDescription: string;
  features: string[];
  tech: string[];
  thumbnail?: string; // used ONLY on the card
  images?: string[]; // used on the project page
  category: "game" | "web"; // NEW FIELD
};

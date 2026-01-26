export type Project = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  longDescription: string;
  features: string[];
  tech: string[];
  thumbnail?: string;
  images?: string[];
  category: "game" | "web" | "startup";
  video?: string;
  website?: string;
  server?: string;
  github?: string;
};

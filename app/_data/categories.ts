import { projects } from "@/app/_data/projects";

// Sub-categories for each main icon
export const subCategories = {
  home: [
    {
      id: "about",
      label: "About",
      icon: "/icons/menu_user.png",
      description:
        "Full-stack developer with expertise in modern web technologies",
    },
    {
      id: "skills",
      label: "Skills",
      icon: "/icons/achievement-list.png",
      description:
        "JavaScript, TypeScript, React, Next.js, Node.js, Python, C++",
    },
    {
      id: "what-i-do",
      label: "What I Do",
      icon: "/icons/core-infos.png",
      description:
        "Gameplay programming, backend development, and systems design",
    },
    {
      id: "technical-focus",
      label: "Technical Focus",
      icon: "/icons/Source Code - Various-content.png",
      description:
        "Unreal Engine 5, multiplayer systems, full stack development",
    },
    {
      id: "background",
      label: "Background",
      icon: "/icons/Flashback-content.png",
      description:
        "BSc Computer Games Technology and Software Development Bootcamp",
    },
    {
      id: "how-i-work",
      label: "How I Work",
      icon: "/icons/folder.png",
      description: "Detail-oriented, focused on robust and scalable systems",
    },
    {
      id: "outside-of-work",
      label: "Outside of Work",
      icon: "/icons/default.png",
      description: "Experimenting with new tools and learning new technologies",
    },
  ],
  projects: [
    {
      id: "startup",
      label: "Startups",
      icon: "/icons/savestate.png",
      description: "Innovative startup projects and MVPs",
    },
    {
      id: "web",
      label: "Web Projects",
      icon: "/icons/menu_updater.png",
      description: "Full-stack web applications and APIs",
    },
    {
      id: "games",
      label: "Game Projects",
      icon: "/icons/menu_playlist.png",
      description: "Interactive games and game development tools",
    },
  ],
  contact: [
    {
      id: "email",
      label: "Email",
      icon: "/icons/zip.png",
      description: "dylan.james.marley@gmail.com",
    },
    {
      id: "github",
      label: "GitHub",
      icon: "/icons/disc.png",
      description: "github.com/Dylan-JM",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: "/icons/Unofficial - Video Game Magazine Scans.png",
      description: "linkedin.com/in/dylan-marley-a439bb1b8",
    },
  ],
};

// Main category icons
export const mainCategoryIcons = {
  home: "/icons/menu_quickmenu.png",
  projects: "/icons/movie.png",
  contact: "/icons/core-infos.png",
};

// Group projects by category
export const projectCategories = [
  {
    id: "startup",
    label: "Startups",
    icon: "🚀",
    projects: projects.filter((p) => p.category === "startup"),
  },
  {
    id: "web",
    label: "Web Projects",
    icon: "🌐",
    projects: projects.filter((p) => p.category === "web"),
  },
  {
    id: "games",
    label: "Game Projects",
    icon: "🎮",
    projects: projects.filter((p) => p.category === "game"),
  },
];

export type ContentParagraph = {
  type: "paragraph";
  title: string;
  body: string;
};

export type ContentList = {
  type: "list";
  title: string;
  items: string[];
};

export type ContentGrid = {
  type: "grid";
  title: string;
  sections: { title: string; items: string[] }[];
};

export type ContentContact = {
  type: "contact";
  intro: string;
  items: { icon: string; label: string; href: string; text: string }[];
};

export type ContentConfig =
  | ContentParagraph
  | ContentList
  | ContentGrid
  | ContentContact;

export const subCategoryContent: Record<string, Record<string, ContentConfig>> = {
  home: {
    about: {
      type: "paragraph",
      title: "Full Stack Developer",
      body:
        "I'm Dylan Marley, a developer specialising in Web Development with Javascript, NextJs, TypeScript and Game Development with Unreal Engine and C++ along with cloud-backed multiplayer systems. I build production-ready features for both web applications and games.",
    },
    skills: {
      type: "grid",
      title: "Core Skills",
      sections: [
        {
          title: "Full Stack Development",
          items: [
            "Next.js, TypeScript, Express, React",
            "REST APIs & backend architecture",
            "MySQL, PostgreSQL, DynamoDB",
            "AWS (Cognito, Lambda, cloud services)",
          ],
        },
        {
          title: "Game Development",
          items: [
            "Unreal Engine 5 (C++, Blueprints)",
            "Dedicated servers with AWS",
            "AI behaviour systems & Mass framework",
            "Gameplay mechanics & combat systems",
            "Multiplayer & replication",
          ],
        },
      ],
    },
    "what-i-do": {
      type: "paragraph",
      title: "What I Do",
      body:
        "My work spans gameplay programming, backend development, and systems design. I build clean, maintainable codebases and focus on delivering features that scale — whether that's multiplayer combat systems, AI frameworks, or full stack web applications. I've worked across multiple startups, often taking ownership of architecture, code quality, and mentoring other developers.",
    },
    "technical-focus": {
      type: "list",
      title: "Technical Focus",
      items: [
        "Unreal Engine 5 — C++, AI, Mass framework, gameplay systems",
        "Multiplayer systems, replication, and cloud-backed services",
        "React, Next.js, Express, REST APIs, full stack web development",
        "SQL (MySQL, PostgreSQL) and AWS (DynamoDB, Cognito)",
        "Scalable architecture, debugging, and performance-focused development",
      ],
    },
    background: {
      type: "paragraph",
      title: "Background",
      body:
        "I hold a BSc (Hons) in Computer Games Technology and I have completed a Software Development Bootcamp with Tech Educators. My experience includes leading development on an MMORPG and Looter Arena game, implementing AI and gameplay systems in Unreal Engine, and delivering full stack features for web platforms.",
    },
    "how-i-work": {
      type: "paragraph",
      title: "How I Work",
      body:
        "I'm detail‑oriented, direct, and focused on building systems that are robust, scalable, and easy to maintain. I avoid unnecessary complexity, keep logic modular, and iterate until everything feels solid. I'm comfortable taking ownership of features, mentoring teammates, and driving projects forward.",
    },
    "outside-of-work": {
      type: "paragraph",
      title: "Outside of Work",
      body:
        "Outside of development, I'm usually experimenting with new tools, refining gameplay prototypes, or learning new technologies that push my projects and skillset forward.",
    },
  },
  contact: {
    email: {
      type: "contact",
      intro:
        "If you'd like to get in touch about work, collaboration, or anything development‑related, feel free to reach out using any of the methods below. I'm always open to discussing new opportunities and interesting projects.",
      items: [
        {
          icon: "📧",
          label: "Email",
          href: "mailto:dylan.james.marley@gmail.com",
          text: "dylan.james.marley@gmail.com",
        },
      ],
    },
    github: {
      type: "contact",
      intro:
        "If you'd like to get in touch about work, collaboration, or anything development‑related, feel free to reach out using any of the methods below. I'm always open to discussing new opportunities and interesting projects.",
      items: [
        {
          icon: "🐙",
          label: "GitHub",
          href: "https://github.com/Dylan-JM",
          text: "github.com/Dylan-JM",
        },
      ],
    },
    linkedin: {
      type: "contact",
      intro:
        "If you'd like to get in touch about work, collaboration, or anything development‑related, feel free to reach out using any of the methods below. I'm always open to discussing new opportunities and interesting projects.",
      items: [
        {
          icon: "💼",
          label: "LinkedIn",
          href: "https://linkedin.com/in/dylan-marley-a439bb1b8",
          text: "linkedin.com/in/dylan-marley-a439bb1b8",
        },
      ],
    },
  },
};

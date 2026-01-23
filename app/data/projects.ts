import { Project } from "@/app/types/project";

export const projects: Project[] = [
  {
    title: "Dedicated Server Infrastructure for Multiplayer Game",
    slug: "dedicated-server-infrastructure",
    description:
      "Scalable AWS-backed server architecture with user authentication and real-time stat tracking.",
    longDescription:
      "Designed and deployed a scalable backend architecture for a multiplayer game using Amazon Web Services. Integrated EC2 and Anywhere Fleets to support both cloud-hosted and user-hosted servers, enabling flexible compute allocation. Implemented secure user authentication via AWS Cognito, allowing cross-platform logins and persistent player profiles. Leveraged DynamoDB for real-time stat tracking and leaderboard generation, with multiple Lambda functions orchestrating stat updates and retrieval. Built a modular gameplay interface to display career stats, match history, and leaderboard rankings dynamically.",
    features: [
      "EC2 and Anywhere Fleets for server hosting",
      "Cross-platform user authentication via Cognito",
      "Real-time stat tracking with DynamoDB",
      "Leaderboard generation and career stats",
      "Multiple Lambda functions for stat updates and retrieval",
    ],
    tech: [
      "AWS",
      "EC2",
      "Anywhere Fleets",
      "Cognito",
      "DynamoDB",
      "Lambda",
      "JavaScript",
    ],
    tags: [
      "AWS",
      "Server Hosting",
      "Multiplayer Backend",
      "User Authentication",
      "Leaderboard System",
      "Cloud Architecture",
    ],
    thumbnail: "/projects/dedicated-servers/Dedicated-Servers-Game.png",
    images: [
      "/projects/dedicated-servers/Dedicated-Servers-Career.png",
      "/projects/dedicated-servers/Dedicated-Servers-Leaderboard.png",
    ],
    category: "game",
    video: "tmofhnkKzoM",
  },
  {
    title: "Multiplayer Dungeon Crawler",
    slug: "horror-dungeon-crawler",
    description:
      "4-player horror dungeon crawler built with Unreal Engine’s Gameplay Ability System.",
    tags: ["Unreal Engine", "Multiplayer", "GAS", "AI", "Combat", "Networking"],
    longDescription:
      "Developed a 4-player horror dungeon crawler using Unreal Engine’s Gameplay Ability System (GAS). Built core gameplay around class-based mechanics, light-triggered debuffs, and scalable combat systems. Implemented advanced AI using behavior trees and C++/Blueprint hybrid logic. Designed multiplayer architecture with lobby selection, persistent SaveGame slots, and insurance-based inventory retention.",
    features: [
      "Gameplay Ability System for scalable combat and class mechanics",
      "Multiplayer lobby selection and session management",
      "Light-based debuff system tied to environment triggers",
      "Advanced AI using behavior trees and GAS-driven ability activation",
      "SaveGame system with multiple slots and persistent progression",
      "Insurance inventory system for death-safe item retention",
    ],
    tech: [
      "Unreal Engine 5",
      "Gameplay Ability System (GAS)",
      "C++",
      "Blueprints",
      "Behavior Trees",
      "Multiplayer Networking",
      "SaveGame System",
    ],
    thumbnail: "/projects/dungeon/Dungeon-Thumbnail.png",
    images: [
      "/projects/dungeon/Dungeon-Inventory.png",
      "/projects/dungeon/Dungeon-Mobs.png",
      "/projects/dungeon/Dungeon-Boss1.png",
      "/projects/dungeon/Dungeon-Boss2.png",
      "/projects/dungeon/Dungeon-Boss3.png",
      "/projects/dungeon/Dungeon-Boss5.png",
    ],
    category: "game",
    video: "GKxt2N9Is2Q",
  },
];

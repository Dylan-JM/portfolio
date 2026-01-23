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
    thumbnail: `/projects/dedicated-servers/Dedicated-Servers-Game.png`,
  },
];

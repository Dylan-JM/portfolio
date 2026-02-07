import { projects } from '@/app/_data/projects';

// Sub-categories for each main icon
  export const subCategories = {
    home: [
      { id: 'about', label: 'About', icon: '👤', description: 'Full-stack developer with expertise in modern web technologies' },
      { id: 'skills', label: 'Skills', icon: '⚡', description: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, C++' },
      { id: 'what-i-do', label: 'What I Do', icon: '🎯', description: 'Gameplay programming, backend development, and systems design' },
      { id: 'technical-focus', label: 'Technical Focus', icon: '�', description: 'Unreal Engine 5, multiplayer systems, full stack development' },
      { id: 'background', label: 'Background', icon: '📚', description: 'BSc Computer Games Technology and Software Development Bootcamp' },
      { id: 'how-i-work', label: 'How I Work', icon: '⚙️', description: 'Detail-oriented, focused on robust and scalable systems' },
      { id: 'outside-of-work', label: 'Outside of Work', icon: '🎮', description: 'Experimenting with new tools and learning new technologies' }
    ],
    projects: [
      { id: 'startup', label: 'Startups', icon: '🚀', description: 'Innovative startup projects and MVPs' },
      { id: 'web', label: 'Web Projects', icon: '🌐', description: 'Full-stack web applications and APIs' },
      { id: 'games', label: 'Game Projects', icon: '🎮', description: 'Interactive games and game development tools' }
    ],
    contact: [
      { id: 'email', label: 'Email', icon: '�', description: 'dylan.james.marley@gmail.com' },
      { id: 'github', label: 'GitHub', icon: '🐙', description: 'github.com/Dylan-JM' },
      { id: 'linkedin', label: 'LinkedIn', icon: '💼', description: 'linkedin.com/in/dylan-marley-a439bb1b8' }
    ],
  };

// Group projects by category
  export const projectCategories = [
    {
      id: 'startup',
      label: 'Startups',
      icon: '🚀',
      projects: projects.filter(p => p.category === 'startup')
    },
    {
      id: 'web',
      label: 'Web Projects',
      icon: '🌐',
      projects: projects.filter(p => p.category === 'web')
    },
    {
      id: 'games',
      label: 'Game Projects',
      icon: '🎮',
      projects: projects.filter(p => p.category === 'game')
    }
  ];
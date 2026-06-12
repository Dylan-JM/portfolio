import { NextResponse } from 'next/server';
import { projects } from '@/app/_data/projects';
import { subCategoryContent } from '@/app/_data/subCategoryContent';

function buildText(): string {
  const lines: string[] = [];

  // ── About ────────────────────────────────────────────────────────────────
  lines.push('# ABOUT DYLAN MARLEY');
  lines.push('Name: Dylan Marley');
  lines.push('Portfolio: https://portfolio-pi-ochre-49.vercel.app');
  lines.push('Email: dylan.james.marley@gmail.com');
  lines.push('GitHub: https://github.com/Dylan-JM');
  lines.push('LinkedIn: https://linkedin.com/in/dylan-marley');
  lines.push('');

  const home = subCategoryContent.home;

  lines.push(home.about.body);
  lines.push('');

  // ── What I Do ─────────────────────────────────────────────────────────────
  lines.push('# WHAT I DO');
  lines.push((home['what-i-do'] as { body: string }).body);
  lines.push('');

  // ── Skills ────────────────────────────────────────────────────────────────
  lines.push('# SKILLS');
  const skills = home.skills as { sections: { title: string; items: string[] }[] };
  for (const section of skills.sections) {
    lines.push(`${section.title}:`);
    for (const item of section.items) lines.push(`  - ${item}`);
  }
  lines.push('');

  // ── Technical Focus ───────────────────────────────────────────────────────
  lines.push('# TECHNICAL FOCUS');
  const focus = home['technical-focus'] as { items: string[] };
  for (const item of focus.items) lines.push(`  - ${item}`);
  lines.push('');

  // ── Background ────────────────────────────────────────────────────────────
  lines.push('# BACKGROUND');
  lines.push((home.background as { body: string }).body);
  lines.push('');

  // ── How I Work ────────────────────────────────────────────────────────────
  lines.push('# HOW I WORK');
  lines.push((home['how-i-work'] as { body: string }).body);
  lines.push('');

  // ── Projects ──────────────────────────────────────────────────────────────
  const categories: Record<string, string> = {
    startup: 'STARTUP PROJECTS',
    web: 'WEB PROJECTS',
    game: 'GAME PROJECTS',
  };

  for (const [cat, heading] of Object.entries(categories)) {
    const catProjects = projects.filter((p) => p.category === cat);
    if (!catProjects.length) continue;

    lines.push(`# ${heading}`);

    for (const p of catProjects) {
      lines.push(`## ${p.title} (${p.date ?? 'N/A'})`);
      lines.push(p.longDescription);
      if (p.tech?.length) lines.push(`Tech: ${p.tech.join(', ')}`);
      if (p.website) lines.push(`Website: ${p.website}`);
      if (p.github) lines.push(`GitHub: ${p.github}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

export async function GET() {
  return new NextResponse(buildText(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

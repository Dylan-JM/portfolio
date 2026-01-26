import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/_types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="
        block
        bg-slate-800
        border
        border-slate-700
        rounded-xl
        p-6
        shadow-md
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {project.thumbnail && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>
      )}

      <h3 className="text-xl font-bold text-slate-50 mb-2">{project.title}</h3>

      <p className="text-sm text-slate-300 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 text-xs">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-500 text-slate-50 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

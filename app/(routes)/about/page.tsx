import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-50">About Me</h1>
        <Image
          src="/Graduate Picture.jpg" // replace with actual path
          alt="Dylan Marley"
          width={160}
          height={160}
          className="rounded-full border-4 border-slate-700 mx-auto mb-6"
        />
        {/* Intro */}
        <p className="text-slate-300 text-lg leading-relaxed">
          I’m Dylan Marley, a full stack and game developer with experience
          across Unreal Engine, C++, React, Express, SQL, and cloud-backed
          multiplayer systems. I specialise in building scalable gameplay
          mechanics, AI behaviour, REST APIs, and production-ready features for
          both games and web applications.
        </p>

        {/* What I Do */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">What I Do</h2>
          <p className="text-slate-300 leading-relaxed">
            My work spans gameplay programming, backend development, and systems
            design. I build clean, maintainable codebases and focus on
            delivering features that scale — whether that’s multiplayer combat
            systems, AI frameworks, or full stack web applications. I’ve worked
            across multiple startups, often taking ownership of architecture,
            code quality, and mentoring other developers.
          </p>
        </section>

        {/* Technical Focus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">
            Technical Focus
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Unreal Engine 5 — C++, AI, Mass framework, gameplay systems</li>
            <li>Multiplayer systems, replication, and cloud-backed services</li>
            <li>
              React, Next.js, Express, REST APIs, full stack web development
            </li>
            <li>SQL (MySQL, PostgreSQL) and AWS (DynamoDB, Cognito)</li>
            <li>
              Scalable architecture, debugging, and performance-focused
              development
            </li>
          </ul>
        </section>

        {/* Background */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">Background</h2>
          <p className="text-slate-300 leading-relaxed">
            I hold a BSc (Hons) in Computer Games Technology and I have
            completed a Software Development Bootcamp with{" "}
            <a
              href="https://techeducators.co.uk/"
              target="_blank"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              Tech Educators
            </a>
            . My experience includes leading development on an MMORPG and Looter
            Arena game, implementing AI and gameplay systems in Unreal Engine,
            and delivering full stack features for web platforms.
          </p>
        </section>

        {/* How I Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">How I Work</h2>
          <p className="text-slate-300 leading-relaxed">
            I’m detail‑oriented, direct, and focused on building systems that
            are robust, scalable, and easy to maintain. I avoid unnecessary
            complexity, keep logic modular, and iterate until everything feels
            solid. I’m comfortable taking ownership of features, mentoring
            teammates, and driving projects forward.
          </p>
        </section>

        {/* Outside Work */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50">
            Outside of Work
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Outside of development, I’m usually experimenting with new tools,
            refining gameplay prototypes, or learning new technologies that push
            my projects and skillset forward.
          </p>
        </section>
      </div>
    </main>
  );
}

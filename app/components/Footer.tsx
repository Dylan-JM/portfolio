export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 text-slate-500 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Dylan Marley</p>

        <div className="flex items-center gap-6">
          <a
            href="mailto:dylan.james.marley@gmail.com"
            className="hover:text-slate-300 transition"
          >
            Email
          </a>

          <a
            href="https://github.com/Dylan-JM"
            target="_blank"
            className="hover:text-slate-300 transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/dylan-marley-a439bb1b8/"
            target="_blank"
            className="hover:text-slate-300 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

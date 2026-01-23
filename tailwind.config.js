/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "(-card)": "var(--card)",
      },
      borderColor: {
        "(-border)": "var(--border)",
      },
      textColor: {
        "(-accent)": "var(--accent)",
        "(-text)": "var(--text)",
        "(-subtext)": "var(--subtext)",
      },
    },
  },
  safelist: [
    "bg-(--card)",
    "border-(--border)",
    "text-(--accent)",
    "text-(--text)",
    "text-(--subtext)",
  ],
};

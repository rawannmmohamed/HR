export function WorkspaceBrandMark() {
  return (
    <div
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#111827] shadow-sm ring-1 ring-border dark:bg-[#0b0d12] dark:ring-white/10"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(45,212,191,0.32),transparent_36%),radial-gradient(circle_at_20%_90%,rgba(124,91,255,0.34),transparent_42%)]" />
      <svg className="relative h-7 w-7" viewBox="0 0 32 32" fill="none" role="img">
        <path
          d="M16 4.75 24.25 9v7.2c0 5.3-3.55 9.32-8.25 11.05-4.7-1.73-8.25-5.75-8.25-11.05V9L16 4.75Z"
          fill="#231d52"
          stroke="#7c5bff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="13.1" cy="14.1" r="2.3" fill="#2dd4bf" />
        <circle cx="19.2" cy="14.1" r="2.3" fill="#a78bfa" />
        <path d="M8.9 23.6c.72-3.6 3.06-5.55 6.2-5.55s5.48 1.95 6.2 5.55" fill="#2dd4bf" />
        <path d="M16.7 22.05 19.2 24.5 24 19.15" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

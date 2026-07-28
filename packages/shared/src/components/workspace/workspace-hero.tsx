import type { WorkspaceHeroProps } from "./types";

export function WorkspaceHero({ action, dateLabel, title }: WorkspaceHeroProps) {
  return (
    <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-normal text-foreground dark:text-white">{title}</h1>
        <p className="mt-2 text-lg text-muted-foreground dark:text-[#9ca3af]">{dateLabel}</p>
      </div>
      {action}
    </section>
  );
}

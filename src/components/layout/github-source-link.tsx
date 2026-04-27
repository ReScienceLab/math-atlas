import { Github } from "@lobehub/icons";

const sourceUrl = "https://github.com/ReScienceLab/math-atlas";

export function GitHubSourceLink({
  label = false,
  className = "",
}: {
  label?: boolean;
  className?: string;
}) {
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Open source repository on GitHub"
      title="Open source on GitHub"
    >
      <Github aria-hidden="true" className="h-4 w-4" size={16} />
      {label && <span>Open Source</span>}
    </a>
  );
}

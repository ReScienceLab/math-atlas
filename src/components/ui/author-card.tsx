import { Author } from "@/lib/problems";
import Image from "next/image";
import { ExternalLink, GraduationCap } from "lucide-react";

export function AuthorCard({ author }: { author: Author }) {
  const initials = author.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-4 py-4">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/[0.08] bg-[var(--gray-800)]">
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            alt={author.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[13px] font-medium text-[var(--gray-400)]">
            {initials}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <span className="text-[15px] font-medium text-[var(--fg)] truncate">
            {author.name}
          </span>
          <span className="flex items-center gap-2">
            {author.scholarUrl && (
              <a
                href={author.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gray-500)] transition-colors hover:text-[var(--blue)]"
                title="Google Scholar"
              >
                <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}
            {author.homepageUrl && (
              <a
                href={author.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gray-600)] transition-colors hover:text-[var(--gray-300)]"
                title="Homepage"
              >
                <ExternalLink aria-hidden="true" className="h-[13px] w-[13px]" strokeWidth={2} />
              </a>
            )}
          </span>
        </div>
        <p className="text-[13px] text-[var(--gray-500)] font-[var(--font-mono)] truncate">
          {author.institution}
        </p>
      </div>
    </div>
  );
}

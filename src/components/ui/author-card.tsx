import { Author } from "@/lib/problems";
import Image from "next/image";

export function AuthorCard({ author }: { author: Author }) {
  const initials = author.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <div className="flex items-center gap-4 py-3">
      {/* Avatar */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--gray-800)] border border-white/[0.08] flex-shrink-0">
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

      {/* Info */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-medium text-[var(--fg)] truncate">
            {author.name}
          </span>
          {author.scholarUrl && (
            <a
              href={author.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-[var(--gray-500)] hover:text-[var(--blue)] transition-colors"
              title="Google Scholar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-3a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM1 0h22L12 11 1 0z"/>
              </svg>
            </a>
          )}
          {author.homepageUrl && (
            <a
              href={author.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-[var(--gray-600)] hover:text-[var(--gray-300)] transition-colors"
              title="Homepage"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
          )}
        </div>
        <p className="text-[13px] text-[var(--gray-500)] font-[var(--font-mono)] truncate">
          {author.institution}
        </p>
      </div>
    </div>
  );
}

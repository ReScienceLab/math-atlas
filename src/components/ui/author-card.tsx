import { Author } from "@/lib/problems";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { ComponentType } from "react";
import {
  GoogleScholarIcon,
  LinkedInIcon,
  WikipediaIcon,
  XIcon,
} from "./brand-icons";

type ProfileLink = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

export function AuthorCard({ author }: { author: Author }) {
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  // Prefer Google Scholar, then social, then a generic homepage / Wikipedia.
  const links: ProfileLink[] = [
    author.scholarUrl && {
      href: author.scholarUrl,
      label: "Google Scholar",
      Icon: GoogleScholarIcon,
    },
    author.twitterUrl && {
      href: author.twitterUrl,
      label: "X (Twitter)",
      Icon: XIcon,
    },
    author.linkedinUrl && {
      href: author.linkedinUrl,
      label: "LinkedIn",
      Icon: LinkedInIcon,
    },
    author.homepageUrl && {
      href: author.homepageUrl,
      label: "Homepage",
      Icon: ExternalLink,
    },
    author.wikipediaUrl && {
      href: author.wikipediaUrl,
      label: "Wikipedia",
      Icon: WikipediaIcon,
    },
  ].filter(Boolean) as ProfileLink[];

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
          <span className="flex items-center gap-2.5">
            {links.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gray-500)] transition-colors hover:text-[var(--blue)]"
                title={label}
                aria-label={`${author.name} on ${label}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </span>
        </div>
        <p className="text-[13px] text-[var(--gray-500)] font-[var(--font-mono)] truncate">
          {author.institution}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export function ExpandableText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [collapsedText, setCollapsedText] = useState(children);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;

    const checkOverflow = () => {
      const style = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(style.lineHeight);
      const maxCollapsedHeight = Number.isFinite(lineHeight) ? lineHeight * 3 : 72;
      const fullText = children.trim();

      element.textContent = fullText;

      if (element.scrollHeight <= maxCollapsedHeight + 2) {
        setCanExpand(false);
        setCollapsedText(fullText);
        return;
      }

      let low = 0;
      let high = fullText.length;
      let best = "";

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const candidate = `${fullText.slice(0, mid).trimEnd()}... More`;
        element.textContent = candidate;

        if (element.scrollHeight <= maxCollapsedHeight + 2) {
          best = candidate;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      const textWithoutControl = best.replace(/\s*More$/, "");
      const wordBoundary = textWithoutControl.lastIndexOf(" ");
      setCanExpand(true);
      setCollapsedText(
        wordBoundary > 24
          ? `${textWithoutControl.slice(0, wordBoundary).trimEnd()}...`
          : textWithoutControl,
      );
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);
    window.addEventListener("resize", checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [children, className]);

  if (expanded) {
    return (
      <p className={className}>
        {children}
        {canExpand && (
          <button
            type="button"
            className="ml-2 inline font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-500)] transition-colors hover:text-white"
            onClick={() => setExpanded(false)}
          >
            Less
          </button>
        )}
      </p>
    );
  }

  return (
    <div className="relative">
      <p className={className}>
        {canExpand ? collapsedText : children}
        {canExpand && (
          <button
            type="button"
            className="ml-2 inline font-[var(--font-mono)] text-[10px] uppercase text-[var(--gray-500)] transition-colors hover:text-white"
            onClick={() => setExpanded(true)}
          >
            More
          </button>
        )}
      </p>
      <p
        ref={measureRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 opacity-0 ${className}`}
      />
    </div>
  );
}

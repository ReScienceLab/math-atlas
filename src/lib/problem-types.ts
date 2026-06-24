export type ProblemStatus =
  | "open"
  | "proved"
  | "disproved"
  | "resolved"
  | "partial"
  | "watch"
  | "award";

export type MathField =
  | "analysis"
  | "algebra"
  | "geometry"
  | "number-theory"
  | "topology"
  | "combinatorics"
  | "mathematical-physics"
  | "computer-science"
  | "ai-math"
  | "logic";

export interface Author {
  name: string;
  institution: string;
  scholarUrl?: string;
  avatarUrl?: string;
  homepageUrl?: string;
  wikipediaUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export interface Paper {
  title: string;
  arxivId?: string;
  url: string;
  year: number;
}

export interface Video {
  title: string;
  videoId: string;
  channel: string;
}

export interface TimelineEvent {
  year: number;
  month?: string;
  title: string;
  description?: string;
  type: "origin" | "progress" | "breakthrough" | "recognition";
}

export interface ProblemFormula {
  label: string;
  latex: string;
  description?: string;
}

export type ProblemCollection =
  | "canonical"
  | "beautiful"
  | "frontier"
  | "unification"
  | "recent";

export type ConsensusStatus = "settled" | "active" | "emerging" | "watch";

export interface ProblemCoordinates {
  difficulty: number;
  beauty: number;
  visual: number;
  importance: number;
  activity: number;
  accessibility: number;
}

export interface Problem {
  slug: string;
  title: string;
  status: ProblemStatus;
  field: MathField;
  year: number;
  shortDescription: string;
  longDescription?: string;
  vizComponent: string;
  authors: Author[];
  papers: Paper[];
  timeline: TimelineEvent[];
  formulas?: ProblemFormula[];
  videos?: Video[];
  collections?: ProblemCollection[];
  coordinates?: ProblemCoordinates;
  consensusStatus?: ConsensusStatus;
  lastReviewed?: string;
  connections?: string[];
}

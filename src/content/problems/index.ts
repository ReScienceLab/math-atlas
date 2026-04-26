import type { Problem } from "@/lib/problem-types";
import { abcSecretVerification } from "./abc-secret-verification";
import { faltingsAbelPrize2026 } from "./faltings-abel-prize-2026";
import { kakeya2d } from "./kakeya-2d";

export const configuredProblems: Problem[] = [
  abcSecretVerification,
  faltingsAbelPrize2026,
  kakeya2d,
];

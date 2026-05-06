import type { Problem } from "@/lib/problem-types";
import { erdosProblem1196 } from "./erdos-problem-1196";
import { abcSecretVerification } from "./abc-secret-verification";
import { faltingsAbelPrize2026 } from "./faltings-abel-prize-2026";
import { kakeya2d } from "./kakeya-2d";
import { kakeya3d } from "./kakeya-3d";
import { fourColorTheorem } from "./four-color-theorem";
import { keplerConjecture } from "./kepler-conjecture";
import { travelingSalesmanProblem } from "./traveling-salesman-problem";
import { aperiodicMonotile } from "./aperiodic-monotile";
import { mandelbrotLocalConnectivity } from "./mandelbrot-local-connectivity";
import { squarePegProblem } from "./square-peg-problem";
import { hadwigerNelsonProblem } from "./hadwiger-nelson-problem";
import { plateauProblem } from "./plateau-problem";
import { kissingNumberProblem } from "./kissing-number-problem";
import { steinerTreeProblem } from "./steiner-tree-problem";
import { isoperimetricProblem } from "./isoperimetric-problem";
import { honeycombConjecture } from "./honeycomb-conjecture";
import { brouwerFixedPoint } from "./brouwer-fixed-point";
import { borsukUlamTheorem } from "./borsuk-ulam-theorem";
import { hamSandwichTheorem } from "./ham-sandwich-theorem";
import { hairyBallTheorem } from "./hairy-ball-theorem";
import { gaussCircleProblem } from "./gauss-circle-problem";
import { movingSofaProblem } from "./moving-sofa-problem";
import { moserWormProblem } from "./moser-worm-problem";
import { illuminationProblem } from "./illumination-problem";
import { geometricLanglands } from "./geometric-langlands";
import { hilbertSixth } from "./hilbert-sixth";
import { mizohataTakeuchi } from "./mizohata-takeuchi";
import { noperthedron } from "./noperthedron";
import { alphaevolveStrassen } from "./alphaevolve-strassen";
import { riemannHypothesis } from "./riemann-hypothesis";
import { pVsNp } from "./p-vs-np";
import { navierStokes } from "./navier-stokes";
import { hodgeConjecture } from "./hodge-conjecture";
import { birchSwinnertonDyer } from "./birch-swinnerton-dyer";
import { yangMillsMassGap } from "./yang-mills-mass-gap";
import { collatzConjecture } from "./collatz-conjecture";
import { goldbachConjecture } from "./goldbach-conjecture";
import { twinPrimeConjecture } from "./twin-prime-conjecture";
import { abcConjecture } from "./abc-conjecture";
import { continuumHypothesis } from "./continuum-hypothesis";
import { poincareConjecture } from "./poincare-conjecture";
import { lebesgueUniversalCover } from "./lebesgue-universal-cover";

export const configuredProblems: Problem[] = [
  erdosProblem1196,
  abcSecretVerification,
  faltingsAbelPrize2026,
  kakeya2d,
  kakeya3d,
  fourColorTheorem,
  keplerConjecture,
  travelingSalesmanProblem,
  aperiodicMonotile,
  mandelbrotLocalConnectivity,
  squarePegProblem,
  hadwigerNelsonProblem,
  plateauProblem,
  kissingNumberProblem,
  steinerTreeProblem,
  isoperimetricProblem,
  honeycombConjecture,
  brouwerFixedPoint,
  borsukUlamTheorem,
  hamSandwichTheorem,
  hairyBallTheorem,
  gaussCircleProblem,
  movingSofaProblem,
  moserWormProblem,
  lebesgueUniversalCover,
  illuminationProblem,
  geometricLanglands,
  hilbertSixth,
  mizohataTakeuchi,
  noperthedron,
  alphaevolveStrassen,
  riemannHypothesis,
  pVsNp,
  navierStokes,
  hodgeConjecture,
  birchSwinnertonDyer,
  yangMillsMassGap,
  collatzConjecture,
  goldbachConjecture,
  twinPrimeConjecture,
  abcConjecture,
  continuumHypothesis,
  poincareConjecture,
];

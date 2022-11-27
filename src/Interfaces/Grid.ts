import { Complex } from "./Complex.js";
import { Point } from "./Point.js";

export interface Grid {
  size: Point;
  min: Complex;
  max: Complex;
  steps: number;
}

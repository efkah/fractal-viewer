import { Grid } from '../Interfaces/Grid.js';

export class ComplexRange {
  re: number[];
  im: number[];

  constructor() {}

  /**
   * Initiates the ComplexRange from a given Grid
   *
   * @param {Grid} grid The Complex Grid.
   * @return {void} none.
   */
  fromGrid(grid: Grid): void {
    this.re = [];
    this.im = [];
    let step_re = (grid.max.re - grid.min.re) / (grid.steps - 1);
    let step_im = (grid.max.im - grid.min.im) / (grid.steps - 1);
    for (let i = 0; i < grid.steps; i++) {
      this.re.push(grid.min.re + i * step_re);
      this.im.push(grid.min.im + i * step_im);
    }
    this.im = this.im.reverse();
  }
}

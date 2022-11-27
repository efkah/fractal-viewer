import { Complex } from '../Interfaces/Complex';
import { DataPoint } from '../Interfaces/DataPoint';
import { ComplexRange } from './ComplexRange';

export class Fractals {
  /**
   * Calculates the iteration depths for a Julia set from a given range.
   *
   * @param {Complex} seed A complex number used for the Julia set seed.
   * @param {ComplexRange} range The Complex Range of numbers to calculate.
   * @return {DataPoint[]} The calculated DatePoints contain the Point and iteration depth.
   */
  static calcJulia(seed: Complex, range: ComplexRange): DataPoint[] {
    const escapeRadius = 3;
    let maxIter = 200;
    const dataPoints: DataPoint[] = [];

    for (let index_x = 0; index_x < range.re.length; index_x++) {
      for (let index_y = 0; index_y < range.im.length; index_y++) {
        let x = range.re[index_x];
        let y = range.im[index_y];
        let iter = 0;

        while (x * x + y * y < escapeRadius ** 2 && iter < maxIter) {
          const xTemp = x * x - y * y;
          y = 2 * x * y + seed.im;
          x = xTemp + seed.re;
          iter++;
        }

        if (iter == maxIter) {
          iter = 0;
        }

        const dataPoint: DataPoint = {
          iterations: iter,
          point: { x: index_x, y: index_y },
        };
        dataPoints.push(dataPoint);
      }
    }

    return dataPoints;
  }
}

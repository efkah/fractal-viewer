import { Complex } from '../Interfaces/Complex.js';
import { DrawerType } from '../Interfaces/DrawerType.js';
import { Grid } from '../Interfaces/Grid.js';
import { Point } from '../Interfaces/Point.js';
import { Rgba } from '../Interfaces/Rgba.js';
import { CanvasHelper } from './CanvasHelper.js';
import { ComplexRange } from './ComplexRange.js';
import { Fractals } from './Fractals.js';

export class Drawer {
  img: HTMLImageElement;
  type: DrawerType;
  pixelSize: Point;
  canvasHelper: CanvasHelper;
  range = new ComplexRange();

  /**
   * Initiates the drawer with the given image.
   *
   * @param {HTMLImageElement} img The HTML Image Element to be used for showing the output.
   */
  constructor(img: HTMLImageElement) {
    this.img = img;
  }

  /**
   * Initiates the grid with the given options.
   *
   * @param {Grid} grid View the Grid interface to inspect options.
   * @return {void}
   */
  setGrid(grid: Grid): void {
    this.canvasHelper = new CanvasHelper(document.createElement('canvas'));
    this.canvasHelper.setGrid(grid);

    this.range.fromGrid(grid);
    this.pixelSize = {
      x: grid.size.x / grid.steps,
      y: grid.size.y / grid.steps,
    };
  }

  /**
   * Entry point for drawing a picture
   *
   * @param {'Random' | 'Julia'} type Enter the type of picture to be drawn.
   * @param {Complex} seed Optional seed to be used for calculating Julia sets.
   * @return {void}
   */
  draw(type: 'Random' | 'Julia', seed?: Complex): void {
    switch (type) {
      case 'Julia':
        this.drawJulia(seed);
        break;
      case 'Random':
        this.drawRandom();
        break;
      default:
        console.error("unknown input, expected 'Random' | 'Julia'");
    }
  }

  /**
   * Draw a series of random points
   *
   * @return {void}
   */
  private drawRandom(): void {
    this.canvasHelper.fillBlack();

    for (let index_x = 0; index_x < this.range.re.length; index_x++) {
      for (let index_y = 0; index_y < this.range.im.length; index_y++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let a = 34 + Math.floor(Math.random() * 66);

        this.drawPixel(index_x, index_y, {
          r: r,
          g: g,
          b: b,
          a: a,
        });
      }
    }
    this.putData();
  }

  /**
   * Draw a julia set
   *
   * @param {'Random' | 'Julia'} type Enter the type of picture to be drawn.
   * @param {Complex} seed Optional seed to be used for calculating Julia sets.
   * @return {void}
   */
  private drawJulia(seed: Complex): void {
    this.canvasHelper.fillBlack();

    const dataPoints = Fractals.calcJulia(seed, this.range);

    // alphaFix is used to normalize the iteration depth to values between 0 and 100
    const alphaFix = Math.floor(
      Math.max.apply(
        null,
        dataPoints.flatMap((d) => d.iterations)
      )
    );

    for (let dataPoint of dataPoints) {
      const iter = dataPoint.iterations;
      const point = dataPoint.point;

      // random colors for each point, set r=g=b for b&w, set each to 255 for b&w heatmap
      // let r = 255;
      // let g = 255;
      // let b = 255;
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);

      const rgb = {
        r: 0,
        g: 0,
        b: 0,
      } as Rgba;

      // set iteration length to alpha value (0-100)
      let alpha = (iter / alphaFix) * 100;
      // MANUAL: adjust brightness by cutting off top and bottom values
      // alpha = alpha * 1.6 - 25;
      alpha = (alpha * alpha) / 20;
      // alpha = alpha * 6;

      rgb.r = r;
      rgb.g = g;
      rgb.b = b;
      rgb.a = alpha;

      this.drawPixel(point.x, point.y, rgb);
    }

    this.putData();
  }

  /**
   * Helper method to call the right helper method for drawing the pixeltype set in the drawer.
   *
   * @param {number} x Position on the x axes to draw a circle.
   * @param {number} y Position on the y axes to draw a circle.
   * @param {Rgba} rgba Color of the point to draw.
   * @return {void}
   */
  private drawPixel(x: number, y: number, rgba: Rgba): void {
    switch (this.type) {
      case DrawerType.Circle:
        this.canvasHelper.drawCircle(x, y, rgba, this.pixelSize.x / 2);
        break;
      case DrawerType.Rect:
        this.canvasHelper.drawRect(x, y, rgba, this.pixelSize);
        break;
      case DrawerType.Image:
        this.canvasHelper.drawImage(
          x,
          y,
          'http://127.0.0.1:5500/chain-inverse.png',
          this.pixelSize,
          rgba.a ? (rgba.a > 144 ? 1 : 0) : 1
        );
        break;
      default:
        console.error("unknown input, expected 'Circle' | 'Rect' | 'Image'");
        this.canvasHelper.drawPixels(x, y, rgba, this.pixelSize);
    }
  }

  /**
   * Sets the encoded canvas as the image source to be shown on screen
   *
   * @return {void}
   */
  private putData(): void {
    this.img.src = this.canvasHelper.putData();
  }
}

import { Grid } from '../Interfaces/Grid';
import { Point } from '../Interfaces/Point';
import { Rgba } from '../Interfaces/Rgba';

export class CanvasHelper {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;

  drawImageBuffer: HTMLImageElement;

  /**
   * Initiates the Grid
   *
   * @return {void} draws directly on canvas.
   */
  setGrid(value: Grid): void {
    if (value) {
      this.canvas.width = value?.size.x;
      this.canvas.height = value?.size.y;

      this.ctx = this.canvas.getContext('2d');
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.imageData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  /**
   * Deprecated - draws a rectangle by drawing each point in the rectangle.
   *
   * @param {number} x The starting point on the x-axes.
   * @param {number} y The starting point on the y-axes.
   * @param {Rgba} rgba The color code to be used for drawing.
   * @param {Point} pixelSize The x and y Dimensions to be drawn.
   * @return {void} draws directly on canvas.
   */
  drawPixels(x: number, y: number, rgba: Rgba, pixelSize: Point): void {
    const px = Math.floor(x * pixelSize.x);
    const py = Math.floor(y * pixelSize.y);

    for (let size_x = 0; size_x < pixelSize.x; size_x++) {
      for (let size_y = 0; size_y < pixelSize.y; size_y++) {
        const off = ((py + size_y) * this.canvas.width + (px + size_x)) * 4;
        this.imageData.data[off] = rgba.r;
        this.imageData.data[off + 1] = rgba.g;
        this.imageData.data[off + 2] = rgba.b;
        this.imageData.data[off + 3] = rgba.a ?? 255;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  /**
   * Draws a rectangle at the designated place with color and size.
   *
   * @param {number} x The starting point on the x-axes.
   * @param {number} y The starting point on the y-axes.
   * @param {Rgba} rgba The color code to be used for drawing.
   * @param {Point} pixelSize The x and y Dimensions to be drawn.
   * @return {void} draws directly on canvas.
   */
  drawRect(x: number, y: number, rgba: Rgba, pixelSize: Point): void {
    const px = Math.floor(x * pixelSize.x);
    const py = Math.floor(y * pixelSize.y);

    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 255)';

    let alpha = 1;
    if (rgba.a) {
      alpha = rgba.a / 255;
    }
    this.ctx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
    this.ctx.rect(px, py, pixelSize.x, pixelSize.y);
    this.ctx.stroke();
    this.ctx.fill();
  }

  /**
   * Draws a circle at the designated place with color and size.
   *
   * @param {number} x The starting point on the x-axes.
   * @param {number} y The starting point on the y-axes.
   * @param {Rgba} rgba The color code to be used for drawing.
   * @param {Point} pixelSize The x and y Dimensions to be drawn.
   * @return {void} draws directly on canvas.
   */
  drawCircle(x: number, y: number, rgba: Rgba, radius: number): void {
    const px = Math.floor(x * radius * 2 + radius);
    const py = Math.floor(y * radius * 2 + radius);

    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black';

    let alpha = 1;
    if (rgba.a) {
      alpha = rgba.a / 255;
    }
    this.ctx.fillStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;

    this.ctx.arc(px, py, radius - this.ctx.lineWidth / 2, 0, 2 * Math.PI);

    // this.ctx.stroke();
    this.ctx.fill();
  }

  /**
   * Draws an image at the designated place with color and size.
   *
   * @param {number} x The starting point on the x-axes.
   * @param {number} y The starting point on the y-axes.
   * @param {string} src The URL to the image to be drawn.
   * @param {Point} size The x and y Dimensions to be drawn.
   * @param {number} alpha The opacity / alpha channel to draw the image.
   * @return {void} draws directly on canvas.
   */
  drawImage(
    x: number,
    y: number,
    src: string,
    size: Point,
    alpha: number
  ): void {
    const px = Math.floor(x * size.x);
    const py = Math.floor(y * size.y);

    if (!this.drawImageBuffer) {
      this.drawImageBuffer = document.createElement('img');
      this.drawImageBuffer.src = src;
    }
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(this.drawImageBuffer, px, py, size.x, size.y);
    this.ctx.globalAlpha = 1;
  }

  /**
   * Fills the canvas with a black background.
   *
   * @return {void} draws directly on canvas.
   */
  fillBlack(): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
  }

  /**
   * Encodes the canvas to be used in another HTML Element.
   *
   * @return {string} The encoded image.
   */
  putData(): string {
    return this.canvas.toDataURL('image/png');
  }
}

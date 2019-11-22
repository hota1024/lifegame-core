import { PointType } from './'

/**
 * Point interface.
 */
export interface PointInterface {
  /**
   * x.
   */
  x: number

  /**
   * y.
   */
  y: number

  /**
   * Set by `Point`.
   *
   * @param point
   */
  set(point: PointType): void

  /**
   * Set by `x` and `y`.
   *
   * @param x
   * @param y
   */
  set(x: number, y: number): void

  /**
   * Return `PointType`.
   */
  asPointType(): PointType
}

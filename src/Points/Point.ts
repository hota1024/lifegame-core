import { PointInterface } from './'
import { PointType } from './PointType'
import { IsPointType, IsNumber } from '../Utilities'

/**
 * Point class.
 */
export class Point implements PointInterface {
  /**
   * x.
   */
  x: number = 0

  /**
   * y.
   */
  y: number = 0

  /**
   * Point constructor.
   *
   * @param initialXOrPoint
   * @param initialY
   */
  constructor(
    initialXOrPoint: number | PointType = { x: 0, y: 0 },
    initialY?: number
  ) {
    this.set(initialXOrPoint, initialY)
  }

  /**
   * Set by `Point` or `x` and `y`.
   *
   * @param xOrPoint
   * @param y
   */
  set(xOrPoint: number | PointType, y?: number) {
    if (IsPointType(xOrPoint)) {
      this.setByPoint(xOrPoint)
    } else if (IsNumber(xOrPoint) && IsNumber(y)) {
      this.setByXAndY(xOrPoint, y)
    } else {
      throw new Error(`[lifegame-core] y is not a number.`)
    }
  }

  /**
   * Return `PointType`.
   */
  asPointType() {
    return {
      x: this.x,
      y: this.y
    }
  }

  /**
   * Set by `Point`.
   *
   * @param point
   */
  private setByPoint(point: PointType) {
    this.x = point.x
    this.y = point.y
  }

  /**
   * Set by `x` and `y`.
   */
  private setByXAndY(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

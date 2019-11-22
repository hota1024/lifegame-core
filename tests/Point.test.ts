import { Point } from '../src/Points'

describe('Point test.', () => {
  it('Point#constructor should set initial `x` and `y`.', () => {
    /**
     * `new Point(x, y)` style constructor.
     */
    const p0 = new Point(0, 0)
    expect(p0).toMatchObject({ x: 0, y: 0 }) // `p0` should match `{ x: 0, y: 0 }`.

    /**
     * `new Point(PointType)` style constructor.
     */
    const p1 = new Point({ x: 100, y: 100 })
    expect(p1).toMatchObject({ x: 100, y: 100 }) // `p1` should match `{ x: 100, y: 100 }`.
  })

  it('Point#set should set initial `x` and `y`.', () => {
    /**
     * `new Point(x, y)` style set.
     */
    const p0 = new Point()
    p0.set(0, 0)
    expect(p0).toMatchObject({ x: 0, y: 0 }) // `p0` should match `{ x: 0, y: 0 }`.

    /**
     * `new Point(PointType)` style set.
     */
    const p1 = new Point()
    p1.set({ x: 100, y: 100 })
    expect(p1).toMatchObject({ x: 100, y: 100 }) // `p1` should match `{ x: 100, y: 100 }`.
  })

  it('Point#set should throw Error if y is not a number.', () => {
    const point = new Point()

    /**
     * String case.
     */
    // @ts-ignore
    expect(() => point.set(0, '')).toThrow() // `point.set` should throw Error.

    /**
     * Undefined case.
     */
    // @ts-ignore
    expect(() => point.set(0, undefined)).toThrow() // `point.set` should throw Error.
  })

  it('Point#asPointType should return `PointType` object.', () => {
    /**
     * Case 1.
     */
    const p0 = new Point(100, 100)
    expect(p0.asPointType()).toMatchObject({ x: 100, y: 100 }) // `p0.asPointType()` should return `{ x: 100, y: 100 }`.

    /**
     * Case 2.
     */
    const p1 = new Point({ x: 200, y: 200 })
    expect(p1.asPointType()).toMatchObject({ x: 200, y: 200 }) // `p1.asPointType()` should return `{ x: 200, y: 200 }.
  })
})

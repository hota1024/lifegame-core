import {
  IsNumber,
  IsUndefined,
  IsPointType,
  IsCell,
  IsCellState,
  IsFunction,
  IsHasCellState
} from '../src/Utilities'
import { Point } from '../src/Points'
import { Cell, CellState } from '../src/Cells'
import { HasCellState } from '../src/Types'

describe('Utilities test.', () => {
  it('IsNumber should return wether value is `number`.', () => {
    /**
     * Number cases.
     */
    expect(IsNumber(0)).toBeTruthy() // `0` is a `number`.
    expect(IsNumber(100)).toBeTruthy() // `100` is a `number`.

    /**
     * Other cases.
     */
    expect(IsNumber('')).toBeFalsy() // `''` is not a `number`.
    expect(IsNumber('abc')).toBeFalsy() // `'abc'` is not a `number`.
  })

  it('IsUndefined should return wether value is `undefined`.', () => {
    /**
     * Undfeind case.
     */
    expect(IsUndefined(undefined)).toBeTruthy() // `undefined` is a `undefined`.

    /**
     * Other cases.
     */
    expect(IsUndefined(0)).toBeFalsy() // `0` is not a `undefined`.
    expect(IsUndefined('')).toBeFalsy() // `''` is not a `undefined`.
    expect(IsUndefined(null)).toBeFalsy() // `null` is not a `undefined`.
  })

  it('IsPointType should return wether value is `PointType`.', () => {
    /**
     * PointType cases.
     */
    expect(IsPointType({ x: 100, y: 100 })).toBeTruthy() // `{ x: 100, y: 100 }` is a `PointType`.
    expect(IsPointType(new Point(0, 0))).toBeTruthy() // `new Point(0, 0)` is a `PointType`.

    /**
     * Other cases.
     */
    expect(IsPointType(undefined)).toBeFalsy() // `undefined` is not a `PointType`.
    expect(IsPointType({})).toBeFalsy() // `{}` is not a `PointType`.
    expect(IsPointType({ x: 100 })).toBeFalsy() // `{ x: 100 }` is not a `PointType`.
    expect(IsPointType({ y: 100 })).toBeFalsy() // `{ y: 100 }` is not a `PointType`.
  })

  it('IsCell should return wether value is `Cell`', () => {
    /**
     * Extended cell class.
     */
    class ExCell extends Cell {}

    /**
     * Cell case.
     */
    const cell = new Cell()
    expect(IsCell(cell)).toBeTruthy() // `cell` is a `Cell`.

    /**
     * Extended cell case.
     */
    const exCell = new ExCell()
    expect(IsCell(exCell)).toBeTruthy() // `exCell` is a `Cell`.

    /**
     * Other cases.
     */
    expect(IsCell(undefined)).toBeFalsy() // `undefined` is not a `Cell`.
    expect(IsCell({})).toBeFalsy() // `{}` is not a `Cell`.
  })

  it('IsCellState should return wether value is `CellState`.', () => {
    /**
     * CellState cases.
     */
    expect(IsCellState(CellState.Living)).toBeTruthy() // `CellState.Living` is a `CellState`.
    expect(IsCellState(CellState.Dead)).toBeTruthy() // `CellState.Dead` is a `CellState`.

    /**
     * Other cases.
     */
    expect(IsCellState(undefined)).toBeFalsy() // `undefined` is not a `CellState`.
    expect(IsCellState({})).toBeFalsy() // `{}` is not a `CellState`.
  })

  it('IsFunction should return wether value is function.', () => {
    /**
     * `function`.
     */
    function func() {}
    expect(IsFunction(func)).toBeTruthy() // `func` is a function.

    /**
     * Arrow function.
     */
    const arrowFunc = () => {}
    expect(IsFunction(arrowFunc)).toBeTruthy() // `arrowFunc` is a function.

    /**
     * Object method.
     */
    const obj = {
      method() {}
    }
    expect(IsFunction(obj.method)).toBeTruthy() // `obj.method` is a function.

    /**
     * Other cases.
     */
    expect(IsFunction(undefined)).toBeFalsy() // `undefined` is not a function.
    expect(IsFunction({})).toBeFalsy() // `{}` is not a function.
  })

  it('IsHasCellState should return wether value is `HasCellState`.', () => {
    /**
     * Has cell state object.
     */
    const hasState: HasCellState = {
      state: CellState.Living
    }
    expect(IsHasCellState(hasState)).toBeTruthy() // `hasState` is a `HasCellState`.

    /**
     * Cell.
     */
    const cell = new Cell()
    expect(IsHasCellState(cell)).toBeTruthy() // `cell` is a `HasCellState`.

    /**
     * Other cases.
     */
    expect(IsHasCellState(undefined)) // `undefined` is not a `HasCellState`.
    expect(IsHasCellState({})) // `{}` is not a `HasCellState`.
  })
})

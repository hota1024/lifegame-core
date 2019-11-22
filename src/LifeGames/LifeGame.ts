import {
  LifeGameInterface,
  LifeGameReviveIfCallback,
  LifeGameCallbackParamter,
  LifeGameKillIfCallback,
  LifeGameEachCallback,
  LifeGameSetEachCallback
} from './LifeGameInterface'
import { WorldInterface } from '../Worlds/WorldInterface'
import { EnvironmentInterface } from '../Environments/EnvironmentInterface'
import { PointType } from '../Points'
import { CellInterface, CellState } from '../Cells'
import { HasCellState } from '../Types/HasCellState'
import {
  IsNumber,
  IsCell,
  IsHasCellState,
  IsCellState,
  IsPointType,
  IsUndefined
} from '../Utilities'

/**
 * LifeGame class.
 */
export class LifeGame implements LifeGameInterface {
  /**
   * World member.
   */
  private mWorld: WorldInterface

  /**
   * Environment member.
   */
  private mEnvironment: EnvironmentInterface

  /**
   * LifeGame constructor.
   */
  constructor(world: WorldInterface, environment: EnvironmentInterface) {
    this.mWorld = world
    this.mEnvironment = environment
  }

  /**
   * World.
   */
  get world() {
    return this.mWorld
  }

  /**
   * Height.
   */
  get environment() {
    return this.mEnvironment
  }

  /**
   * World width.
   */
  get width() {
    return this.world.width
  }

  /**
   * World height.
   */
  get height() {
    return this.world.height
  }

  /**
   * Forward.
   */
  forward(step: number = 1) {
    for (let i = 0; i < step; ++i) {
      this.mWorld = this.environment.nextWorld(this.world)
    }
    return this
  }

  /**
   * Set cell or cell state.
   *
   * @param xOrPoint
   * @param yOrCellOrHasCellState
   * @param cellOrCellStateOrHasCellState
   */
  set(
    xOrPoint: number | PointType,
    yOrCellOrCellStateOrHasCellState:
      | number
      | CellInterface
      | CellState
      | HasCellState,
    cellOrCellStateOrHasCellState?: CellInterface | CellState | HasCellState
  ) {
    if (
      IsNumber(xOrPoint) &&
      IsNumber(yOrCellOrCellStateOrHasCellState) &&
      !IsUndefined(cellOrCellStateOrHasCellState)
    ) {
      return this.setCellOrCellStateByXAndY(
        xOrPoint,
        yOrCellOrCellStateOrHasCellState,
        cellOrCellStateOrHasCellState
      )
    }

    if (
      IsPointType(xOrPoint) &&
      !IsUndefined(yOrCellOrCellStateOrHasCellState) &&
      IsUndefined(cellOrCellStateOrHasCellState)
    ) {
      return this.setCellOrCellStateByPoint(
        xOrPoint,
        yOrCellOrCellStateOrHasCellState
      )
    }

    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Get cell by point or x and y.
   *
   * @param xOrPoint
   * @param y
   */
  get(xOrPoint: number | PointType, y?: number) {
    if (IsNumber(xOrPoint) && IsNumber(y)) {
      return this.getCellByXAndY(xOrPoint, y)
    }

    if (IsPointType(xOrPoint) && IsUndefined(y)) {
      return this.getCellByPoint(xOrPoint)
    }

    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Get state by point or x and y.
   *
   * @param xOrPoint
   * @param y
   */
  getState(xOrPoint: number | PointType, y?: number) {
    if (IsNumber(xOrPoint) && IsNumber(y)) {
      return this.getCellStateByXAndY(xOrPoint, y)
    }

    if (IsPointType(xOrPoint) && IsUndefined(y)) {
      return this.getCellStateByPoint(xOrPoint)
    }

    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Revive cell.
   *
   * @param xOrPoint
   * @param y
   */
  revive(xOrPoint?: number | PointType, y?: number) {
    if (IsNumber(xOrPoint) && IsNumber(y)) {
      return this.reviveByXAndY(xOrPoint, y)
    }
    if (IsPointType(xOrPoint) && IsUndefined(y)) {
      return this.reviveByPoint(xOrPoint)
    }

    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Kill cell.
   *
   * @param xOrPoint
   * @param y
   */
  kill(xOrPoint?: number | PointType, y?: number) {
    if (IsNumber(xOrPoint) && IsNumber(y)) {
      return this.killByXAndY(xOrPoint, y)
    }
    if (IsPointType(xOrPoint) && IsUndefined(y)) {
      return this.killByPoint(xOrPoint)
    }

    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Toggle cell state.
   */
  toggle(xOrPoint: number | PointType, y?: number) {
    this.get(xOrPoint, y).toggle()
    return this
  }

  /**
   * Fill by cell state or `HasCellState`.
   *
   * @param stateOrHasState
   */
  fill(stateOrHasState: CellState | HasCellState) {
    if (IsCellState(stateOrHasState)) {
      return this.fillByCellState(stateOrHasState)
    }
    if (IsHasCellState(stateOrHasState)) {
      return this.fillByHasCellState(stateOrHasState)
    }

    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Revive all cells.
   */
  reviveAll() {
    this.mWorld.reviveAll()
    return this
  }

  /**
   * Kill all cells.
   */
  killAll() {
    this.mWorld.killAll()
    return this
  }

  /**
   * Revive if.
   *
   * @param callback
   */
  reviveIf(callback: LifeGameReviveIfCallback) {
    let index = 0
    this.mWorld.each((x, y, cell) => {
      if (callback(this.createCallbackParamter({ index, x, y, cell }))) {
        this.mWorld.reviveCell(x, y)
      }
      ++index
    })

    return this
  }

  /**
   * Revive if.
   *
   * @param callback
   */
  killIf(callback: LifeGameKillIfCallback) {
    let index = 0
    this.mWorld.each((x, y, cell) => {
      if (callback(this.createCallbackParamter({ index, x, y, cell }))) {
        this.mWorld.killCell(x, y)
      }
      ++index
    })

    return this
  }

  /**
   * Each.
   *
   * @param callback
   */
  each(callback: LifeGameEachCallback) {
    let index = 0
    this.mWorld.each((x, y, cell) => {
      callback(this.createCallbackParamter({ index, x, y, cell }))
      ++index
    })

    return this
  }

  /**
   * Set each.
   *
   * @param callback
   */
  setEach(callback: LifeGameSetEachCallback) {
    let index = 0
    this.mWorld.each((x, y, cell) => {
      const result = callback(
        this.createCallbackParamter({ index, x, y, cell })
      )
      this.set(x, y, result)
      ++index
    })

    return this
  }

  /**
   * Create callback paramter.
   *
   * @param source
   */
  private createCallbackParamter(source: {
    index: number
    x: number
    y: number
    cell: CellInterface
  }) {
    const parameter: LifeGameCallbackParamter = {
      index: source.index,
      x: source.x,
      y: source.y,
      point: {
        x: source.x,
        y: source.y
      },
      cell: source.cell,
      state: source.cell.state
    }
    return parameter
  }

  /**
   * Fill by cell state.
   *
   * @param state
   */
  private fillByCellState(state: CellState) {
    this.mWorld.fillState(state)
    return this
  }

  /**
   * Fill by has cell state.
   *
   * @param hasState
   */
  private fillByHasCellState(hasState: HasCellState) {
    this.mWorld.fillState(hasState.state)
    return this
  }

  /**
   * Kill cell by x and y.
   *
   * @param x
   * @param y
   */
  private killByXAndY(x: number, y: number) {
    this.mWorld.killCell(x, y)
    return this
  }

  /**
   * Kill by point.
   *
   * @param point
   */
  private killByPoint(point: PointType) {
    this.mWorld.killCell(point.x, point.y)
    return this
  }

  /**
   * Revive cell by x and y.
   *
   * @param x
   * @param y
   */
  private reviveByXAndY(x: number, y: number) {
    this.mWorld.reviveCell(x, y)
    return this
  }

  /**
   * Revive by point.
   *
   * @param point
   */
  private reviveByPoint(point: PointType) {
    this.mWorld.reviveCell(point.x, point.y)
    return this
  }

  /**
   * Get cell state by x and y.
   *
   * @param x
   * @param y
   */
  private getCellStateByXAndY(x: number, y: number) {
    return this.mWorld.getCellState(x, y)
  }

  /**
   * Get cell state by point.
   *
   * @param point
   */
  private getCellStateByPoint(point: PointType) {
    return this.mWorld.getCellState(point.x, point.y)
  }

  /**
   * Get cell by x and y.
   *
   * @param x
   * @param y
   */
  private getCellByXAndY(x: number, y: number) {
    return this.mWorld.getCell(x, y)
  }

  /**
   * Get cell by point.
   *
   * @param point
   */
  private getCellByPoint(point: PointType) {
    return this.mWorld.getCell(point.x, point.y)
  }

  /**
   * Set cell or cell state by x and y.
   *
   * @param x
   * @param y
   * @param cellOrCellStateOrHasCellState
   */
  private setCellOrCellStateByXAndY(
    x: number,
    y: number,
    cellOrCellStateOrHasCellState: CellInterface | CellState | HasCellState
  ) {
    if (IsCell(cellOrCellStateOrHasCellState)) {
      return this.setCellByXAndY(x, y, cellOrCellStateOrHasCellState)
    }
    if (IsCellState(cellOrCellStateOrHasCellState)) {
      return this.setCellStateByXAndY(x, y, cellOrCellStateOrHasCellState)
    }
    if (IsHasCellState(cellOrCellStateOrHasCellState)) {
      return this.setCellStateByXAndYAndHasCellState(
        x,
        y,
        cellOrCellStateOrHasCellState
      )
    }
    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Set cell by x and y.
   *
   * @param x
   * @param y
   * @param cell
   */
  private setCellByXAndY(x: number, y: number, cell: CellInterface) {
    this.mWorld.setCell(x, y, cell)
    return this
  }

  /**
   * Set cell state by x and y.
   *
   * @param x
   * @param y
   * @param state
   */
  private setCellStateByXAndY(x: number, y: number, state: CellState) {
    this.mWorld.setCellState(x, y, state)
    return this
  }

  /**
   * Set cell state by x and y and `HasCellState`.
   *
   * @param x
   * @param y
   * @param hasState
   */
  private setCellStateByXAndYAndHasCellState(
    x: number,
    y: number,
    hasState: HasCellState
  ) {
    this.mWorld.setCellState(x, y, hasState.state)
    return this
  }

  /**
   * Set cell or cell state by point.
   *
   * @param point
   * @param cellOrCellStateOrHasCellState
   */
  private setCellOrCellStateByPoint(
    point: PointType,
    cellOrCellStateOrHasCellState: CellInterface | CellState | HasCellState
  ) {
    if (IsCell(cellOrCellStateOrHasCellState)) {
      return this.setCellByPoint(point, cellOrCellStateOrHasCellState)
    }
    if (IsCellState(cellOrCellStateOrHasCellState)) {
      return this.setCellStateByPoint(point, cellOrCellStateOrHasCellState)
    }
    if (IsHasCellState(cellOrCellStateOrHasCellState)) {
      return this.setCellStateByPointAndHasCellState(
        point,
        cellOrCellStateOrHasCellState
      )
    }
    throw new Error(`[lifegame-core] Undefined pattern.`)
  }

  /**
   * Set cell by point.
   *
   * @param point
   * @param cell
   */
  private setCellByPoint(point: PointType, cell: CellInterface) {
    this.mWorld.setCell(point.x, point.y, cell)
    return this
  }

  /**
   * Set cell state by point.
   *
   * @param point
   * @param state
   */
  private setCellStateByPoint(point: PointType, state: CellState) {
    this.mWorld.setCellState(point.x, point.y, state)
    return this
  }

  /**
   * Set cell state by point and `HasCellState`.
   *
   * @param point
   * @param hasState
   */
  private setCellStateByPointAndHasCellState(
    point: PointType,
    hasState: HasCellState
  ) {
    this.mWorld.setCellState(point.x, point.y, hasState.state)
    return this
  }
}

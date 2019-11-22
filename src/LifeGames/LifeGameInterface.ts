import { WorldInterface } from '../Worlds/WorldInterface'
import { EnvironmentInterface } from '../Environments/EnvironmentInterface'
import { CellState, CellInterface } from '../Cells'
import { HasCellState } from '../Types/HasCellState'
import { PointType } from '../Points'

/**
 * LifeGameEachCallbackParamter type.
 */
export type LifeGameCallbackParamter = {
  /**
   * Cell x.
   */
  x: number

  /**
   * Cell y.
   */
  y: number

  /**
   * Cell point.
   */
  point: PointType

  /**
   * Cell index.
   */
  index: number

  /**
   * Current cell.
   */
  cell: CellInterface

  /**
   * Current cell state.
   */
  state: CellState
}

/**
 * LifeGameCallback function type.
 */
export type LifeGameCallback<ReturnType> = (
  value: LifeGameCallbackParamter
) => ReturnType

/**
 * LifeGameEachCallback function type.
 */
export type LifeGameEachCallback = LifeGameCallback<void>

/**
 * LifeGameReviveIfCallback function type.
 */
export type LifeGameReviveIfCallback = LifeGameCallback<boolean>

/**
 * LifeGameKillIfCallback function type.
 */
export type LifeGameKillIfCallback = LifeGameCallback<boolean>

/**
 * LifeGameSetEachCallback function type.
 */
export type LifeGameSetEachCallback = LifeGameCallback<
  CellInterface | CellState | HasCellState
>

/**
 * LifeGame interface.
 */
export interface LifeGameInterface {
  /**
   * World.
   */
  readonly world: WorldInterface

  /**
   * Environment.
   */
  readonly environment: EnvironmentInterface

  /**
   * World width.
   */
  readonly width: number

  /**
   * World height.
   */
  readonly height: number

  /**
   * Forward.
   */
  forward(): this

  /**
   * Forward with steps.
   *
   * @param step
   */
  forward(step: number): this

  /**
   * Set cell.
   *
   * @param x
   * @param y
   * @param cell
   */
  set(x: number, y: number, cell: CellInterface): this

  /**
   * Set cell.
   *
   * @param point
   * @param cell
   */
  set(point: PointType, cell: CellInterface): this

  /**
   * Set cell.
   *
   * @param point
   * @param state
   */
  set(point: PointType, state: CellState): this

  /**
   * Set cell.
   *
   * @param x
   * @param y
   * @param state
   */
  set(x: number, y: number, state: CellState): this

  /**
   * Set cell state.
   *
   * @param x
   * @param y
   * @param hasCellState
   */
  set(x: number, y: number, hasCellState: HasCellState): this

  /**
   * Set cell state.
   *
   * @param point
   * @param hasCellState
   */
  set(point: PointType, hasCellState: HasCellState): this

  /**
   * Get cell.
   *
   * @param x
   * @param y
   */
  get(x: number, y: number): CellInterface

  /**
   * Get cell.
   *
   * @param point
   */
  get(point: PointType): CellInterface

  /**
   * Get cell state.
   *
   * @param x
   * @param y
   */
  getState(x: number, y: number): CellState

  /**
   * Get cell state.
   *
   * @param point
   */
  getState(point: PointType): CellState

  /**
   * Revive cell.
   *
   * @param x
   * @param y
   */
  revive(x: number, y: number): this

  /**
   * Revive cell.
   *
   * @param point
   */
  revive(point: PointType): this

  /**
   * Kill cell.
   *
   * @param x
   * @param y
   */
  kill(x: number, y: number): this

  /**
   * Kill cell.
   *
   * @param point
   */
  kill(point: PointType): this

  /**
   * Fill all cells with state.
   *
   * @param state
   */
  fill(state: CellState): this

  /**
   * Toggle cell state.
   */
  toggle(x: number, y: number): this

  /**
   * Toggle cell state.
   */
  toggle(point: PointType): this

  /**
   * Fill all cells with has state.
   *
   * @param state
   */
  fill(hasState: HasCellState): this

  /**
   * Revive all cells.
   */
  reviveAll(): this

  /**
   * Kill all cells.
   */
  killAll(): this

  /**
   * Revive if.
   *
   * @param callback
   */
  reviveIf(callback: LifeGameReviveIfCallback): this

  /**
   * Kill if.
   *
   * @param callback
   */
  killIf(callback: LifeGameReviveIfCallback): this

  /**
   * Each cells.
   *
   * @param callback
   * @param axis
   */
  each(callback: LifeGameEachCallback): this

  /**
   * Set each.
   *
   * @param callback
   * @param axis
   */
  setEach(callback: LifeGameSetEachCallback): this
}

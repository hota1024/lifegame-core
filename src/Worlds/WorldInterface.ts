import { CellInterface, CellState } from '../Cells'
import { Copyable } from '../Types'

export type WorldEachCallback = (
  x: number,
  y: number,
  cell: CellInterface
) => void

/**
 * World interface.
 */
export interface WorldInterface extends Copyable<WorldInterface> {
  /**
   * World width.
   */
  readonly width: number

  /**
   * World height.
   */
  readonly height: number

  /**
   * Set cell.
   *
   * @param x
   * @param y
   * @param cell
   */
  setCell(x: number, y: number, cell: CellInterface): void

  /**
   * Set cell state.
   *
   * @param x
   * @param y
   * @param state
   */
  setCellState(x: number, y: number, state: CellState): void

  /**
   * Get cell.
   *
   * @param x
   * @param y
   */
  getCell(x: number, y: number): CellInterface

  /**
   * Get cell state.
   *
   * @param x
   * @param y
   */
  getCellState(x: number, y: number): CellState

  /**
   * Get around cells.
   *
   * @param x
   * @param y
   */
  getAroundCells(x: number, y: number): CellInterface[]

  /**
   * Get around cells state.
   *
   * @param x
   * @param y
   */
  getAroundCellsState(x: number, y: number): CellState[]

  /**
   * Count around cells state.
   *
   * @param x
   * @param y
   * @param state
   */
  countAroundCellsState(x: number, y: number, state: CellState): number

  /**
   * Get cells state.
   */
  getCellsState(): CellState[]

  /**
   * Count cells state.
   */
  countCellsState(state: CellState): number

  /**
   * Check wether x and y is safe area point.
   *
   * @param x
   * @param y
   */
  isSafeArea(x: number, y: number): boolean

  /**
   * Check wether x and y is over area point.
   *
   * @param x
   * @param y
   */
  isOverArea(x: number, y: number): boolean

  /**
   * Fill cells state.
   *
   * @param state
   */
  fillState(state: CellState): void

  /**
   * Revive cell.
   *
   * @param x
   * @param y
   */
  reviveCell(x: number, y: number): void

  /**
   * Kill cell.
   *
   * @param x
   * @param y
   */
  killCell(x: number, y: number): void

  /**
   * Revive all cells.
   */
  reviveAll(): void

  /**
   * Kill all cells.
   */
  killAll(): void

  /**
   * World area.
   */
  area(): number

  /**
   * Each.
   *
   * @param callback
   */
  each(callback: WorldEachCallback): void
}

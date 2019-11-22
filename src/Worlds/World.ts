import { WorldInterface, WorldEachCallback } from './WorldInterface'
import { CellInterface, CellState } from '../Cells'

export abstract class World implements WorldInterface {
  /**
   * World width.
   */
  abstract readonly width: number

  /**
   * World height.
   */
  abstract readonly height: number

  /**
   * Copy world.
   */
  abstract copy(): WorldInterface

  /**
   * Set cell.
   *
   * @param x
   * @param y
   * @param cell
   */
  abstract setCell(x: number, y: number, cell: CellInterface): void

  /**
   * Set cell state.
   *
   * @param x
   * @param y
   * @param state
   */
  abstract setCellState(x: number, y: number, state: CellState): void

  /**
   * Get cell.
   *
   * @param x
   * @param y
   */
  abstract getCell(x: number, y: number): CellInterface

  /**
   * Get cell state.
   *
   * @param x
   * @param y
   */
  abstract getCellState(x: number, y: number): CellState

  /**
   * Get around cells.
   *
   * @param x
   * @param y
   */
  getAroundCells(x: number, y: number) {
    const cells = []
    if (this.isSafeArea(x - 1, y - 1)) cells.push(this.getCell(x - 1, y - 1))
    if (this.isSafeArea(x, y - 1)) cells.push(this.getCell(x, y - 1))
    if (this.isSafeArea(x + 1, y - 1)) cells.push(this.getCell(x + 1, y - 1))
    if (this.isSafeArea(x - 1, y)) cells.push(this.getCell(x - 1, y))
    if (this.isSafeArea(x + 1, y)) cells.push(this.getCell(x + 1, y))
    if (this.isSafeArea(x - 1, y + 1)) cells.push(this.getCell(x - 1, y + 1))
    if (this.isSafeArea(x, y + 1)) cells.push(this.getCell(x, y + 1))
    if (this.isSafeArea(x + 1, y + 1)) cells.push(this.getCell(x + 1, y + 1))
    return cells
  }

  /**
   * Get around cells state.
   *
   * @param x
   * @param y
   */
  getAroundCellsState(x: number, y: number) {
    return this.getAroundCells(x, y).map(({ state }) => state)
  }

  /**
   * Count around cells state.
   *
   * @param x
   * @param y
   * @param state
   */
  countAroundCellsState(x: number, y: number, state: CellState) {
    let count = 0
    this.getAroundCellsState(x, y).forEach(cellState => {
      if (cellState === state) ++count
    })
    return count
  }

  /**
   * Get cells state.
   */
  getCellsState() {
    const states: CellState[] = []
    this.each((x, y, cell) => {
      states.push(cell.state)
    })
    return states
  }

  /**
   * Count cells state.
   *
   * @param state
   */
  countCellsState(state: CellState) {
    let count = 0
    this.getCellsState().forEach(cellState => {
      if (state === cellState) ++count
    })
    return count
  }

  /**
   * Check whether x and y is safe area point.
   *
   * @param x
   * @param y
   */
  isSafeArea(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }

  /**
   * Check whether x and y is over area point.
   *
   * @param x
   * @param y
   */
  isOverArea(x: number, y: number) {
    return x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1
  }

  /**
   * Fill cells state.
   *
   * @param state
   */
  abstract fillState(state: CellState): void

  /**
   * Revive cell.
   *
   * @param x
   * @param y
   */
  reviveCell(x: number, y: number) {
    this.setCellState(x, y, CellState.Living)
  }

  /**
   * Kill cell.
   *
   * @param x
   * @param y
   */
  killCell(x: number, y: number) {
    this.setCellState(x, y, CellState.Dead)
  }

  /**
   * Revive all cells.
   */
  reviveAll() {
    this.fillState(CellState.Living)
  }

  /**
   * Kill all cells.
   */
  killAll() {
    this.fillState(CellState.Dead)
  }

  /**
   * World area.
   */
  area() {
    return this.width * this.height
  }

  /**
   * Each.
   *
   * @param callback
   */
  each(callback: WorldEachCallback) {
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        callback(x, y, this.getCell(x, y))
      }
    }
  }
}

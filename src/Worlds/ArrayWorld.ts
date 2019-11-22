import { CellState, CellInterface } from '../Cells'
import { World } from './World'
import { Constructor } from '../Types'

/**
 * ArrayWorld class.
 */
export class ArrayWorld<CellType extends CellInterface> extends World {
  /**
   * Width member.
   */
  private mWidth: number

  /**
   * Height member.
   */
  private mHeight: number

  /**
   * Cell array.
   */
  private cellArray: CellType[] = []

  /**
   * Cell constructor member.
   */
  private mCellConstructor: Constructor<CellType>

  /**
   * ArrayWorld constructor.
   *
   * @param width
   * @param height
   */
  constructor(
    width: number,
    height: number,
    CellConstructor: Constructor<CellType>
  ) {
    super()
    this.mWidth = width
    this.mHeight = height
    this.mCellConstructor = CellConstructor
    this.initCells()
  }

  /**
   * World width.
   */
  get width() {
    return this.mWidth
  }

  /**
   * World height.
   */
  get height() {
    return this.mHeight
  }

  /**
   * Cell constructor.
   */
  get CellConstructor() {
    return this.mCellConstructor
  }

  /**
   * Copy world.
   */
  copy() {
    const world = new ArrayWorld(this.width, this.height, this.CellConstructor)
    world.setArray(this.cellArray.map(cell => cell.copy() as CellType))
    return world
  }

  /**
   * Set array.
   *
   * @param worldArray
   */
  setArray(worldArray: CellType[]) {
    this.cellArray = worldArray
  }

  /**
   * Set cell.
   *
   * @param x
   * @param y
   * @param cell
   */
  setCell(x: number, y: number, cell: CellType) {
    this.cellArray[this.getPointIndex(x, y)] = cell
  }

  /**
   * Set cell state.
   *
   * @param x
   * @param y
   * @param state
   */
  setCellState(x: number, y: number, state: CellState) {
    this.cellArray[this.getPointIndex(x, y)].setState(state)
  }

  /**
   * Get cell.
   *
   * @param x
   * @param y
   */
  getCell(x: number, y: number) {
    return this.cellArray[this.getPointIndex(x, y)]
  }

  /**
   * Get cell state.
   *
   * @param x
   * @param y
   */
  getCellState(x: number, y: number) {
    return this.cellArray[this.getPointIndex(x, y)].state
  }

  /**
   * Fill cells state.
   *
   * @param state
   */
  fillState(state: CellState) {
    for (let i = 0; i < this.area(); ++i) {
      this.cellArray[i].setState(state)
    }
  }

  /**
   * Initialize cells.
   *
   * @param defaultCellState
   */
  private initCells(defaultCellState: CellState = CellState.Dead) {
    this.cellArray = []
    for (let i = 0; i < this.area(); ++i) {
      this.cellArray.push(new this.CellConstructor(defaultCellState))
    }
  }

  /**
   * Get point index.
   *
   * @param x
   * @param y
   */
  private getPointIndex(x: number, y: number) {
    return y * this.mWidth + x
  }
}

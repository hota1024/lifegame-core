import { ArrayWorld } from '../src/Worlds'
import { Cell, CellState } from '../src/Cells'
import { ConsoleWorldRenderer } from '../src/WorldRenderers/ConsoleWorldRenderer'

describe('ArrayWorld test.', () => {
  it('ArrayWorld#constructor should set width and height and CellConstructor.', () => {
    /**
     * Generate 10 x 20 world and set Cell.
     */
    const world = new ArrayWorld(10, 20, Cell)
    expect(world.width).toBe(10) // `world.width` must be 10.
    expect(world.height).toBe(20) // `world.height` must be 20.
    expect(world.CellConstructor).toBe(Cell) // `world.CellCosntructor` must be `Cell`.
  })

  it('ArrayWorld#copy should return copy.', () => {
    /**
     * Generate 5 x 5 and set Cell and copy.
     */
    const world = new ArrayWorld(5, 5, Cell)
    world.setCellState(1, 1, CellState.Living)
    const copy = world.copy()

    expect(copy).not.toBe(world) // `copy` must not be `world`.
    expect(copy.width).toBe(world.width) // `copy.width` must be `world.width`.
    expect(copy.height).toBe(world.height) // `copy.height` must be `world.height`.
    expect(copy.getCellState(1, 1)).toBe(world.getCellState(1, 1)) // `copy.getCellState(1, 1)` must be `world.getCellState(1, 1)`.
  })

  it('ArrayWorld#setArray should set cell array.', () => {
    /**
     * Generate 1 x 1 world and set Cell.
     */
    const world = new ArrayWorld(1, 1, Cell)
    world.setArray([new Cell(CellState.Living)])
    const cell = world.getCell(0, 0)

    expect(cell.isLiving()).toBeTruthy() // `cell.isLiving()` must be true.
  })

  it('ArrayWorld#setCell should set cell.', () => {
    /**
     * Generate 1 x 1 world and set Cell.
     */
    const world = new ArrayWorld(1, 1, Cell)
    const cell = new Cell(CellState.Living)
    const oldCell = world.getCell(0, 0)
    world.setCell(0, 0, cell)
    const currentCell = world.getCell(0, 0)

    expect(cell).not.toBe(oldCell) // `cell` must not be `oldCell`.
    expect(currentCell).toBe(cell) // `currentCell` must be `cell`.
  })

  it('ArrayWorld#setState should set cell state.', () => {
    const world = new ArrayWorld(1, 1, Cell)

    /**
     * Living case.
     */
    world.setCellState(0, 0, CellState.Living)
    expect(world.getCellState(0, 0)).toBe(CellState.Living) // `world.getCellState(0, 0)` must to be `CellState.Living`.

    /**
     * Dead case.
     */
    world.setCellState(0, 0, CellState.Dead)
    expect(world.getCellState(0, 0)).toBe(CellState.Dead) // `world.getCellState(0, 0)` must to be `CellState.Dead`.
  })

  it('ArrayWorld#getCell should get cell.', () => {
    const world = new ArrayWorld(1, 1, Cell)
    const cell = new Cell(CellState.Living)
    world.setCell(0, 0, cell)
    const worldCell = world.getCell(0, 0)

    expect(worldCell).toBe(cell) // `worldCell` must be `cell`.
  })

  it('ArrayWorld#countAroundCellsState should return around cells.', () => {
    const world = new ArrayWorld(3, 3, Cell)
    // /**
    //  * □ □ □
    //  * ■ ■ ■
    //  * □ □ □
    //  */
    world.setCellState(0, 0, CellState.Dead)
    world.setCellState(1, 0, CellState.Dead)
    world.setCellState(2, 0, CellState.Dead)
    world.setCellState(0, 1, CellState.Living)
    world.setCellState(1, 1, CellState.Living)
    world.setCellState(2, 1, CellState.Living)
    world.setCellState(0, 2, CellState.Dead)
    world.setCellState(1, 2, CellState.Dead)
    world.setCellState(2, 2, CellState.Dead)

    /**
     * Living cell case.
     */
    const livingCount = world.countAroundCellsState(1, 1, CellState.Living)
    expect(livingCount).toBe(2)

    /**
     * Dead cell case.
     */
    const deadCount = world.countAroundCellsState(1, 1, CellState.Dead)
    expect(deadCount).toBe(6)

    /**
     * Zero world case.
     */
    const zeroWorld = new ArrayWorld(0, 0, Cell)
    expect(zeroWorld.countAroundCellsState(0, 0, CellState.Living)).toBe(0)
    expect(zeroWorld.countAroundCellsState(0, 0, CellState.Dead)).toBe(0)
  })

  it('ArrayWorld#countCellsState should return count cell state.', () => {
    const world = new ArrayWorld(3, 3, Cell)

    /**
     * Dead case.
     */
    world.killAll()
    expect(world.countCellsState(CellState.Living)).toBe(0)
    expect(world.countCellsState(CellState.Dead)).toBe(9)

    /**
     * Living case.
     */
    world.reviveAll()
    expect(world.countCellsState(CellState.Living)).toBe(9)
    expect(world.countCellsState(CellState.Dead)).toBe(0)
  })

  it('ArrayWorld#isOverArea should return wheter point is over area.', () => {
    const world = new ArrayWorld(3, 3, Cell)

    /**
     * Truthy cases.
     */
    expect(world.isOverArea(-1, -1)).toBeTruthy()
    expect(world.isOverArea(3, 3)).toBeTruthy()

    /**
     * Falsy cases.
     */
    expect(world.isOverArea(0, 0)).toBeFalsy()
    expect(world.isOverArea(2, 2)).toBeFalsy()
  })

  it('ArrayWorld#reviveCell should revive cell.', () => {
    const world = new ArrayWorld(1, 1, Cell)
    world.setCellState(0, 0, CellState.Dead)

    /**
     * Revive.
     */
    world.reviveCell(0, 0)
    expect(world.getCell(0, 0).isLiving()).toBeTruthy()
  })

  it('ArrayWorld#killCell should revive cell.', () => {
    const world = new ArrayWorld(1, 1, Cell)
    world.setCellState(0, 0, CellState.Living)

    /**
     * Kill.
     */
    world.killCell(0, 0)
    expect(world.getCell(0, 0).isDead()).toBeTruthy()
  })

  it('ArrayWorld#reviveAll should revive all cells.', () => {
    const world = new ArrayWorld(3, 3, Cell)
    world.killAll()
    /**
     * ■ □ □
     * □ ■ □
     * □ □ ■
     */
    world.setCellState(0, 0, CellState.Living)
    world.setCellState(1, 1, CellState.Living)
    world.setCellState(2, 2, CellState.Living)

    world.reviveAll()
    expect(world.countCellsState(CellState.Living)).toBe(9)
  })

  it('ArrayWorld#killAll should revive all cells.', () => {
    const world = new ArrayWorld(3, 3, Cell)
    world.killAll()
    /**
     * ■ □ □
     * □ ■ □
     * □ □ ■
     */
    world.setCellState(0, 0, CellState.Living)
    world.setCellState(1, 1, CellState.Living)
    world.setCellState(2, 2, CellState.Living)

    world.killAll()

    expect(world.countCellsState(CellState.Dead)).toBe(9)
  })
})

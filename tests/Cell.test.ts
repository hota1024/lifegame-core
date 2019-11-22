import { Cell, CellState } from '../src/Cells'

describe('Cell test.', () => {
  it('Cell#constructor should set initial state.', () => {
    /**
     * Instantiate living cell.
     */
    const livingCell = new Cell(CellState.Living)
    expect(livingCell.state).toBe(CellState.Living)

    /**
     * Instantiate dead cell.
     */
    const deadCell = new Cell(CellState.Dead)
    expect(deadCell.state).toBe(CellState.Dead) // Cell state must be `CellState.Dead`.
  })

  it('Cell#setState should set state.', () => {
    const cell = new Cell()

    /**
     * Set to `CellState.Living`.
     */
    cell.setState(CellState.Living)
    expect(cell.state).toBe(CellState.Living) // Cell state must be `CellState.Living`.

    /**
     * Set to `CellState.Dead`.
     */
    cell.setState(CellState.Dead)
    expect(cell.state).toBe(CellState.Dead) // Cell state must be `CellState.Dead`.
  })

  it('Cell#revive should set state to `CellState.Living`.', () => {
    const cell = new Cell(CellState.Dead) // Instantiate dead cell.

    /**
     * Revive cell.
     */
    cell.revive()
    expect(cell.state).toBe(CellState.Living) // Cell state must be `CellState.Living`.
  })

  it('Cell#kill should set state to `CellState.Dead`.', () => {
    const cell = new Cell(CellState.Living) // Instantiate living cell.

    /**
     * Kill cell.
     */
    cell.kill()
    expect(cell.state).toBe(CellState.Dead) // Cell state must be `CellState.Dead`.
  })

  it('Cell#toggle should toggle state to `CellState.Living` or `CellState.Dead`.', () => {
    /**
     * Living cell.
     */
    const livingCell = new Cell(CellState.Living)
    livingCell.toggle()
    expect(livingCell.state).toBe(CellState.Dead) // Cell state must be `CellState.Dead`.

    /**
     * Dead cell.
     */
    const deadCell = new Cell(CellState.Dead)
    deadCell.toggle()
    expect(deadCell.state).toBe(CellState.Living) // Cell state must be `CellState.Living`.
  })

  it('Cell#toggle should return after state.', () => {
    /**
     * Living cell.
     */
    const livingCell = new Cell(CellState.Living)
    expect(livingCell.toggle()).toBe(CellState.Dead) // `livingCell.toggle()` should return `CellState.Dead`.

    /**
     * Dead cell.
     */
    const deadCell = new Cell(CellState.Dead)
    expect(deadCell.toggle()).toBe(CellState.Living) // `livingCell.toggle()` should return `CellState.Living`.
  })

  it('Cell#toggle should throw error if state is invalid.', () => {
    // @ts-ignore
    const invalidCell = new Cell('abcdefg')
    expect(() => invalidCell.toggle()).toThrow(Error)
  })

  it('Cell#isLiving should return whether state is `CellState.Living`.', () => {
    /**
     * Living cell.
     */
    const livingCell = new Cell(CellState.Living)
    expect(livingCell.isLiving()).toBeTruthy() // `livingCell.isLiving` should return `true`.

    /**
     * Dead cell.
     */
    const deadCell = new Cell(CellState.Dead)
    expect(deadCell.isLiving()).toBeFalsy() // `deadCell.isLiving` should return `false`.
  })

  it('Cell#isDead should return whether state is `CellState.Dead`.', () => {
    /**
     * Dead cell.
     */
    const deadCell = new Cell(CellState.Dead)
    expect(deadCell.isDead()).toBeTruthy() // `deadCell.isDead` should return `true`.

    /**
     * Living cell.
     */
    const livingCell = new Cell(CellState.Living)
    expect(livingCell.isDead()).toBeFalsy() // `livingCell.isDead` should return `false`.
  })

  it('Cell#copy should return copy.', () => {
    const cell = new Cell()
    const copy = cell.copy()

    expect(cell).not.toBe(copy) // `cell` should'nt be `copy`.
  })
})

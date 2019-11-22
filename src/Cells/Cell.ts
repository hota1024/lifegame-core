import { CellInterface, CellState } from '.'

/**
 * Cell class.
 */
export class Cell implements CellInterface {
  /**
   * Cell state member.
   */
  private mState: CellState = CellState.Dead

  /**
   * Cell constructor.
   *
   * @param initialState
   */
  constructor(initialState: CellState = CellState.Dead) {
    this.setState(initialState)
  }

  /**
   * Cell state.
   */
  get state() {
    return this.mState
  }

  /**
   * Coppy cell.
   */
  copy() {
    return new Cell(this.state)
  }

  /**
   * Set state.
   *
   * @param state
   */
  setState(state: CellState) {
    this.mState = state
  }

  /**
   * Set state to `CellState.Living`
   */
  revive() {
    this.setState(CellState.Living)
  }

  /**
   * Set state to `CellState.Dead`
   */
  kill() {
    this.setState(CellState.Dead)
  }

  /**
   * Toggle state.
   *
   * @returns After state.
   */
  toggle() {
    const state = this.getToggleState()
    this.setState(state)

    return this.mState
  }

  /**
   * Check whether state is `CellState.Living`.
   */
  isLiving() {
    return this.state === CellState.Living
  }

  /**
   * Check whether state is `CellState.Dead`.
   */
  isDead() {
    return this.state === CellState.Dead
  }

  /**
   * Get toggle state.
   */
  private getToggleState() {
    if (this.mState === CellState.Living) return CellState.Dead
    if (this.mState === CellState.Dead) return CellState.Living
    throw new Error(`[lifegame-core] Invalid state.`)
  }
}

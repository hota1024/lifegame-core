import { CellState } from './'
import { Copyable } from '../Types'

/**
 * Cell interface.
 */
export interface CellInterface extends Copyable<CellInterface> {
  /**
   * Cell state.
   */
  readonly state: CellState

  /**
   * Set state.
   *
   * @param state
   */
  setState(state: CellState): void

  /**
   * Set state to `CellState.Living`.
   */
  revive(): void

  /**
   * Set state to `CellState.Dead`.
   */
  kill(): void

  /**
   * Toggle state.
   *
   * @returns After state.
   */
  toggle(): CellState

  /**
   * Check weather state is `CellState.Living`.
   */
  isLiving(): boolean

  /**
   * Check whether state is `CellState.Dead`.
   */
  isDead(): boolean
}

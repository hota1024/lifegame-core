import { IsUndefined } from './'
import { CellState } from '../Cells'

/**
 * Check wehter value is `CellState`.
 *
 * @param value
 */
export function IsCellState(value: any): value is CellState {
  if (IsUndefined(value)) return false
  return value === CellState.Living || value === CellState.Dead
}

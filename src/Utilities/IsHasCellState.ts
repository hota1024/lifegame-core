import { HasCellState } from '../Types/HasCellState'
import { IsUndefined } from './IsUndefined'
import { IsCellState } from './IsCellState'

/**
 * Check wether value has `CellState`.
 *
 * @param value
 */
export function IsHasCellState(value: any): value is HasCellState {
  if (IsUndefined(value)) return false
  return IsCellState(value.state)
}

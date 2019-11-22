import { Cell } from '../Cells'
import { IsUndefined } from './'

/**
 * Check whether value is `Cell`.
 *
 * @param value
 */
export function IsCell(value: any): value is Cell {
  if (IsUndefined(value)) return false
  return value instanceof Cell
}

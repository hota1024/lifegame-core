import { IsUndefined, IsNumber } from '.'
import { PointType } from '../Points'

/**
 * Check wheter value is `PointType`.
 *
 * @param value
 */
export function IsPointType(value: any): value is PointType {
  if (IsUndefined(value)) return false
  return IsNumber(value.x) && IsNumber(value.y)
}

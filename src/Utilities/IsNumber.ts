/**
 * Check wheter value is `number`.
 *
 * @param value
 */
export function IsNumber(value: any): value is number {
  return typeof value === 'number'
}

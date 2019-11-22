/**
 * Check whether value is `undefined`.
 *
 * @param value
 */
export function IsUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

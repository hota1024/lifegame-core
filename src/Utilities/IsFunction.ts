/**
 * Check wheter value is `Function`.
 *
 * @param value
 */
export function IsFunction(value: any): value is Function {
  return typeof value === 'function'
}

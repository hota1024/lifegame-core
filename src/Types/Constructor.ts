/**
 * Constructor type.
 */
export type Constructor<ClassType> = {
  new (args: any): ClassType
}

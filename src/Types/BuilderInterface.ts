/**
 * Builder interface.
 */
export interface BuilderInterface<Type> {
  /**
   * Build.
   */
  build(): Type | Promise<Type>
}

import { WorldInterface } from '../Worlds'

/**
 * WorldRenderer interface.
 */
export interface WorldRendererInterface {
  /**
   * Draw world.
   *
   * @param world
   */
  draw(world: WorldInterface): void
}

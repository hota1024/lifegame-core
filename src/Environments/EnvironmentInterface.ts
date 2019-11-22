import { WorldInterface } from '../Worlds/WorldInterface'

/**
 * Environment interface.
 */
export interface EnvironmentInterface {
  /**
   * Next world.
   *
   * @param world
   */
  nextWorld(world: WorldInterface): WorldInterface
}

import { EnvironmentInterface } from './EnvironmentInterface'
import { WorldInterface } from '../Worlds/WorldInterface'

export class Environment implements EnvironmentInterface {
  /**
   * Next world.
   *
   * @param world
   */
  nextWorld(world: WorldInterface) {
    return world.copy()
  }
}

import { EnvironmentInterface } from './EnvironmentInterface'
import { WorldInterface } from '../Worlds/WorldInterface'
import { CellState } from '../Cells'

export class BasicEnvironment implements EnvironmentInterface {
  /**
   * Next world.
   *
   * @param world
   */
  nextWorld(world: WorldInterface) {
    const afterWorld = world.copy()

    world.each((x, y, cell) => {
      const count = world.countAroundCellsState(x, y, CellState.Living)

      if (cell.isDead() && count === 3) {
        afterWorld.reviveCell(x, y)
      } else if (cell.isLiving() && (count === 2 || count === 3)) {
        afterWorld.reviveCell(x, y)
      } else {
        afterWorld.killCell(x, y)
      }
    })

    return afterWorld
  }
}

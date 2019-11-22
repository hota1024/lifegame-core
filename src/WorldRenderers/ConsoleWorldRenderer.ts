import { WorldRendererInterface } from './WorldRendererInterface'
import { WorldInterface } from '../Worlds'
import { CellState } from '../Cells'

/**
 * ConsoleWorldRenderer constructor options.
 */
export type ConsoleWorldRendererOptions = {
  /**
   * Living cell character(default is `■`).
   */
  livingCharacter: string
  /**
   * Dead cell character(default is `□`).
   */
  deadCharacter: string
  /**
   * New line character(default is `\n`)
   */
  newLineCharacter: string
}

/*
 * ConsoleWorldRenderer class.
 */
export class ConsoleWorldRenderer implements WorldRendererInterface {
  /**
   * ConsoleWorldRenderer constructor.
   *
   * @param options
   */
  constructor(
    private options: ConsoleWorldRendererOptions = {
      livingCharacter: '■',
      deadCharacter: '□',
      newLineCharacter: '\n'
    }
  ) {}

  /**
   * Draw.
   *
   * @param world
   */
  draw(world: WorldInterface) {
    // eslint-disable-next-line no-console
    console.log(this.worldToText(world))
  }

  /**
   * World to text.
   *
   * @param world
   */
  private worldToText(world: WorldInterface) {
    let text = ''

    for (let y = 0; y < world.height; ++y) {
      for (let x = 0; x < world.height; ++x) {
        text += this.cellStateToCharacter(world.getCellState(x, y))
      }
      text += this.options.newLineCharacter
    }

    return text
  }

  /**
   * Cell state to character.
   *
   * @param state
   */
  private cellStateToCharacter(state: CellState) {
    if (state === CellState.Living) return this.options.livingCharacter
    if (state === CellState.Dead) return this.options.deadCharacter
    throw new Error(`[lifegame-core] Invalid cell state.`)
  }
}

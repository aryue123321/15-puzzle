import { writable } from "svelte/store";
import { Puzzle, Direction } from "../puzzle";

const h = 2;
const w = 2

const createPuzzleHistory = () =>{
  const { subscribe, set, update } = writable<Puzzle|null>(Puzzle.GenRandomBoard(h, w));

  return {
    subscribe,
    move: (newPuzzle:Puzzle) => update(puzzle => {
      // console.log(newPuzzle.getParent().getBoard()) 
      return newPuzzle
    }),
    undo: () => update(puzzle => puzzle.getParent()),
    reset: (h:number|null=null, w:number|null=null) => {
      set(Puzzle.GenRandomBoard(h, w))
    }
  }
}

export const history = createPuzzleHistory();
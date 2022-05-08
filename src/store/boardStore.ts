import { writable } from "svelte/store";
import { Puzzle } from "../puzzle";

const h = 4;
const w = 4

const createPuzzleHistory = () =>{
  const { subscribe, set, update } = writable<Puzzle[]>([Puzzle.GenRandomBoard(h, w)]);

  return {
    subscribe,
    move: (puzzle:Puzzle) => update(puzzles => [...puzzles, puzzle]),
    undo: () => update(puzzles => [...puzzles.splice(-1)]),
    reset: () => set([Puzzle.GenRandomBoard(h, w)])
  }
}

export const history = createPuzzleHistory();
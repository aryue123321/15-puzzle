import * as _ from "lodash";
import * as util from "./util";

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}


class Puzzle{
  parent: Puzzle|null
  board: number[][]
  zero: number[]
  g: number
  constructor(parent:Puzzle|null, board: number[][], g: number){
    this.parent = parent;
    this.board = board;
    this.zero = util.findIndexOfValue(board, 0);
    this.g = g;
  }
  getBoard(){
    return this.board;
  }
  getPossibleMove(){
    const [y, x] = this.zero;
    const h = this.board.length;
    const w = this.board[0].length;
    const res = new Set<Direction>();
    if(x > 0)
      res.add(Direction.Down);
    if(x < h)
      res.add(Direction.Up);
    if(y > 0)
      res.add(Direction.Right);
    if(y < w)
      res.add(Direction.Left);
    return res;
  }
  swap(direction: Direction){
    
  }
}


const GenRandomBoard = (h:number, w: number) =>{
  var arr = Array.from(Array(h*w).keys())
  const shuffledArr = _.shuffle(arr);
  const res = util.oneDtoTwoD(shuffledArr, h, w);
  const board = new Puzzle(null, res, 0);
  return board;
}


export {
  GenRandomBoard,
  Puzzle,
  Direction
}
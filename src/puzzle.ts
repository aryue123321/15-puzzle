import * as _ from "lodash";
import * as util from "./util";

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}


class Puzzle{
  private parent: Puzzle|null
  private board: number[][]
  private zero: number[]
  private g: number
  constructor(parent:Puzzle|null, board: number[][], g: number){
    this.parent = parent;
    this.board = board;
    this.zero = util.findIndexOfValue(board, 0);
    this.g = g;
  }
  getBoard(){
    return this.board;
  }
  getOneDBoard(){
    return util.twoDtoOneD(this.board);
  }
  getPossibleMove(){
    const [x0, y0] = this.zero;
    const h = this.board.length;
    const w = this.board[0].length;
    const res = new Map<Direction, number[]>();
    if(x0 < h-1)
      res.set(Direction.Up, [x0+1, y0]);
    if(x0 > 0)
      res.set(Direction.Down, [x0-1, y0]);
    if(y0 < w-1)
      res.set(Direction.Left, [x0, y0+1]);
    if(y0 > 0)
      res.set(Direction.Right, [x0, y0-1]);
    return res;
  }
  swap(direction: Direction){
    const possibleMoves = this.getPossibleMove();
    if(!possibleMoves.has(direction))
      throw "invalid move";
    const newBoard = _.cloneDeep(this.getBoard());
    const [x0, y0] = this.zero;
    const [xv, yx] = possibleMoves.get(direction);
    newBoard[x0][y0] = newBoard[xv][yx];
    newBoard[xv][yx] = 0;
    return new Puzzle(this, newBoard, this.g+1);
  }
  swapByIndex(i:number, j:number){
    const [x0, y0] = this.zero;
    if(i == x0+1 && y0 == j)
      return this.swap(Direction.Up);
    if(i == x0-1 && y0 == j)
      return this.swap(Direction.Down);
    if(i == x0 && y0+1 == j)
      return this.swap(Direction.Left);
    if(i == x0 && y0-1 == j)
      return this.swap(Direction.Right);
    return false;
  }
  swapByValue(value: number){
    const [x, y] = util.findIndexOfValue(this.board, value);
    return this.swapByIndex(x, y);
  }

  getZero(){
    return this.zero;
  }

  getScore(){
    return this.g;
  }
  hasWon(){
    const current = this.getOneDBoard();
    const target = Array.from(Array(current.length).keys()).map(x=>x+1);
    target[target.length-1] = 0;
    return _.isEqual(current, target);
  }

  public static GenRandomBoard = (h:number, w: number) =>{
    const board = util.genSolvabled2D(h, w);
    const puzzle = new Puzzle(null, board, 0);
    return puzzle;
  }
}


export {
  Puzzle,
  Direction
}
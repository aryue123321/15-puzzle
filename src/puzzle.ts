import * as _ from "lodash"

const FindValueAt = (board:number[][], value:number){
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[0].length; j++){
      if(board[i][j] === value){
        return [i, j];
      }
    }
  } 
}


class Puzzle{
  parent: Puzzle|null
  board: number[][]
  zero: number[]
  g: number
  constructor(parent:Puzzle|null, board: number[][], g: number){
    this.parent = parent;
    this.board = board;
    this.zero = FindValueAt(board, 0);
    this.g = g;
  }
}


const GenRandomBoard = (h:number, w: number) =>{
  var arr = Array.from(Array(h*w).keys())
  const shuffledArr = _.shuffle(arr);
  const res = new Array(h).fill(0).map(() => new Array(w).fill(0));
  for(let i = 0; i < h; i++){
    for(let j = 0; j < w; j++){
      res[i][j] = shuffledArr[i*w+j]
    }
  }
}


export {
  GenRandomBoard,
  Puzzle
}
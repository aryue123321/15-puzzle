const oneDtoTwoD = (oneDArr: number[], h:number, w: number) => {
  if(h*w != oneDArr.length)
    throw "dimension of array not matched";
  const res = new Array(h).fill(0).map(() => new Array(w).fill(0));
  for(let i = 0; i < h; i++){
    for(let j = 0; j < w; j++){
      res[i][j] = oneDArr[i*w+j]
    }
  }
  return res;
}

const findIndexOfValue = (board:number[][], value:number) =>{
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[0].length; j++){
      if(board[i][j] === value){
        return [i, j];
      }
    }
  } 
}

export {
  oneDtoTwoD, 
  findIndexOfValue
}
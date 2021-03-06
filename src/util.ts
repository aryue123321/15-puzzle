import _ from "lodash";

const IsSolvable = (twoDArr: number[][]) => {
  const arr = twoDtoOneD(twoDArr);
  const len = arr.length;
  let count = 0;
  for(let i = 0; i < len - 1; i++){
    for(let j = i+1; j < len; j++){
      if(arr[i] && arr[j] && arr[i] > arr[j])
        count++;
    }
  }
  if(arr.length %2 === 1)
    count % 2 === 0
  const [x0, y0] = findIndexOfValue(twoDArr, 0);
  if((twoDArr.length-1 - x0) % 2 == 0) //odd row from bottom
    return count % 2 === 0
  return count % 2 === 1;
}

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

const twoDtoOneD = (arr: number[][]) => {
  const res:number[] = [];
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[0].length; j++){
      res.push(arr[i][j])
    }
  }
  return res;
}

const genSolvabled2D = (h: number, w: number) => {
  let shuffledArr: number[];
  do  {
    let arr = Array.from(Array(h*w).keys())
    shuffledArr = _.shuffle(arr);
  }
  while(!IsSolvable(oneDtoTwoD(shuffledArr, h, w)) || iftargetReached(shuffledArr))
  return oneDtoTwoD(shuffledArr, h, w);
}

const iftargetReached = (arr: number[]) =>{
  const target = Array.from(Array(arr.length).keys()).map(x=>x+1);
    target[target.length-1] = 0;
    return _.isEqual(arr, target);
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
  twoDtoOneD,
  genSolvabled2D, 
  findIndexOfValue,
  IsSolvable,
  iftargetReached
}
import { test, expect } from '@jest/globals'
import {Direction, GenRandomBoard, Puzzle} from "../src/puzzle";
import * as _ from "lodash";
import * as util from "../src/util";

const containsAllTiles = (board: number[][]) =>{
  var arr = board.reduce((acc, x)=>acc.concat(...x), []);
  var sortedArr = arr.sort((a, b) => a-b);
  var targetSetArr = Array.from(Array(board.length*board[0].length).keys())
  return _.isEqual(sortedArr, targetSetArr);
}

test("gen Random puzzule", ()=>{
  var p = GenRandomBoard(3,4)
  console.log(p.getBoard());
  console.log(p.getPossibleMove())
  expect(containsAllTiles(p.getBoard())).toBe(true);
})

test("set equal", ()=>{
  const a = new Set<Direction>();
  a.add(Direction.Up);
  a.add(Direction.Down);
  const b = new Set<Direction>();
  b.add(Direction.Down);
  b.add(Direction.Up);
  expect(_.isEqual(a, b)).toBe(true);

})

test("Puzzle Zero At Top Left", ()=>{
  const oneDArr = Array.from(Array(12).keys());
  const twoDArr = util.oneDtoTwoD(oneDArr, 3, 4);
  const p = new Puzzle(null, twoDArr, 0);
  const targetSet = new Set<Direction>();
  targetSet.add(Direction.Left);
  targetSet.add(Direction.Up);
  expect(containsAllTiles(p.getBoard())).toBe(true);
  expect(p.getPossibleMove()).toEqual(targetSet);
  expect(p.zero).toEqual([0,0]);
})
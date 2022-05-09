import { test, expect } from '@jest/globals'
import {Direction, Puzzle} from "../src/puzzle";
import * as _ from "lodash";
import * as util from "../src/util";

const containsAllTiles = (board: number[][]) =>{
  var arr = board.reduce((acc, x)=>acc.concat(...x), []);
  var sortedArr = arr.sort((a, b) => a-b);
  var targetSetArr = Array.from(Array(board.length*board[0].length).keys())
  return _.isEqual(sortedArr, targetSetArr);
}

test("gen Random puzzule", ()=>{
  var p = Puzzle.GenRandomBoard(3,4)
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
  const targetSet = new Map<Direction, number[]>();
  targetSet.set(Direction.Left, [0,1]);
  targetSet.set(Direction.Up, [1,0]);
  expect(containsAllTiles(p.getBoard())).toBe(true);
  expect(p.getPossibleMove()).toEqual(targetSet);
  expect(p.getZero()).toEqual([0,0]);
})
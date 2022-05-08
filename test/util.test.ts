import { test, expect, describe, it } from '@jest/globals'
import _ from "lodash";
import * as util from "../src/util";


describe("isSolvable", ()=>{
  it.each([
  [[1, 2, 3, 4, 5, 6, 7, 8, 0], true],
  [[1, 3, 4, 7, 0, 2, 5, 8, 6], true],
  [[2, 1, 3, 4, 5, 6, 7, 8, 0], false]
  ])(
    `should return proper result when passed arguments are: %x, %result`,
    (x, result)=>{
      expect(util.IsSolvable(x)).toBe(result);
    }
  );
})
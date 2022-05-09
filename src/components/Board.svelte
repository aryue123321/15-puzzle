<script lang="ts">
  import {history} from '../store/boardStore'
  import {Puzzle, Direction} from "../puzzle"
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition'
  import { tick } from 'svelte';

  $: duration = 200;

  $: currentPuzzle = $history[$history.length-1];
  $: board = currentPuzzle.getOneDBoard();
  $: tilesPerRow = currentPuzzle.getBoard()[0].length;
  $: cellWith = `calc(${100/tilesPerRow}% - ${5*(tilesPerRow-1)/tilesPerRow}px)`
  console.log(tilesPerRow)

  const handleClick = (value:number) =>{
    const newPuzzle = currentPuzzle.swapByValue(value);
    if(newPuzzle){
      history.move(newPuzzle);
    }
  }

  const handleReset = async () =>{
    duration = 2000;
    await tick();
    history.reset();
    await tick();
    duration = 200;
  }

</script>
<div class="is-flex is-flex-direction-row is-align-items-flex-end">
  <button class="button is-dark" on:click="{handleReset}">RESET</button>
  <div>Move: {currentPuzzle.getScore()}</div><div> Won: {currentPuzzle.hasWon()}</div>
</div>
<!-- <button on:click="{()=>{history.move(currentPuzzle.swap(Direction.Up))}}">UP</button> -->

  <div class="board">
  {#each board as cell, i (cell)}
    <div 
      class="board-cell"
      style="width:{cellWith}"
      class:zero={cell==0}
      class:matched={cell == i+1}
      on:click="{()=> handleClick(cell)}"
      animate:flip="{{ duration }}"
      out:fade
    >
      <div class="cell-text">
        {cell !== 0 ? `${cell}` : ' '}
      </div>
    </div>
  {/each}
  </div>

<style>
  .board{
    display: flex;
    flex-wrap: wrap;
    border: 4px #1A3C40 solid;
    max-width: 470px;
    padding: 5px;
    gap:5px 5px;
    background-color: #1D5C63;
  }
  .board-cell{
    /* display: table-cell; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1A3C40;
    color: #EDE6DB;
    font-family:monospace;
    font-size: 2rem;
   
    height: 60px;
    text-align: center;
    vertical-align: middle;
  }
  .board-cell.zero{
    background-color: transparent;
    border: transparent;
  }
  .board-cell.matched{
    color: #1A3C40;
    background-color: #EDE6DB;
  }
  
</style>
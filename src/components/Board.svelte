<script lang="ts">
  import {history} from '../store/boardStore'
  import {Puzzle, Direction} from "../puzzle"
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition'
  import { tick } from 'svelte';
  import { onMount } from 'svelte';

  let duration = 200;

  let win = false;

  $: currentPuzzle = $history;
  $: board = currentPuzzle.getOneDBoard();
  $: tilesPerRow = currentPuzzle.getBoard()[0].length;
  $: cellWith = `calc(${100/tilesPerRow}% - ${5*(tilesPerRow-1)/tilesPerRow}px)`
  console.log(tilesPerRow)

  const move = (puzzle: Puzzle|false) =>{
    if(puzzle){
      history.move(puzzle);
      if(puzzle.hasWon()){
        setTimeout(()=>{
          win=true;
        }, 300);
      }
    }
  }

  const handleClick = (value:number) =>{
    const newPuzzle = currentPuzzle.swapByValue(value);
    move(newPuzzle);
  }



  const handleReset = async () =>{
    win = false;
    duration = 1000;
    await tick();
    const {w, h} = $history.getDimenions();
    history.reset(h, w);
    await tick();
    duration = 200;
  }

  const handleUndo = ()=>{
    history.undo();
  }

  onMount(()=>{
    console.log('Board Mounted')
  })

  const handleKeydown = (e: KeyboardEvent) =>{
    if(!win){
      let direction:Direction;
      switch (e.key){
        case "ArrowUp":
          direction = Direction.Up;
          break;
        case "ArrowDown":
          direction = Direction.Down;
          break;
        case "ArrowLeft":
          direction = Direction.Left;
          break;
        case "ArrowRight":
          direction = Direction.Right;
          break;
        
      }
      const newPuzzle = currentPuzzle.swap(direction);
      move(newPuzzle);
    }
  }

</script>
<svelte:window on:keydown={handleKeydown}/>
<div class="whole-board">
  <div class="is-flex is-flex-direction-row is-justify-content-space-between board-buttons-group">
    <slot name="setting-button">

    </slot>
    <div class="is-pulled-right">
      <button class="button is-dark" on:click="{handleReset}">RESET</button>
      <button 
        class="button is-dark"
        disabled="{$history.getParent() === null}" 
        on:click="{handleUndo}">UNDO</button>
    </div>
  </div>
  <div>Move: {currentPuzzle.getScore()}</div>
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
  
  {#if win}
    <div> You Won!!</div>
  {/if}
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
    margin: auto;
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
  .cell-text{
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }
  .whole-board{
    max-width: 470px;
    margin: auto;
  }
  
</style>
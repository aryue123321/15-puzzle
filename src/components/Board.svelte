<script lang="ts">
  import {history} from '../store/boardStore'
  import {Puzzle, Direction} from "../puzzle"
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition'

  $: currentPuzzle = $history[$history.length-1];
  $: board = currentPuzzle.getOneDBoard();
  console.log(board)

  const handleClick = (value:number) =>{
    const newPuzzle = currentPuzzle.swapByValue(value);
    if(newPuzzle){
      history.move(newPuzzle);
    }
  }

</script>

<button on:click="{history.reset}">RESET</button>
<button on:click="{()=>{history.move(currentPuzzle.swap(Direction.Up))}}">UP</button>
<div style="width:150px">
  <div class="board">
  {#each board as cell, i (cell)}
    <div 
      class="board-cell"
      on:click="{()=> handleClick(cell)}"
      animate:flip
      out:fade
    >
      {cell !== 0 ? `${cell}` : ' '}
    </div>
  {/each}
  </div>
</div>

<style>
  .board{
    display: flex;
    flex-wrap: wrap;
    border: 1px black solid;
  }
  .board-cell{
    /* display: table-cell; */
    flex: auto;
    background-color: burlywood;
    /* border: 1px black solid; */
    margin: 0px;
    width: 30px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
  }
  
</style>
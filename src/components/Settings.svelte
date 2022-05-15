
<script lang="ts">
  import {history} from '../store/boardStore'
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher(); 
  export let show = false;
  const close = () =>{
    dispatch('close');
  }
  const {w, h} = $history.getDimenions();
  let width = w;
  let height = h;

  const handleSubmit = () =>{
    history.reset(height, width);
    close();
  }

</script>

<div 
  class="modal"
  class:is-active={show}
>
  <div class="modal-background"></div>
  <div class="modal-card">
    <form on:submit|preventDefault="{handleSubmit}">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
        <button 
          class="delete" 
          aria-label="close" 
          type="button"
          on:click="{close}"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Width {width}
              <input type="range" min=2 max=6 bind:value="{width}" class="setting-input">
          </label>
          <label class="label">Height {height}
            <input type="range" min=2 max=6 bind:value="{height}" class="setting-input">
        </label>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button 
          class="button" 
          on:click="{close}"
          type="button"
        >Cancel</button>
      </footer>
    </form>
  </div>
</div>

<style>
  .setting-input{
    display: block;
  }
</style>
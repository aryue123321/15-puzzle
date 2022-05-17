<script lang="ts">
	import Board from "./components/Board.svelte";
	import Settings from "./components/Settings.svelte";
	let openSettings = false;
</script>
<div class="outer">
	<main class="main">
		
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-half">
					
					<Board>
						<svelte:fragment slot="setting-button">
							<div class="is-flex">
								<a style="margin:auto" href="https://github.com/aryue123321/15-puzzle"><img class="image is-32x32" width="80px" alt="git-logo" src="/GitHub-Mark-64px.png"></a>
								<button 
									on:click="{()=>openSettings = true}"
									class="button is-info ml-1"
									>Settings
								</button>
							</div>
						</svelte:fragment>
					</Board>
				</div>
			</div>
		</div>
	</main>
	<Settings on:close={()=>openSettings = false} show={openSettings}/>
</div>

<style>
	.outer{
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.main{
		margin-top: auto;
		margin-bottom: auto;
	}
</style>
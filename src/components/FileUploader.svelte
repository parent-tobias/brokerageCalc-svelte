<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

const uploadEvent = (e) => {
  dispatch('upload', {
    file: files[0]
  }
  )
}

	export let files = undefined;
</script>

<input type="file" bind:files on:change={uploadEvent}>

{#if files && files[0]}
	<p>
		{files[0].name}
	</p>
{/if}
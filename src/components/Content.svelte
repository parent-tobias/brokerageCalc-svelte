<script>
  import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	
  import HelpDescription from './HelpDescription.svelte';
	import CloseButton from './CloseButton.svelte';

  const { open } = getContext('simple-modal');
	
	let opening = false;
	let opened = false;
	let closing = false;
	let closed = false;

  const showPopup = () => {
		open(HelpDescription, { message: "About BrokerageCalc" });
	};
  const showHelpTooltip = () => {
    console.log('huh');
  }
</script>

<section>
	<button on:click={showPopup} on:hover={showHelpTooltip}>?</button>
</section>

<style>
	section {
		padding-top: 0.5em;
	}
</style>
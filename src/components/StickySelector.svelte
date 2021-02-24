<script>
  import { onMount } from 'svelte';
  export let settings;
  export let selected;

  onMount(async()=>{
    selected = localStorage.getItem("stateChoice");
  })
  const changeHandler = (e) => {
    const option = e.target.options[e.target.selectedIndex].value;
    if(option && option !== ""){
      localStorage.setItem("stateChoice", option)
    }
  }
</script>

  <select bind:value={selected} on:input={changeHandler} name='state-choice'>
    <option>{settings.placeHolder}</option>
    {#each settings.options as option}
    <option value={option.value}>{option.name}</option>
    {/each}
  </select>

<script>
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

const downloadEvent = (e) => {
  dispatch('download', {
    type: e.target.value
  })
}

  export let settings={title:"", columns:[]};
  export let data="";
</script>

    <section>
    <header>
      <h3>{settings.title}</h3>
      <button value={settings.type} on:click={downloadEvent}>Download this as .csv</button>
    </header>
      <table>
        <thead>
          <tr>
          {#each settings.columns as column, index}
            <th>{column.title}</th>
          {/each}
          </tr>
        </thead>
        <tbody>
        {#each data as record, index}
          <tr>
          {#each settings.columns as column, index}
            <td>{ @html column.func ? column.func(record) : record[column.field]}</td>
          {/each}
        {/each}
        </tbody>
        <tfoot>
        {#if settings.summaryRow}
          <tr>
            {#each settings.summaryRow as column, index}
              <td>{ column.func ? column.func(data) : column.title }</td>
            {/each}
          </tr>
        {/if}
        </tfoot>
      </table>
    </section>

<style>
section{
  display: flex;
  flex-direction: column;
  width: 95%;
}
table {
  width: 90vw;
  margin: 0 auto;
}
tr {
  height: 43px;
  text-align: center;
}
tbody > :nth-child(even){
  background-color: #0048a9;
  color: white;
  height: 40px;
}

tfoot tr {
    height: 40px !important;
    background-color: #ff8a00;
    color: white;
    font-weight: 600;
    /* background-size: 27px; */
}
</style>

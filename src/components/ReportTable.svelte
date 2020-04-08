<script>
  export let settings={title:"", columns:[]};
  export let data="";
</script>

    <section>
      <h3>{settings.title}</h3>
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
            <td>{ column.func ? column.func(record) : record[column.field]}</td>
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
tbody > :nth-child(even){
  background-color: rgb(150, 216, 210);
}
</style>

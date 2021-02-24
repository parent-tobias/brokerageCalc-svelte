<script>
  export let message;
</script>

<style>
  h1 {
		font-size: 2rem;
		text-align: center;
	}
	
  h2 {
		font-size: 1.25rem;
	}
</style>

<h1>🎉 {message} 🍾</h1>

<h2>What is BrokerageCalc?</h2>
<p>Zerodha is one of the larger brokerage houses in India, and for a lot of folks, it represents an easy way to get started in day-trading. But that has its ups and downs. One of the downs being fees: users will buy and sell, getting in and out of positions, and not be notified of their fees until a few days later. This can be problematic, as the transaction fees compound, and profits are quickly eaten away.</p>

<h2>Why do we need it?</h2>
<p>At any point during the trading day, however, it is possible to download a CSV file listing all transactions by the given user. With that information, we can take each transaction and calculate the fees. There are a number of fees, and at least one of them is a state-level tax, and the formula for that varies from state to state. So we came up with a tool that can read in that file, display the fees and totals as tabular data, and even return a CSV file containing the fees, allowing the user to collate that data with a spreadsheet at a later time.</p>

<h2>Showcasing:</h2>
<dl>
  <dt>CSV-to-JSON:</dt><dd>Bi-directional reading and writing. We can read in CSV data, and convert that into an array of JSON objects, which can then be manipulated and displayed however we like. We can identify or rename columns from the CSV in those JSON objects, and we can write them out in any order or naming scheme we like.</dd>
  <dt>Svelte under the hood:</dt><dd>Fast, responsive, small... Svelte was the framework we chose in building this for a number of reasons. A completely backend-less solution, this operates solely on the front-end. Upload the CSV, manipulate it in the browser, save it from the browser. A functional standalone tool, and one that will continue to work, even offline.</dd>

</dl>>

<a href="./orders/orders_27.csv">Download one?</a>
<script>
  import Tabs from './components/Tabs.svelte';
  import StickySelector from './components/StickySelector.svelte';
  import FileUploader from './components/FileUploader.svelte';
  import ReportTable from './components/ReportTable.svelte';


const sumBy = prop => (total, obj) => Number(total) + Number(obj[prop]);
const toPrecision = precision => num => Math.round(num*(Math.pow(10, precision)))/Math.pow(10, precision);
const currency = toPrecision(2);

// Sort array of objects by prop
const sortBy = (prop) => (a, b) =>{
  return typeof a[prop] === 'string'
     ? a[prop].localeCompare(b[prop])
     : a[prop] - b[prop]
}

  let tabItems = [
    {label: "Overview", value: 1},
    {label: "By Instrument", value: 2},
    {label: "By Position", value: 3},
    {label: "By Transaction", value: 4}
  ];
  let reportPanes = [{
    title: "Activity by Instrument",
    type: "allInstruments",
    columns: [
      { title: "Instrument", field: "instrument"},
      { title: "# Traded", field: "traded", func: (data) => Math.abs(data.traded)},
      { title: "Gross", field: "gross"},
      { title: "Total Fees", field: "totalFees"},
      { title: "Net", field: "net"},
    ],
    summaryRow: [
      { title: "** Totals **"},
      { title: "traded", func: (data) => Math.abs( data.reduce(sumBy("traded"), 0) ) },
      { title: "gross", func: (data) => currency( data.reduce(sumBy("gross"), 0 ) ) },
      { title: "totalFees", func: (data) => currency( data.reduce(sumBy("totalFees"), 0 ) ) },
      { title: "net", func: (data) => currency( data.reduce(sumBy("net"), 0) ) },
    ]
  },{
    title: "Activity by Position",
    type: "allPositions",
    columns: [
      { title: "Instrument", field: "instrument"},
      { title: "# Traded", field: "traded", func: (data) => Math.abs(data.traded)},
      { title: "Gross", field: "gross"},
      { title: "Total Fees", field: "totalFees"},
      { title: "Net", field: "net"},
      { title: "Open Time", field: "opened", func: (position)=>position.opened.split(" ")[1] },
      { title: "Close Time", field: "closed", func: (position)=>position.isClosed ? position.closed.split(" ")[1] : "" },
      { title: "Outstanding", field: "isClosed", func: (position) => position.isClosed ? "" : "***"}
    ],
    summaryRow: [
      { title: "** Totals **"},
      { title: "traded", func: (data) => Math.abs( data.reduce(sumBy("traded"), 0) ) },
      { title: "gross", func: (data) => currency( data.reduce(sumBy("gross"), 0 ) ) },
      { title: "totalFees", func: (data) => currency( data.reduce(sumBy("totalFees"), 0 ) ) },
      { title: "net", func: (data) => currency( data.reduce(sumBy("net"), 0) ) },
      { title: ""},
      { title: ""},
      { title: "outstanding", func: (data) => data.filter(position => !position.isClosed).length }
    ]
  },{
    title: "Activity by Transaction",
     type: "allTrades",
   columns: [
// "instrument","time","type","status","averagePrice","quantity","gross","totalFees","net"
      { title: "Instrument", field: "instrument"},
      { title: "Time", field: "time", func: (trade)=>trade.time.split(" ")[1]},
      { title: "Type", field: "type"},
      { title: "Product", field: "product"},
      { title: "Status", field: "status"},
      { title: "Avg Price", field: "averagePrice"},
      { title: "Quantity", field: "quantity", func: (trade) => trade.isSellOrder ? trade.quantity : `<span class='buy'>${trade.quantity}</span>`},
      { title: "Gross", field: "gross", func: (trade) => trade.isSellOrder ? currency(trade.gross) : `<span class='buy'>${currency(trade.gross)}</span>` },
      { title: "Total Fees", field: "totalFees", func: (trade)=> currency(trade.totalFees)},
      { title: "Net", field: "net", func: (trade) => trade.isSellOrder ? currency(trade.net) : `<span class='buy'>${currency(trade.net)}</span>` },
    ],
    summaryRow: [
      { title: "** Totals **"},
      { title: ""},
      { title: ""},
      { title: ""},
      { title: ""},
      { title: ""},
      { title: "quantity", func: (data) => currency( data.reduce(sumBy("quantity"), 0) ) },
      { title: "gross", func: (data) => currency( data.reduce(sumBy("gross"), 0 ) ) },
      { title: "totalFees", func: (data) => currency( data.reduce(sumBy("totalFees"), 0 ) ) },
      { title: "net", func: (data) => currency( data.reduce(sumBy("net"), 0) ) },
    ]
  }
  ];

  let selectSettings = {
    placeHolder: "Choose your state...",
    options: [
      {
        name: "Andra Pradesh",
        value: "Andra Pradesh"
      },{
        name: "Arunach Pradesh",
        value: "Arunach Pradesh"
      },{
        name: "Assam",
        value: "Assam"
      },{
        name: "Bihar",
        value: "Bihar"
      },{
        name: "Chattisgarh",
        value: "Chattisgarh"
      },{
        name: "Delhi",
        value: "Delhi"
      },{
        name: "Goa",
        value: "Goa"
      },{
        name: "Gujarat",
        value: "Gujarat"
      },{
        name: "Haryana",
        value: "Haryana"
      },{
        name: "Himachal Pradesh",
        value: "Himachal Pradesh"
      },{
        name: "Jammu and Kashmir",
        value: "Jammu and Kashmir"
      },{
        name: "Jharkhand",
        value: "Jharkhand"
      },{
        name: "Karnataka",
        value: "Karnataka"
      },{
        name: "Madhya Pradesh",
        value: "Madhya Pradesh"
      },{
        name: "Maharashtra",
        value: "Maharashtra"
      },{
        name: "Meghalaya",
        value: "Meghalaya"
      },{
        name: "Mizoram",
        value: "Mizoram"
      },{
        name: "Nagaland",
        value: "Nagaland"
      },{
        name: "Orissa",
        value: "Orissa"
      },{
        name: "Rajasthan",
        value: "Rajasthan"
      },{
        name: "Punjab",
        value: "Punjab"
      },{
        name: "Sikkim",
        value: "Sikkim"
      },{
        name: "Tamil Nadu",
        value: "Tamil Nadu"
      },{
        name: "Telagana",
        value: "Telagana"
      },{
        name: "Tripura",
        value: "Tripura"
      },{
        name: "Uttar Pradesh",
        value: "Uttar Pradesh"
      },{
        name: "Uttarakhand",
        value: "Uttarakhand"
      },{
        name: "West Bengal",
        value: "West Bengal"
      },
    ]
  }
  let currentTab;
  let selectedState;
  let activity;
  let includeCancelled=false;

  async function handleFileUpload(event){
    const {csvConverter, Activity} = brokerageCalc;
    
    let orders =  await csvConverter.fromFile(event.detail.file)
    orders = orders.filter(order=>order.Instrument);
    activity = new Activity(orders);
  }

  async function handleFileDownload(event){
    const {reportGenerator} = brokerageCalc;

    const dataset = event.detail.type;
    await reportGenerator[dataset](activity);
  }
</script>

<main>
  <header>
    <figure>
      <img alt="BrokerageCalc Logo" src="./img/logo.png" />
      <figcaption>A simple tool that helps you to know the various charges that you have incurred on Zerodha</figcaption>
    </figure>
  </header>
  <article>
    <section>
      <Tabs bind:activeTabValue={currentTab} items={activity ? tabItems : [tabItems[0] ] } />
    </section>
    {#if 1 === currentTab}
      <section class="content-pane">
        <p><strong>Note:</strong> Currently, the tool supports only equity intraday MIS transactions (not CNC)</p> <p>Download the order.csv file from <a href="https://kite.zerodha.com/orders" target="_blank">Kite</a> and upload it. Kite is Zerodha's user interface. Within that control panel, there is an option, <strong>Orders</strong>. Download that file, and upload it here - we can help you to view your fees and taxes, as your orders happen!</p>
        <FileUploader on:upload={handleFileUpload} />
          <StickySelector bind:selected={selectedState} settings={selectSettings} />
          <label>Include non-complete orders in transaction view: <input type="checkbox" bind:checked={includeCancelled} ></label>
        {#if activity}
          <span>Orders: {activity.orders.length} </span>
          <span>Trades: {activity.trades.length} </span>
          <span>Positions: {activity.positions.length} </span>
        {/if}
      </section>
    {/if}
    {#if 2 === currentTab && activity}
      <ReportTable settings={reportPanes[0]} data={activity.instruments.sort(sortBy("instrument"))} on:download={handleFileDownload} />
    {/if}
    {#if 3 === currentTab && activity}
      <ReportTable settings={reportPanes[1]} data={activity.positions} on:download={handleFileDownload} />
    {/if}
    {#if 4 === currentTab && activity}
      <ReportTable settings={reportPanes[2]} data={ includeCancelled ? activity.orders : activity.trades} on:download={handleFileDownload} />
    {/if}
  </article>
  <footer>
    <span>Design and concepts: <a href="https://github.com/rajataudichya" target="_blank">Rajat Audichya</a></span> 
    <div class='pm-button'><a href='https://www.payumoney.com/paybypayumoney/#/3BFF46C4CEEBD21F42C31B5DEA49F4E1'><img src='./img/donate-now.png' alt="Support us with your kind donation!" /></a></div><span> Development and implementation: <a href="https://github.com/parent-tobias" target="_blank">Tobias Parent</a></span>
  </footer>
</main>

<style>
  :global(*){
    font-family: "Muli", sans-serif;
  }
  main {
    width: 90vw;
    margin: 0 auto;
  }
 figure {
    text-align: center;
}
  header img {
    width: 25vw;
  }

  footer {
    font-size: .75em;
    text-align: center;
  }
  :global(.buy) {
    color: red;
  }
  :global(.buy::before) {
    content: "(";
  }
  :global(.buy::after) {
    content: ")";
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
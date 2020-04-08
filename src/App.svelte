<script>
  import Tabs from './components/Tabs.svelte';
  import StickySelector from './components/StickySelector.svelte';
  import FileUploader from './components/FileUploader.svelte';
  import ReportTable from './components/ReportTable.svelte';

const absoluteSum = prop => (total, obj) => Number(total) + Number(obj[prop]);
const toPrecision = precision => num => Math.round(num*(Math.pow(10, precision)))/Math.pow(10, precision);
const currency = toPrecision(2);

  let tabItems = [
    {label: "Overview", value: 1},
    {label: "By Instrument", value: 2},
    {label: "By Position", value: 3},
    {label: "By Transaction", value: 4}
  ];
  let reportPanes = [{
    title: "Activity by Instrument",
    columns: [
      { title: "Instrument", field: "instrument"},
      { title: "# Traded", field: "traded"},
      { title: "Gross", field: "gross"},
      { title: "Total Fees", field: "totalFees"},
      { title: "Net", field: "net"},
    ],
    summaryRow: [
      { title: "** Totals **"},
      { title: "traded", func: (data) => currency( data.reduce(absoluteSum("traded"), 0) ) },
      { title: "gross", func: (data) => currency( data.reduce(absoluteSum("gross"), 0 ) ) },
      { title: "totalFees", func: (data) => currency( data.reduce(absoluteSum("totalFees"), 0 ) ) },
      { title: "net", func: (data) => currency( data.reduce(absoluteSum("net"), 0) ) },
    ]
  },{
    title: "Activity by Position",
    columns: [
      { title: "Instrument", field: "instrument"},
      { title: "# Traded", field: "traded"},
      { title: "Gross", field: "gross"},
      { title: "Total Fees", field: "totalFees"},
      { title: "Net", field: "net"},
      { title: "Open Time", field: "opened", func: (position)=>position.opened.split(" ")[1] },
      { title: "Close Time", field: "closed", func: (position)=>position.isClosed ? position.closed.split(" ")[1] : "" },
      { title: "Outstanding", field: "isClosed", func: (position) => position.isClosed ? "" : "***"}
    ],
    summaryRow: [
      { title: "** Totals **"},
      { title: "traded", func: (data) => currency( data.reduce(absoluteSum("traded"), 0) ) },
      { title: "gross", func: (data) => currency( data.reduce(absoluteSum("gross"), 0 ) ) },
      { title: "totalFees", func: (data) => currency( data.reduce(absoluteSum("totalFees"), 0 ) ) },
      { title: "net", func: (data) => currency( data.reduce(absoluteSum("net"), 0) ) },
      { title: ""},
      { title: ""},
      { title: "outstanding", func: (data) => data.filter(position => !position.isClosed).length }
    ]
  },{
    title: "Activity by Transaction",
    columns: [
// "instrument","time","type","status","averagePrice","quantity","gross","totalFees","net"
      { title: "Instrument", field: "instrument"},
      { title: "Time", field: "time", func: (trade)=>trade.time.split(" ")[1]},
      { title: "Type", field: "type"},
      { title: "Status", field: "status"},
      { title: "Avg Price", field: "averagePrice"},
      { title: "Quantity", field: "quantity", func: (trade) => trade.quantity},
      { title: "Gross", field: "gross", func: (trade) => currency(trade.gross) },
      { title: "Total Fees", field: "totalFees", func: (trade)=> currency(trade.totalFees)},
      { title: "Net", field: "net", func: (trade) => currency(trade.net) },
    ],
    summaryRow: [
      { title: "** Totals **"},
      { title: ""},
      { title: ""},
      { title: ""},
      { title: ""},
      { title: "quantity", func: (data) => currency( data.reduce(absoluteSum("quantity"), 0) ) },
      { title: "gross", func: (data) => currency( data.reduce(absoluteSum("gross"), 0 ) ) },
      { title: "totalFees", func: (data) => currency( data.reduce(absoluteSum("totalFees"), 0 ) ) },
      { title: "net", func: (data) => currency( data.reduce(absoluteSum("net"), 0) ) },
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
    console.log(event.detail.file.name);
    let orders =  await csvConverter.fromFile(event.detail.file)
    activity = new Activity(orders);
  }
</script>

<article>
  <section>
    <Tabs bind:activeTabValue={currentTab} items={tabItems} />
  </section>
  {#if 1 === currentTab}
    <section class="content-pane">
      <h3>Overview Content</h3>
      <div>
        <FileUploader on:upload={handleFileUpload} />
          <StickySelector bind:selected={selectedState} settings={selectSettings} />
          <label>Include non-complete orders in transaction view: <input type="checkbox" bind:checked={includeCancelled} ></label>
        {#if activity}
          <span>Orders: {activity.orders.length} </span>
          <span>Trades: {activity.trades.length} </span>
          <span>Positions: {activity.positions.length} </span>
        {/if}
      </div>
    </section>
  {/if}
  {#if 2 === currentTab}
    <ReportTable settings={reportPanes[0]} data={activity.instruments} />
  {/if}
  {#if 3 === currentTab}
    <ReportTable settings={reportPanes[1]} data={activity.positions} />
  {/if}
  {#if 4 === currentTab}
    <ReportTable settings={reportPanes[2]} data={ includeCancelled ? activity.orders : activity.trades} />
  {/if}
</article>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
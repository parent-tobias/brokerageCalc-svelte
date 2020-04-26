import Order from './order.js';
import Instrument from './instrument.js';
import {filterBy, sortBy, groupBy} from '../utilities/array.js';

const stateChoice = localStorage.getItem("stateChoice") || "Other";

export default class Activity {
  constructor(orders){
    orders = orders.map(order=>{
      order.Market = order.Instrument.endsWith("FUT") ? "FUTURES" : "EQUITY";
      return new Order(order, stateChoice);
    }).sort(sortBy("time"));

    const groupByInstrument = groupBy("instrument");
    const tradingActivityObject = orders.reduce(groupByInstrument, {});
    const instruments = Object.keys(tradingActivityObject).map( (instrument) =>{
        return new Instrument({
        instrument, 
        orders: tradingActivityObject[instrument].data
      })
    }).filter(instrument=>instrument.traded!==0);

    const market = orders[0].isFutures ? "Futures" : "Equity"
    this.state = {
      market,
      orders,
      instruments
    }
  }
  get market(){
    return this.state.market;
  }
  get orders(){
    return this.state.orders;
  }
  get trades(){
    return this.state.orders.filter(order => order.isComplete && order.isMIS );
  }
  get instruments(){
    return this.state.instruments;
  }
  instrument(value){
    return this.instruments.find(instrument => instrument.instrument === value)
  }
  get positions(){
    return this.instruments.reduce((array, instrument)=>[...array, ...instrument.positions ], []);
  }
}
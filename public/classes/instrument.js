import {currency, sumBy} from "../utilities/number.js";
import {sortBy, filterBy } from "../utilities/array.js";
import Position from "./position.js";


export default class Instrument {
  constructor({
    instrument,
    orders
  }) {
    // it's a good idea for us to sort the orders here, in case.
    const sortByTime = sortBy("time");
    
    orders = orders.sort(sortByTime);
    const trades = orders.filter(order => order.isComplete && order.isMIS );

    const positions = trades.reduce((positionTemp, trade)=>{
      let last = positionTemp.length-1;
      if(positionTemp[last] && !positionTemp[last].isClosed){
        positionTemp[last].add(trade);
      } else {
        positionTemp.push(new Position(trade) );
      }
      return positionTemp;
    },[])

    this.state = {
      instrument,
      orders,
      positions
    }
  }
  get instrument(){
    return this.state.instrument;
  }
  get orders(){
    return this.state.orders;
  }
  get trades(){
    return this.state.orders.filter(order => order.isComplete && order.isMIS);
  }
  get positions(){
    return this.state.positions;
  }
  // returns a Position containing a given Trade
  position(time){
    return this.positions.filter(position => position.contains(time) );
  }
  // This is no longer a "getter" in the sense of the others...
  order(dateStamp){
    return this.orders.find(order => order.time == dateStamp);
  }
  get traded(){
    return this.positions.reduce(sumBy("traded"), 0);
  }
  get gross(){
    return currency( this.positions.reduce(sumBy("gross"), 0) );
  }
  get brokerage(){
    return currency( this.positions.reduce(sumBy("brokerage"), 0) );
  }
  get STT(){
    return currency( this.positions.reduce(sumBy("STT"), 0) );
  }
  get transactionFee(){
    return currency ( this.positions.reduce(sumBy("transactionFee"), 0) );
  }
  get GST(){
    return currency( this.positions.reduce(sumBy("GST"), 0) )
  }
  get SEBI(){
    return currency( this.positions.reduce(sumBy("SEBI"), 0) )
  }
  get stampCharge(){
    return currency( this.positions.reduce(sumBy("stampCharge"), 0) )
  }
  get totalFees(){
    return currency( this.positions.reduce(sumBy("totalFees"), 0) )
  }
  get net(){
    return currency( this.positions.reduce(sumBy("net"), 0) );
  }  
}
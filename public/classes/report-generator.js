import {sumBy, currency} from '../utilities/number.js';
import {sortBy} from '../utilities/array.js';

export default class ReportGenerator{
  constructor(csvParser){
    this.csvParser = csvParser;
  }
  allTrades(activity){
    const finalRow = {
      instrument: "TOTALS",
      gross: currency(activity.positions.reduce(sumBy("gross"), 0) ),
      totalFees: currency( activity.positions.reduce(sumBy("totalFees"), 0) ),
      net: currency( activity.positions.reduce(sumBy("net"), 0) )
    };
    const output = [...activity.trades, finalRow];
    this.csvParser.toFile(["instrument","time","type","product","status","averagePrice","quantity","gross","totalFees","net"], output, "trades.csv");
  }
  allPositions(activity){
    const finalRow = {
      instrument: "TOTALS",
      gross: currency( activity.positions.reduce(sumBy("gross"), 0) ),
      totalFees: currency( activity.positions.reduce(sumBy("totalFees"), 0) ),
      net: currency( activity.positions.reduce(sumBy("net"), 0 ) )
    };
    const output = [...activity.positions, finalRow];
    this.csvParser.toFile(["instrument","traded","gross","totalFees","net","opened","closed"], output, "positions.csv");
  }
  allInstruments(activity){
    const finalRow = {
      instrument: "TOTALS",
      gross: currency(activity.instruments.reduce(sumBy("gross"), 0) ),
      totalFees: currency( activity.instruments.reduce(sumBy("totalFees"), 0) ),
      net: currency( activity.instruments.reduce(sumBy("net"), 0) )
    };
    const output = [...activity.instruments, finalRow];
    this.csvParser.toFile(["instrument","traded","gross","totalFees","net"], output, "instruments.csv");
  }

}
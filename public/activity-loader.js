import CSV from './utilities/csv.js';
import Activity from './classes/activity.js';
import ReportGenerator from './classes/report-generator.js';

const csvConverter = new CSV();

window.brokerageCalc = {
  Activity,
  csvConverter,
  reportGenerator: new ReportGenerator(csvConverter)
};
import readFileAsync from './file.js';

export default class CSV {
  constructor(){
    this.state = {};
  }
  async fromFile(file){
    try{
      const contents = await readFileAsync(file);
      
      return this.fromString(contents)
    } catch(err){
      console.log(err)
    }

  }
  toFile(fieldOrderArray, arrayOfObjects, fileName){
    const contents = this.toString(fieldOrderArray, arrayOfObjects);

    const csvFile = new Blob([contents], {type: "text/csv"});
    const linkEl = document.createElement("a");
    linkEl.download=fileName;
    linkEl.href=window.URL.createObjectURL(csvFile);
    linkEl.style.display="none";
    document.body.appendChild(linkEl);
    linkEl.click();
  }
  async fromString(string){
    const rows = string.split(/[\r\n]{1}/);
    const keys = rows.shift().split(",");

    const returnMe = await rows.map(row=>{
      const arr = row.split(",");
      const obj = {};
      keys.forEach((key, index)=>obj[key]=arr[index]);
      return obj;
    });
    console.log(returnMe);
    return returnMe;
  }
  toString( fieldOrderArray, arrayOfObjects ){
    return fieldOrderArray.join(",")+"\n"+arrayOfObjects.map(
      object =>{
        return fieldOrderArray.reduce(
        (arr, prop)=>{
          arr = [...arr, object[prop]]
          return arr;
        },[]
      ).join(",");
    }).join("\n");
  }
};

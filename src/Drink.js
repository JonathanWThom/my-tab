import moment from "moment";

export default class Drink {
  constructor() {
    this.imbibedOn = moment().format("YYYY-MM-DD");
    this.name =  "";
    this.oz = "";
    this.percent = "";
  }
}

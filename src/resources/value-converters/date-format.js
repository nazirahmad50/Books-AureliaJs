import moment from "moment";

export class DateFormatValueConverter {
  toView(value) {
    if (!value) return "";
    console.log(value);
    return moment(value).format("MM/DD/YYYY h:mm:ss a");
  }
}

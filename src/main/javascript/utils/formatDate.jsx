import moment from "moment";

class DateFormatter {
    static formatToLocal(timestamp) {
        return moment(timestamp).format().slice(0, -6);
    }

    static formatToString(timestamp) {
        return moment(timestamp).calendar();
    }
}

export default DateFormatter;

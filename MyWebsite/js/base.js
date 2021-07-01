class BaseJs {
    constructor() {

    }
    formatMoney(money) {
        if (money) {
            return money.replaceAll('.','').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else return "0";
    }
    checkValidNumber(str) {
        return /^\d+$/.test(str.replaceAll('.','')) || "" == str;
    }
}
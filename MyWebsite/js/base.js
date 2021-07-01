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
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
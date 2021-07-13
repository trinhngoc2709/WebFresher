class BaseJs {
    /***
     Created by tbNgoc at 30/06/2021
     * **/
    constructor() {
        this.navBarObj = new NavBar();
        this.inputClass = new InputClass();
        this.dropdownObj = new DropdownClass();
        this.toggle = new Toggle();
        this.popup = new Popup();
        this.icon = new Icon();
        this.toast = new ToastMessage();
        this.comboboxClass = new Combobox(this.inputClass,this.icon,this.dropdownObj,this.toast);
        this.buttonClass = new ButtonClass(this.toggle,this.comboboxClass,this.inputClass,this.popup,this.toast);  
        this.pagingBar = new PagingBar();
    }
    /***
     Created by tbNgoc at 30/06/2021
     Format VND money string 
     * **/
    formatMoney(money) {
        if (money) {
            return money.toString().replaceAll('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else return "0";
    }
    
    formatDate(date) {
        if (date) {
            let _date = new Date(date);
           
            let day = _date.getDate(),
                month = _date.getMonth() + 1,
                year = _date.getFullYear();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            return day + '/' + month + '/' + year;
        } else return "";
    }
    /**
     * 
     * @param {String} str
     */
    checkValidNumber(str) {
        return /^\d+$/.test(str.replaceAll('.', ''));
    }
    /**
     * 
     * @param {String} email
     */
    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        } else return false;

    }
    /**
     * 
     * @param {String} taxString 
     * @param {any} objScope
     * Created by tbngoc 
     */
    checkTaxNumber(taxString, objScope) {
        if (this instanceof Employee) {
            if (taxString) {
                let toNumberTax = parseInt(taxString, 10);
                if (String(taxString).length != 10 || (!this.checkValidNumber(taxString)) ||
                    (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                    return false;
                else return true;
            } else return false;
        } else {
            if (taxString) {
                let toNumberTax = parseInt(taxString, 10);
                if (String(taxString).length != 10 || (!objScope.checkValidNumber(taxString)) ||
                    (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                    return false;
                else return true;
            } else return false;
        }
    }

    /**
     * 
     * @param {String} idString
     * @param {any} objScope
     * @Created by tbNgoc at 30/06/2021
     * @Check identity number
     */
    checkIdNumber(idString, objScope) {
        if (this instanceof Employee) {
            if (idString && this.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
                return true;
            }
            return false;
        } else {
            if (idString && objScope.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
                return true;
            }
            return false;
        }

    }
    /***
     Created by tbNgoc at 30/06/2021
     Load the event of employee page
     * **/
    loadEvent() {
        /* Event for Navbar */
        this.navBarObj.ldEvtHomepage();
        
    }
}
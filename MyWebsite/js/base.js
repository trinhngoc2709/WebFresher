class BaseJs {
    /***
     Created by tbNgoc at 30/06/2021
     * **/
    constructor() {
      
    }
    /***
     Created by tbNgoc at 30/06/2021
     Format VND money string 
     * **/
    formatMoney(money) {
        if (money) {
            return money.replaceAll('.', '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else return "0";
    }
    /***
     Created by tbNgoc at 30/06/2021
     Check valid number
     * **/
    checkValidNumber(str) {
        return /^\d+$/.test(str.replaceAll('.', ''));
    }
    /***
     Created by tbNgoc at 30/06/2021
     Validate the email
     * **/
    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        } else return false;

    }
    /***
     Created by tbNgoc at 30/06/2021
     Check Tax Number
     * **/
    checkTaxNumber(taxString,objScope) {
        if(this){
            if (taxString) {
                let toNumberTax = parseInt(taxString, 10);
                if (String(taxString).length != 10 || (!this.checkValidNumber(taxString))
                    || (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                    return false;
                else return true;
            } else return false;
        }else{
            if (taxString) {
                let toNumberTax = parseInt(taxString, 10);
                if (String(taxString).length != 10 || (!objScope.checkValidNumber(taxString))
                    || (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                    return false;
                else return true;
            } else return false;
        }
    }
    /***
     Created by tbNgoc at 30/06/2021
     Check identity number
     * **/
    checkIdNumber(idString,objScope) {
        if(this){
            if (idString && this.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
                return true;
            } return false;
        }else{
            if (idString && objScope.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
                return true;
            } return false;
        }
        
    }
    /***
     Created by tbNgoc at 30/06/2021
     Load the event of employee page
     * **/
    loadEvent() {
        /* Event for Customize Select */
        // Add event click to display customized select
        let customizedSelects = document.querySelectorAll('.select-container');
        customizedSelects.forEach(element => {
            // click event : display customized select, rotate input icon
            element.addEventListener("click", () => {
                displayCustomizedSelect(element.childNodes[3]);
                let iconInput = element.querySelector('.icon-input');
                rotateIconinput(iconInput);
            });
            // Focus out : Hide the customized select, rotate input icon
            element.addEventListener("focusout",()=>{
                let iconInput = element.querySelector('.icon-input');
                if(iconInput.style.transform != "")
                    rotateIconinput(iconInput);
                let customizedSelect = element.childNodes[3];
                customizedSelect.style.width = "0px";
                customizedSelect.style.height = "0px";
            })
            // Key up events Enter: confirm, Arrow Up, ArrowDown: change the option
            element.addEventListener("keyup", (e) => {
                let customizedSelect = element.childNodes[3];
                let options = e.target.parentElement.childNodes[3].children;
                if (e.code === "Enter") {// Enter event : display customized select, rotate the input
                    let iconInput = e.target.parentElement.querySelector('.icon-input');
                    rotateIconinput(iconInput);
                    displayCustomizedSelect(customizedSelect);
                } else if (e.code == "ArrowUp") {// ArrowUp event : change the option
                    if (customizedSelect.style.width == "auto") {
                        displayOption(options, e.code, e.target);
                    }
                } else if (e.code == "ArrowDown") {// ArrowDown event : change the option
                    if (customizedSelect.style.width == "auto") {
                        displayOption(options, e.code, e.target);
                    }
                }
            });
        })
        // Rotate 180 degree the element
        function rotateIconinput (iconInput) {
            if(iconInput.style.transform == ""){
                // Rotate drop down
                iconInput.style.transform = "rotate(180deg)";
                iconInput.style.top = "8.31px";
                iconInput.style.right = "9px";
            }else{
                // Rotate to initial
                iconInput.style.transform = "";
                iconInput.style.top = "14.31px";
                iconInput.style.right = "0px";
            }
        }
        // Set event for options of customized select
        let options = document.querySelectorAll('.select-container .select-custom div'); // options
        options.forEach(element => {
            let iconInput = element.parentElement.parentElement.querySelector('.icon-input');
            element.addEventListener("mousedown", (e) => {
                let optionsTarget = e.target.parentElement.childNodes;
                optionsTarget.forEach(el=>{
                    if(el.classList)
                        el.classList.remove('active-option');
                })
                e.target.classList.add('active-option');
                e.target.parentElement.parentElement.childNodes[1].value = e.target.textContent;
                rotateIconinput(iconInput);
            })
        });
        // Function display/hide customized select
        function displayCustomizedSelect(customizedSelect) {
            if (customizedSelect.style.width != "auto") {
                customizedSelect.style.width = "auto";
                customizedSelect.style.height = "auto";
            } else {
                customizedSelect.style.width = "0px";
                customizedSelect.style.height = "0px";
            }
        }
        // Display option after choosing
        function displayOption(options, keyCode, inputField) {
            let currentIndex = 0;
            let maxIndex = options.length;
            for (const option of options) {
                if (option.className == "active-option") {
                    currentIndex = Array.prototype.indexOf.call(options, option)
                    break;
                }
            }
            if (keyCode == "ArrowDown") {
                if (currentIndex + 1 < maxIndex) {
                    options[currentIndex].classList.remove('active-option'); // remove active class of currentIndex
                    options[currentIndex + 1].classList.add('active-option'); // add active class for newIndex
                    inputField.value = options[currentIndex + 1].textContent;
                }
            } else if (keyCode == "ArrowUp") {
                if (currentIndex - 1 >= 0) {
                    options[currentIndex].classList.remove('active-option'); // remove active class of currentIndex
                    options[currentIndex - 1].classList.add('active-option'); // add active class for newIndex
                    inputField.value = options[currentIndex - 1].textContent;
                }
            }
        }         
    }
}
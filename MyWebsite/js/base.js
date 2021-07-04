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
        console.log(objScope);
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
        // Link for default avatar
        let defaultAvatar = "../img/default-avatar.jpg";
        // Initialize the value for select field for employee page
        initCustomizedSelectEmployeePage();
        // Show the employee detail event
        document.querySelector('#btn-add').addEventListener("click", function (e) {
            document.querySelector('.layout-blur').style.width = "100vw"; // display blur layout
            document.querySelector('.employee-detail').style.width = "900px"; // display employee-detail
            document.querySelector('.m-dialog').style.width = "100vw"; // display dialog container
            initCustomizedSelect(); // initialize customized select
            document.querySelector('.input-information input').focus(); // Focus to first input
        });
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
        //Blur Background click event
        document.querySelector('.layout-blur').addEventListener("click", closeEmployeeForm);
        // X Button click event
        document.querySelector('img.close-button').addEventListener("click", closeEmployeeForm);
        // Event upload image of employee
        document.querySelector('.employee-detail .employee-detail-content input').addEventListener("change", function () {
            let uploadImg = document.querySelector('#upload-img');
            if (this.files && this.files[0]) {
                uploadImg.src = URL.createObjectURL(this.files[0]);
            }
        })
        document.querySelector('#upload-img').addEventListener("click", function (e) {
            document.querySelector('.employee-detail .employee-detail-content input').click();
        });
        //Event for save button
        // Close the error Dialog
        let closeButtonLayout1 = document.querySelector('.popup-list .popup-footer button');
        closeButtonLayout1.addEventListener('click', () => {
            let popupLayout = document.querySelector('.popup-layout');
            let errorListDialog = document.querySelector('.popup-list');
            popupLayout.style.width = "0px";
            errorListDialog.style.width = "0px";
        })
        // Close the error1 
        let closeButtonLayout2 = document.querySelector('.popup-list .close-button');
        closeButtonLayout2.addEventListener('click', () => {
            let popupLayout = document.querySelector('.popup-layout');
            let errorListDialog = document.querySelector('.popup-list');
            popupLayout.style.width = "0px";
            errorListDialog.style.width = "0px";
        })
        // Event click
        document.querySelector('#btn-save').addEventListener("click", () => {
            if (checkValidInputs(this)) {
                alert("Lưu thành công");
                initCustomizedSelect();
            } else {
                let popupLayout = document.querySelector('.popup-layout');
                popupLayout.style.width = "100vw";
                let errorListDialog = document.querySelector('.popup-list');
                errorListDialog.style.width = "500px";
            }
        });
        // Function check Error Input Field and display error
        var validateFunctions = {
            "email": this.validateEmail,
            "number": this.checkValidNumber,
            "tax": this.checkTaxNumber,
            "id": this.checkIdNumber
        }
        function checkValidInputs(objScope) {
            let check = true;
            let content = "";
            let errorBlockContent = document.querySelector('.error-content');
            errorBlockContent.innerHTML = "";
            // Check required field
            let requiredFields = document.querySelectorAll('.input-information .user-input.required');
            requiredFields.forEach(element => {
                if (element.value == "") {
                    content = "Thiếu trường \"" + element.parentElement.querySelector('.name-information').innerText + "\"";
                    errorBlockContent.appendChild(createErrorContent(content));
                    check = false;
                }
            })
            // Check only number field
            let userInputs = document.querySelectorAll('.input-information .user-input:not([type="date"])');
            userInputs.forEach(element => {
                let classListElement = element.classList;
                if (classListElement.contains("number-input")) {
                    content = "Thông tin \"số điện thoại\" bị nhập sai";
                    checkValidInput(content, validateFunctions.number, element.value, errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("email-input")) {
                    content = "Thông tin \"email\" bị nhập sai";
                    checkValidInput(content, validateFunctions.email, element.value, errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("tax-input")) {
                    content = "Thông tin \"mã số thuế\" bị nhập sai";
                    checkValidInput(content, validateFunctions.tax, element.value, errorBlockContent,objScope) ? true : check = false;
                } else if (classListElement.contains("input-currency")) {
                    content = "Thông tin \"lương cơ bản\" bị nhập sai";
                    checkValidInput(content, validateFunctions.number, element.value.replaceAll('.', ''), errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("id-input")) {
                    content = "Thông tin \"CMND\" bị nhập sai";
                    checkValidInput(content, validateFunctions.id, element.value, errorBlockContent,objScope) ? true : check = false;
                }
            })
            // check date picker field
            let datePickerField = document.querySelectorAll('.input-information .user-input[type="date"]');
            datePickerField.forEach(element => {
                if (element.value == "") {
                    content = "Thiếu trường \"" + element.parentElement.querySelector('.name-information').innerText + "\"";
                    errorBlockContent.appendChild(createErrorContent(content));
                    check = false;
                }
            })
            return check;
        }
        // Check valid and add Error Block 
        function checkValidInput(content, functionValidate, valueCheck ,errorBlockContent,objScope) {
            if (!functionValidate(valueCheck,objScope)) {
                errorBlockContent.appendChild(createErrorContent(content));
                return false;
            } return true;
        }
        // Create error content
        function createErrorContent(content) {
            let blockErrorContent = document.createElement('div');
            blockErrorContent.classList.add('block-content');
            let iconError = document.createElement('div');
            iconError.classList.add('icon-error-list');
            let contentError = document.createElement('div');
            contentError.innerText = content;
            blockErrorContent.appendChild(iconError);
            blockErrorContent.appendChild(contentError);
            return blockErrorContent;
        }
        // Event cancel employee form
        document.querySelector('.cancel').addEventListener("click", closeEmployeeForm);
        // Close the employee form
        function closeEmployeeForm() {
            let warningCloseDialog = document.querySelector('.popup-warning');
            let popupLayout = document.querySelector('.popup-layout');
            popupLayout.style.width = "100vw";
            warningCloseDialog.style.width = "500px";
        }
        // Event for close popup
        let closeButtonLayout = document.querySelector('.popup-footer button:last-of-type');
        
        let cancelButtonLayout = document.querySelector('.popup-footer button:first-of-type');
        let cancelButtonLayout1 = document.querySelector('.popup-warning .close-button');
        // Close employee detail form
        closeButtonLayout.addEventListener("click", () => {
            document.querySelector('#upload-img').src = defaultAvatar;
            document.querySelector('.layout-blur').style.width = "0px";
            document.querySelector('.m-dialog').style.width = "0px";
            document.querySelector('.employee-detail').style.width = "0px";
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })
        // Continue input detail form
        cancelButtonLayout.addEventListener("click", () => {
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })
        cancelButtonLayout1.addEventListener("click", () => {
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })

        // Check valid number input field
        let numberInputs = document.querySelectorAll('.number-input');
        numberInputs.forEach(element => {
            // Event key up for element
            element.addEventListener("keyup", (e) => {
                if (!this.checkValidNumber(e.target.value) && e.target.value != "") {
                    displayError(e.target);
                } else {
                    removeError(e.target);
                }
                if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57)) && element.classList.contains("input-currency"))
                    element.value = this.formatMoney(element.value);
            });
            // Event focus for element
            focusEvent(element, this.checkValidNumber);
        })
        // Check valid  email input field
        let emailInput = document.querySelector('.email-input');
        emailInput.addEventListener("keyup", (e) => {
            if (!this.validateEmail(e.target.value) && e.target.value != "") {
                displayError(e.target);
            } else {
                removeError(e.target);
            }
        });
        focusEvent(emailInput, this.validateEmail);
        // Check valid  ID input field
        let idInput = document.querySelector('.id-input');
        idInput.addEventListener("keyup", (e) => {
            if (!this.checkIdNumber(e.target.value) && e.target.value != "") {
                displayError(e.target);
            } else {
                removeError(e.target);
            }
        });
        focusEvent(idInput, this.checkIdNumber,this);
        // Check valid tax number input field
        let taxInput = document.querySelector('.tax-input');
        taxInput.addEventListener("keyup", (e) => {
            if (!this.checkTaxNumber(e.target.value) && e.target.value != "") {
                displayError(e.target);
            } else {
                removeError(e.target);
            }
        });
        focusEvent(taxInput, this.checkTaxNumber,this);
        // Function display error
        function displayError(element) {
            element.style.borderColor = "#FF4747";
            if (element.parentElement.querySelector(".wrong-input") == undefined) {
                let messageDialog = document.createElement("div");
                messageDialog.classList.add("wrong-input");
                messageDialog.innerText = "Dữ liệu nhập sai!";
                element.parentElement.appendChild(messageDialog);
            }
        }
        // Function remove error
        function removeError(element) {
            element.style.borderColor = "#019160";
            if (element.parentElement.querySelector(".wrong-input") != undefined)
                element.parentElement.querySelector(".wrong-input").remove();
        }
        // Focus on, focus out event
        function focusEvent(e, functionCheck,objScope) {
            e.addEventListener("focusout", (e1) => {
                if (e1.target.parentElement.querySelector(".wrong-input") == undefined)
                    e1.target.style.borderColor = "#bbbbbb";
            })
            e.addEventListener("focusin", (e1) => {
                e1.target.style.borderColor = "#019160";
                if (!functionCheck(e1.target.value,objScope) && e1.target.value != "") {
                    displayError(e1.target);
                    e1.target.style.borderColor = "#FF4747";
                }
            })
        }
        // Initialize for select custom of employee detail page
        function initCustomizedSelect() {
            // Clear the user's input and initialize the value for select field
            let inputs = document.querySelectorAll('.employee-detail .employee-detail-content .employee-information .input-information .select-container input');
            inputs[0].value = "Nam";
            inputs[1].value = "Giám đốc";
            inputs[2].value = "Phòng nhân sự";
            inputs[3].value = "Đang làm việc";
            let userInputs = document.querySelectorAll('.input-information .user-input');
            userInputs.forEach(element => {
                element.value = "";
            })
        }
        // Initialize for select custom of employee page
        function initCustomizedSelectEmployeePage(){
            let customInputEmployeePage = document.querySelectorAll('.filter-left .select-container input');
            customInputEmployeePage[0].value = "Tất cả phòng ban";
            customInputEmployeePage[1].value = "Tất cả vị trí";
        }
    }
}
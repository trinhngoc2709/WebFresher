class BaseJs {
    constructor() {

    }
    formatMoney(money) {
        if (money) {
            return money.replaceAll('.', '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else return "0";
    }
    checkValidNumber(str) {
        return /^\d+$/.test(str.replaceAll('.', '')) || "" == str;
    }
    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        } else return false;

    }
    checkTaxNumber(taxString) {
        if (taxString) {
            let toNumberTax = parseInt(taxString, 10);
            if (String(taxString).length != 10 || (!this.checkValidNumber(taxString))
                || (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                return false;
            else return true;
        } else return false;
    }
    checkIdNumber(idString) {
        console.log(idString.length);
        if (idString && this.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
            return true;
        } return false;
    }
    loadEvent() {
        let defaultAvatar = "/img/default-avatar.jpg";
        // On off the employee detail 
        document.querySelector('#btn-add').addEventListener("click", function (e) {
            document.querySelector('.layout-blur').style.width = "100vw";
            document.querySelector('.employee-detail').style.width = "900px";
            document.querySelector('.m-dialog').style.width = "100vw";
            initCustomizedSelect();
            document.querySelector('.input-information input').focus();
        });

        // Add event click to customized select
        let customizedSelects = document.querySelectorAll('.select-container');
        customizedSelects.forEach(element => {
            // click event
            element.addEventListener("click", () => {
                displayCustomizedSelect(element.childNodes[3]);
            });
            // Key up events Enter: confirm, Arrow Up, ArrowDown: change the option
            element.addEventListener("keyup", (e) => {
                let customizedSelect = element.childNodes[3];
                let options = e.target.parentElement.childNodes[3].children;
                if (e.code === "Enter") {
                    displayCustomizedSelect(customizedSelect);
                } else if (e.code == "ArrowUp") {
                    if (customizedSelect.style.width == "auto") {
                        displayOption(options, e.code, e.target);
                    }
                } else if (e.code == "ArrowDown") {
                    if (customizedSelect.style.width == "auto") {
                        displayOption(options, e.code, e.target);
                    }
                }
            });

        })
        let options = document.querySelectorAll('.select-container .select-custom div'); // options
        options.forEach(element => {
            element.addEventListener("click", (e) => {
                e.target.parentElement.parentElement.childNodes[1].value = e.target.textContent;
            })
        });
        // Function display customized select
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
            console.log(typeof (options));
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
        document.querySelector('#btn-save').addEventListener("click", () => {
            if (checkValidInputs()) {
                alert("Lưu thành công");
            } else {
                let popupLayout = document.querySelector('.popup-layout');
                popupLayout.style.width = "100vw";
                let closeButtonLayout = document.querySelector('.popup-footer button');
                let errorListDialog = document.querySelector('.popup-list');
                errorListDialog.style.width = "500px";
                errorListDialog.removeEventListener('click', true);
                closeButtonLayout.addEventListener('click', () => {
                    popupLayout.style.width = "0px";
                    errorListDialog.style.width = "0px";
                })
            }
        });
        // Function check Error Input Field and display error
        var validateFunctions = {
            "email": this.validateEmail,
            "number": this.checkValidNumber,
            "tax": this.checkTaxNumber,
            "id": this.checkIdNumber
        }
        function checkValidInputs() {
            let check = true;
            let content = "";
            let errorBlockContent = document.querySelector('.error-content');
            // Check required field
            let requiredFields = document.querySelectorAll('.input-information .user-input.required');
            requiredFields.forEach(element => {
                if (element.value == "") {
                    content = "Thiếu trường \"" + element.parentElement.childNodes[0].innerText + "\"";
                    errorBlockContent.appendChild(createErrorContent(content));
                    check = false;
                }
            })
            // Check only number field
            let userInputs = document.querySelectorAll('.input-information .user-input:not([type="date"])');
            userInputs.forEach(element => {
                let classListElement = element.classList;
                if (classListElement.contains("number-input")) {
                    content = "Thông tin số điện thoại bị nhập sai";
                    checkValidInput(content, validateFunctions.number, element.value, errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("email-input")) {
                    content = "Thông tin email bị nhập sai";
                    checkValidInput(content, validateFunctions.email, element.value, errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("tax-input")) {
                    content = "Thông tin mã số thuế bị nhập sai";
                    checkValidInput(content, validateFunctions.tax, element.value, errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("input-currency")) {
                    content = "Thông tin lương cơ bản bị nhập sai";
                    checkValidInput(content, validateFunctions.number, element.value.replaceAll('.', ''), errorBlockContent) ? true : check = false;
                } else if (classListElement.contains("id-input")) {
                    content = "Thông tin CMND bị nhập sai";
                    checkValidInput(content, validateFunctions.id, element.value, errorBlockContent) ? true : check = false;
                }
            })
            // check date picker field
            let datePickerField = document.querySelectorAll('.input-information .user-input[type="date"]');
            datePickerField.forEach(element => {
                if (element.value == "") {
                    content = "Thiếu trường \"" + element.parentElement.childNodes[0].innerText + "\"";
                    errorBlockContent.appendChild(createErrorContent(content));
                    check = false;
                }
            })
            return check;
        }
        // Check valid and add Error Block 
        function checkValidInput(content, functionValidate, valueCheck ,errorBlockContent) {
            if (!functionValidate(valueCheck)) {
                errorBlockContent.appendChild(createErrorContent(content));
                return false;
            }
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
        
        let cancleButtonLayout = document.querySelector('.popup-footer button:first-of-type');
        let cancleButtonLayout1 = document.querySelector('.popup-warning .close-button');
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
        cancleButtonLayout.addEventListener("click", () => {
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })
        cancleButtonLayout1.addEventListener("click", () => {
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
        focusEvent(idInput, this.checkIdNumber);
        // Check valid tax number input field
        let taxInput = document.querySelector('.tax-input');
        taxInput.addEventListener("keyup", (e) => {
            if (!this.checkTaxNumber(e.target.value)) {
                displayError(e.target);
            } else {
                removeError(e.target);
            }
        });
        focusEvent(taxInput, this.checkTaxNumber);
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
        function focusEvent(e, functionCheck) {
            e.addEventListener("focusout", (e1) => {
                if (e1.target.parentElement.querySelector(".wrong-input") == undefined)
                    e1.target.style.borderColor = "#bbbbbb";
            })
            e.addEventListener("focusin", (e1) => {
                e1.target.style.borderColor = "#019160";
                if (!functionCheck(e1.target.value) && e1.target.value != "") {
                    displayError(e1.target);
                    e1.target.style.borderColor = "#FF4747";
                }
            })
        }
        // Initialize for select custom
        function initCustomizedSelect() {
            // Clear the user's input and initilize the value for select field
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
    }
}
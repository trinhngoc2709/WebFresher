class InputClass{
    // Employee Detail Form Input
    employeeDetailInputs = $('.employee-detail .employee-detail-content .employee-information .input-information input')
    comboboxInputs = $('.employee-detail .employee-detail-content .employee-information .input-information .select-container input')
    employeeDetailUserInputs = $('.employee-detail .employee-detail-content .employee-information .input-information .select-container .user-input')
    datePickerField = $('.input-information input[type="date"]');
    employeeCodeInputEmployeeDetail = this.employeeDetailInputs.filter("input[fieldname=EmployeeCode]")
    usersInputs = $('.user-input')
    inputAvatar = $('.employee-detail .employee-detail-content input').first();
    constructor(){

    }
    /**
     * Load event for image input
     */
    ldEvtImgInput() {
        // Event upload image of employee
        let uploadImg = document.querySelector('#upload-img');
        $(this.inputAvatar).on('change', function () {
            if (this.files && this.files[0])
                uploadImg.src = URL.createObjectURL(this.files[0]);
        })
        $(uploadImg).click((e) =>{
            this.inputAvatar.click();
        })
    }
    /**
     * 
     * @param {Employee} employee 
     */
    ldEvtValidIptField(employee) {
        // Check valid number input field
        let numberInputs = $('.number-input,.input-currency');
        numberInputs.each((index, element) => {
            // Event key up for element
            $(element).on("keyup", (e) => {
                if (!employee.checkValidNumber($(e.target).val()) && $(e.target).val() != "") {
                    displayError(e.target);
                    $(e.target).attr("validate", false);
                } else {
                    removeError(e.target);
                    $(e.target).attr("validate", true);
                }
                if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57)) && $(element).hasClass("input-currency"))
                    $(element).val(employee.formatMoney($(element).val()))
            })
            // Event focus for element
            focusEvent(element, employee.checkValidNumber);
        })
        // Check valid  email input field
        let emailInput = $('.email-input');
        $(emailInput).on("keyup", (e) => {
            if (!employee.validateEmail($(e.target).val()) && $(e.target).val() != "") {
                displayError(e.target);
                $(e.target).attr("validate", false);
            } else {
                removeError(e.target);
                $(e.target).attr("validate", true);
            }
        })
        focusEvent(emailInput, employee.validateEmail);
        // Check valid  ID input field
        let idInput = $('.id-input');
        $(idInput).on("keyup", (e) => {
            if (!employee.checkIdNumber($(e.target).val()) && $(e.target).val() != "") {
                displayError(e.target);
                $(e.target).attr("validate", false);
            } else {
                removeError(e.target);
                $(e.target).attr("validate", true);
            }
        })
        focusEvent(idInput, employee.checkIdNumber, employee);
        // Check valid tax number input field
        let taxInput = document.querySelector('.tax-input');
        taxInput.addEventListener("keyup", (e) => {
            if (!employee.checkTaxNumber($(e.target).val()) && $(e.target).val() != "") {
                displayError(e.target);
                $(e.target).attr("validate", false);
            } else {
                removeError(e.target);
                $(e.target).attr("validate", true);
            }
        });
        focusEvent(taxInput, employee.checkTaxNumber, employee);
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
        // Focus on, focus out event
        function focusEvent(e, functionCheck, employee) {
            $(e).on({
                focusout: (e1) => {
                    if (!$(e1.target).parent().find(".wrong-input").length)
                        $(e1.target).css("border-color", "#bbbbbb");
                },
                focusin: (e1) => {
                    if (!functionCheck($(e1.target).val(), employee) && $(e1.target).val() != "") {
                        displayError(e1.target);
                        $(e1.target).css("border-color", "#ff4747");
                    } else {
                        removeError(e1.target);
                    }
                }
            })
        }
        // Function remove error
        function removeError(element) {
            element.style.borderColor = "#019160";
            if (element.parentElement.querySelector(".wrong-input") != undefined)
                element.parentElement.querySelector(".wrong-input").remove();
        }
    }
}
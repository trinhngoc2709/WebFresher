class Input {
    constructor() {

    }
    ldEvtImgInput() {
        // Event upload image of employee
        let inputImg = $('.employee-detail .employee-detail-content input');
        let uploadImg = document.querySelector('#upload-img');
        $(inputImg).on('change', function () {
            if (this.files && this.files[0])
                uploadImg.src = URL.createObjectURL(this.files[0]);
        })
        $(uploadImg).click(function (e) {
            inputImg.click();
        })
    }
    ldEvtValidIptField(objScope) {
        // Check valid number input field
        let numberInputs = $('.number-input,.input-currency');
        numberInputs.each((index, element) => {
            // Event key up for element
            $(element).on("keyup", (e) => {
                if (!objScope.checkValidNumber($(e.target).val()) && $(e.target).val() != "") {
                    displayError(e.target);
                    $(e.target).attr("validate", false);
                } else {
                    removeError(e.target);
                    $(e.target).attr("validate", true);
                }
                if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57)) && $(element).hasClass("input-currency"))
                    $(element).val(objScope.formatMoney($(element).val()))
            })
            // Event focus for element
            focusEvent(element, objScope.checkValidNumber);
        })
        // Check valid  email input field
        let emailInput = $('.email-input');
        $(emailInput).on("keyup", (e) => {
            if (!objScope.validateEmail($(e.target).val()) && $(e.target).val() != "") {
                displayError(e.target);
                $(e.target).attr("validate", false);
            } else {
                removeError(e.target);
                $(e.target).attr("validate", true);
            }
        })
        focusEvent(emailInput, objScope.validateEmail);
        // Check valid  ID input field
        let idInput = $('.id-input');
        $(idInput).on("keyup", (e) => {
            if (!objScope.checkIdNumber($(e.target).val()) && $(e.target).val() != "") {
                displayError(e.target);
                $(e.target).attr("validate", false);
            } else {
                removeError(e.target);
                $(e.target).attr("validate", true);
            }
        })
        focusEvent(idInput, objScope.checkIdNumber, objScope);
        // Check valid tax number input field
        let taxInput = document.querySelector('.tax-input');
        taxInput.addEventListener("keyup", (e) => {
            if (!objScope.checkTaxNumber($(e.target).val()) && $(e.target).val() != "") {
                displayError(e.target);
                $(e.target).attr("validate", false);
            } else {
                removeError(e.target);
                $(e.target).attr("validate", true);
            }
        });
        focusEvent(taxInput, objScope.checkTaxNumber, objScope);
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
        function focusEvent(e, functionCheck, objScope) {
            $(e).on({
                focusout: (e1) => {
                    if (!$(e1.target).parent().find(".wrong-input").length)
                        $(e1.target).css("border-color", "#bbbbbb");
                },
                focusin: (e1) => {
                    if (!functionCheck($(e1.target).val(), objScope) && $(e1.target).val() != "") {
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
class Input {
    constructor() {

    }

    ldEvtIconInput(){
        let userInputs = $('.user-input');
        $(userInputs).each((index,element)=>{
            $(element).on("keyup",()=>{
                let parentElement = "";
                if($(element).hasClass("input-currency")) 
                    parentElement = $(element).parent().parent();
                else 
                    parentElement = $(element).parent();
                if($(element).val().length == 0){
                    parentElement.find('.x-icon').hide();
                }else{
                    parentElement.find('.x-icon').show();
                }
            })
        })
        let iconDeleteInput = $('.x-icon');
        $(iconDeleteInput).each((index,element)=>{
            $(element).click((e)=>{
                $(element).parent().find('.user-input').val("");
                $(element).parent().find('.user-input').focus();
                $(element).hide();

                let options = $(element).parent().find('.option');
                console.log(options);
                $(options).each((index,element1)=>{
                    $(element1).parent().parent().find('img').hide();
                    $(element1).removeClass("active-option")
                    $(element1).removeClass("padding-left-0")
                    $(element1).addClass("padding-left-40")
                })
                // Propagate the click event to parent to check the error
            })
        })
    }

    ldEvtValidIptField(objScope) {
        // Check valid number input field
        let numberInputs = $('.number-input');
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
        $(idInput).on("keyup",(e)=>{
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
                    if ( !$(e1.target).parent().find(".wrong-input").length)
                        $(e1.target).css("border-color", "#bbbbbb");
                },
                focusin: (e1) => {
                    if (!functionCheck($(e1.target).val(), objScope) && $(e1.target).val() != "") {
                        displayError(e1.target);
                        $(e1.target).css("border-color","#ff4747");
                    }else{
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

$(document).ready(function () {
    new Employee();
})
/***
    Class Employee manage the event in the employee section
    Created by tbngoc (1/7/2021)
 ***/
class Employee extends BaseJs {
    /***
    Class Employee
    Created by tbngoc (1/7/2021)
    ***/
    constructor() {
        super();
        this.loadEvent();
        super.loadEvent();
    }
    /**
    Method check valid input of employee page
    Created by tbngoc (1/7/2021)
    **/
    checkValidInputs(objScope){
        // Function check Error Input Field and display error
        var validateFunctions = {
            "email": this.validateEmail,
            "number": this.checkValidNumber,
            "tax": this.checkTaxNumber,
            "id": this.checkIdNumber
        }
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
    }
   /**
    Method load event of employee page
    Created by tbngoc (1/7/2021)
    **/
    /**
    Method load event of employee page
    Created by tbngoc (1/7/2021)
    **/
    loadEvent(){
        /* Common Events of related to employee  */
        // Close the error popup
        let closeErrorPopup = document.querySelector('.popup-list .popup-footer button');
        closeErrorPopup.addEventListener('click',closeErrorPopUp);
        // Close the error popup 2
        let closeErrorPopup1 = document.querySelector('.popup-list .close-button');
        closeErrorPopup1.addEventListener('click',closeErrorPopUp);
        //Blur Background click event except dialog 
        document.querySelector('.layout-blur').addEventListener("click", closeEmployeeForm);
        // X Button click event
        document.querySelector('img.close-button').addEventListener("click", closeEmployeeForm);
        // Event cancel employee form
        document.querySelector('.cancel').addEventListener("click", closeEmployeeForm);
        // Function for closeErrorPopUp
        function closeErrorPopUp(){
            let popupLayout = document.querySelector('.popup-layout');
            let errorListDialog = document.querySelector('.popup-list');
            popupLayout.style.width = "0px";
            errorListDialog.style.width = "0px";
        }
        // Event for close popup
        let closeButton = document.querySelector('.popup-footer button:last-of-type');
        let continueInputButton = document.querySelector('.popup-footer button:first-of-type');
        let continueInputButton1 = document.querySelector('.popup-warning .close-button');

        // Close employee detail form
        closeButton.addEventListener("click", () => {
            document.querySelector('#upload-img').src = defaultAvatar;
            document.querySelector('.layout-blur').style.width = "0px";
            document.querySelector('.m-dialog').style.width = "0px";
            document.querySelector('.employee-detail').style.width = "0px";
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })

        // Event for Continue input detail form button
        continueInputButton.addEventListener("click", () => {
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })
        continueInputButton1.addEventListener("click", () => {
            document.querySelector('.popup-layout').style.width = "0px";
            document.querySelector('.popup-warning').style.width = "0px";
        })

        // Events for checking valid input
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
        // Function remove error
        function removeError(element) {
            element.style.borderColor = "#019160";
            if (element.parentElement.querySelector(".wrong-input") != undefined)
                element.parentElement.querySelector(".wrong-input").remove();
        }

        /* Event for employee tab in homepage */

        // Initialize for select custom of employee page
        function initValueSelected(){
            let customInputEmployeePage = document.querySelectorAll('.filter-left .select-container input');
            customInputEmployeePage[0].value = "Tất cả phòng ban";
            customInputEmployeePage[1].value = "Tất cả vị trí";
        }
        // Initialize the value for select field for employee page
        initValueSelected();
        
        // Show the employee detail event
        document.querySelector('#btn-add').addEventListener("click",  (e) => {
            document.querySelector('.layout-blur').style.width = "100vw"; // display blur layout
            document.querySelector('.employee-detail').style.width = "900px"; // display employee-detail
            document.querySelector('.m-dialog').style.width = "100vw"; // display dialog container
            initCustomizedSelect(); // initialize customized select
            document.querySelector('.input-information input').focus(); // Focus to first input
        });


        /* Event for Adding Employee Form */

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

        // Link for default avatar
        let defaultAvatar = "../img/default-avatar.jpg";

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

        // Event for save information of new employee
        document.querySelector('#btn-save').addEventListener("click", () => {
            if (this.checkValidInputs(this)) {
                alert("Lưu thành công");
                initCustomizedSelect();
            } else {
                let popupLayout = document.querySelector('.popup-layout');
                popupLayout.style.width = "100vw";
                let errorListDialog = document.querySelector('.popup-list');
                errorListDialog.style.width = "500px";
            }
        });

        /* Event for button */
        
        //Event for save button
        
        
        
        function closeEmployeeForm() {
            let warningCloseDialog = document.querySelector('.popup-warning');
            let popupLayout = document.querySelector('.popup-layout');
            popupLayout.style.width = "100vw";
            warningCloseDialog.style.width = "500px";
        }    

    }
    /***
    Class Employee
    Created by tbngoc (1/7/2021)
    ***/
    loadData() {

    }
    /***
    Class Employee
    Created by tbngoc (1/7/2021)
    ***/
    addData() {

    }
    /***
    Class Employee
    Created by tbngoc (1/7/2021)
    ***/
    removeData() {

    }
}


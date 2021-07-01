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
    }
    /***
    Class Employee
    Created by tbngoc (1/7/2021)
    ***/
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
                    inputField.value = options[currentIndex+1].textContent;
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
        // Event cancel employee form
        document.querySelector('.cancel').addEventListener("click", closeEmployeeForm);
        // Close the employee form
        function closeEmployeeForm() {
            document.querySelector('#upload-img').src = defaultAvatar;
            document.querySelector('.layout-blur').style.width = "0px";
            document.querySelector('.m-dialog').style.width = "0px";
            document.querySelector('.employee-detail').style.width = "0px";
        }
        // Initialize for select custom
        function initCustomizedSelect() {
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
        // Format Money for number input field
        let numberInputs = document.querySelectorAll('.number-input');
        numberInputs.forEach(element => {
            element.addEventListener("keyup", (e) => {
                if (!this.checkValidNumber(e.target.value)) {
                    displayError(e.target);
                } else {
                   removeError(e.target);
                }
                if ((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) && element.classList.contains("input-currency"))
                    element.value = this.formatMoney(element.value);
                focusEvent(e,this.checkValidNumber);
            });
            
        })
        document.querySelector('.email-input').addEventListener("keyup",(e)=>{
            if(!this.validateEmail(e.target.value)){
                displayError(e.target);
            }else{
                removeError(e.target);
            }
            focusEvent(e,this.validateEmail);
        });
        // Function display error
        function displayError(element){
            element.style.borderColor = "#FF4747";
            if (element.parentElement.querySelector(".wrong-input") == undefined) {
                let messageDialog = document.createElement("div");
                messageDialog.classList.add("wrong-input");
                messageDialog.innerText = "Dữ liệu nhập sai!";
                element.parentElement.appendChild(messageDialog);
            }
        }
        // Function remove error
        function removeError(element){
            element.style.borderColor = "#019160";
            if (element.parentElement.querySelector(".wrong-input") != undefined)
                element.parentElement.querySelector(".wrong-input").remove();
        }
        // Focus on, focus out event
        function focusEvent(e,functionCheck){
            e.target.addEventListener("focusout", (e1) =>{
                removeError(e1.target);
                e1.target.style.borderColor = "#bbbbbb";
            })
            e.target.addEventListener("focusin", (e1) => {
                e1.target.style.borderColor = "#019160";
                if(!functionCheck(e1.target.value)){
                    displayError(e1.target);
                    e1.target.style.borderColor = "#FF4747";
                }
            })
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


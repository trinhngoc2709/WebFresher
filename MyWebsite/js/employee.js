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
        this.loadData();
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
        //Check required field
        let requiredFields = document.querySelectorAll('.input-information .user-input.required');
        requiredFields.forEach(element => {
            if (element.value == "") {
                content = "Thiếu trường \"" + element.parentElement.querySelector('.name-information').innerText + "\"";
                errorBlockContent.appendChild(createErrorContent(content));
                check = false;
            }
        })
        let userInputs = $('.input-information .user-input');
        userInputs.each((index,element)=>{
            let classListElement = element.classList;
            if (classListElement.contains("number-input")) {
                content = "Thông tin \"số điện thoại\" bị nhập sai";
                console.log($(element).attr("validate"))
                if(!$(element).attr("validate") || $(element).val() == ""){
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                }
            } else if (classListElement.contains("email-input")) {
                content = "Thông tin \"email\" bị nhập sai";
                if(!$(element).attr("validate")){
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                }
            } else if (classListElement.contains("tax-input")) {
                content = "Thông tin \"mã số thuế\" bị nhập sai";
                if(!$(element).attr("validate")){
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                }
            } else if (classListElement.contains("input-currency")) {
                content = "Thông tin \"lương cơ bản\" bị nhập sai";
                if(!$(element).attr("validate")){
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                }
            } else if (classListElement.contains("id-input")) {
                content = "Thông tin \"CMND\" bị nhập sai";
                if(!$(element).attr("validate")){
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                }
            }
        })
        // Check date picker field
        let datePickerField = document.querySelectorAll('.input-information .user-input[type="date"]');
        datePickerField.forEach(element => {
            if (element.value == "") {
                content = "Thiếu trường \"" + element.parentElement.querySelector('.name-information').innerText + "\"";
                errorBlockContent.appendChild(createErrorContent(content));
                check = false;
            }
        })
        return check;
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
    getNewEmployeeId(){
        $.ajax({
            url : "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
            method :  "GET"
        }).done( (res)=>{
            return res;
        }).fail( (rej) => { 
            console.log(rej);
        })
    }
    /**
    Method load event of employee page
    Created by tbngoc (1/7/2021)
    **/
    loadEvent(){
        /* Common Events of related to employee  */
        /* Event for Button */
        this.buttonObj.ldEvtRefreshButton(this);
        this.buttonObj.ldEvtCloseButton();
        this.buttonObj.ldEvtOpenButton();
        this.buttonObj.ldEvtSaveButton(this);
        this.buttonObj.ldEvtResizeButton();
        // Events for checking valid input
        this.inputObj.ldEvtValidIptField(this);
        this.inputObj.ldEvtIconInput();

        /* Event for employee tab in homepage */
        // Initialize the value for select field for employee page
       
        /* Event for Adding Employee Form */
        // Link for default avatar

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

        
        
        // Event for edit and delete employee
        let editsButton = $('.employee-table tbody');
        $(editsButton).on('click','.edit-icon',(e)=>{
            console.log(e.target.parentElement.parentElement);
            displayEmployeeForm();
        })
    }
    renderDataEmployee(res){
        let thEmployeeTable = $('.employee-table thead th');
        let tbodyEmployeeTable = $('.employee-table tbody');
        let size = res.length;
        // Display to Paging Bar
        $('.paging-bar .display-employee').text("Hiển thị 1-12/"+size + " nhân viên");
        // Render Data Employee=
        $.each(res,(index,obj)=>{
            let row = $(`<tr></tr>`);
            $.each(thEmployeeTable,(index,item)=>{
                let td = $(``);
                let fieldName = $(item).attr('fieldName');
                if(index == 0){
                    td = `<td><img class="edit-icon" src="../icon/edit.png" /><img class="delete-icon" src="../icon/delete.png" /></td>`
                }else{
                    td = $(`<td></td>`);
                    let value = obj[fieldName];
                    if(fieldName == "DateOfBirth")
                        value = this.formatDate(value);
                    else if(fieldName == "Salary")
                        value = this.formatMoney(value);
                    else if (fieldName == "WorkStatus"){
                        if(value == 1){
                            value = `<input type="checkbox" checked onClick="this.checked=!this.checked;" >`
                        }else{
                            value = `<input type="checkbox" onClick="this.checked=!this.checked;" >`
                        }
                    }
                    td.append(value);
                }
                $(row).append(td);
            })
            tbodyEmployeeTable.append(row);
        })
        
    }
    /***
    Class Employee
    Created by tbngoc (1/7/2021)
    ***/
    async loadData() {
        $.ajax({
            url : "http://cukcuk.manhnv.net/v1/Employees",
            method :  "GET"
        }).done( (res)=>{
            this.renderDataEmployee(res);
        }).fail( (rej) => { 
            console.log(rej);
        })

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


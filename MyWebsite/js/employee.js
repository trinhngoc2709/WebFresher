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
        this.urlApis = {
            getEmployees    : "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
            getMaxIdEmployee    : "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
            getDepartment   : "http://cukcuk.manhnv.net/api/Department",
            getPosition     : "http://cukcuk.manhnv.net/v1/Positions"
        }
        this.loadData();
        this.loadEvent();
        super.loadEvent();
    }

    /**
     * Method init the Combobox values
     * Created by tbngoc (7/7/2021)
     * 
     */
    initCombobox() {
        // Combobox Department
        $.ajax({
            url: this.urlApis.getDepartment,
            method: "GET",
            success: function(data) {
                $(".select-custom.department").each((index, element) => {
                    data.forEach((e) => {
                        let option = `<div class="option">
                        <div class="option-icon"><img src="../static/icon/check.png" alt=""></div>
                        <div class="option-content none-pointer">` + e.DepartmentName + `</div>
                        </div>`
                        $(element).append(option);
                    })
                })
            }
        })
        // Combobox Position
        $.ajax({
            url: this.urlApis.getPosition,
            method: "GET",
            success: function(data) {
                $(".select-custom.position").each((index, element) => {
                    data.forEach((e) => {
                        let option = `<div class="option">
                        <div class="option-icon"><img src="../static/icon/check.png" alt=""></div>
                        <div class="option-content none-pointer" >` + e.PositionName + `</div>
                        </div>`
                        $(element).append(option);
                    })
                })
            }
        })

    }
    /**
    Method check valid input of employee page
    Created by tbngoc (1/7/2021)
    **/
    checkValidInputs(objScope) {
        // Function check Error Input Field and display 
        let height = 126;
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
                content = "Thiếu trường \"" + element.parentElement.parentElement.querySelector('.name-information').innerText + "\"";
                errorBlockContent.appendChild(createErrorContent(content));
                check = false;
                height += 36
            }
        })
        let userInputs = $('.input-information .user-input');
        userInputs.each((index, element) => {
            let classListElement = element.classList;
            if (classListElement.contains("number-input")) {
                content = "Thông tin \"số điện thoại\" bị nhập sai";
                if (!validateFunctions.number($(element).val()) || $(element).val() == "") {
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                    height += 36
                }
            } else if (classListElement.contains("email-input")) {
                content = "Thông tin \"email\" bị nhập sai";
                if (!validateFunctions.email($(element).val())) {
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                    height += 36
                }
            } else if (classListElement.contains("tax-input")) {
                content = "Thông tin \"mã số thuế\" bị nhập sai";
                if (!validateFunctions.tax($(element).val(), objScope)) {
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                    height += 36
                }
            } else if (classListElement.contains("input-currency")) {
                content = "Thông tin \"lương cơ bản\" bị nhập sai";
                if (!validateFunctions.number($(element).val())) {
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                    height += 36
                }
            } else if (classListElement.contains("id-input")) {
                content = "Thông tin \"CMND\" bị nhập sai";
                if (!validateFunctions.id($(element).val(), objScope)) {
                    check = false;
                    errorBlockContent.appendChild(createErrorContent(content));
                    height += 36
                }
            }
        })
        // Check date picker field
        let datePickerField = document.querySelectorAll('.input-information input[type="date"]');
        datePickerField.forEach(element => {
            if (element.value == "") {
                content = "Thiếu trường \"" + element.parentElement.querySelector('.name-information').innerText + "\"";
                errorBlockContent.appendChild(createErrorContent(content));
                check = false;
                height += 36
            }
        })
        $(".popup-list").css("height", height + "px");
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
    createNewEmployee() {
        $.ajax({
            url: this.urlApis.getEmployees,
            method: "GET"
        }).done((res) => {
            return res;
        }).fail((rej) => {
            console.log(rej);
        })
    }
    /**
     Method load event of employee page
     Created by tbngoc (1/7/2021)
     **/
    getNewEmployeeId() {
        $.ajax({
            url: this.urlApis.getMaxIdEmployee,
            method: "GET"
        }).done((res) => {
            return res;
        }).fail((rej) => {
            console.log(rej);
        })
    }
    /**
    Method load event of employee page
    Created by tbngoc (1/7/2021)
    **/
    loadEvent() {
        /* Common Events of related to employee  */
        /* Event for Button */
        this.buttonObj.ldEvtRefreshButton(this);
        this.buttonObj.ldEvtCloseButton();
        this.buttonObj.ldEvtOpenButton();
        this.buttonObj.ldEvtSaveButton(this);
        this.buttonObj.ldEvtResizeButton();
        this.buttonObj.ldEvtModifyEmployeeButton(this);
        // Events for checking valid input
        this.inputObj.ldEvtValidIptField(this);
        this.inputObj.ldEvtImgInput();
        /* Event for employee tab in homepage */
        this.initCombobox(); // init combobox
    }
    renderDataEmployee(res) {
        let thEmployeeTable = $('.employee-table thead th');
        let tbodyEmployeeTable = $('.employee-table tbody');
        let size = res.length;
        // Display to Paging Bar
        $('.paging-bar .display-employee').text("Hiển thị 1-12/" + size + " nhân viên");
        // Render Data Employee=
        $.each(res, (index, obj) => {
            let row = $(`<tr></tr>`);
            $.each(thEmployeeTable, (index, item) => {
                let td = $(``);
                let fieldName = $(item).attr('fieldName');
                if (index == 0) {
                    td = `<td><img class="edit-icon" src="../static/icon/edit.png" /><img class="delete-icon" src="../static/icon/delete.png" /></td>`
                } else {
                    let value = obj[fieldName];
                    td = $(`<td fieldName="` + fieldName + `"></td>`);
                    if (fieldName == "DateOfBirth")
                        value = this.formatDate(value);
                    else if (fieldName == "Salary")
                        value = this.formatMoney(value);
                    else if (fieldName == "WorkStatus") {
                        td = $(`<td fieldName="` + fieldName + `" value=` + value + `></td>`);
                        if (value != null) {
                            value = `<input type="checkbox" checked onClick="this.checked=!this.checked;" >`
                        } else {
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
    loadData() {
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "GET",
            success: (data) => {
                this.renderDataEmployee(data);
            }
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
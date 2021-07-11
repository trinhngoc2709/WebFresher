class InputClass{
    // Employee Detail Form Input
    employeeDetailInputs = $('.employee-detail .employee-detail-content .employee-information .input-information input')
    comboboxInputs = $('.employee-detail .employee-detail-content .employee-information .input-information .select-container input')
    employeeDetailUserInputs = $('.employee-detail .employee-detail-content .employee-information .input-information .select-container .user-input')
    datePickerField = $('.input-information input[type="date"]');
    employeeCodeInputEmployeeDetail = this.employeeDetailInputs.filter("input[fieldname=EmployeeCode]")
    usersInputs = $('.user-input')
    constructor(){
        console.log(this.employeeCodeInputEmployeeDetail)
    }
}
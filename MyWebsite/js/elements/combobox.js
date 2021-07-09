class Combobox{
    // Initialize for select custom of employee detail page
    initCustomizedSelect(input) {
        // Clear the user's input and initialize the value for select 
        let inputs = input.comboboxInputs
        let userInputs = input.employeeDetailUserInputs
        $(userInputs).each((index,element) => {
            $(element).val("")
        })
        $(inputs[0]).val("Nam");
        $(inputs[1]).val("Phòng Đào tạo")
        $(inputs[2]).val("Phòng Marketting")
        $(inputs[3]).val("Đang làm việc")

        let datePickerField = input.datePickerField
        datePickerField.each((index, element) => {
            $(element).val("")
        })
        setTimeout(() => {
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode",
                method: "GET",
                success: function (data) {
                    $(input.employeeCodeInputEmployeeDetail).val(data)
                },
                error: function (data) {
                    console.log("Lỗi")
                }
            })
        }, 0)
    }

    constructor() {

    }
}
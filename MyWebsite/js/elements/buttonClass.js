class ButtonClass {

    // Common Buttons
    refreshButton = $('.m-button-refresh.employee')
    employeeSaveButton = $('#btn-employee-save')
    openEmployeeFormButton = $('#btn-employee-add')
    closeEmployeeFormButton = $('.employee-detail img.close-button,.employee-detail .cancel') // X close button employee-form
    toggleNavbarButton = $('.navbar .navbar-content .btn-resize')
    // Popup Buttons
    // Confirmation Popup Buttons
    confirmConfirmationPopupButton = $('.popup-confirmation button:first-of-type')
    cancelConfirmationPopupButton = $('.popup-confirmation button:last-of-type')
    // Warning Popup Buttons
    confirmWarningPopupButton = $('.popup-warning .popup-footer button:last-of-type');
    closeWarningPopupButton = $('.popup-warning img.close-button,.popup-warning .popup-footer button:first-of-type')
    // Error Popup Buttons
    closeErrorPopupButton = $('.popup-list .popup-footer button,.popup-list img.close-button')

    constructor(toggle, combobox, input, popup) {
        this.popup = popup
        this.toggle = toggle;
        this.combobox = combobox;
        this.input = input;
    }


    ldEvtModifyEmployeeButton() {
        // Event for edit and delete employee
        let employeeTable = $('.employee-table tbody'); // Employee table
        // Edit event
        $(employeeTable).on('click', '.edit-icon', (e) => {
            let employeeId = $(e.target).parent().parent().data("EmployeeId")
            this.toggle.toggleEmployeeForm(this.combobox, this.input); // Display Employee Form
            setTimeout(() => {
                $.ajax({
                    method: 'GET',
                    url: "http://cukcuk.manhnv.net/v1/Employees/" + employeeId
                }).done((data) => {
                    console.log(data)
                    $('.employee-detail .title').text("SỬA THÔNG TIN NHÂN VIÊN");
                    $('.employee-detail').attr("type", "Edit") // Change type action: Must change to method type variable
                    let objEmployee = {};
                    // Get the data from table
                    $(e.target).parent().siblings().each((index, element) => {
                        if ($(element).attr('fieldName') == "DateOfBirth")
                            objEmployee[$(element).attr('fieldName')] = $(element).text().split("/").reverse().join("-");
                        else if ($(element).attr('fieldName') == "WorkStatus") {
                            objEmployee[$(element).attr('fieldName')] = (($(element).attr('value') != "null") ? "Đang làm việc" : "Đã nghỉ việc");
                        } else if ($(element).attr('fieldName') == "GenderName") {
                            let genderName = $(element).text();
                            objEmployee[$(element).attr('fieldName')] = genderName;
                            if (genderName == "Nam")
                                objEmployee.gender = 1;
                            else if (genderName == "Nữ")
                                objEmployee.gender = 2;
                            else
                                objEmployee.gender = 3;
                        } else
                            objEmployee[$(element).attr('fieldName')] = $(element).text();
                    })
                    // Binding value to employee form
                    $(this.input.employeeDetailInputs).each((index, element) => {
                        if (objEmployee[$(element).attr('fieldName')]) {
                            $(element).val(objEmployee[$(element).attr('fieldName')])
                        }
                    })
                })
            }, 100)
        })
        let employeeId = "";
        // Delete event
        $(employeeTable).on('click', '.delete-icon', (e) => {
            this.toggle.toggleConfirmationPopup(this.popup); // Display confirmation popup
            employeeId = $(e.target).parent().parent().data("EmployeeId");
        })
        // Event for confirm button
        $(this.confirmConfirmationPopupButton).click((e) => {
            this.toggle.toggleConfirmationPopup(this.popup)
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/" + employeeId,
                method: "DELETE",
                success: (data) => {
                    if (data) {
                        // Update employee table
                        this.refreshButton.trigger('click');
                        // Check Status Please complete toast message
                    }

                }
            })
        })
    }
    /**
     * Event for save/edit information of new employee
     * @param {Employee} employee 
     */
    ldEvtSaveButton(employee) {
        // Event for save information of new employee
        $(this.employeeSaveButton).click(() => {
            if (employee.checkValidInputs(employee) || true) {
                let objEmployee = {}
                let inputUpload = $('.employee-detail input').filter((index, element) => $(element).attr("fieldname") != undefined)
                // Saving the data of new employee
                $(inputUpload).each((index, element) => {
                    if ($(element).attr("fieldname") == "WorkStatus")
                        objEmployee[$(element).attr('fieldName')] = $(element).val() == "Đang làm việc" ? 1 : 0
                    else if ($(element).attr("fieldname") == "GenderName") {
                        let genderName = $(element).text();
                        objEmployee[$(element).attr('fieldName')] = genderName;
                        if (genderName == "Nam")
                            objEmployee.gender = 1;
                        else if (genderName == "Nữ")
                            objEmployee.gender = 2;
                        else
                            objEmployee.gender = 3;
                        //objEmployee[$(element).attr('fieldName')] = $(element).val();
                    } else
                        objEmployee[$(element).attr('fieldName')] = $(element).val().replaceAll('.', '');
                })
                //objEmployee["DepartmentCode"] = 
                // Get Department Code 
                setTimeout(() => {
                    $.ajax({
                        url: "http://cukcuk.manhnv.net/api/Department",
                        method: "GET",
                    }).done((data) => {
                        //console.log(objEmployee.departmentName)
                        let department = data.filter((value, index) => {
                            if (value.DepartmentName == objEmployee.DepartmentName)
                                return value
                        })
                        objEmployee["DepartmentCode"] = department[0].DepartmentCode;
                        objEmployee["DepartmentId"] = department[0].DepartmentId;
                    }, 100)
                })
                // Get Position Code
                setTimeout(() => {
                    $.ajax({
                        url: "http://cukcuk.manhnv.net/v1/Positions",
                        method: "GET",
                    }).done((data) => {
                        let position = data.filter((value, index) => {
                            if (value.PositionName == objEmployee.PositionName)
                                return value
                        })
                        objEmployee["PositionCode"] = position[0].PositionCode;
                        objEmployee["PositionId"] = position[0].PositionId;
                    })
                }, 200)


                if ($('.employee-detail').attr("type") == "Save") {
                    setTimeout(() => {
                        $.ajax({
                            url: "http://cukcuk.manhnv.net/v1/Employees",
                            method: "POST",
                            data: JSON.stringify(objEmployee),
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json'
                        }).done((res) => {
                            if (res)
                                console.log("Thêm thành công ")
                            else
                                console.log("Thêm thất bại")
                        })
                    }, 300)
                } else {

                    setTimeout(() => {
                        $.ajax({

                            url: "http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=1&employeeCode=" + objEmployee.EmployeeCode,
                            method: "GET",
                            success: (data) => {
                                let employeeId = data.Data[0].EmployeeId
                                $.ajax({
                                    url: "http://cukcuk.manhnv.net/v1/Employees/" + employeeId,
                                    method: "PUT",
                                    data: JSON.stringify(objEmployee),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json'
                                }).done((res) => {
                                    if (res)
                                        console.log("Sửa thành công ")
                                    else
                                        console.log("Sửa thất bại")
                                })

                            }
                        })
                    }, 300)
                }
                this.combobox.initCustomizedSelect(this.input);
            } else {
                $('.popup-layout').slideToggle(300, "linear");
                $('.popup-list').slideToggle(300, "linear");
            }
        })
    }
    ldEvtRefreshButton(employee) {
        // Event for refresh
        $(this.refreshButton).click(() => {
            $('.employee-table tbody').empty();
            employee.loadData();
        })
    }
    ldEvtOpenButton() {
        // Show the employee detail event
        $(this.openEmployeeFormButton).click(() => {
            this.toggle.toggleEmployeeForm(this.combobox, this.input);
        })

    }
    ldEvtCloseButton() {
        //Blur Background click event except dialog 
        $(this.layoutBlur).click(() => {
            this.toggle.toggleWarningPopup(this.popup);
        });
        // X Button click event of the employee detail form
        $(this.closeEmployeeFormButton).click(() => {
            this.toggle.toggleWarningPopup(this.popup);
        });

        // Event for close popup
        //let closeButton = $('.popup-warning .popup-footer button:last-of-type');
        //let closeButtonError = $('.popup-list .popup-footer button');
        //let closeButtonError1 = $('.popup-list img.close-button');
        //let closeButtonWarning = $('.popup-warning img.close-button');
        //let continueInputButton = $('.popup-warning .popup-footer button:first-of-type');
        //let closeButtonConfirmation = $('.popup-confirmation img.close-button');

        //let cancelButtonConfirmation = $('.popup-confirmation button:last-of-type');

        // Close employee detail form
        $(this.confirmWarningPopupButton).click(() => {
            this.toggle.toggleWarningPopup(this.popup);
            this.toggle.toggleEmployeeForm(this.combobox, this.input);
        })
        $(this.closeWarningPopupButton).click(() => {
            this.toggle.toggleWarningPopup(this.popup);
        })
        $(this.closeErrorPopupButton).click(() => {
            this.toggle.toggleErrorPopup(this.popup);
        })
        $(this.closeConfirmPopupButton).click(() => {
            this.toggle.toggleConfirmationPopup(this.popup);
        })

    }
    ldEvtResizeButton() {
        // Event for resize button 
        let btnResize = $('.navbar .navbar-content .btn-resize');
        btnResize.click((e) => {
            let navbarContent = $(e.target).parent().parent(); // Navbar content
            let navbarItems = $(navbarContent).find('.navbar-item'); // NavbarItem
            let navbarTextItems = $(navbarItems).find('.navbar-item-text'); // Text in navbar item
            let navbar = $('.navbar');
            //let misaLogo = navbar.find('.misa-logo');
            //let header = $('.header');
            let content = $('.content');

            //misaLogo.toggle();
            $(navbarTextItems).toggle(); // Toggle the text in navbar content
            if ($(e.target).hasClass("rotate-opposite")) {
                $(navbarItems).each((index, element) => $(element).css("background-position", "16px center"));
                $(navbarContent).css("width", "100%");
                $(content).css("left", "221px")
                $(content).css("width", "calc( 100% - 221px )")
                //$(header).css("width","calc( 100% - 221px )")
                //$(navbar).css("width","220px");
            } else {
                $(navbarItems).each((index, element) => $(element).css("background-position", "center center"))
                $(navbarContent).css("width", "52px");
                $(content).css("left", "calc(221px - 169px )")
                $(content).css("width", "calc( 100% - 221px + 169px )")
                //$(header).css("width","calc( 100% - 221px + 168px )")
                // $(navbar).css("width","52px");
            }
            $(e.target).toggleClass("rotate-opposite");
        })
    }
}
class Combobox {
    /**
     * 
     * @param {Input} inputObj 
     * @param {Icon} iconObj 
     * @param {Dropdown} dropdownObj 
     */
    constructor(inputObj, iconObj, dropdownObj) {
        this.inputObj = inputObj
        this.iconObj = iconObj
        this.dropdownObj = dropdownObj
    }
    /**
     * Initialize value for combobox
     * @param {Input} input 
     */
    // Initialize for select custom of employee detail page
    initCustomizedSelect(input) {
        // Clear the user's input and initialize the value for select 
        let inputs = input.comboboxInputs
        let userInputs = input.employeeDetailUserInputs
        $(userInputs).each((index, element) => {
            $(element).val("")
        })
        // $(inputs[0]).val("Nam");
        // $(inputs[1]).val("Phòng Đào tạo")
        // $(inputs[2]).val("Phòng Marketting")
        // $(inputs[3]).val("Đang làm việc")

        let datePickerField = input.datePickerField
        datePickerField.each((index, element) => {
            $(element).val("")
        })
        // Get new employee code
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

    ldEvtCombobox(employee) {
        var self = this;
        let check = true;
        /* Event for Customize Select */
        // Event for input field to display x icon
        let userInputs = this.inputObj.usersInputs
        $(userInputs).each((index, element) => {
            setTimeout(() => {
                $(element).on("keyup", () => {
                    let input = null;
                    if ($(element).hasClass("input-currency"))
                        input = $(element).parent().parent();
                    else
                        input = $(element).parent();

                    if ($(element).val().length == 0) {
                        input.find('.x-icon').hide();
                    } else {
                        input.find('.x-icon').show();
                    }
                })
            }, 20);
        })

        // Event when click the x icon
        let iconDeleteInputs = this.iconObj.iconDeleteInputs;
        $(iconDeleteInputs).each((index, element) => {
            $(element).click((e) => {
                $(element).parent().find('input').removeClass("border-red"); // remove red border if the input is error
                $(element).parent().find('.user-input').val(""); // empty the input
                $(element).parent().find('.user-input').focus(); // focus the input
                $(element).hide(); // Hide the icon
                // Change the options to default status
                let options = $(element).parent().find('.option');
                $(options).each((index, element1) => {
                    $(element1).show();
                    $(element1).parent().parent().find('img').removeClass("visible");
                    $(element1).removeClass("active-option")
                })
                check = false;
                // Propagate the click event to parent to check the error
            })
        })

        // Add event click to display customized select
        let iconDropdownContainer = $('.icon-container');
        iconDropdownContainer.each(function (index, element) {
            let iconInput = $(element).find('.icon-input');
            let customSelect = $(element).parent().find('.select-custom');
            // Event click the dropdown icon
            $(element).on({
                // click event : display customized select, rotate input icon
                click: () => {
                    //$(element).parent().find('input').toggleClass("border-green");
                    $(element).parent().find('input').focus();
                    $(element).toggleClass("background-bbb");
                    displayCustomizedSelect(customSelect); // display the dropdown
                    rotateIconInput(iconInput); // rotate the icon
                    check = false;
                }
            })
            // input field of combobox
            let inputField = $(element).parent().find('.combobox');
            inputField.on({
                // Event focus the input
                focus: () => {
                    $(element).parent().find('input').addClass("border-green");
                },
                //Focus out : Hide the customized select, rotate input icon
                blur: () => {
                    $(element).parent().find('input').removeClass("border-green");
                    setTimeout(() => {
                        if ($(iconInput).hasClass("rotate-X") && check) {
                            //$(element).parent().find('input').removeClass("border-red");
                            rotateIconInput(iconInput);
                            displayCustomizedSelect(customSelect);
                            $(element).toggleClass("background-bbb");
                        }
                    }, 250);
                    check = true;
                    //setTimeout(check = true,500);
                },
                'input': (e) => {
                    setTimeout(() => {
                        let filterText = $(e.target).val(); // the text of the input
                        let options = $(e.target).parent().find('.option');
                        let check = false;
                        // Filter the options which have the input string in their value
                        // Display the valid options and hide the others
                        $(options).each(function () {
                            $(this).removeClass('active-option')
                            $(this).parent().find('img').removeClass('visible')
                            let optionContent = $(this).find('.option-content').text()
                            if (optionContent.search(filterText) != -1) {
                                $(this).show();
                                check = true;
                            } else
                                $(this).hide();
                        })
                        // Check if there is any valid option or not
                        if (!check) {
                            $(e.target).addClass('border-red');
                        } else {
                            $(e.target).removeClass('border-red');
                            if(element.parentElement.querySelector(".wrong-input"))
                                element.parentElement.querySelector(".wrong-input").remove();
                        }
                        // Display the dropdown
                        if (customSelect.css("display") == "none") {
                            displayCustomizedSelect(customSelect);
                            rotateIconInput(iconInput);
                            $(element).toggleClass("background-bbb");
                        }
                    }, 200)
                }, // Key up events Enter: confirm, Arrow Up, ArrowDown: change the option
                keydown: (e) => {
                    //let customizedSelect = $(e.target).parent().find('.select-custom');
                    let filteredOptions = $(e.target).parent().find('.option').filter(function () {
                        return $(this).css('display') != "none";
                    });
                    if (e.code === "Enter") { // Enter event : display customized select, rotate the input
                        setTimeout(() => {
                            rotateIconInput(iconInput);
                            //$(element).parent().find('input').toggleClass("border-green");
                            $(element).toggleClass("background-bbb");
                            displayCustomizedSelect(customSelect);
                        }, 100)
                        let active = false;
                        $(e.target).parent().find('.option').each(function () {
                            $(this).hasClass('active-option') ? active = true : false;
                        })
                        // Filter data when there is chosen option
                        if (customSelect.css('display') != 'none' && customSelect.parent().hasClass('searching') && active)
                            self.filterData(employee);
                    } else if (e.code == "ArrowUp" || e.code == "ArrowDown") // ArrowUp ArrowDown event : change the option
                    {
                        if (customSelect.css("display") == "none") {
                            displayCustomizedSelect(customSelect);
                            rotateIconInput(iconInput);
                            $(element).toggleClass("background-bbb");
                        }
                        displayOption(filteredOptions, e.code, e.target);
                        //$(e.target).trigger("input")
                    }
                },
                // Event mouseover to display the error
                mouseover: (e) => {
                    if ($(e.target).hasClass("border-red")) {
                        let messageDialog = document.createElement("div");
                        messageDialog.classList.add("wrong-input");
                        messageDialog.innerText = "Không tồn tại dữ liệu!";
                        element.parentElement.appendChild(messageDialog);
                    }
                },
                // Event remove the error
                mouseout: () => {
                    if(element.parentElement.querySelector(".wrong-input"))
                        element.parentElement.querySelector(".wrong-input").remove();
                }
            })
        })
        // Rotate 180 degree the element
        function rotateIconInput(iconInput) {
            $(iconInput).toggleClass("rotate-X");
        }

        // Set event for options of dropdown
        //let options = document.querySelectorAll('.select-container .select-custom .option'); // options
        this.dropdownObj.dropdown.on('click', '.option', function (element) {
            let parentElement = $(this).parent().parent();
            // Turn the sibling options to default
            let optionSiblings = $(element.target).siblings();

            //console.log(optionSiblings)
            $(optionSiblings).find('img').removeClass("visible");
            $(optionSiblings).removeClass('active-option');

            // Active the chosen option
            $(this).addClass('active-option');
            $(this).parent().parent().find('input').val($(this).text());
            $(this).find('img').addClass('visible');
            $(this).parent().parent().find('input').val($(this).find('.option-content').text());

            // Toggle Select Custom, Icon Container
            displayCustomizedSelect($(this).parent())
            //$(parentElement).find("input").removeClass("border-green")
            $(parentElement).find(".icon-container").removeClass("background-bbb")
            $(parentElement).find('.x-icon').show()
            rotateIconInput(parentElement.find('.icon-input'))
        })

        // Function display/hide customized select
        function displayCustomizedSelect(customizedSelect) {
            $(customizedSelect).slideToggle(250, "linear");
        }
        // Display option after choosing
        function displayOption(options, keyCode, inputField) {
            let currentIndex = -1;
            let maxIndex = options.length;
            // Find the index of current chosen option
            for (const option of options) {
                if ($(option).hasClass("active-option")) {
                    currentIndex = Array.prototype.indexOf.call(options, option)
                    break;
                }
            }
            // Remove properties of the current chosen option and add them into the new one
            if (keyCode == "ArrowDown") {
                if (currentIndex + 1 < maxIndex) {
                    if (currentIndex != -1) {
                        $(options[currentIndex]).find('img').removeClass('visible'); // hide image
                        //Remove and Add background, change padding
                        $(options[currentIndex]).removeClass('active-option'); // remove active class of currentIndex
                    }
                    // Show image, change padding of the chosen option
                    $(options[currentIndex + 1]).addClass('active-option'); // add active class for newIndex
                    $(options[currentIndex + 1]).find('img').addClass('visible'); // display image tick
                    $(inputField).val($(options[currentIndex + 1]).find('.option-content').text()); // display content option
                }
            } else if (keyCode == "ArrowUp") {
                if (currentIndex - 1 >= 0) {
                    $(options[currentIndex]).find('img').removeClass('visible'); // hide image
                    //Remove and Add background
                    options[currentIndex].classList.remove('active-option'); // remove active class of currentIndex
                    options[currentIndex - 1].classList.add('active-option'); // add active class for newIndex
                    // Show image, change padding of the chosen option
                    $(options[currentIndex - 1]).find('img').addClass('visible');
                    $(inputField).val($(options[currentIndex - 1]).find('.option-content').text());
                }
            }
        }
    }
    /**
     * 
     */
    lvEvtDropDownChoosing(employee) {
        $('.content .select-custom.department').add($('.content .select-custom.position')).on('click keydown', '.option', (e) => {
            this.filterData(employee);
        })
    }
    filterData(employee) {
        setTimeout(function () {
            let url = "";
            $('.employee-table tbody').empty();
            let departmentId = $('.content .select-custom.department .option.active-option').data("departmentInformation")
            let positionId = $('.content .select-custom.position .option.active-option').data("positionInformation")
            departmentId = departmentId != undefined ? departmentId.DepartmentId : ""
            positionId = positionId != undefined ? positionId.PositionId : ""
            url = `http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=1000&employeeCode=NV&departmentId=${departmentId}&positionId=${positionId} `
            $.ajax({
                url: url,
                method: "GET"
            }).done((res) => {
                employee.renderDataEmployee(res.Data);
            })
        }, 100)
    }
}
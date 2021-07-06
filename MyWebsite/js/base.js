class BaseJs {
    /***
     Created by tbNgoc at 30/06/2021
     * **/
    constructor() {

    }
    /***
     Created by tbNgoc at 30/06/2021
     Format VND money string 
     * **/
    formatMoney(money) {
        if (money) {
            return money.toString().replaceAll('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else return "0";
    }
    /***
     Created by tbNgoc at 30/06/2021
     Format VND money string 
     * **/
    formatDate(date) {
        if (date) {
            let date = new Date();
            let day = date.getDay(),
                month = date.getMonth() + 1,
                year = date.getFullYear();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            return day + '/' + month + '/' + year;
        } else return "";
    }
    /***
     Created by tbNgoc at 30/06/2021
     Check valid number
     * **/
    checkValidNumber(str) {
        return /^\d+$/.test(str.replaceAll('.', ''));
    }
    /***
     Created by tbNgoc at 30/06/2021
     Validate the email
     * **/
    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        } else return false;

    }
    /***
     Created by tbNgoc at 30/06/2021
     Check Tax Number
     * **/
    checkTaxNumber(taxString, objScope) {
        if (this) {
            if (taxString) {
                let toNumberTax = parseInt(taxString, 10);
                if (String(taxString).length != 10 || (!this.checkValidNumber(taxString)) ||
                    (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                    return false;
                else return true;
            } else return false;
        } else {
            if (taxString) {
                let toNumberTax = parseInt(taxString, 10);
                if (String(taxString).length != 10 || (!objScope.checkValidNumber(taxString)) ||
                    (toNumberTax < 1 || toNumberTax > 9999999999 || toNumberTax == 9999999000))
                    return false;
                else return true;
            } else return false;
        }
    }
    /***
     Created by tbNgoc at 30/06/2021
     Check identity number
     * **/
    checkIdNumber(idString, objScope) {
        if (this) {
            if (idString && this.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
                return true;
            }
            return false;
        } else {
            if (idString && objScope.checkValidNumber(idString) && (idString.length == 9 || idString.length == 12)) {
                return true;
            }
            return false;
        }

    }
    /***
     Created by tbNgoc at 30/06/2021
     Load the event of employee page
     * **/
    loadEvent() {
        /* Event for Navbar */
        // Event for click options on nav-item
        // Initialize the chosen option
        let navItems = $('.navbar-content .navbar-item');
        $(navItems).each(function () {
            if (this.innerText == "Danh mục nhân viên")
                this.classList.add("active-option");
        })
        $(navItems).click(function () {
            let navItemSiblings = $(this).siblings();
            $(navItemSiblings).removeClass("active-option");
            $(this).addClass("active-option");
        })

        // Event for resize button 
        let btnResize = document.querySelector('.navbar .navbar-content .btn-resize');
        btnResize.addEventListener('click', (e) => {
            let navbarContent = e.target.parentElement.parentElement;
            let navbarItems = navbarContent.querySelectorAll('.navbar-item');
            let navbarTextItems = navbarContent.querySelectorAll('.navbar-item .navbar-item-text');
            $(navbarTextItems).toggle();
            if (e.target.classList.contains('rotate-oposite')) {
                navbarItems.forEach(element => {
                    element.style.backgroundPosition = "16px center";
                    element.style.marginRight = "10px";
                })
                e.target.classList.remove('rotate-oposite');
                navbarContent.style.width = "100%";
            } else {
                navbarItems.forEach(element => {
                    element.style.backgroundPosition = "center center";
                })
                e.target.classList.add('rotate-oposite');
                navbarContent.style.width = "52px";
            }
        })

        /* Event for Customize Select */

        // Add event click to display customized select

        let customizedSelects = $('.select-container');
        customizedSelects.each(function (index, element) {
            let iconInput = $(element).find('.icon-input');
            $(element).on({
                // click event : display customized select, rotate input icon
                click: () => {
                    let cusomtSelect = $(element).find('.select-custom');
                    $(element).find('input').toggleClass("border-green");
                    displayCustomizedSelect(cusomtSelect);
                    rotateIconInput(iconInput);
                },
                // Focus out : Hide the customized select, rotate input icon
                focusout: () => {
                    
                    if ($(iconInput).hasClass("rotate-X")) {
                        $(element).find('input').toggleClass("border-green");
                        rotateIconInput(iconInput);
                        displayCustomizedSelect($(element).find('.select-custom'));
                    }
                },
                // Key up events Enter: confirm, Arrow Up, ArrowDown: change the option
                keyup: (e) => {
                    let customizedSelect = $(e.target).parent().find('.select-custom');
                    let options = $(e.target).parent().find('.option');
                    if (e.code === "Enter") { // Enter event : display customized select, rotate the input
                        rotateIconInput(iconInput);
                        $(element).find('input').toggleClass("border-green");
                        displayCustomizedSelect(customizedSelect);
                    } else if (e.code == "ArrowUp" || e.code == "ArrowDown") // ArrowUp ArrowDown event : change the option
                        displayOption(options, e.code, e.target);
                }
            })
        })
        // Rotate 180 degree the element
        function rotateIconInput(iconInput) {
            $(iconInput).toggleClass("rotate-X");
        }
        // Set event for options of customized select
        let options = document.querySelectorAll('.select-container .select-custom .option'); // options
        options.forEach(element => {
            $(element).mousedown(function () {
                let optionSiblings = $(element).siblings();
                $(optionSiblings).find('img').hide();
                $(optionSiblings).removeClass('active-option');
                $(optionSiblings).removeClass("padding-left-0");
                $(optionSiblings).addClass("padding-left-40");

                $(this).addClass('active-option');
                $(this).parent().parent().find('input').val($(this).text());
                $(this).find('img').show();
                $(this).addClass("padding-left-0");
                $(this).removeClass("padding-left-40");
                $(this).parent().parent().find('input').val($(this).find('.option-content').text());
            })
        });
        // Function display/hide customized select
        function displayCustomizedSelect(customizedSelect) {
            $(customizedSelect).toggle();
        }
        // Display option after choosing
        function displayOption(options, keyCode, inputField) {
            let currentIndex = 0;
            let maxIndex = options.length;
            for (const option of options) {
                if ($(option).hasClass("active-option")) {
                    currentIndex = Array.prototype.indexOf.call(options, option)
                    break;
                }
            }
            if (keyCode == "ArrowDown") {
                if (currentIndex + 1 < maxIndex) {
                    $(options[currentIndex]).find('img').hide(); // hide image
                    //Remove and Add background, change padding
                    $(options[currentIndex]).addClass("padding-left-40");
                    $(options[currentIndex]).removeClass("padding-left-0");
                    options[currentIndex].classList.remove('active-option'); // remove active class of currentIndex
                    options[currentIndex + 1].classList.add('active-option'); // add active class for newIndex
                    // Show image, change padding of the clicked option
                    $(options[currentIndex + 1]).find('img').show();
                    $(options[currentIndex + 1]).addClass("padding-left-0");
                    $(options[currentIndex + 1]).removeClass("padding-left-40");
                    $(inputField).val($(options[currentIndex + 1]).find('.option-content').text());
                }
            } else if (keyCode == "ArrowUp") {
                if (currentIndex - 1 >= 0) {
                    $(options[currentIndex]).find('img').hide(); // hide image
                    //Remove and Add background
                    $(options[currentIndex]).removeClass("padding-left-0");
                    $(options[currentIndex]).addClass("padding-left-40");
                    options[currentIndex].classList.remove('active-option'); // remove active class of currentIndex
                    options[currentIndex - 1].classList.add('active-option'); // add active class for newIndex
                    // Show image, change padding of the clicked option
                    $(options[currentIndex - 1]).find('img').show();
                    $(options[currentIndex - 1]).addClass("padding-left-0");
                    $(options[currentIndex - 1]).removeClass("padding-left-40");
                    $(inputField).val($(options[currentIndex - 1]).find('.option-content').text());
                }
            }
        }
    }
}
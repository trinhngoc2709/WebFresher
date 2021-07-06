class Dropdown {
    constructor() {

    }
    ldEvtDropdown() {
        /* Event for Customize Select */
        // Add event click to display customized select
        let customizedSelects = $('.icon-container');
        customizedSelects.each(function (index, element) {
            let iconInput = $(element).find('.icon-input');
            let customSelect = $(element).parent().find('.select-custom');
            $(element).on({
                // click event : display customized select, rotate input icon
                click: () => {
                    //let customSelect = $(element).find('.select-custom');
                    $(element).parent().find('input').toggleClass("border-green");
                    $(element).parent().find('input').focus();
                    $(element).toggleClass("background-bbb");
                    displayCustomizedSelect(customSelect);
                    rotateIconInput(iconInput);
                },
                //Focus out : Hide the customized select, rotate input icon
                focusout: () => {
                    console.log("focusout");
                    if ($(iconInput).hasClass("rotate-X")) {
                        $(element).parent().find('input').toggleClass("border-green");
                        rotateIconInput(iconInput);
                        displayCustomizedSelect($(element).find('.select-custom'));
                    }
                },
                // Key up events Enter: confirm, Arrow Up, ArrowDown: change the option
                keyup: (e) => {
                    //let customizedSelect = $(e.target).parent().find('.select-custom');
                    let options = $(e.target).parent().find('.option');
                    if (e.code === "Enter") { // Enter event : display customized select, rotate the input
                        rotateIconInput(iconInput);
                        $(element).find('input').toggleClass("border-green");
                        displayCustomizedSelect(customSelect);
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
            $(element).mousedown(function (e) {
                let parentElement = $(this).parent().parent();
                
                // Turn the sibling options to default
                let optionSiblings = $(element).siblings();
                $(optionSiblings).find('img').hide();
                $(optionSiblings).removeClass('active-option');
                $(optionSiblings).removeClass("padding-left-0");
                $(optionSiblings).addClass("padding-left-40");

                // Active the chosen option
                $(this).addClass('active-option');
                $(this).parent().parent().find('input').val($(this).text());
                $(this).find('img').show();
                $(this).addClass("padding-left-0");
                $(this).removeClass("padding-left-40");
                $(this).parent().parent().find('input').val($(this).find('.option-content').text());
            
                // Toggle Select Custom, Icon Container
                displayCustomizedSelect($(this).parent())
                $(parentElement).find("input").toggleClass("border-green")
                $(parentElement).find(".icon-container").toggleClass("background-bbb")
                $(parentElement).find('.x-icon').show();
                rotateIconInput(parentElement.find('.icon-input'));
            })
        });
        // Function display/hide customized select
        function displayCustomizedSelect(customizedSelect) {
            $(customizedSelect).slideToggle(250,"linear");
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
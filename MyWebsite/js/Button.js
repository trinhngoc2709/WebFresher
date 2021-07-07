class Button {
    constructor() {

    }
    // Initialize for select custom of employee detail page
    initCustomizedSelect() {
        // Clear the user's input and initialize the value for select 
        let inputs = document.querySelectorAll('.employee-detail .employee-detail-content .employee-information .input-information .select-container input');
        let userInputs = document.querySelectorAll('.input-information .user-input');
        userInputs.forEach(element => {
            element.value = "";
        })
        inputs[0].value = "Nam";
        inputs[1].value = "Phòng Đào tạo";
        inputs[2].value = "Phòng Marketting";
        inputs[3].value = "Đang làm việc";
    }
    
    toggleEmployeeForm() {
        let defaultAvatar = "../static/img/default-avatar.jpg";
        $('.layout-blur').slideToggle(300, "linear")  // Layout blur
        $('.employee-detail').slideToggle(300, "linear") // Employee Detail Form
        $('.m-dialog').slideToggle(300, "linear") // Dialog Container
        this.initCustomizedSelect(); // initialize customized select
        $('.employee-detail #upload-img').attr("src",defaultAvatar); // Change src of the avt image
        $('.input-information input').first().focus(); // Focus to first input
    }
    // Function for toggleErrorPopUp
    toggleErrorPopup() {
        $('.popup-layout').slideToggle(300, "linear");
        $('.popup-list').slideToggle(300, "linear");
    }
    // Function for toggleWarningPopup
    toggleWarningPopup() {
        $('.popup-warning').slideToggle(300, "swing")
        $('.popup-layout').slideToggle(300, "swing")
    }
    // Function for toggleConfirmationPopup
    toggleConfirmationPopup() {
        $('.m-dialog').slideToggle(300, "linear")
        $('.popup-confirmation').slideToggle(300, "swing")
        $('.popup-layout').slideToggle(300, "swing")
    }
    ldEvtModifyEmployeeButton(objScope){
        // Event for edit and delete employee
        let employeeTable = $('.employee-table tbody');
        $(employeeTable).on('click','.edit-icon',(e)=>{
            this.toggleEmployeeForm();
            let objEmployee ={};
            $(e.target).parent().siblings().each((index, element)=>{
                if(!$(element).attr('fieldName') == "DateOfBirth")
                    objEmployee[$(element).attr('fieldName')] = $(element).text();
                else if ($(element).attr('fieldName') == "WorkStatus"){
                    console.log($(element).attr('value'))
                     objEmployee[$(element).attr('fieldName')] = (($(element).attr('value') != "null") ? "Đang làm việc" : "Đã nghỉ việc");
                }
                else
                    objEmployee[$(element).attr('fieldName')] = $(element).text().split("/").reverse().join("-");
            })
            $('.employee-detail input').each((index,element)=>{
                if(objEmployee[$(element).attr('fieldName')]){
                    $(element).val(objEmployee[$(element).attr('fieldName')])
                }
            })
            console.log(objEmployee);
        })
        let employeeCode = "";
        $(employeeTable).on('click','.delete-icon',(e)=>{
           this.toggleConfirmationPopup();
           employeeCode = $(e.target).parent().siblings().first().text();
        })
        let confirmButtonConfirmation = $('.popup-confirmation button:first-of-type');
           $(confirmButtonConfirmation).click(() => {
            this.toggleConfirmationPopup();
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=1&employeeCode=" + employeeCode ,
                method: "GET",
                success: (data) => {
                    let employeeId = data.Data[0].EmployeeId
                    $.ajax({
                        url : "http://cukcuk.manhnv.net/v1/Employees/" + employeeId,
                        method: "DELETE",
                        success: (data) => {
                            $('.m-button-refresh').trigger('click');
                            // Check Status Please complete
                        }
                    })

                }
            })
        })
    }

    ldEvtSaveButton(objScope) {
        // Event for save information of new employee
        $('#btn-save').click(() => {
            if (objScope.checkValidInputs(objScope)) {
                alert("Lưu thành công");
                this.initCustomizedSelect();
            } else {
                $('.popup-layout').slideToggle(300, "linear");
                $('.popup-list').slideToggle(300, "linear");
            }
        })
    }
    ldEvtRefreshButton(objScope) {
        // Event for refresh
        $('.m-button-refresh').click(() => {
            $('.employee-table tbody').empty();
            objScope.loadData();
        })
    }
    ldEvtOpenButton() {
        // Show the employee detail event
        $('#btn-add').click(() => {
            this.toggleEmployeeForm();
        })

    }
    ldEvtCloseButton() {
        //Blur Background click event except dialog 
        $('.layout-blur').click(() => {
            this.toggleWarningPopup();
        });
        // X Button click event of the employee detail form
        $('.employee-detail img.close-button').click(() => {
            this.toggleWarningPopup();
        });
        // Event cancel employee form
        $('.cancel').click(() => {
            this.toggleWarningPopup();
        });

        // Event for close popup
        let closeButton = $('.popup-warning .popup-footer button:last-of-type');
        let closeButtonError = $('.popup-list .popup-footer button');
        let closeButtonError1 = $('.popup-list img.close-button');
        let closeButtonWarning = $('.popup-warning img.close-button');
        let continueInputButton = $('.popup-warning .popup-footer button:first-of-type');
        let closeButtonConfirmation = $('.popup-confirmation img.close-button');
        
        let cancelButtonConfirmation = $('.popup-confirmation button:last-of-type');

        // Close employee detail form
        $(closeButton).click(() => {
            this.toggleWarningPopup();
            this.toggleEmployeeForm();
        })
        $(closeButtonWarning).add($(continueInputButton)).click(() => {
            this.toggleWarningPopup();
        })
        $(closeButtonError).add($(closeButtonError1)).click(() => {
            this.toggleErrorPopup();
        })
        $(cancelButtonConfirmation).add($(closeButtonConfirmation)).click(()=>{
            this.toggleConfirmationPopup();
        })
        
    }
    ldEvtResizeButton() {
        // Event for resize button 
        let btnResize = $('.navbar .navbar-content .btn-resize');
        btnResize.click((e)=>{
            let navbarContent = $(e.target).parent().parent(); // Navbar content
            let navbarItems = $(navbarContent).find('.navbar-item'); // NavbarItem
            let navbarTextItems = $(navbarItems).find('.navbar-item-text'); // Text in navbar item
            let navbar = $('.navbar');
            //let misaLogo = navbar.find('.misa-logo');
            //let header = $('.header');
            let content = $('.content');

            //misaLogo.toggle();
            $(navbarTextItems).toggle(); // Toggle the text in navbar content
            if($(e.target).hasClass("rotate-opposite")){
                $(navbarItems).each((index,element)=>$(element).css("background-position", "16px center")); 
                $(navbarContent).css("width", "100%");
                $(content).css("left","221px")
                $(content).css("width","calc( 100% - 221px )")
                //$(header).css("width","calc( 100% - 221px )")
                //$(navbar).css("width","220px");
            }else{
                $(navbarItems).each((index,element)=>$(element).css("background-position", "center center"))
                $(navbarContent).css("width", "52px");
                $(content).css("left","calc(221px - 169px )")
                $(content).css("width","calc( 100% - 221px + 169px )")
                //$(header).css("width","calc( 100% - 221px + 168px )")
               // $(navbar).css("width","52px");
            }
            $(e.target).toggleClass("rotate-opposite");
        })
    }
}
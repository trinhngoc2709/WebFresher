class Toggle {
    toggleEmployeeForm(combobox,input) {
        let defaultAvatar = "../static/img/default-avatar.jpg";
        $('.employee-detail .title').text("THÔNG TIN NHÂN VIÊN");
        $('.employee-detail').attr("type", "Save")
        $('.layout-blur').slideToggle(300, "linear") // Layout blur
        $('.employee-detail').slideToggle(300, "linear") // Employee Detail Form
        $('.m-dialog').slideToggle(300, "linear") // Dialog Container
        combobox.initCustomizedSelect(input); // initialize customized select
        $('.employee-detail #upload-img').attr("src", defaultAvatar); // Change src of the avt image
        $('.input-information input').first().focus(); // Focus to first input
    }
    // Function for toggleErrorPopUp
    toggleErrorPopup(popup) {
        popup.popupLayout.slideToggle(300, "linear");
        popup.popupList.slideToggle(300, "linear");
    }
    // Function for toggleWarningPopup
    toggleWarningPopup(popup) {
        popup.popupWarning.slideToggle(300, "swing")
        popup.popupLayout.slideToggle(300, "swing")
    }
    // Function for toggleConfirmationPopup
    toggleConfirmationPopup(popup) {
        popup.dialog.slideToggle(300, "linear")
        popup.popupConfirmation.slideToggle(300, "swing")
        popup.popupLayout.slideToggle(300, "swing")
    }
}
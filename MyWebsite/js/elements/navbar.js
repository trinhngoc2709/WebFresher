class NavBar {
    constructor() {

    }
    ldEvtHomepage() {
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
    }
}
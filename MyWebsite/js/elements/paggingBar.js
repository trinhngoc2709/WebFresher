class PagingBar {
    constructor() {

    }
    /**
     * Create event for Paging
     * @param {Employee} employee 
     */
    ldEventPaging(employee) {
        let pagingBar = $('.paging-bar');
        $(pagingBar).data("currentPage", 1)
        let pageNumber = $('.paging-bar .paging-number');
        // Event for click page number
        $(pagingBar).find('.paging .paging-number').click((e) => {
            this.getNumberPage($(e.target).text(), employee);
            $(pageNumber).each(function () {
                $(this).removeClass('active-option')
            })
            $(e.target).addClass('active-option')
            $(pagingBar).data("currentPage", $(e.target).text())
        })

        // Go to First button
        // Event for go to first page button
        $('.paging-bar #first-button').click(() => {
            $(pageNumber).each(function (index, element) {
                $(this).text(index + 1)
                $(this).removeClass('active-option')
            })
            this.getNumberPage(1, employee);
            $(pagingBar).data("currentPage", 1)
            $(pageNumber).first().addClass('active-option')
            ToastMessage.createToastMessage("Chuyển về trang đầu tiên", "information")
        })

        // Previous button
        // Event for click previous button
        $('.paging-bar #prev-button').click(() => {
            let currentPage = $(pagingBar).data("currentPage");
            // If current page is first page
            if (currentPage == 1)
                ToastMessage.createToastMessage("Đang ở trang đầu tiên", "information")
            else {
                let previousIndex = $(pagingBar).data("currentPage") - $('.paging-bar .left-most').text() - 1;                let currentIndex = $(pagingBar).data("currentPage") - $('.paging-bar .left-most').text()
                // Check current page is leftmost button or not
                if ($(pageNumber).eq(currentIndex).hasClass("left-most")) {
                    // Check if the current page is less than 4
                    if ($(pagingBar).data("currentPage") <= 4) {
                        // Change the array of the page number button to the first array.
                        $(pageNumber).each(function (index, element) {
                            $(this).text(index + 1)
                            $(this).removeClass('active-option')
                        })
                        // Change active option to previous page
                        let previousIndex = $(pagingBar).data("currentPage") - $('.paging-bar .left-most').text() - 1;
                        $(pageNumber).eq(previousIndex).addClass('active-option')
                        $(pagingBar).data("currentPage", previousIndex + 1)
                        this.getNumberPage(previousIndex + 1, employee)
                    } else {
                        // Change the page number
                        $(pageNumber).each(function () {
                            $(this).text($(this).text() - 4)
                            $(this).removeClass('active-option')
                        })
                        $(pageNumber).last().addClass('active-option');
                        $(pagingBar).data("currentPage", $(pageNumber).last().text())
                        this.getNumberPage($(pageNumber).last().text(), employee)
                    }
                } else {
                    // Jump the active to previous page
                    $(pageNumber).each(function () {
                        $(this).removeClass('active-option')
                    })
                    $(pageNumber).eq(previousIndex).addClass('active-option');
                    $(pagingBar).data("currentPage", $(pageNumber).eq(previousIndex).text())
                    this.getNumberPage($(pageNumber).eq(previousIndex).text(), employee)
                }
            }
        })
        // Go to Last button
        // Event when click the last page button
        $('.paging-bar #last-button').click(() => {
            let maxPage = $('.paging-bar').data("maxPage")
            $(pageNumber).each(function (index, element) {
                $(this).text(maxPage - (3 - index))
                $(this).removeClass('active-option')
            })
            this.getNumberPage(maxPage, employee);
            $(pagingBar).data("currentPage", maxPage)
            $(pageNumber).last().addClass('active-option')
            ToastMessage.createToastMessage("Chuyển về trang cuối cùng", "information")
        })

        // Next button
        // events for click next page button
        // The implement is same as the previous button
        $('.paging-bar #next-button').click(() => {
            let currentPage = $(pagingBar).data("currentPage");
            if (currentPage == $(".paging-bar").data("maxPage"))
                ToastMessage.createToastMessage("Đang ở trang cuối cùng", "information")
            else {
                let nextIndex = $(pagingBar).data("currentPage") - $('.paging-bar .left-most').text() + 1;
                let currentIndex = $(pagingBar).data("currentPage") - $('.paging-bar .left-most').text()
                if ($(pageNumber).eq(currentIndex).hasClass("right-most")) {
                    if ($(pagingBar).data("currentPage") >= ( $(".paging-bar").data("maxPage") - 4)) {
                        $(pageNumber).each(function (index, element) {
                            $(this).text($(".paging-bar").data("maxPage") - (3- index));
                            $(this).removeClass('active-option')
                        })
                        let nextIndex = $(pagingBar).data("currentPage") - $('.paging-bar .left-most').text() + 1;
                        $(pageNumber).eq(nextIndex).addClass('active-option')
                        $(pagingBar).data("currentPage", $(pageNumber).eq(nextIndex).text())
                        this.getNumberPage($(pagingBar).data("currentPage"), employee)
                    } else {
                        $(pageNumber).each(function () {
                            $(this).text(parseInt($(this).text()) + 4)
                            $(this).removeClass('active-option')
                        })
                        $(pageNumber).first().addClass('active-option');
                        $(pagingBar).data("currentPage", $(pageNumber).first().text())
                        this.getNumberPage($(pageNumber).first().text(), employee)
                    }
                } else {
                    $(pageNumber).each(function () {
                        $(this).removeClass('active-option')
                    })
                    $(pageNumber).eq(nextIndex).addClass('active-option');
                    $(pagingBar).data("currentPage", $(pageNumber).eq(nextIndex).text())
                    this.getNumberPage($(pageNumber).eq(nextIndex).text(), employee)
                }
            }
        })
    }

    /**
     * Get the data of the requested page
     * @param {int} page 
     * @param {Employee} employee 
     */
    getNumberPage(page, employee) {
        let departmentId = $('.content .select-custom.department .option.active-option').data("departmentInformation")
        let positionId = $('.content .select-custom.position .option.active-option').data("positionInformation")
        departmentId = departmentId != undefined ? departmentId.DepartmentId : ""
        positionId = positionId != undefined ? positionId.PositionId : ""
        let url = `http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=14&pageNumber=${page-1}&employeeCode=NV&departmentId=${departmentId}&positionId=${positionId}`
        console.log(url)
        $.ajax({
            url: url,
            method: "GET"
        }).done((res) => {
            let pageLeftNumber = (page - 1) * 14,
                pageRightNumber = pageLeftNumber + res.Data.length;
            let newPagingDisplay = `Hiển thị ${pageLeftNumber == 0 ? 1 : pageLeftNumber}-${pageRightNumber}/${res.TotalRecord} nhân viên`;
            $(".display-employee").text(newPagingDisplay);
            employee.renderDataEmployee(res.Data, res.TotalRecord);
            ToastMessage.createToastMessage("Chuyển trang thành công", "success")
        })
    }
}
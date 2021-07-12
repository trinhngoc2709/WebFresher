class PagingBar {
    constructor() {

    }
    ldEventPaging(employee) {
        let pagingBar = $('.paging-bar');
        $('paging-bar').data("maxPage")
        $(pagingBar).find('.paging .paging-number').click( (e) => {
            this.getNumberPage($(e.target).text(),employee);
        })
    }

    getNumberPage(page,employee) {
        let departmentId = $('.content .select-custom.department .option.active-option').data("departmentInformation")
        let positionId = $('.content .select-custom.position .option.active-option').data("positionInformation")
        departmentId = departmentId != undefined ? departmentId.DepartmentId : ""
        positionId = positionId != undefined ? positionId.PositionId : ""
        let url = `http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=14&pageNumber=${page}&employeeCode=NV&departmentId=${departmentId}&positionId=${positionId}`
        $.ajax({
            url: url,
            method: "GET"
        }).done((res) => {
            
            let pageLeftNumber = (page-1) * 14,pageRightNumber = pageLeftNumber + res.Data.length;
            let newPagingDisplay = `Hiển thị ${pageLeftNumber == 0 ? 1 : pageLeftNumber}-${pageRightNumber}/${res.TotalRecord} nhân viên`;
            $(".display-employee").text(newPagingDisplay);
            employee.renderDataEmployee(res.Data,res.TotalRecord);
            ToastMessage.createToastMessage("Chuyển trang thành công","success")
        })
    }
}
// On off the employee detail 
document.querySelector('.m-default-button').addEventListener("click", () => {
    document.querySelector('.layout-blur').style.display = "block";
    document.querySelector('.employee-detail').style.display = "block";
    let events = ["click", "keyup"];
    events.forEach(event => {
        if (event == "click") {
            document.querySelector('img.close-button').addEventListener("click", closeEmployeeForm);
        } else {
            window.addEventListener(event, (e) => {
                if (e.code === "Escape") {
                    closeEmployeeForm();
                }
            })
        }
    })
    
    // Event upload image of employee
    document.querySelector('.employee-detail .employee-detail-content input').addEventListener("change", function () {
        let uploadImg = document.querySelector('#upload-img');
        if (this.files && this.files[0]) {
            uploadImg.src = URL.createObjectURL(this.files[0]);
        }
       
    })
    document.querySelector('#upload-img').addEventListener("click", function (e) {
        document.querySelector('.employee-detail .employee-detail-content input').click();
    });
    // Event cancel employee form
    document.querySelector('.cancel').addEventListener("click", closeEmployeeForm);
});

function closeEmployeeForm() {
    document.querySelector('.layout-blur').style.display = "none";
    document.querySelector('.employee-detail').style.display = "none";
}

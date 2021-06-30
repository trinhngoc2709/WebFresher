let defaultAvatar = "/img/default-avatar.jpg";
// On off the employee detail 
document.querySelector('.m-default-button').addEventListener("click", function (e) {
    //document.querySelector('.layout-blur').style.display = "block";
    document.querySelector('.layout-blur').style.width = "100vw";
    //document.querySelector('.employee-detail').style.display = "block";
    document.querySelector('.employee-detail').style.width = "900px";
    initCustomizedSelect();
    document.querySelector('.input-information input').focus();
    // let events = ["click", "keyup"];
    // events.forEach(event => {
    //     if (event == "click") {
    //         document.querySelector('img.close-button').addEventListener("click", closeEmployeeForm);
    //     } else {
    //         window.addEventListener(event, (e) => {
    //             if (e.code === "Escape") {
    //                 closeEmployeeForm();
    //             }
    //         })
    //     }
    // })
});
// Add event click to customized select
let customizedSelects = document.querySelectorAll('.input-field');
customizedSelects.forEach(element =>{
    element.addEventListener("click",function(e){
        let customizedSelect = element.childNodes[3];
        if(customizedSelect.style.width != "auto"){
            customizedSelect.style.width = "auto";
            customizedSelect.style.height = "auto";
        }else{
            customizedSelect.style.width = "0px";
            customizedSelect.style.height = "0px";
        }
    })
})

let options = document.querySelectorAll('.input-field .select-custom div'); // options
options.forEach(element => {
    element.addEventListener("click",(e)=>{
        e.target.parentElement.parentElement.childNodes[1].value = e.target.textContent;
    })
});

//Blur Background click event
document.querySelector('.layout-blur').addEventListener("click",closeEmployeeForm);
// X Button click event
document.querySelector('img.close-button').addEventListener("click", closeEmployeeForm);
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
firstTimeForOpenEmployeeForm = false;
// Close the employee form
function closeEmployeeForm() {
    document.querySelector('#upload-img').src = defaultAvatar;
    document.querySelector('.layout-blur').style.width = "0px";
    document.querySelector('.employee-detail').style.width = "0px";
}
// Initialize for select custom
function initCustomizedSelect(){
    let inputs = document.querySelectorAll('.employee-detail .employee-detail-content .employee-information .input-information .input-field input');
    inputs[0].value = "Nam";
    inputs[1].value = "Giám đốc";
    inputs[2].value = "Phòng nhân sự";
    inputs[3].value = "Đang làm việc";
}
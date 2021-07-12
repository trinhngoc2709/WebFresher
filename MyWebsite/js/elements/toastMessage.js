class ToastMessage {
    constructor() {

    }
    /**
     * 
     * @param {String} content 
     * @param {Enum} type error/warning/success/information 
     */
    static createToastMessage(content, type) {
        let index = Common.randomText(5) + $('toast-message').find('.toast').length;
        let toast = `<div class="toast ${type}" index="${index}" style="display:none">
            <div class="toast-left-content">
                <div class="toast-img"></div>
                <div class="toast-content">${content}</div>
            </div>
            <div class="toast-right-content">
                <div class="toast-icon"></div>
            </div>
            </div>`
        $(toast).attr('index', index);
        $('toast-message').append(toast)
        $(".toast[index=" + index + "]").show("slide", {
            direction: "right"
        }, 1000)
        $(".toast[index=" + index + "]")
        setTimeout(() => {
            $(".toast[index=" + index + "]").hide("slide", {
                direction: "right"
            }, 1000)
        }, 3000)
        setTimeout(() => {
            $(".toast[index=" + index + "]").remove();
            $(".ui-effects-placeholder").remove();
        }, 4000)
    }
}
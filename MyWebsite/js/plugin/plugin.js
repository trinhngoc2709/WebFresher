$(document).ready(function (){
    $.fn.extend({
        getValue: function(){
            return $(this).find(".option.active-option").data("value");
        },
        getText: function(){
            return $(this).find("input").val();
        },
        getData: function () {
            let options = $(this).find(".option");
            let rs = []
            $(options).each((index,element) =>{
                rs.push({
                    text : $(element).text().trim().replaceAll("\n",""),
                    value:$(element).data("value")
                })
            })
            return rs;
        }
    }) 

})
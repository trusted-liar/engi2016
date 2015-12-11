var apply = (function(){
    'use strict';
    var element = $(".sidebar-overlay")[0];
    var width = $(element).parent().css('width');
    var toggle = 0;
    $('.sidebar-overlay').click( function(){
        if(toggle===0){
            $(element).parent().css('left','-' + width);
            toggle=1;
            element.style.transform = "rotate(180deg)";
        }
        else{
            $(element).parent().css('left','0px');
            toggle=0;
            element.style.transform = "rotate(0deg)";
        }
    });
    
})();

window.addEventListener("resize", apply);
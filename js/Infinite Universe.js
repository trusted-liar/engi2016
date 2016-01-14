var eventAnimate = function(myimage){

if (myimage.addEventListener) {
	// IE9, Chrome, Safari, Opera
	myimage.addEventListener("mousewheel", MouseWheelHandler, false);
	// Firefox
	myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
// IE 6/7/8
else myimage.attachEvent("onmousewheel", MouseWheelHandler);


//parameters
var ht = window.innerHeight;
var wd = window.innerWidth;
var count = 100;
var side = 1;
var up = 1;
var down = 1;

//starting and ending positions
var leftStart = {
    zoom: 0.1,
    top: 48,
    left: 44
}
var leftEnd = {
    zoom: 1,
    top: 62,
    left: -2
}
var rightStart = {
    zoom: 0.1,
    top: 48,
    left: 51
}
var rightEnd = {
    zoom: 1,
    top: 62,
    left: 52
}
var rightMid = {
    zoom: 0.397,
    top: 46.59,
    left: 51.33
} //only for the first frame, to set the card

var cardObjects = $(myimage).find(".card");
for(var i=0; i<cardObjects.length; i++){
    $(cardObjects[i]).css("display","none");
}
var cardPos = [];
//initializing the first cards
(function setFirstScreen(){
    var temp;
    temp = cloneObject(rightMid);
    cardPos.push(temp);
    setPos(cardPos[0],cardObjects[0]);
    setTimeout(function(){$(cardObjects[0]).fadeIn();}, 1000);
})();
    
//handling window resize
window.addEventListener('resize', function() {
    ht = window.innerHeight;
    wd = window.innerWidth;
    for(var i = 0; i<cardPos.length; i++){
        setPos(cardPos[i],cardObjects[i]);
    }
});

//to know which side the respective card would be
for(var i=0; i<cardObjects.length; i++){
    if(i%2 === 0){
        $(cardObjects[i]).addClass("right");
    }
    else{
        $(cardObjects[i]).addClass("left");
    }
}
//for cloning an object because equating makes a reference variable
function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}

var leftDiff = {};
leftDiff.zoom = (leftEnd.zoom - leftStart.zoom)/count;
leftDiff.top = (leftEnd.top - leftStart.top)/count;
leftDiff.left = (leftEnd.left - leftStart.left)/count;

var rightDiff = {};
rightDiff.zoom = (rightEnd.zoom - rightStart.zoom)/count;
rightDiff.top = (rightEnd.top - rightStart.top)/count;
rightDiff.left = (rightEnd.left - rightStart.left)/count;

//set actual position in pixels
function setPos(newPos,element){
    var top = (ht*newPos.top)/(100*newPos.zoom);
    var left = (wd*newPos.left)/(100*newPos.zoom);
    
    $(element).css("zoom",newPos.zoom);
    $(element).css("top",top);
    $(element).css("left",left);
}

//calculate normalized position
function updatePos(newPos,horizontal,depth,element){
    if(horizontal === 0){
        if(depth===1){
            
            newPos.zoom += leftDiff.zoom;
            newPos.top += leftDiff.top;
            newPos.left += leftDiff.left;
            
        }
        else{
            newPos.zoom -= leftDiff.zoom;
            newPos.top -= leftDiff.top;
            newPos.left -= leftDiff.left;
            
        }
        if(newPos.zoom >= leftEnd.zoom){
            $(element).css("display","none");
        }
        else if(newPos.zoom <= leftStart.zoom){
            $(element).css("display","none");
        }
        else{
            $(element).css("display","block");
        }
    }
    else{
        if(depth===1){
            
            newPos.zoom += rightDiff.zoom;
            newPos.top += rightDiff.top;
            newPos.left += rightDiff.left;
            
        }
        else{
            newPos.zoom -= rightDiff.zoom;
            newPos.top -= rightDiff.top;
            newPos.left -= rightDiff.left;
            
        }        
        if(newPos.zoom <= rightStart.zoom){
            $(element).css("display","none");
        }
        else if(newPos.zoom >= rightEnd.zoom){
            $(element).css("display","none");
        }
        else{
            $(element).css("display","block");
        }
    }

    setPos(newPos,element);
}

function MouseWheelHandler(e) {
	// cross-browser wheel delta
	var e = window.event || e; // old IE support
	var delta = (e.wheelDelta || -e.detail);
    timelineAnimation(delta);
	return false;
}
    
    //for handling touch events
    $(function() {
      $("body").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction === "up"){
                for(var i=0; i<75; i++){
                    setTimeout(function(){timelineAnimation(5);},25*i);
                }
            }
            else if(direction === "down"){
                for(var i=0; i<75; i++){
                    setTimeout(function(){timelineAnimation(-5);},35*i);
                }
            }
        }
      });
    });
    
$(function(){
        $(document).click(function(e){
        var clik = e.target;
        if($(clik).attr('popout') == 'true'){
            $("html").off("keydown");
            // IE9, Chrome, Safari, Opera
            myimage.removeEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            myimage.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
            $(".timeline .bg").addClass("timeline-popout");
            $(myimage.parentElement).fadeOut(500);
            setTimeout(function(){
                $(myimage).fadeOut();
                $(".timeline .bg").removeClass("timeline-popout timeline-popin");
            },500);
        }
    });
    $('html').keydown(function(e){
        if(e.which === 38) {
            timelineAnimation(5);
            setTimeout(function(){timelineAnimation(5);},50);
            setTimeout(function(){timelineAnimation(5);},100);
            setTimeout(function(){timelineAnimation(5);},150);
            setTimeout(function(){timelineAnimation(5);},200);
        }
        if(e.which === 40) {
            timelineAnimation(-5);
            setTimeout(function(){timelineAnimation(-5);},50);
            setTimeout(function(){timelineAnimation(-5);},100);
            setTimeout(function(){timelineAnimation(-5);},150);
            setTimeout(function(){timelineAnimation(-5);},200);
        }
        if(e.which === 27){
            $("html").off("keydown");
            // IE9, Chrome, Safari, Opera
            myimage.removeEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            myimage.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
            $(myimage).fadeOut();
            $(myimage.parentElement).fadeOut();
            cardObjects=[];
            cardPos=[];
        }
    });
});

function timelineAnimation(delta){
    if(delta > 0){
        if(up === 1){
            for(var i = 0; i<cardPos.length; i++){
                if($(cardObjects[i]).hasClass("left")){
                    updatePos(cardPos[i],0,1,cardObjects[i]);
                }
                else{
                    updatePos(cardPos[i],1,1,cardObjects[i]);
                }
            }
            
            if((cardPos[cardPos.length - 1].zoom < 0.704)&&(cardPos[cardPos.length - 1].zoom > 0.703)){
                if(cardPos.length < cardObjects.length){
                    var temp;
                    if(cardPos.length%2){
                        temp = cloneObject(leftStart);
                    }
                    else{
                        temp = cloneObject(rightStart);
                    }
                    cardPos.push(temp);
                    setPos(cardPos[cardPos.length - 1], cardObjects[cardPos.length - 1]);
                }
            }
            
            if((cardPos.length === cardObjects.length) && (cardPos[cardPos.length -1].zoom > 0.75)){
                up = 0;
            }
        }
        if(down === 0) down = 1;
    }
    else{
        if(down === 1){
            for(var i = 0; i<cardPos.length; i++){
                if($(cardObjects[i]).hasClass("left")){
                    updatePos(cardPos[i],0,0,cardObjects[i]);
                }
                else{
                    updatePos(cardPos[i],1,0,cardObjects[i]);
                }
            }
            if(cardPos[0].zoom < 0.75){
                down = 0;
            }
        }
        if(up === 0) up = 1;
    }    
}
    
}
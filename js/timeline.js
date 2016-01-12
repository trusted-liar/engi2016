curr_hrs = null, curr_min =null;

function getRandom(min, max) {
    res = Math.floor(Math.random() * (max - min + 1)) + min;
    if(res<10)
    	return '0'+res;
    else
    	return res;
}

function toDay1(){
	$(".bg").removeClass('bg_D2').addClass('bg_D1');
	$(".animate").removeClass('animate_D2').addClass('animate_D1');
	$(".day").removeClass('day_D2').addClass('day_D1').html('DAY 1');
	$(".time").removeClass('day_D2').addClass('day_D1');
}

function toDay2(){
	$(".bg").removeClass('bg_D1 bg_D3').addClass('bg_D2');
	$(".animate").removeClass('animate_D1 animate_D3').addClass('animate_D2');
	$(".day").removeClass('day_D1 day_D3').addClass('day_D2').html('DAY 2');
	$(".time").removeClass('day_D1 day_D3').addClass('day_D2');
	$("#day1").hide();
	$("#day3").hide();
	$("#day2").show();
}

function toDay3(){
	$(".bg").removeClass('bg_D2').addClass('bg_D3');
	$(".animate").removeClass('animate_D2').addClass('animate_D3');
	$(".day").removeClass('day_D2').addClass('day_D3').html('DAY 3');
	$(".time").removeClass('day_D2').addClass('day_D3');
	$("#day2").hide();
	$("#day3").show();
}

function updateTimeline(){
	Zoom = 0;
	c = null;
	$('.card').each(function(){
		card = this;
		if($(card).css('display') != 'none'){
			if($(card).css('zoom') > Zoom){
				Zoom = $(card).css('zoom');
				c = card;
			}
		}
	});
	day = $(c).attr('day');
	switch(day){
		case '1': toDay1();
				  break;
		case '2': toDay2();
				  break;
		case '3': toDay3();
	}
	if(curr_hrs != $(c).attr('hrs') || curr_min != $(c).attr('min')){
		$('#hrs').html($(c).attr('hrs'));
		$('#min').html($(c).attr('min'));
	}
	curr_hrs = $(c).attr('hrs')
	curr_min = $(c).attr('min');
}

if (document.addEventListener) {
	// IE9, Chrome, Safari, Opera
	document.addEventListener("mousewheel", updateTimeline, false);
	// Firefox
	document.addEventListener("DOMMouseScroll", updateTimeline, false);
}
// IE 6/7/8
else document.attachEvent("onmousewheel", updateTimeline);

$(function(){
    $('html').keydown(function(e){
    	updateTimeline();
    });
});


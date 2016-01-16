curr_hrs = '00', curr_min = '00', counter = 0;
var refresher;

function getRandom(min, max) {
    res = Math.floor(Math.random() * (max - min + 1)) + min;
    if(res<10)	return '0'+res;
    else return res;
}

function resetCounter(){ counter=0; }

function timeRefresh(){
	counter++;
	$("#hrs").html(getRandom(0, 23));
	$("#min").html(getRandom(0, 59));
	if(counter > 10){
		resetCounter();
		$("#hrs").html(curr_hrs);
		$("#min").html(curr_min);
		clearInterval(refresher);
	}
}

function toDay1(){
	$(".bg").removeClass('bg_D2 bg_D3').addClass('bg_D1');
	$(".animate").removeClass('animate_D2 animate_D3').addClass('animate_D1');
	$(".day").removeClass('day_D2 day_D3').addClass('day_D1').html('DAY 1');
	$(".time").removeClass('day_D2 day_D3').addClass('day_D1');
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
	$(".bg").removeClass('bg_D1 bg_D2').addClass('bg_D3');
	$(".animate").removeClass('animate_D1 animate_D2').addClass('animate_D3');
	$(".day").removeClass('day_D1 day_D2').addClass('day_D3').html('DAY 3');
	$(".time").removeClass('day_D1 day_D2').addClass('day_D3');
	$("#day2").hide();
	$("#day3").show();
}

function updateTimeline_oat(e){
	Zoom = 0;
	var e = window.event || e; // old IE support
	var delta = (e.wheelDelta || -e.detail);
	c = null;
	$('.oat_event').each(function(){
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

	if($(c).attr('hrs') != curr_hrs || $(c).attr('min') != curr_min){
		curr_hrs = $(c).attr('hrs');
		curr_min = $(c).attr('min');
		refresher = setInterval(timeRefresh, 20);
	}
}

function updateTimeline_audi(e){
	Zoom = 0;
	var e = window.event || e; // old IE support
	var delta = (e.wheelDelta || -e.detail);
	c = null;
	$('.audi_event').each(function(){
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

	if($(c).attr('hrs') != curr_hrs || $(c).attr('min') != curr_min){
		curr_hrs = $(c).attr('hrs');
		curr_min = $(c).attr('min');
		refresher = setInterval(timeRefresh, 20);
	}
}

function updateTimeline_stage(e){
	Zoom = 0;
	var e = window.event || e; // old IE support
	var delta = (e.wheelDelta || -e.detail);
	c = null;
	$('.stage_event').each(function(){
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

	if($(c).attr('hrs') != curr_hrs || $(c).attr('min') != curr_min){
		curr_hrs = $(c).attr('hrs');
		curr_min = $(c).attr('min');
		refresher = setInterval(timeRefresh, 20);
	}
}

function addListener(listen){
	if (document.addEventListener) {
		// IE9, Chrome, Safari, Opera
		document.addEventListener("mousewheel", listen, false);
		// Firefox
		document.addEventListener("DOMMouseScroll", listen, false);
	}
	// IE 6/7/8
	else document.attachEvent("onmousewheel", listen);

	$(function(){
		switch(listen){
			case 'updateTimeline_oat':
				$('html').keydown(function(e){
			    	updateTimeline_oat();
			    });
			    break;
			case 'updateTimeline_audi':
				$('html').keydown(function(e){
				    	updateTimeline_audi();
				    });
				    break;
			case 'updateTimeline_stage':
				$('html').keydown(function(e){
			    	updateTimeline_stage();
			    });
		}
	});
}

function removeListen(){
	$("html").off("keydown");
    // IE9, Chrome, Safari, Opera
    document.removeEventListener("mousewheel", updateTimeline_stage, false);
    document.removeEventListener("mousewheel", updateTimeline_audi, false);
    document.removeEventListener("mousewheel", updateTimeline_oat, false);
    // Firefox
    document.removeEventListener("DOMMouseScroll", updateTimeline_stage, false);
    document.removeEventListener("DOMMouseScroll", updateTimeline_audi, false);
    document.removeEventListener("DOMMouseScroll", updateTimeline_oat, false);
}

$('.t-open').click(function(){
	toDay1();
	$("#hrs").html('--');
	$("#min").html('--');
});



$('.venue').click(function(){
	id = $(this).attr('id');
	switch(id){
		case 'pin-landing':
			event_venue = false;
			removeListen();
			break;
		case 'pin-oat':
			first_card = $(document).find('.oat_event')[0];
			event_venue = true;
			removeListen();
			addListener(updateTimeline_oat);
			break;
		case 'pin-audi':
			first_card = $(document).find('.audi_event')[0];
			event_venue = true;
			removeListen();
			addListener(updateTimeline_audi);
			break;
		case 'pin-stage':
			first_card = $(document).find('.stage_event')[0];
			event_venue = true;
			removeListen();
			addListener(updateTimeline_stage);
	}
	if(event_venue){
			curr_hrs = $(first_card).attr('hrs');
		curr_min = $(first_card).attr('min');
		$("#hrs").html(curr_hrs);
		$("#min").html(curr_min);
		resetCounter();
		clearInterval(refresher);
		toDay1();
	}
});




curr_hrs = '00', curr_min = '00', counter = 0, pointer=true;
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
	$(".location").removeClass('day_D2 day_D3').addClass('day_D1');
}

function toDay2(){
	$(".bg").removeClass('bg_D1 bg_D3').addClass('bg_D2');
	$(".animate").removeClass('animate_D1 animate_D3').addClass('animate_D2');
	$(".day").removeClass('day_D1 day_D3').addClass('day_D2').html('DAY 2');
	$(".time").removeClass('day_D1 day_D3').addClass('day_D2');
	$(".location").removeClass('day_D1 day_D3').addClass('day_D2');
}

function toDay3(){
	$(".bg").removeClass('bg_D1 bg_D2').addClass('bg_D3');
	$(".animate").removeClass('animate_D1 animate_D2').addClass('animate_D3');
	$(".day").removeClass('day_D1 day_D2').addClass('day_D3').html('DAY 3');
	$(".time").removeClass('day_D1 day_D2').addClass('day_D3');
	$(".location").removeClass('day_D1 day_D2').addClass('day_D3');
}

function updateTimeline_oat(e){
	Zoom = 0;
	if (pointer) {
		$("#pointer").fadeOut(400);
		pointer = false;
	};
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
	if (pointer) {
		$("#pointer").fadeOut(400);
		pointer = false;
	};
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
	if (pointer) {
		$("#pointer").fadeOut(400);
		pointer = false;
	};
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
	switch(listen){
		case '_oat':
			$('html').keydown(function(e){
		    	updateTimeline_oat();
		    });
		    if (document.addEventListener) {
				// IE9, Chrome, Safari, Opera
				document.addEventListener("mousewheel", updateTimeline_oat, false);
				// Firefox
				document.addEventListener("DOMMouseScroll", updateTimeline_oat, false);
			}
			// IE 6/7/8
			else document.attachEvent("onmousewheel", updateTimeline_oat);
		    break;
		case '_audi':
			$('html').keydown(function(e){
		    	updateTimeline_audi();
		    });
		    if (document.addEventListener) {
				// IE9, Chrome, Safari, Opera
				document.addEventListener("mousewheel", updateTimeline_audi, false);
				// Firefox
				document.addEventListener("DOMMouseScroll", updateTimeline_audi, false);
			}
			// IE 6/7/8
			else document.attachEvent("onmousewheel", updateTimeline_audi);
					break;
		case '_stage':
			$('html').keydown(function(e){
		    	updateTimeline_stage();
		    });
		    if (document.addEventListener) {
				// IE9, Chrome, Safari, Opera
				document.addEventListener("mousewheel", updateTimeline_stage, false);
				// Firefox
				document.addEventListener("DOMMouseScroll", updateTimeline_stage, false);
			}
			// IE 6/7/8
			else document.attachEvent("onmousewheel", updateTimeline_stage);
			}
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
	curr_hrs = '00';
	curr_min = '00';
	venue_id = $(this).attr('id');
	pointer = true;
	switch(venue_id){
		case 'stage-i4':
			$('html').keydown(function(e){
		    	updateTimeline_stage();
		    });
		    break;
		case 'oat-i1':
			$('html').keydown(function(e){
			    	updateTimeline_oat();
			    });
			break;
		case 'audi-i1':
			$('html').keydown(function(e){
		    	updateTimeline_audi();
		    });
	}
});



$('.pinup').click(function(){
	id = $(this).attr('id');
	pointer = true;
	//console.log(id);
	switch(id){
		case 'pin-landing':
			event_venue = false;
			removeListen();
			$('.location').html('');
			break;
		case 'pin-oat':
			first_card = $(document).find('.oat_event')[0];
			event_venue = true;
			removeListen();
			addListener('_oat');
			$('.location').html('OAT');
			break;
		case 'pin-audi':
			first_card = $(document).find('.audi_event')[0];
			event_venue = true;
			removeListen();
			addListener('_audi');
			$('.location').html('Auditorium');
			break;
		case 'pin-stage':
			first_card = $(document).find('.stage_event')[0];
			event_venue = true;
			removeListen();
			addListener('_stage');
			$('.location').html('Sports Complex');
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


$('.myTooltip').click(function(){
	id = $(this).attr('id');
	pointer = true;
	//console.log(id);
	switch(id){
		case 'tooltip-gate':
			event_venue = false;
			removeListen();
			$('.location').html('');
			break;
		case 'tooltip-oat':
			first_card = $(document).find('.oat_event')[0];
			event_venue = true;
			removeListen();
			addListener('_oat');
			$('.location').html('OAT');
			break;
		case 'tooltip-audi':
			first_card = $(document).find('.audi_event')[0];
			event_venue = true;
			removeListen();
			addListener('_audi');
			$('.location').html('Auditorium');
			break;
		case 'tooltip-stage':
			first_card = $(document).find('.stage_event')[0];
			event_venue = true;
			removeListen();
			addListener('_stage');
			$('.location').html('Sports Complex');
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

$('.menu-venue').click(function(){
	id = $(this).attr('id');
	pointer = true;
	//console.log(id);
	switch(id){
		case '#home':
			event_venue = false;
			removeListen();
			$('.location').html('');
			break;
		case '#oat':
			first_card = $(document).find('.oat_event')[0];
			event_venue = true;
			removeListen();
			addListener('_oat');
			$('.location').html('OAT');
			break;
		case '#audi':
			first_card = $(document).find('.audi_event')[0];
			event_venue = true;
			removeListen();
			addListener('_audi');
			$('.location').html('Auditorium');
			break;
		case '#stage':
			first_card = $(document).find('.stage_event')[0];
			event_venue = true;
			removeListen();
			addListener('_stage');
			$('.location').html('Sports Complex');
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

$(function(){
    $(document).click(function(e){
        var clik = e.target;
        if($(clik).attr('popout') == 'true'){
            resetCounter();
			clearInterval(refresher);
        }
    });
});

/***************CountDown Clock*************/
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date('2/13/2016 9:59:59');
initializeClock('clockdiv', deadline);




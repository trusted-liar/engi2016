function toDay1(){
	$(".bg").removeClass('bg_D2').addClass('bg_D1');
	$(".animate").removeClass('animate_D2').addClass('animate_D1');
	$("#day2").hide();
	$("#day1").show();
}

function toDay2(){
	$(".bg").removeClass('bg_D1 .bg_D3').addClass('bg_D2');
	$(".animate").removeClass('animate_D1 animate_D3').addClass('animate_D2');
	$("#day1").hide();
	$("#day3").hide();
	$("#day2").show();
}

function toDay3(){
	$(".bg").removeClass('bg_D2').addClass('bg_D3');
	$(".animate").removeClass('animate_D2').addClass('animate_D3');
	$("#day2").hide();
	$("#day3").show();
}
var curWeek = getCurrentWeek();
var weekDay = new Date().getDay();
var displaysData = {
	week : curWeek,
	choosenWeek : curWeek,
	showList : [true,true,true,true,true,true,true],
	isShown : [true,true,true,true,true,true,true],
	noWork : 0,
	day : weekDay,
	carouselMode : true,
	cardMode : false
}

$(function(){

	var displays = new Vue({
		el : '#displays',
		data : displaysData,
		mounted : function(){
			$($('.carousel-item')[0]).addClass('active');
			$('#carouselWindow').carousel('cycle');
		},
		updated : function(){
			$($('.carousel-item')[0]).addClass('active');
			$('#carouselWindow').carousel('cycle');
		},
		methods : {
			outputWeek : function(){
				console.log(this.$data.choosenWeek);
			},
			selectWeek : function(){
				$('.active').removeClass('active');
				this.$data.choosenWeek = event.target.value;
				this.$data.noWork = 0;
				for (var i = 0; i < 7; i++) {
					this.$data.showList[i] = true;
					this.$data.isShown[i] = true;
				}
			},
			toCarouselMode : function(){
				$('#vmBtn').removeClass('active');
				$('#cmBtn').addClass('active');
				this.$data.carouselMode = true;
				this.$data.cardMode = false;
			},
			toCardMode : function(){
				$('#cmBtn').removeClass('active');
				$('#vmBtn').addClass('active');
				this.$data.carouselMode = false;
				this.$data.cardMode = true;
			}
		}
	});
});

function countNoWork(obj){
	var targetDiv = $(obj.parentNode);
	displaysData.isShown[targetDiv.attr('imgNum')] = false;
	displaysData.noWork += 1;
	displaysData.showList[7-displaysData.noWork] = false;
}

/**
 * 获取系统当前是第几周
 */
function getCurrentWeek(){
	var now  = new Date();
	var year = now.getYear()+1900;
	var month = now.getMonth() + 1;
	var days = now.getDate();
	for (var i = 0; i < month - 1; i++) {
		days += getMonthDays(year,i);
	}
	var yearFirstDay = new Date(year,0,1).getDay() || 7;
	var week = null;
	if (yearFirstDay == 1) {
		week = Math.ceil(days / 7);
	}else{
		days -= (7-yearFirstDay + 1);
		week = Math.ceil(days / 7) + 1;
	}
	return week;
}

function isLeapYear(year){
	return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

function getMonthDays(year, month) {
	return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

var unwork = 0;

function updatePicDiv(obj){
	unwork +=1;
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	$('#picList')[0].lastChild.remove();
	if (unwork == 7) {
		var blankPicDiv = 
				'<div class="carousel-item active">' +
				'<img class="d-block w-100" src="settings/default.png" alt="你什么都没画">' +
				'</div>';
		$('.carousel-inner').append(blankPicDiv);
	}
	$($('.carousel-inner')[0].firstChild).addClass("active");
	$('#carouselWindow').carousel('cycle');
}

function viewModal(obj){
	$("#modalHeadInfo").html($(obj).prev().html());
	$("#modalBodyContent").html($(obj).html());
}
$.fn.extend({
	top : function(){
		$(this).mouseenter(function(){
			$(this).find(".sureIn").css("display","block");
		}).mouseleave(function(){
			$(this).find(".sureIn").css("display","none");
		});
	},
	banner1 : function(){
		$(this).delegate(".item","mouseenter",function(){
			$(this).css("border","1px solid red");
			$(this).find(".buyBtn").css("display","block")
		}).delegate(".item","mouseleave",function(){
			$(this).css("border","1px solid #E8E8E8");
			$(this).find(".buyBtn").css("display","none");
		});
		$(this).delegate(".xiangsi","mouseenter",function(){
			$(this).find(".diff").animate({
					top : 190
			},100)
		});
		$(this).delegate(".xiangsi","mouseleave",function(){
			
			$(this).find(".diff").animate({
					top : 220
			},100);
		});
	},
	banHover : function(){
		$(this).mouseenter(function(){
			$(this).find(".outPlace .span1").addClass("span2");
			$(this).find(".loChoose").css("display","block");
			$(this).find(".outPlace .span1 .icon").css("transform","rotate(180deg)")
		}).mouseleave(function(){
			$(this).find(".loChoose").css("display","none");
			$(this).find(".outPlace .span1").removeClass("span2")
			$(this).find(".outPlace .span1 .icon").css("transform","rotate(0deg)");
		});
	}
});
$(".inputDiv").top();
$(".ulBig").banner1();
$(".outHover").banHover();
var copy = function (argument) { //数组拷贝
		var result;
		if(typeof argument ==="object"){
			if(argument instanceof Array){
				result = [];
					for (var j = 0,len = argument.length;j < len;j++ ){
						result[j] = copy(argument[j]);
					}
				}else{
					result = {}
					for(var i in argument){
						result[i] = copy(argument[i]);
					}
				}
			}else{
				result = argument;
			}
			return result;
		};
$.fn.extend({
	getData : function(option){	  //start
		var data = option.data;
		this._data = data;
		this.copyData = copy(data);
		$(this).initializtion(this,data,data);
	},
	initializtion : function(_this,newArr1,newArr){ //初始化页面
		var data1;
			$(".outBig").find(".loChoose").find("a").unbind("click");
			$(".outBig").find(".upSup").unbind("click");
			$(".outBig").find(".downSup").unbind("click");
			$(".outBig").find(".buyDownSup").unbind("click");
			$(".outBig").find(".buyUpSup").unbind("click");
			$(".outBig").find(".sureIn").unbind("click");
			$(".ulBig").html("");
			_this.page1(newArr,_this);
			data1 = _this.data1 
			_this.upSup(newArr);
			_this.downSup(newArr);
			_this.buyDownSup(newArr);
			_this.buyUpSup(newArr);
			_this.createDOM(data1[0]);
			_this.loading(data1[0]); 
			$(".botNum").html("");
			_this.page(newArr);
			_this.locat(newArr,_this);
			_this.choose(newArr1);
	},
	locat : function(newdata,this1){ //地址筛选
		var data = this._data;
		var dataArray = [];
		var _this = this;
		for(var i = 0;i < data.length;i++){
			dataArray[i] = data[i].location;
		}
		var tmp = [];
		for(var j in dataArray){
			if(tmp.indexOf(dataArray[j]) == -1){
				tmp.push(dataArray[j]);
			}
		};
		dataArray = tmp;
		$(this).find(".loChoose").html("");
		for(var y=0;y<dataArray.length;y++){
			$(this).find(".loChoose").append("<a>"+dataArray[y]+"</a>");
		};
		$(this).find(".loChoose").find("a").click(function(){
			var newArr = [];
			var c = 0;
			for(var a = 0;a < newdata.length;a++){
				if($(this).text() == newdata[a].location){
					newArr[c] = newdata[a];
					c++;
				};
			};
			if (newArr.length == 0){
				alert("没有了");
				newArr = newdata;
			};
			this1.newArr = newArr;
			$(_this).initializtion(_this,newArr,newArr);
		});
	},
	page1 : function(data,this1){ //分页
			var NumBot = Math.ceil(data.length/10);
			var data1 = [];
			var data2 = [];
			var a = 0;  
			for(var j = 0;j < NumBot;j++){
				for(var i = 0;i < 10;i++){
					data2[i] = data[a];
					a++;
					if(a == data.length){
						break;
					}
				}
				data1[j]= data2;
				data2 = [];
			};
			this1.data1 = data1;
		},
	page : function(data){ //页码创建
		var _this = this;
		var data1 = this.data1;
		var NumBot = Math.ceil(data.length/10);
		for(var i = 0;i < NumBot;i++){
			$(this).find(".botNum").append("<a class=\"bottA\">"+ ( i + 1 ) +"</a>");
		};
		$(this).find(".botNum").find(".bottA").click(function(){
			$(this).css("background","orange").siblings(".bottA").css("background","skyblue");
			var index = $(this).index();
			$(".ulBig").html("");
			_this.createDOM(data1[index]);
			_this.loading(data1[index]); 
		});
		$(this).find(".botNum").find(".bottA:first-of-type").click();
	},
	createDOM : function(data){ //页面创建
		for(var j = 0; j < data.length; j++){
			$(this).find(".ulBig").append("<li class=\"item\"></li>");
			};
			$(this).find(".ulBig").find(".item").html(
					"<div class=\"xiangsi\">"+
						"<a class=\"imgA\">"+
							"<img  class=\"img\" />"+
						"</a>"+
						"<div class = \"diff\"><a class= \"tong\">找相同</a><a class=\"difcd\">找相似</a></div>"+
					"</div>"+
					"<div class=\"textIndex\">"+
						"<span class=\"outPrice\">￥<span class=\"price\"></span><i class=\"i-icon1\">包邮</i></span>"+
						"<span><a class=\"name\"></a></span>"+
						"<p class=\"outPutOn\">已售出<span class=\"putOn\"></span>件</p>"+
						"<div class=\"authorOut\">"+
							"<a class=\"author\"></a>"+
							"<span class=\"addressSmall\"></span>"+
						"</div>"+
						"<div class=\"i-bot\">"+
							"<input type=\"buttom\" name=\"\" class=\"buyBtn\" value=\"购买\" />"+
						"</div>"+
					"</div>"
				);
		},
	loading : function(data){ //拉数据
		for (var i = 0,$thisEq; i < data.length; i++) {	
			$thisEq = $(this).find(".ulBig").find(".item").eq(i);
			$thisEq.find(".price").text(data[i].price);
			$thisEq.find(".name").text(data[i].name);
			$thisEq.find(".putOn").text(data[i].sold);
			$thisEq.find(".author").text(data[i].owner);
			$thisEq.find(".addressSmall").text(data[i].location);
			$thisEq.find(".img").attr("src","https:"+data[i].image);
			$thisEq.find(".imgA").attr("href","https:"+data[i].href);
		};
	},
	
	upSup : function(data){ //排序
		var i,len = data.length,j,d,_this = this;
		$(this).find(".upSup").one("click",function(){
			$(this).find("a").css("color","orange");
			$(".topChoose").find("a:not(.upSup a)").css("color","#6d6d6d");
			for (i = 0; i < len; i++) {
					for(j = 0;j < len; j++){
						if(Number(data[i].price) < Number(data[j].price)){
							d = data[j];
							data[j] = data[i];
							data[i] = d;
						}
					}
				};
			$(_this).initializtion(_this,data,data);
			});
	},
	downSup : function(data){ //排序
		var i,len = data.length,j,d,_this = this;
		$(this).find(".downSup").one("click",function(){
			$(this).find("a").css("color","orange");
			$(".topChoose").find("a:not(.downSup a)").css("color","#6d6d6d");
			for (i = 0; i < len; i++) {
					for(j = 0;j < len; j++){
						if(Number(data[i].price) > Number(data[j].price)){
							d = data[j];
							data[j] = data[i];
							data[i] = d;
						}
					}
				};
			$(_this).initializtion(_this,data,data);
		});
	},
	buyDownSup : function(data){ //排序
		var i,len = data.length,j,d,_this = this;
		$(this).find(".buyDownSup").one("click",function(){
			$(this).find("a").css("color","orange");
			$(".topChoose").find("a:not(.buyDownSup a)").css("color","#6d6d6d");
			for (i = 0; i < len; i++) {
					for(j = 0;j < len; j++){
						if(Number(data[i].sold) > Number(data[j].sold)){
							d = data[j];
							data[j] = data[i];
							data[i] = d;
						}
					}
				};
			$(_this).initializtion(_this,data,data);
		});
	},
	buyUpSup : function(data){ //筛选
		var i,len = data.length,j,d,_this = this;
		$(this).find(".buyUpSup").one("click",function(){
			$(this).find("a").css("color","orange");
			$(".topChoose").find("a:not(.buyUpSup a)").css("color","#6d6d6d");
			for (i = 0; i < len; i++) {
					for(j = 0;j < len; j++){
						if(Number(data[i].sold) < Number(data[j].sold)){
							d = data[j];
							data[j] = data[i];
							data[i] = d;
						}
					}
				};
			$(_this).initializtion(_this,data,data);
		});
	},
	choose : function(data){ //筛选
		var _this=this;
		$(this).find(".sureIn").one("click",function(){
			var value1 = $(".smallIn").val();
			var value2 = $(".bigIn").val();
			var d;
			var newdata = [];
				var j = 0;
			if (parseFloat(value1) > parseFloat(value2)) {
				alert("输入有误");
				newdata = copyData;
			}else if(value1 ==""||value2 == ""){
				newdata = data;
			}else{
				for(var i = 0;i < data.length; i++){
					if( parseFloat(value1) <= parseFloat(data[i].price)&&parseFloat(data[i].price) <= parseFloat(value2)){
						newdata[j] = data[i];
						j++;
					};	
				};
			}
			if (newdata.length == 0) {
				alert("没有了");
				newdata = data;
			};
			$(_this).initializtion(_this,data,newdata);
		});
	},
	buyBtn : function(data){ //判断
		var data = data.data;
		var money = data.money;
		console.log(money);
		$(this).delegate(".buyBtn","click",function(){
			var price = $(this).parent().siblings().find(".price").text();
			parseFloat(price) < parseFloat(money) ? alert("买的起"):alert("买不起");
		});
	}

});
$.ajax({
	url: "http://www.ikindness.cn/api/test/getProduct"
}).done(function(data){
	$(".outBig").getData({
		data:data.data
	});
});
$.ajax({
	url: "http://www.ikindness.cn/api/test/getInfo",
	type:"get", //post
	dataType:"json",
	data :{
	userId :1223
	}
}).done(function(data){	
	$(".outBig").buyBtn({
		data:data.data
	});
});

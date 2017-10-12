// ------------------------------Tools↓-------------------------
//创建Dom元素
function $create(str){
	return document.createElement(str);
}
//显示与隐藏
let makeHideAndShow = function(source,target,timeSpace=200){
	source.mouseenter(function(){
		if(target.css("display")=="none"){
			target.fadeIn(timeSpace);
		}
	});
	source.mouseleave(function(){
		if(target.css("display")=="block"){
			target.fadeOut(timeSpace);
		}	
	});
}
// ------------------------------Tools↑-------------------------

function InitUI(){
	InitTopUI();
	InitLeftUI();
	InitRightUI();
}
function InitTopUI(){
	//我的良品显示隐藏
	makeHideAndShow($(".myInfo_li"),$(".myInfo_hover"),200);
	//关注良品显示隐藏
	makeHideAndShow($(".attention_li"),$(".attention"),200);
	//购物车显示隐藏
	makeHideAndShow($(".main_buy"),$(".buy_show"),200);
}
function InitLeftUI(){
	//左侧边栏显示与隐藏
	setInterval(function(){
		if(	$(window).scrollTop()>=$("#active_target").offset().top){
			$("#aside_left_nav").fadeIn(500);
		}else{	
			$("#aside_left_nav").fadeOut(500);
		}
	},500);
	//左侧边栏按钮点击的滑动效果
	let $left_lis=$(".fn_list").children();
	$left_lis.each(function(){
		$(this).click(function(){
			$('html,body').animate({"scrollTop":$($(this).children().attr("name")).offset().top},500);
		}); 
	});
}
function InitRightUI(){
	//右侧边栏下面二维码的显示与隐藏
	makeHideAndShow($("#qr_cust"),$("#qr_cust_display"));
	//返回顶部按钮
	$(".goback").click(function(){
			$('html,body').animate({"scrollTop":0},500);
	}); 
}


function MenuEvent(){
	let menu_text=[
		["嗑壳坚果","果果仁仁","特惠炒货"],
		["猪肉系列","牛肉系列","鸡鸭系列","海味系列"],
		["缤纷果干","话梅山楂","红枣葡萄"],
		["糕点系列","饼干系列","糖果系列","果冻系列"],
		["美味豆干","笋菌海带","其他山珍"],
		["养生冲调","进口饮料"],
		["进口糕点","进口糖果","休闲零食"],
		["零食礼盒","年货量贩装"]
	];
	let menu_lis=$(".menu_list").children(); //所有菜单item的jq对象
	let menu_show_dom=	$(".menu_show")[0];	 //右侧显示div的dom节点
	for(let i=0;i<menu_lis.length-1;i++){
		$(menu_lis[i]).mouseenter(function(){
			for(let j=0;j<menu_text[i].length;j++){
				let domDiv = $create("div");
				domDiv.className="menu_item";
				let domA = $create("a");
				domA.innerText=menu_text[i][j];
				domDiv.appendChild(domA);
				menu_show_dom.appendChild(domDiv);
			}
			menu_lis[i].appendChild(menu_show_dom);
			menu_show_dom.style.display="block";
		});
		$(menu_lis[i]).mouseleave(function(){
			$(menu_show_dom).empty();//清空
			menu_show_dom.style.display="none";
		});
	}
}      

function login_cookie(){
	let $no_login_style = $(".toolbar_content_left");
	let $login_style = $(".toolbar_content_left_logined");
	if(document.cookie==""){ //非登录
		$no_login_style.css("display","block");
		$login_style.css("display","none");
	}else{//登录状态
		$no_login_style.css("display","none");
		$login_style.css("display","block");
		$(".toolbar_username").text(getCookie("userName"));
		$(".toolbar_quit").click(function(){
			removeCookie("userName");
			$no_login_style.css("display","block");
			$login_style.css("display","none");
			location.href="login.html";
		});
	}
}

//模拟生成GUID
function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;   
}

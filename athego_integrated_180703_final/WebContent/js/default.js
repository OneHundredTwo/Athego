
function l(msg) {
	console.log(msg);
}

//library가 추가되어있는지 확인하는 함수(jquery도 없을수있으니까 순수자바스크립트로함)
var onloadedScripts = document.getElementsByTagName('script');
var src;
function checkOnloadedLibrary(libName){
	for ( var i in onloadedScripts) {
		src = onloadedScripts[i].src;
		if (src != null) {
			if(src.substr(src.lastIndexOf('/') + 1, src.length) == libName)
				return true;
		}
	};
	return false;
}

// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
// underscore 기본셋팅
if (checkOnloadedLibrary('underscore-min.js')){
	l('underscore loaded');
	_.templateSettings = {
		evaluate : /<@([\s\S]+?)@>/g,
		interpolate : /<@=([\s\S]+?)@>/g,
		escape : /<@-([\s\S]+?)@>/g
	};
}

// moment 기본셋팅
// moment.fromNow() 한글로 보여주기위해서 지역을 변경하는 코드. 정상적으로 출력하려면 <meta charset="UTF-8">을
// 지정해줘야함.
if(checkOnloadedLibrary('moment.js')){
	l('moment loaded');
	moment.updateLocale('ko', {});
}

// jquery가 로드됐을때 기본셋팅.
// header에 more버튼 누르면 리스트 on off 되는 스크립트
if(checkOnloadedLibrary('jquery.min.js')){
	l('jquery loaded ');
	
	//header 기본셋팅
	var $list = $("#navBar .moreBtn").next();
	$("#navBar .moreBtn").on("click", function() {
		if ($list.is(":visible")) {
			$list.hide();
		} else {
			$list.show();
		}
		return false;
	});
	
	// body 누르면 없어지는 스크립트
	$("body").on("click", function() {
		if ($list.is(":visible")) {
			$list.hide();
		}
	});
	
	
	
	// Writer___________K__180622
	//팝업에서 커버부분을 클릭시에 팝업 제거
	var $body = $("body"); 
	$body.on("click", ".bodyCover.on", function (evt) {

	    var $main = $(".bodyCover.on>div");
	    var popupLength_main = $(evt.target).closest($main).length;
	    console.log('popupLength_main:',popupLength_main);
	    
	    /* 
		 * Writer___________B__180629 
		 * 로그인 팝업시 취소하면 내용 초기화
		 *  */
	    $loginForm.find("input").val("");
	    $loginFail.hide();
	    
	    // 단, 리뷰 에디터 작성중일때는 꺼지지 않도록 설정
	    if (popupLength_main === 0 && !$(this).hasClass("reviewEditor")) {        
	        $(".bodyCover").removeClass("on");
	        $body.removeClass("modalOpen").css("margin-right", "");
	    }
	});

	/* 
	 * Writer___________K__180622
	 * 바디 커버 적용시 스크롤바적용을 위해서 사용
	 * 스크롤바의 너비를 구함
	 *  */
	function getScrollBarWidth() {
		var $outer = $('<div>').css({ visibility : 'hidden', width : 100, overflow : 'scroll'})
		.appendTo('body'), widthWithScroll = $('<div>').css({	width : '100%'})
		.appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	};
	
	/* 
	 * Writer___________B__180627
	 * 로그인 폼 동작 스크립트
	 *  */
	
	/* 
	 * Writer___________B__180629 
	 * 로그인 폼 동작 스크립트 수정
	 *  */
	
	// 로그인 버튼 클릭시에
	$("#login").on(
			"click",
			function() {
				// 로그인폼 show
				$loginForm.addClass("on");
				// 바디에서 스크롤 제거
				$("body").addClass("modalOpen").css("margin-right",
						getScrollBarWidth() + "px");
			});
			
	var $loginForm = $(".loginForm");
	var $loginBtn = $("#loginBtn")
	var $inpEmail = $loginForm.find("#inp_email"), $inpPwd = $loginForm
			.find("#inp_pwd"), $loginFail = $loginForm.find(".loginFail");
	
	$(".wrapLoginForm").on("click",function(){
		return false;
	});

	$loginBtn.on("click", function(e) {
		e.stopPropagation();
		if ($inpEmail.val() == "") {
			$loginFail.text("이메일을 입력해주세요");
			if($loginFail.css("display")=="none"){
				$loginFail.slideDown();
			}
			$inpEmail.focus();
			return false;
		} else if ($inpPwd.val() == "") {
			$loginFail.text("비밀번호를 입력해주세요");
			if($loginFail.css("display")=="none"){
				$loginFail.slideDown();
			}
			$inpPwd.focus();
			return false;
		}

		// 아이디,비밀번호 다 입력된 상태라면
		$.ajax({
			type : "POST",
			url : "/session",
			data : {
				email : $inpEmail.val(),
				password : $inpPwd.val()
			},
			dataType : "json",
			error : function(xhr, status, error) {
				$loginFail.text("에러가 발생했습니다. 다시 시도해 주세요.");
				$loginFail.slideDown();
			},
			success : function(response) {
				if (response.isFail) {
					$loginFail.text("아이디나 비밀번호를 확인해주세요.");
					$loginFail.slideDown();
					$inpEmail.focus();
				} else {
					location.reload();
				}
			}
		});

		// id="session_form" action="/session" method="post"
	});
	
	// 랜덤 함수
	var gen_nums = [];

	function inArray(array, el) {
	   for(var i = 0 ; i < array.length; i++) 
	       if(array[i] == el) return true;
	   return false;
	}

	function getRandom(array) {
	    var rand = array[Math.floor(Math.random()*array.length)];
	    if(!inArray(gen_nums, rand)) {
	       gen_nums.push(rand); 
	       return rand;
	    }
	    return getRandom(array);
	} 
	//end 랜덤 함수
}

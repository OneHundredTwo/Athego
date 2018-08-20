//스크립트 시작!!
//password_find_step1 //---Writer___________N__180629
  
$("#password_btn").click(
		function(e) {
	        $(".bodyCover").removeClass("on");
	        $("body").removeClass("modalOpen").css("margin-right", "");
	        
			$(".bodyCover.passwordFind").addClass("on");
			$("body").addClass("modalOpen").css("margin-right",
					getScrollBarWidth() + "px");
			e.preventDefault();
		});
//step2 의 휴대전화로 인증 부분 버튼1  //---Writer___________N__180629
$("#certification_btn1").click(function() {
	alert("성공적으로 본인 휴대 전화에 인증번호를 발송했습니다");
});
//step2 의 휴대전화로 인증 부분 버튼2  //---Writer___________N__180629
$("#certification_btn2").click(function() {
	alert("인증이 완료되었습니다.");
});
//step2 의 이메일로 인증 부분 버튼1  //---Writer___________N__180629
$("#certification_btn3").click(function() {
	
	alert("성공적으로 인증번호를 발송했습니다");
	alert("10초뒤 인증번호가 생성됩니다");
		setTimeout(function(){
		$(".informationGet .verifyNumInput").val(generateRandom(1000, 9999));
	},700);
		
});
// 랜덤 함수 부분  7초뒤 인증번호 랜덤 생성 //---Writer___________N__180629
var generateRandom = function (min, max) {
	  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
	  return ranNum;
	}
$("#certification_btn4").click(function() {
	alert("인증이 완료되었습니다.");
});
//step1에 입력한 이메일이 존재 할 경우 step2 이동 틀렸을 경우 오류창이 뜨며 step1에 머무른다. 
//---Writer___________N__180629
$(".stepBtn1").click(function() {
	console.log('stepBtn1');
	//alert("ajax시작!");	
	var email = $("#emailStep1").val().trim();	
	console.log(email);
	$.ajax({
		url : "/find_pass",
		type:"get",
		dataType:"json",
		data:{"email":email},
		error : function() {
			alert("error");
		},
		success : function(json) {		
			console.log(json);			
			if(json.result) {
				$('#password_find_step1').removeClass('on');
				$('#password_find_step2').addClass('on');
				$("#emailcheck1").val($("#emailStep1").val());
				$("#emailcheck2").val($("#emailStep1").val());
				alert("다음 step으로 넘어갑니다");
			}else {
				alert("이메일을 작성하지 않았거나 존재하지 않는 이메일 입니다.");
			}			
		}
	});


	//---Writer___________N__180629
// //password_find_step2 전화번호 인증
$("#password_find_step2 input:eq(0)").click(function(e) {
	//alert("휴대전화로 인증합니다");
	$("#password_find_step2 .checkBox .userPhoneBox").addClass("on");
	$("#password_find_step2 .checkBox .userEmailBox").removeClass("on");

});
// //password_find_step2 이메일 인증
$("#password_find_step2 input:eq(4)").click(function(e) {
	//alert("이메일로 인증합니다");
	$("#password_find_step2 .checkBox .userEmailBox").addClass("on");
	$("#password_find_step2 .checkBox .userPhoneBox").removeClass("on");
});
//전화번호 인증 or 핸드폰 인증을 성공 했을때 step3 로 넘어가고 아닐경우 step2에 잔류 
$(".stepBtn2").click(function() {
	var emailCheck = $(".userEmailBox").val().trim();	
	//var phoneCheck = $(".userPhoneBox").val().trim();	
	
		$('#password_find_step2').removeClass('on');
		$('#password_revise_step3').addClass('on');	
		$("#emailStep3").val($("#emailStep1").val());
		alert("다음 step으로 넘어갑니다");			

})
//---Writer___________N__180629
// 수정하기 버튼 클릭시 팝업창이 꺼진다
$(".stepBtn3").click(function(e) {
	alert("다음 step으로 넘어갑니다");	
});



//---Writer___________N__180629
// 팝업에서 메인 내용 이외의 클릭 일때 팝업을 없앤다.
$("body").on(
		"click",
		".bodyCover.passwordFind.on",
		function(evt) {
			var $password_form = $("#password_form");

			var popupLength_password_form = $(evt.target).closest(
					$password_form).length;

			if (popupLength_password_form === 0) {
				console.log("메인내용을 이외에 바탕을 클릭했을때");
				$("#emailStep1").val('');
				$(".informationGet .verifyNumInput").val('');
				closePopup();
			} else {
				console.log("메인내용을 클릭했을 때");
			}
		});
});
//---Writer___________N__180629
/* 바디 커버 적용시 스크롤바적용을 위해서 사용 */
function getScrollBarWidth() {
	var $outer = $('<div>').css({
		visibility : 'hidden',
		width : 100,
		overflow : 'scroll'
	}).appendTo('body'), widthWithScroll = $('<div>').css({
		width : '100%'
	}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};
//---Writer___________N__180629
// 팝업창 끄기 function 입니다
function closePopup() {
	$(".bodyCover.passwordFind").removeClass("on");
	$("#password_form>div").removeClass("on");
	$("#password_find_step1").addClass("on");
	$("body").removeClass("modalOpen");
	$("body").css("margin-right", "");
}
//---Writer___________N__180629
// 유효성 검사 시작
var $emailStep1 = $("#emailStep1"), $messageEmailBox = $(".messageEmailBox"), regemailStep1 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var $password1 = $("#password1"), $messagePasswordBox1 = $(".messagePasswordBox1"), regpassword1 = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/;

var $password2 = $("#password2"), $messagePasswordBox2 = $(".messagePasswordBox2"), regpassword2 = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/;

function validateEmail() {
	console.log("validateEmail");
	var val = $emailStep1.val();
	if (regemailStep1.test(val)) {
		$messageEmailBox.removeClass("bad");
		$messageEmailBox.addClass("good");
		return true
	} else {
		$messageEmailBox.removeClass("good");
		$messageEmailBox.addClass("bad");
		return false
	}
}
$emailStep1.keyup(validateEmail);

function validatePassword1() {
	var val = $password1.val();

	if (regpassword1.test(val)) {
		$messagePasswordBox1.removeClass("bad");
		$messagePasswordBox1.addClass("good");
		return true
	} else {
		$messagePasswordBox1.removeClass("good");
		$messagePasswordBox1.addClass("bad");
		return false
	}
}
$password1.keyup(validatePassword1);

function validatePassword2() {
	var val = $password2.val();

	if (regpassword2.test(val)) {
		$messagePasswordBox2.removeClass("bad");
		$messagePasswordBox2.addClass("good");
		return true
	} else {
		$messagePasswordBox2.removeClass("good");
		$messagePasswordBox2.addClass("bad");
		return false
	}
}
$password2.keyup(validatePassword2);
$("#password_form").submit(function() {
	return validateEmail();
	return validatePassword1();
	return validatePassword2();

});// 유효성 검사 끝



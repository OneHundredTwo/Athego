// 유효성 검사 시작
//아이디 유효성 검사  이메일 형식 해당 아이디+ @ + com,net등 붙여야 함
var $email = $("#email"),
    $messageEmailBox = $(".messageEmailBox"),
    regemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
//비밀번호 작성 유효성 검사 영어+숫자+!를 사용
var $password1 = $("#password1"),
    $messagePasswordBox1 = $(".messagePasswordBox1"),
    regpassword1 = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/;
// 비밀번호 확인 유효성 검사 위에 비밀번호와 같아야 함
var $password2 = $("#password2"),
    $messagePasswordBox2 = $(".messagePasswordBox2"),
    regpassword2 = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/;
//닉네임 한글 영어 대소문자를 사용해주세요 특수 공백 안됨 
var $nickname = $("#nickname"),
    $messageNickname = $(".messageNickname"),
    regnickname = /^[가-힣]{2,15}|[a-z0-9]{2,15}$/;
// 폰번호 유효성 검사 
var $phoneNum1 = $("#phoneNum1"),
    $messagePhoneNum = $(".messagePhoneNum"),
    regPhoneNum1 =  /^\d{3}$/;
var  $phoneNum2 = $("#phoneNum2"),
     regPhoneNum2 = /^\d{3,4}$/;
var $phoneNum3 = $("#phoneNum3"),
    regPhoneNum3 = /^\d{4}$/;
//추가사항 부분을 열었을때 와 열지않았을때의 이벤트 변수 
var addFlag = false;
// 이메일 부분 on 이벤트 ---Writer___________N__180629
function validateEmail() {
    console.log("validateEmail");
    var val = $email.val();
    if (regemail.test(val)) {
        $messageEmailBox.removeClass("bad");
        $messageEmailBox.addClass("good");
        $email.focus();
        return true
    } else {
        $messageEmailBox.removeClass("good");
        $messageEmailBox.addClass("bad");
        return false
    }
}
$email.keyup(validateEmail);
//비밀번호 부분 on 이벤트 ---Writer___________N__180629
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
//비밀번호 확인 부분 on 이벤트 ---Writer___________N__180629
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

//닉네임 부분 on 이벤트 ---Writer___________N__180629
function validateNickname() {
    var val = $nickname.val();
    if (regnickname.test(val)) {
        $messageNickname.removeClass("bad");
        $messageNickname.addClass("good");
        return true
    } else {
        $messageNickname.removeClass("good");
        $messageNickname.addClass("bad");
        return false
    }
}
$nickname.keyup(validateNickname);
//전화번호 부분 on 이벤트 ---Writer___________N__180629
function validatePhoneNum() {
    var valA = $phoneNum1.val();
    var valB = $phoneNum2.val();
    var valC = $phoneNum3.val();
    if (regPhoneNum1.test(valA) && regPhoneNum2.test(valB) && regPhoneNum3.test(valC)){

        $messagePhoneNum.removeClass("bad");
        $messagePhoneNum.addClass("good");
        return true
    } else {
        $messagePhoneNum.removeClass("good");
        $messagePhoneNum.addClass("bad");
        return false
    }
}
$phoneNum1.keyup(validatePhoneNum);
$phoneNum2.keyup(validatePhoneNum);
$phoneNum3.keyup(validatePhoneNum);

//유효성 검사 submit 이벤트 addFlag 추가사항을 동작했을 때 폰번호 유효성 검사 실행
// false일 경우 추가사항 없음으로 그대로 실행 
//---Writer___________N__180629
$("#join_user_box").submit(function () {

	
	return validateEmail();
	return validatePassword1();
    return validatePassword2();
    return validateNickname();
    
    if(addFlag) {
    	console.log("추가사항이 있음");
    	return validatePhoneNum();
    }else {
    	console.log("추가사항이 없음");	
    }    
    return false;   
})// 유효성 검사 끝

//추가사항 부분 true //---Writer___________N__180629
$("#join_user_form .joinAdd a .fa-caret-down").click(function (e) {
	addFlag = true;
    $('#join_user_form .joinAdd a .fa-caret-down').addClass('on');
    $('#join_user_form .joinAdd a .fa-caret-up').addClass('on');
    $('#join_more_detail').addClass('on');
    e.preventDefault();
});
//추가사항 부분 false //---Writer___________N__180629
$("#join_user_form .joinAdd a .fa-caret-up").click(function (e) {
	
	addFlag = false;
	
    $('#join_user_form .joinAdd a .fa-caret-down').removeClass('on');
    $('#join_user_form .joinAdd a .fa-caret-up').removeClass('on');
    $('#join_more_detail').removeClass('on');
    e.preventDefault();
});
//소개글 글자수 제한 1000자 입니다 //---Writer___________N__180629
$(document).ready(function () {
    $('#testArea').on('keyup', function () {
        if ($(this).val().length > 1000) {
            $(this).val($(this).val().substring(0, 1000));
        }
    });
});
//전화인증을 실행햇을 때 alert창 실행  true //---Writer___________N__180629
$(".phoneBtn").click(function () {
    alert("인증 되었습니다");
});

//////////////////////2018-06-24 수정했습니다 생년월일 js부분 입니다///////////////////////////

//년,월을 생성하는 함수 //---Writer___________N__180629
function createYearMonth() {
    //올해 년 얻어오기
    var nowYear = moment().year();
    //올해년도로 for문 돌리기
    for(var i = nowYear ; i >= 1897 ; i-- ) {
        //option요소 생성후 id가 year인
        //select요소에 붙이기
        var $option = $("<option>");
        if((nowYear-19)==i) {
            $option.attr("selected",true);
        }//if end
            $option.text(i)
                 .appendTo("#year");
    }//for end
    //월 생성
    for(var i = 1 ; i < 13 ; i++ ) {

        $("<option>").text(i).appendTo("#month");

    }//for end

    //일 만드는 함수 호출
    createDate();

}//createYearMonth() end

//페이지가 로딩되었을때 한번 호출
createYearMonth();


//유저가 선택한 년과 월을 가지고
//마지막 날짜까지 일을 생성하는 함수
function createDate() {

    //기존 선택된 일
    var oldDate = $("#date").val();

    //기존의 option요소를 전부 지우기
    $("#date").empty();

    //현재 선택된 년도 얻기
    var year = $("#year").val();
    //현재 선택된 월 얻기
    var month =$("#month").val()-1;

    //마지막 날짜 얻기
    var lastDay = moment([year,month]).endOf("month").date();

    //for문 돌려서 생성
    for(var i = 1 ; i <= lastDay ; i++ ) {

        var $option = $("<option>");

        if(oldDate==i) {
            $option.attr("selected",true);
        }//if end
        $option.text(i)
            .appendTo("#date");

    }//for end

}//createDate() end

//년 혹은 월이 변경될때 createDate()함수 호출 //---Writer___________N__180629
$("#year,#month").change(createDate);

//2018-06-26 수정했습니다 관심도시 추가 js부분 입니다 //---Writer___________N__180629

// 관심 도시 부분 ---Writer___________N__180629 
//depth1을 다른 값으로 변경했을때 해당 depth1의 depth1Code에 속한 depth2의 정보가 출력되며 이전 depth1의 선택한 값의 depth정보가
//empty 된다
		var depth2List = $("#city");
		var $depth1Code = $("#state"),location_Depth2_Tmpl = _.template($("#location_Depth2_Tmpl").html());
		$depth1Code.on('change',function(){
			// val() 값을 얻어옴 
				var depth =$depth1Code.val();			
			 	depth2List.empty();
			 $.ajax({
				 url : '/ajax/user/join/location/depth1',
				 type:"get",
				 data : {depth1Code:depth},
				 error : function(xhr, status, error) {
				 //l('/ajax/user/joinlocation/ : ' + error);
				 },
				 success : function(result){
					 l(result);
					 var cityItems = location_Depth2_Tmpl({locations : result });
					 depth2List.append(cityItems);				 
				 }});
			});
// 관심도시 개수 3개까지 true 아니면 false 
var index = 0;
$("#add_btn").click(function () {
	//depth1 select 부분 text를 얻어옴
    var state = $("#state option:selected").text();
    console.log(state);
    //depth2 select 부분 text를 얻어옴
    var city = $("#city option:selected ").text();
    //locationNo 변수 선언하고  val값 얻어옴
    var locationNo =  $("#city option:selected ").val();
    //회원가입 form 변수 선언 
    var $form = $("#join_user_form");
    console.log(city);
    // 회원가입 밑에 붙는 inputHidden 변수를 선언 
    var inputHidden = $(".l"+locationNo);
    console.log("inputHidden.val() : " + inputHidden.val());
    console.log("locationNo : " + locationNo);
    
    //관심지역 선택 갯수 제한 (3개까지)
    index += 1;
    if(index >3){
    	alert("관심지역 갯수 초과")
    	return false;
    }
  //회원가입 폼(#join_user_form)의 밑에 붙는 inputHidden.val()과 locationNo는 동일한 값이다 
    // 만약 동일한 값이 또 있을 시 flose가 되고 true면 그대로 실행
    if(inputHidden.val()!=locationNo){
    	
        var $input =$("<input class='l"+ locationNo +"' type='hidden' name='locationNo'>");
        var $div1 = $("<div>");
        var $div2 = $("<div class='itemBox' >");
        var $span = $("<span data-location_no='"+locationNo+"'>").html("<i class='fas fa-map-marker-alt'></i> "+state+city); 
        $div2.append($span);
        $div1.append($div2).appendTo("#area_item_box");
        $form.prepend($input.val(locationNo));
    }else{
    	alert("이미 존재하는 관심도시 입니다")
    }
    	
      
	});
//  inputHidden.val()과 locationNo는 동일한 값으로 아이템을 클릭하여  remove() 시키면 둘다 사라짐  
$("body").on("click",'#area_item_box>div', function () {
	console.log("cc");
	var locationNo = $(this).find('span').data('location_no');
	$(".l"+locationNo).remove();
	$(this).remove();
	});

//체크박스 부분   ---Writer___________N__180629 
//5개만 체크되게 하기
function count_ck(obj){
	//변수 chkbox가 0으로 초기화 되고 chkCnt가 5보다 클경우 실행하지 않는다 
	var chkbox = document.getElementsByName("service");

	var chkCnt = 0;

	for(var i=0;i<chkbox.length; i++){

		if(chkbox[i].checked){

			chkCnt++;
		}
	}
	if(chkCnt>5){
		alert("check NO");

		obj.checked = false;

		return false;
	}

}


			
// js 끝 
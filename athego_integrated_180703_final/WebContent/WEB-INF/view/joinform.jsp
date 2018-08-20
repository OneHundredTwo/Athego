<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<c:import url="/WEB-INF/view/template/link.jsp"></c:import>
<link rel="stylesheet" href="/css/joinform.css" />
<!-- 수정날짜 2018-06-25 -->
<style>
#join_user_box,
body>div.fullContainer {
	background:#ccc;
}
#join_user_box #join_user_form {
	background:#fff;
}
span.user {
	border-radius:4px;
}
</style>
</head>
<body>
	<!-- html 요소 부분 css 부분 수정 있으므로 전체 복사해서 붙여넣기 해주세요  -->
	<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
	<div id="join_user_box">
		<form action="/user" id="join_user_form" method="post">
			<h3>회원가입</h3>
			<div class="userPhoto">
				<span class="user" style="
    vertical-align:  middle;
    font-size: 16px;
    margin-right: 10px;
    display: inline-block;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    /* float: left; */
    background: #ff7779;
    color: #fff;
">프로필</span>
				<div id="user_pic"
					style="background-image:url(/img/${user.profile})">
					<label class="fa fa-cog"> <input type="file" id="pic_edit"
						name="picEdit">
					</label>
					<input type="hidden" id="user_profile_name" name="userProfile" value=""/>

				</div>
				<!-- 유저 업로드 부분입니다 -->
			</div>
			<!-- userPhoto 부분입니다 -->

			<ul class="joinUserFormContent">
				<li><span class="user">이메일</span><input id="email" type="text"
					name="email" placeholder="내용을 입력해주세요."></li>
				<div class="messageEmailBox">
					<p class="message bad">이메일 형식에 맞지 않습니다.</p>
					<p class="message good">사용가능한 이메일입니다 ^ ^</p>
				</div>
				<li><span class="user">비밀번호</span><input maxlength="16" id="password1"
					type="password" name="password" placeholder="내용을 입력해주세요.">
				</li>
				<div class="messagePasswordBox1">
					<p class="message bad">영어,숫자 조합한 4~16글자를 입력하세요.</p>
					<p class="message good">나이스한 비밀번호 입니다.</p>
				</div>
				<li><span class="user">비밀번호 확인</span><input id="password2" type="password"
					name="passwordConfirm" placeholder="내용을 입력해주세요."></li>
				<div class="messagePasswordBox2">
					<p class="message bad">비밀번호가 다릅니다.</p>
					<p class="message good">나이스한 비밀번호 입니다.</p>
				</div>
				<li><span class="user">닉네임</span><input id="nickname" type="text"
					name="nickname" placeholder="한글과 영문 대 소문자를 사용하세요(특수/공백x)">
				</li>
				<div class="messageNickname">
					<p class="message bad">이미 닉네임형식에 맞지 않습니다.</p>
					<p class="message good">완벽한 닉네임 입니다 ^^</p>
				</div>
			</ul>

			<div class="joinAdd">
				<span class="user">추가사항</span> <a><i class="fa fa-caret-up"></i><i
					class="fa fa-caret-down"></i></a>
			</div>
			<div id="join_more_detail">
				<ul class="joinUserAddForm1">
					<li><span class="user">생년월일</span> <select class="birthday" id="year"
						name="year">

					</select>
						<p>년</p> <select class="birthday" id="month" name="month">

					</select>
						<p>월</p> <select class="birthday" id="date" name="date">

					</select>
						<p>일</p></li>
					<li><span class="user">성별</span><input class="gender" type="radio"
						name="gender" value="M"><i title="남"  class="fas fa-mars"></i> <input class="gender"
						type="radio" name="gender" value="W" checked><i title="여" class="fas fa-venus"></i></li>
					<li><span class="user">전화번호</span> <div class="phone_div"><input id="phoneNum1"
						class="joinPhoneContent" name="phone1" type="text"> - <input
						id="phoneNum2" class="joinPhoneContent" name="phone2" type="text"> - <input id="phoneNum3" class="joinPhoneContent" name="phone3"
						type="text"></div>
					</li>
					<div class="messagePhoneNum">
						<p class="message bad">전화번호 형식에 맞지 않습니다.</p>
						<p class="message good">완벽한 전화번호 입니다</p>
					</div>
				</ul>

				<ul class="joinUserAddForm2">
					<li><span class="user">소개</span> <textarea id="testArea" name="introduce"
							class="attentionContent" rows="4" cols="50"
							placeholder="최대 1000자까지 적어주세요!"></textarea></li>
					<li><span class="user">관심사</span>
						<ul class="serviceBox">
							<li><input type='checkbox' id='ck_box1' onclick='count_ck(this);' name='service' value='1'><label for='ck_box1'><span title='관광' class='cat1'></span></label></li>
							<li><input type='checkbox' id='ck_box2' onclick='count_ck(this);' name='service' value='2'><label for='ck_box2'><span title='축제' class='cat2'></span></label></li>
							<li><input type='checkbox' id='ck_box3' onclick='count_ck(this);' name='service' value='3'><label for='ck_box3'><span title='문화예술' class='cat3'></span></label></li>
							<li><input type='checkbox' id='ck_box4' onclick='count_ck(this);' name='service' value='4'><label for='ck_box4'><span title='오락' class='cat4'></span></label></li>
							<li><input type='checkbox' id='ck_box5' onclick='count_ck(this);' name='service' value='5'><label for='ck_box5'><span title='맛집/술집' class='cat5'></span></label></li>
							<li><input type='checkbox' id='ck_box6' onclick='count_ck(this);' name='service' value='6'><label for='ck_box6'><span title='레저/스포츠' class='cat6'></span></label></li>
							<li><input type='checkbox' id='ck_box7' onclick='count_ck(this);' name='service' value='7'><label for='ck_box7'><span title='뷰티/힐링' class='cat7'></span></label></li>
							<li><input type='checkbox' id='ck_box8' onclick='count_ck(this);' name='service' value='8'><label for='ck_box8'><span title='제조/공예' class='cat8'></span></label></li>
							<li><input type='checkbox' id='ck_box9' onclick='count_ck(this);' name='service' value='9'><label for='ck_box9'><span title='까페' class='cat9'></span></label></li>
							<li><input type='checkbox' id='ck_box10' onclick='count_ck(this);' name='service' value='10'><label for='ck_box10'><span title='이벤트룸' class='cat10'></span></label></li>
						</ul>
						</li>
					<li><span class="user">관심도시</span> 
					<select id="state" >
					<option disabled selected>시</option>
							<!-- 댑스 1 리스트 넣음 -->
							<c:forEach items="${depths1}" var="depth">
								<option name="${depth.depth1}" value="${depth.depth1Code}">${depth.depth1}</option>

							</c:forEach>
					</select> <select id="city">
					<option disabled selected>군/구</option>
							<script type="text/template" id="location_Depth2_Tmpl">
							<@ _.each(locations,function(locationDepth2){ @>
								<option name="<@=locationDepth2.depth2@>" value="<@=locationDepth2.no@>">
								<spen><@=locationDepth2.depth2@></spen>
							</option>
							<@})@>
							</script>
						
					</optgroup>
					</select>
						<button id="add_btn" type="button" style="border-radius:4px;">추가</button></li>

				</ul>
				<div id="area_item_box">
					<!--<div class="itemBox">-->
					<!--<div class="item"><span>??</span></div>-->
					<!--</div>-->
				</div>
				<!--#area_item_box  -->
			</div>
			<!--join_more_detail end-->

			<div class="joinFormBtn">
				<button type="submit">회원가입</button>
			</div>
			<!--.joinFormBtn -->
		</form>
		<!--#join_user_box -->
	</div>
	<!--#join_user_box -->
	</div>
	<!--wiDTh1o24 -->
	</div>
	<!--fullContainer -->
	
	<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>
	<c:import url="/WEB-INF/view/template/js.jsp"></c:import>
	<script src="/js/joinformcheck.js"></script>
	<!-- 2018-06-29 자라스크립트 수정했습니다 -->

	<script>
	_.templateSettings = {
		interpolate : /\<\@\=(.+?)\@\>/gim,
		evaluate : /\<\@(.+?)\@\>/gim,
		escape : /\<\@\-(.+?)\@\>/gim
	};
	</script>
<script>
	//imageCheckbox init and change event apply
	$(".joinUserAddForm2 li .serviceBox input[type='checkbox']")
			.each(
					function() {
						var $imageCheckbox = $(this).next().find("span");
						//체크박스가 체크/해제될땐 체크될때 filter키워드를 추가, 해제될때 filter키워드를 제거
						$(this).change(function() {
							if ($(this).is(':checked')) {
								$imageCheckbox.addClass("checked");
							} else {
								$imageCheckbox.removeClass("checked");
							}
						});

					});
	</script>
<script>
var $pic_edit = $("#pic_edit");
var $user_pic = $("#user_pic");
$pic_edit.attr('accept', '.jpg,.jpeg,.png,.tif,.gif,.svg');
$("#pic_edit").change(function() {
	var data = new FormData();
	var file = this.files[0];
	console.log(file);
	data.append('file', file);
	if (typeof file == 'undefined') {
		return false;
	}
	if (file.size > 5000000){
		alert("용량이 너무 큽니다.");
		return false;
	} else if (['jpeg','jpg','png','svg','gif','tif', 'svg+xml'].indexOf(file.type.split('/')[1]) === -1){
		alert("이미지 형식이 아닙니다.");
		return false;
	}
	
	console.log("ajax:/ajax/registerPicture");
	
	$.ajax({
		url: '/ajax/registerPicture',
		type: 'POST',
		data: data,
		dataType : 'json',
		processData: false,
		contentType: false
	}).success(function(resultJosn) {
		
		console.log(resultJosn);
		$user_pic.css("background-image", "url(/img/"+ resultJosn.name + ")");
		$("#user_profile_name").val(resultJosn.name);
	}).error(function (error) {
		console.log(error);
	})
});
 
</script>

</body>
</html>
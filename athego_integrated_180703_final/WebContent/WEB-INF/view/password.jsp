<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>비밀번호 찾기/수정</title>
<c:import url="/WEB-INF/view/template/link.jsp"></c:import>
<link rel="stylesheet" href="css/password.css">
<link href="https://fonts.googleapis.com/css?family=Dosis"
	rel="stylesheet">
<style>
#password_find_main_box {
	display: block;
}
</style>
</head>
<body>
	<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
	<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>
	<div class="bodyCover passwordFind">
		<div id="password_find_main_box" class="">
			<div id="password_transparency_box">
			
				<form id="password_form" action="/find_pass" method="post">
				<input type="hidden" name="_method" value="PUT">
				<input type="hidden"  value="">
				
					<div id="password_find_step1" class="">
							<div class="emailBox">
								<i class="fa fa-user-circle"></i> <input type="text"
									id="emailStep1" name="email" value="${user.email}"
									placeholder=" 이메일 입력" />
							</div>
							<div class="messageEmailBox ">
								<p class="message bad">이메일 형식에 맞지 않습니다.</p>
								<p class="message good">사용가능한 이메일입니다 ^ ^</p>
							</div>
							<div class="nextBtn1">
								<button type="button" class="stepBtn1">다 음</button>
							</div><!--nextBtn1 -->
							
							</div><!-- password_find_step1 end  -->	
							
			<!-- 이메일 입력 1 -->
			<div id="password_find_step2" class="">
				<h3>인증방법선택하기</h3>
				<div class="checkBox">
					<input type="radio" name="chk_info" value="phone"> <label>회원정보에
						등록한 휴대전화로 인증</label>
					<div class="userPhoneBox">
						<ul class="informationGet">
							<li><i class="fa fa-user-circle"></i> 
								<input type="text" class="email" id="emailcheck1" readonly placeholder=" step1입력한 이메일"></li>
							<li>
								<div class="itemBox"></div> <input class="verifyNum" placeholder=" 휴대전화번호" value="${user.phone}">
								<button id="certification_btn1" type="button">인증번호 받기</button>
							</li>
							<li><input class="verifyNumInput" placeholder=" 인증번호를 입력하세요.">
								<button id="certification_btn2" type="button">인증 하기</button></li>
						</ul><!--informationGet  -->
					</div><!--userPhoneBox -->

				</div><!-- checkBox 휴대전화로 인증 -->
				<div class="checkBox">
					<input type="radio" name="chk_info" value="email"> 
					<label>본인확인 이메일로 인증</label>
					<div class="userEmailBox">
						<ul class="informationGet">
							<li><i class="fa fa-user-circle"></i> <input class="email" id="emailcheck2" readonly>
								<button id="certification_btn3" type="button">인증번호 받기</button></li>
							<li><input class="verifyNumInput" placeholder=" 인증번호를 입력하세요.">
								<button id="certification_btn4" type="button">인증 하기</button></li>
						</ul>
					</div><!-- userEmailBox -->
				</div><!--checkBox 이메일로 인증  -->
				<div class="nextBtn2">
					<button type="button" class="stepBtn2">다음</button>
				</div><!--nextBtn2  -->
			</div><!-- password_find_step2 end -->
			<div id="password_revise_step3" class="">
				<h3>비밀번호 수정하기</h3>
				<div class="passwordReviseBox">
					<ul>
						<li><span>이메일</span><i class="fa fa-user-circle"></i>
							<input class="email" id="emailStep3" readonly></li>
						<li><span>희망비밀번호</span> <i class="fa fa-key"></i> 
							<input id="password1" type="password" 
							name="password" value="${user.password }">
							<div class="messagePasswordBox1">
								<p class="message bad">영어,숫자 조합한 4~16글자를 입력하세요.</p>
								<p class="message good">나이스한 비밀번호 입니다.</p>
							</div>
						</li>
						<li><span>비밀번호확인</span> <i class="fa fa-key"></i> 
						<input id="password2" type="password" name="password2">
							<div class="messagePasswordBox2">
								<p class="message bad">비밀번호가 다릅니다.</p>
								<p class="message good">나이스한 비밀번호 입니다.</p>
							</div>
						</li>
					</ul>
				</div><!-- passwordReviseBox -->
				<div class="nextBtn3">
					<button type="submit" class="stepBtn3">수정하기</button>
				</div><!-- nextBtn3 -->
			</div><!--  password_revise_step3 새비밀번호 수정 -->
			<!--비밀번호 변경 -->

			</form><!--#password_form 비밀번호 찾기/수정 폼 -->
			
			
		</div><!--#password_transparency_box end 투명하게 해주는 폼 -->
	</div><!--#password_find_main_box end -->
</div><!-- .bodyCover passwordFind end -->
	<script src="js/jquery.min.js"></script>
	<script src="js/underscore-min.js"></script>
	<script src="js/moment.js"></script>
	<script src="js/default.js"></script>
	<script src="js/password.js"></script>
	
</body>
</html>
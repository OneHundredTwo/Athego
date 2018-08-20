<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%-- header.jsp start --%>
<header>
	<div class="wiDTh1o24">
		<div class="left">
			<div class="left logoBox">
				<a href="/index"><img class="logoImg"
					src="/img/athego_logo.png" alt="Logo_IMG" onError="this.src='/img/def(1024x440).png';"></a>
			</div>
			<form action="/search" method="GET" class="simpSearch left">
				<input type="text" name="keyword" placeholder="ex)홍대맛집"/>
				<input type="hidden" name="minBudget" value="-1"/>
				<input type="hidden" name="maxBudget" value="-1"/>				
				<button id="simple_search_btn">
					<i class="fa fa-search"></i>
				</button>
				<!--맨 앞의 fa가 fas 로 되야함-->
			</form>
		</div>
		<div class="right">
			<ul class="abs" id="navBar">
				<c:choose>
					<%-- 비로그인 --%>
					<c:when test="${loginUser==null }">
						<li>
							<button class="navBtn" id="login">로그인</button>
						</li>
						<li><a href="/user/join" class="navBtn" id="join">회원가입</a></li>
						<li><a href="/service" class="navBtn" id="service">고객센터</a></li>
					</c:when>
					<%-- 로그인 --%>
					<c:otherwise>
						<li><a class="nolgoAdd" href="/nolgo/register">놀 Go 등록</a></li>
						<li>
							<form action="/session" method="POST">
								<input type="hidden" name="_method" value="DELETE" />
								<input type="hidden" name="currentUrl" value="${requestScope['javax.servlet.forward.servlet_path']}"/>
								<button class="navBtn">로그아웃</button>
							</form>
						</li>
						<li><img src="/img/${loginUser.profile }" class="userImg" onError="this.src='/img/user.png';"/></li>
						<li>
							<div class="moreWrapper">
								<button class="moreBtn">
									<i class="fas fa-ellipsis-v"></i>
								</button>
								<ul class="subList" id="userDropdownList">
									<li><a href="/user/${loginUser.no }">마이페이지</a></li>
									<li><a href="/index">개인정보 수정</a></li>
									<li><a href="/index">고객센터</a></li>
								</ul>
							</div>
						</li>
					</c:otherwise>
				</c:choose>
			</ul>

		</div>
	</div>
	<div class="bodyCover loginForm">
		<!-- add on -->
		<!-- B 2018 06 29 -->
		<div class="wrapLoginForm">
				<fieldset>
					<legend>로그인폼</legend>
					<h3 class="inLoginForm">로그인</h3>
					<input class="inLoginForm" id="inp_email" type="text" name="email"
						placeholder="email"> <input class="inLoginForm"
						type="password" id="inp_pwd" name="password" placeholder="password">
						
					<div class="inLoginForm loginFail">아이디나 비밀번호가 틀렸습니다</div>
					<button id="loginBtn" class="inLoginForm">로그인</button>
					<div class="inLoginForm bundle"><button type="button" class="nonDeco">
							<a href="/user/register">회원가입</a>
						</button><span class="bar"></span><button type="button" class="nonDeco" id="password_btn">
							<a href="/user/password">비밀번호 찾기</a>
						</button></div>
				</fieldset>
		</div>
		<!-- //B -->
	</div>
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

</header>
<div class="fullContainer">
	<div class="wiDTh1o24">
		<%-- header.jsp end --%>
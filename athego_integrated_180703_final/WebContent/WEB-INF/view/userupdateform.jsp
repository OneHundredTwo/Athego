<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>나의 정보 수정 페이지</title>
    <c:import url="/WEB-INF/view/template/link.jsp"></c:import>
    <link rel="stylesheet" href="css/joinform.css"/>
    <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
    <style>

    </style>
</head>
<body>
<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
        <div id="join_user_box">
            <form id="join_user_form">
                <<div class="userPhoto">

				<div id="user_pic">
					<label class="fa fa-cog"> <input type="file" id="pic_edit"
						name="picEdit">
					</label>
					<button>버튼</button>
				</div>
				<!-- 유저 업로드 부분입니다 -->
			</div>
			<!-- userPhoto 부분입니다 -->

                <ul class="joinUserFormContent">
                    <li><span class="user">이메일</span><input id="email" required type="email" name="email" placeholder="내용을 입력해주세요.">
                    </li>
                    <div class="messageEmailBox">
                        <p class="message bad">이메일 형식에 맞지 않습니다.</p>
                        <p class="message good">사용가능한 이메일입니다 ^ ^</p>
                    </div>
                    <li><span>비밀번호</span><input
                            maxlength="16" id="password1" type="password" name="password" placeholder="내용을 입력해주세요.">
                    </li>
                    <div class="messagePasswordBox1">
                        <p class="message bad">영어,숫자 조합한 4~16글자를 입력하세요.</p>
                        <p class="message good">나이스한 비밀번호 입니다.</p>
                    </div>
                    <li><span>비밀번호 확인</span><input id="password2"  type="password"  name="password" placeholder="내용을 입력해주세요.">
                    </li>
                    <div class="messagePasswordBox2">
                        <p class="message bad">비밀번호가 다릅니다.</p>
                        <p class="message good">나이스한 비밀번호 입니다.</p>
                    </div>
                    <li><span>닉네임</span><input id="nickname"
                                               type="text" name="nickname"
                                               required placeholder="한글과 영문 대 소문자를 사용하세요(특수/공백x)">
                    </li>
                    <div class="messageNickname">
                        <p class="message bad">이미 닉네임형식에 맞지 않습니다.</p>
                        <p class="message good">완벽한 닉네임 입니다 ^^</p>
                    </div>
                </ul>

                <div class="joinAdd"><span>추가사항</span>
                    <a><i class="fa fa-caret-up"></i></a><a><i class="fa fa-caret-down"></i></a></div>
                <div id="join_more_detail">
                    <ul class="joinUserAddForm1">
                        <li><span>생년월일</span>
                            <select class="birthday">
                                <option>년</option>
                            </select>
                            <select class="birthday">
                                <option>월</option>
                            </select>
                            <select class="birthday">
                                <option>일</option>
                            </select>
                        </li>
                        <li>
                            <span>성별</span><input class="gender" type="radio" name="gender" value="man">남
                            <input class="gender" type="radio" name="gender" value="man">여
                        </li>
                        <li><span>전화번호</span>
                            <select class="joinPhone">
                                <option>+82</option>
                            </select>
                            <input id="phoneNum1" class="joinPhoneContent" name="phone1" required type="text">
                            <input id="phoneNum2" class="joinPhoneContent" name="phone2" required type="text">
                            <input id="phoneNum3" class="joinPhoneContent" name="phone3" required type="text">
                            <button class="phoneBtn">인증</button>
                        </li>
                        <div class="messagePhoneNum">
                            <p class="message bad"> 전화번호 형식에 맞지 않습니다.</p>
                            <p class="message good">완벽한 전화번호 입니다</p>
                        </div>

                    </ul>
                    <ul class="joinUserAddForm2">
                        <li><span>소개말</span>
                            <textarea class="attentionContent" rows="4" cols="50"
                                      placeholder="최대 1000자까지 적어주세요!"></textarea>
                        </li>
                        <li><span>관심사</span>
                            <div class="serviceBox">
                                <input type="checkbox" id="ck_box1" name="service">관광
                                <input type="checkbox" id="ck_box2" name="service">축제
                                <input type="checkbox" id="ck_box3" name="service">문화예술
                                <input type="checkbox" id="ck_box4" name="service">오락
                                <input type="checkbox" id="ck_box5" name="service">맛집/술집
                                <input type="checkbox" id="ck_box6" name="service">레저/스포츠
                                <input type="checkbox" id="ck_box7" name="service">뷰티/힐링
                                <input type="checkbox" id="ck_box8" name="service">제조/공예
                                <input type="checkbox" id="ck_box9" name="service">까페
                                <input type="checkbox" id="ck_box10" name="service">이벤트룸
                            </div>
                        </li>
                        <li><span>관심도시</span>
                            <select>
                                <option>시/도</option>
                            </select>
                            <select>
                                <option>군/구</option>
                            </select>
                            <button>추가</button>
                        </li>
                    </ul>
                </div><!--join_more_detail end-->
                <div class="joinFormBtn"><button>회원가입</button></div>
            </form><!--#join_user_box -->



        </div><!--#join_user_box -->
    </div><!--wiDTh1o24 -->
</div><!--fullContainer -->

    
<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>
</body>

<c:import url="/WEB-INF/view/template/js.jsp"></c:import>
<script src="js/joinformcheck.js"></script>
</html>
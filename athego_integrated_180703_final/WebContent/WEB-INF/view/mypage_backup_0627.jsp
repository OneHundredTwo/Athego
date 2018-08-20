<%@page import="org.apache.catalina.Session"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core_1_1" %>    
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	// 다른 유저의 페이지를 볼 때, MODEL_pageOwner 와 SESSION_loginUser값을 따짐.
	// model_po_follower, model_po_following, model_myfollower, model_myfollowing
	
	
	// 자기 페이지를 볼 때, SESSION_loginUser을 따짐.
	// model_myfollower, model_myfollowing
	
	
	// user를 가져올 때느
	// nickname, introduce, profile, cover, follower_cnt, following_cnt
	//최초에는 Model_review를 받음 
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title> ${pageOwner.nickname}님의 페이지 </title>
    <link rel="stylesheet" href="/css/reset.css"/>
    <link rel="stylesheet" href="/css/default.css"/>
    <link rel="stylesheet" href="/css/header.css"/>
    <link rel="stylesheet" href="/css/mypage2.css">
    <link rel="stylesheet" href="/css/fontawesome-all.css" />
    <link rel="stylesheet" href="/css/paginate.css" />
</head>
<body>
<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
<section id="custom_cover_area" style="background: url('/img/samp1.png') no-repeat center"><!-- 커버 영역 -->
            <div class="profileBundle">
                <ul>
                    <li id="_user_pic"><img src="/profile/avsav.png" alt="사진"></li>
                    <li id="_user_etc"><ul>
						<li id="_user_n"><c:choose>
                    			<c:when test="${pageOwner.no!=null}"><p>${pageOwner.nickname}</p><button id="myp_setting_btn"><i class="fa fa-cog"></i></button></c:when>
                    			<c:otherwise><p>${loginUser.nickname}</p><button id="follow_btn">팔로하기</button></c:otherwise>
                    	</c:choose><!--  
                        --></li>
                        <li id="_user_comt"><!--                   
                    	--><c:choose>
                    			<c:when test="${pageOwner.no!=null}"><p>${pageOwner.introduce}</p></c:when>
                    			<c:otherwise><p>${myCommt.introduce}</p></c:otherwise>
                    		</c:choose><!--  
                        --></li>
                    </ul></li>
                    <li id="_user_flw"><ul><!--                   
                    	--><li id="_follower"><!--
							--><c:choose>
									<c:when test="${pageOwner.no!=null}">${pageOwner.followerCnt}</c:when>
									<c:otherwise>${loginUser.followerCnt}</c:otherwise></c:choose><!--
                 		--><br/></li>
                    		<li id="_following"><!--                   
                    		--><c:choose>
                    				<c:when test="${pageOwner.no!=null}">${pageOwner.followingCnt}</c:when>
                    				<c:otherwise>${loginUser.followingCnt}</c:otherwise>
								</c:choose><!--  
                    		--></li>
                    </ul></li>
                </ul>
            </div>
        </section>
        <section id="content_area">
            <div class="navBundle">
                <div class="mypNavBar">
                    <ul id="myp_nav_list">
                        <li id="_to_review" class="on">리뷰</li>
                        <li id="_to_rating">평점</li>
                        <li id="_to_picked">찜</li>
                        <li id="_to_myflag">등록한 놀곳</li>
                    </ul>
                    <div>
                        <form><fieldset>
                            <legend>개인페이지의 검색</legend>
                            <input type="text"><button type=button id="search_in_myp"><i class="fas fa-search"></i></button></fieldset>
                        </form>
                    </div>
                </div>
            </div><!-- 왼쪽영역
         --><div class="contentsBundle">
            <div class="contentsBox">
                <ul class="content" id="review_list">
                    <li data-reviewno="90">
                        <div class="reviewForm">
                            <h2>TITLE?</h2>
                            <div class="reviewEtc">
                                <span class="regdate">2018-06-12 14:50</span>
                                <div>
                                    <button class="likeBtn"><i class="fa fa-heart"></i></button>
                                    <button class="moreBtn" >...</button>
                                    <div><ul class="moreOptionList in_my_review" >
                                        <li>수정하기</li>
                                        <li>삭제하기</li>
                                    </ul></div>
                                    <!--
                                    <div><ul class="moreOptionList in_other_review" >
                                        <li>url복사하기</li>
                                        <li>신고하기</li>
                                    </ul></div>-->
                                </div>
                            </div><!-- 24시로 표기 -->

                            <div class="reviewContents">
                                동해물과 백두산이 마르고 닳도록<br/>
                                하느님이 보우하사 우리나라 만세.<br/>
                                무궁화 삼천리 화려강산<br/>
                                대한 사람, 대한으로 길이 보전하세.<br/>
                            </div>
                            <div class="reviewTags">
                                <span>#해시태그_해시태그</span> <span>#해시태그</span> <span>#해_시_태_그_</span>
                            </div>
                        </div>
                    </li>
                    <li data-reviewno="90">
                        <div class="reviewForm">
                            <h2>TITLE?</h2>
                            <div class="reviewEtc">
                                <span class="regdate">2018-06-12 14:50</span>
                                <div>
                                    <button class="likeBtn"><i class="fa fa-heart"></i></button>
                                    <button class="moreBtn" >...</button>
                                    <div><ul class="moreOptionList in_my_review" >
                                        <li>수정하기</li>
                                        <li>삭제하기</li>
                                    </ul></div>
                                    <!--
                                    <div><ul class="moreOptionList " >
                                        <li>url복사하기</li>
                                        <li>신고하기</li>
                                    </ul></div>-->
                                </div>
                            </div><!-- 24시로 표기 -->

                            <div class="reviewContents">
                                동해물과 백두산이 마르고 닳도록<br/>
                                하느님이 보우하사 우리나라 만세.<br/>
                                무궁화 삼천리 화려강산<br/>
                                대한 사람, 대한으로 길이 보전하세.<br/>
                            </div>
                            <div class="reviewTags">
                                <span>#해시태그_해시태그</span> <span>#해시태그</span> <span>#해_시_태_그_</span>
                            </div>
                        </div>
                    </li>
                    <li data-reviewno="90">
                        <div class="reviewForm">
                            <h2>TITLE?</h2>
                            <div class="reviewEtc">
                                <span class="regdate">2018-06-12 14:50</span>
                                <div>
                                    <button class="likeBtn"><i class="fa fa-heart"></i></button>
                                    <button class="moreBtn" >...</button>
                                    <div><ul class="moreOptionList in_my_review">
                                        <li>수정하기</li>
                                        <li>삭제하기</li>
                                    </ul></div>
                                    <!--
                                    <div><ul class="moreOptionList ">
                                        <li>url복사하기</li>
                                        <li>신고하기</li>
                                    </ul></div>-->
                                </div>
                            </div><!-- 24시로 표기 -->

                            <div class="reviewContents">
                                동해물과 백두산이 마르고 닳도록<br/>
                                하느님이 보우하사 우리나라 만세.<br/>
                                무궁화 삼천리 화려강산<br/>
                                대한 사람, 대한으로 길이 보전하세.<br/>
                            </div>
                            <div class="reviewTags">
                                <span>#해시태그_해시태그</span> <span>#해시태그</span> <span>#해_시_태_그_</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="content  on" id="rating_list">
                    <li><ul class="sortBar">
                        <li id="_align_new">최신순</li>
                        <li id="_align_good">호평순</li>
                    </ul></li>
                    <li class="reviewInMyp" data-reivew-no="20">
                        <div class="textedRating"><ul>
                            <li class="categoryImg" data-categoryNo="1"> </li><div>
                            <li class="placeName"> 놀 곳 이름 </li>
                            <li class="categoryTxt"> 오락 > 코인노래방 </li></div>
                            <button class="moreBtn">...</button>

                            <li class="ratingComment">
                                <p> 평점이들어갑니다 평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다  평점이들어갑니다 </p>
                            </li>
                            <li class="ratingTags">
                                <p>ddddd</p>
                            </li>
                        </ul></div><!--
                         --><div class="detailRating">
                        <ul>
                            <li class="totalRating"> ★ 4 / 5 </li>
                            <!--<li class="totalRating"> ★ 4 / 5 </li>-->
                        </ul>
                    </div>
                    </li>
                </ul>
                <ul class="content" id="picked_list">
                    <!--  <p>찜한곳<hr/></p>-->
                    <li class="nolgoCard" style="background: url('img/dog1.jpg') no-repeat center"><a href=""><div>
                        <h3>놀곳의 이름</h3>
                        <p>문화예술 > 가죽, 여성</p>
                        <p>서울특별시 관악구</p></div></a>
                    </li>
                    <li class="nolgoCard"><a href=""><div>
                        <h3>놀곳의 이름</h3>
                        <p id="category">문화예술 > 가죽, 여성</p>
                        <p id="location">서울특별시 관악구</p></div></a>
                    </li>
                    <li class="nolgoCard"><a href=""><div>
                        <h3>놀곳의 이름</h3>
                        <p>문화예술 > 가죽, 여성</p>
                        <p>서울특별시 관악구</p></div></a>
                    </li>
                </ul>
                <ul class="content" id="myflagged_list">
                	 <li class="nolgoCard"><a href=""><div>
                        <h3>놀곳의 이름</h3>
                        <p>문화예술 > 가죽, 여성</p>
                        <p>서울특별시 관악구</p></div></a>
                    </li>
                </ul>
                <ul class="content" id="following_list">
                    <li class="followCard" data-userid="">
                        <div class="flwImg"></div>
                        <div class="flwName">유저의 닉네임</div>
                        <button>팔로우</button>
                    </li>
                    <li class="followCard">
                        <div class="flwImg"></div>
                        <div class="flwName">유저의 닉네임</div>
                        <button>팔로우</button>
                    </li>
                    <li class="followCard">
                        <div class="flwImg"></div>
                        <div class="flwName">유저의 닉네임</div>
                        <button>팔로우</button>
                    </li>
                    <li class="followCard">
                        <div class="flwImg"></div>
                        <div class="flwName">유저의 닉네임</div>
                        <button class="flwed">팔로잉</button>
                    </li>
                </ul>
                <ul class="content" id="follower_list">
                    <li class="followCard">
                        <div class="flwImg"></div>
                        <div class="flwName">유저의 닉네임</div>
                        <button>팔로우</button>
                    </li>
                    <li class="followCard">
                        <div class="flwImg"></div>
                        <div class="flwName">유저의 닉네임</div>
                        <button class="flwed">팔로잉</button>
                    </li>
                </ul>
                <ul class="content" id="result_list">
                    <div class="resultTitle"><h2>검색 결과</h2><h3 class="chk" id="to_result_rt">리뷰(52)</h3><h3 class="" id="to_result_rv">평점(52)</h3></div>
                    <li class="resultItme inReview"><a href="">
                        <h3>제목이 나옵니다</h3>
                        <p>...리뷰내용이 나옵니다 아마도 본문에서 발췌된 혹은 태그가 나올것 같습니다 아무말이나 넣어보고 있는데 쓸말이 없네요 흑흑 ...</p>
                        <span>2018-02-02</span>
                    </a>
                    </li>
                    <li class="resultItme inRating">
                        <h3>놀곳이름</h3>
                        <span>평점으로 이동 > </span>
                    </li>
                </ul>
            </div>
        </div><!-- 오른쪽영역 -->
        </section>
<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>
<script src="/js/jquery.min.js"></script>
<script src="/js/underscore-min.js"></script>
<script src="/js/moment.js"></script>
<script src="/js/default.js"></script>
<script type="text/template" id="review_tmp">
<@ _.each(list, function(rv){@>
<li data-reviewno="<@=rv.no @>">
	<div class="reviewForm">
		<h2><@=rv.title @></h2>
		<div class="reviewEtc">
        	<span class="regdate"><@=rv.regdate @></span><!--2018-06-12 14:50-->
			<div>
				<button class="likeBtn"><i class="fa fa-heart"></i></button>
				<button class="moreBtn" >...</button>
				
<@ if(false) { @>
				<div><ul class="moreOptionList in_my_review" >
                	<li>수정하기</li>
                	<li>삭제하기</li>
                </ul></div>
<@ } else { @>                                   
                  <div><ul class="moreOptionList in_other_review" >
                       <li>url복사하기</li>
                      <li>신고하기</li>
                  </ul></div>
<@ } @>
			</div>
		</div><!-- 24시로 표기 -->
        <div class="reviewContents"><@=rv.content @></div>
		<div class="reviewTags">

<@ _.each(rv.tags, function(tag,index){@>
 		<span>#해시태그_해시태그</span> <span>#해시태그</span> <span>#해_시_태_그_</span>
<@});@>
		</div>
	</div>
</li>
<@});@>
<@=paginate @>
</script>
<script type="text/template" id="rating_tmp">
<@ _.each(list, function(rt,index){@>

<li class="reviewInMyp" data-reivew-no="<@=rt.no @>">
	<div class="textedRating"><ul>
		<li class="categoryImg" data-categoryNo="<@=rt.catgNo @>"> </li><div>
		<li class="placeName"><@=rt.nolgoName @></li>
		<li class="categoryTxt"<@=catg.Name @>|<@=subcatg.Name @><@=subcatg.Name @> .... <@=subcatg.Name @></li></div>
		<button class="moreBtn">...</button>

		<li class="ratingComment"><p><@=rt.content @></p></li>
		<li class="ratingTags"><p><@=rt.strTags @></p></li>
                        </ul></div><!--
                         --><div class="detailRating">
                        <ul>
                            <li class="totalRating"> ★ <@=rt.score @> / 5 </li>
                            <!--<li class="subRating"> ★ 4 / 5 </li>-->
                        </ul>
                        </div>
</li>
<@});@>
</script>
<script type="text/template" id="picked_tmp">
<@ _.each(list, function(){@>
<li class="nolgoCard" style="background: url('/img/<@=list.pitcures @>') no-repeat center"><a href=""><div>
                        <h3><@=list.name @></h3>
                        <p><@=list.catgName @> | <@=list.catgNames @></p>
                        <p><@=list.location @></p></div></a>
                    </li>
<@});@>
</script>
<script type="text/template" id="myflag_tmp">
<@ _.each(list, function(){@>
<li class="nolgoCard" style="background: url('/img/<@=list.pitcures @>') no-repeat center"><a href=""><div>
                        <h3><@=list.name @></h3>
                        <p><@=list.catgName @> | <@=list.catgNames @></p>
                        <p><@=list.location @></p></div></a>
                    </li>
<@});@>
</script>
<script type="text/template" id="follow_tmp">
/*
<@ _.each(list, function(){@>
<li class="followCard" data-userid="<@=list.no @>">
<div class="flwImg" style="background: url('/img/<@=list.profile @>') no-repeat center"></div>
                        <div class="flwName"><@=list.nickname @></div>

<@ if(true) { @>
	<@ if(list.AfollowB == 'Y')@>
                <button>언팔로우</button>
	<@} else if(list.AfollowB == 'N'){@>
				<button>팔로우</button>
	<@}@>
<@}@>
</li>
<@});@>*/
</script>
<script type="text/template" id="result_rv_tmp">
<@ _.each(list, function(){@>
	<li class="resultItme inReview"><a href="<@=list.nolgoNo @>">
		<h3><@=list.title @></h3>
		<p><@=list.content @></p>
		<span><@=list.regdate @></span>
	</a></li>
<@});@>
</script>
<script type="text/template" id="result_rtr_tmp">
<@ _.each(list, function(){@>
	<li class="resultItme inReview"><a href="<@=list.nolgoNo @>">
		<h3><@=list.title @></h3>
		<p><@=list.content @></p>
		<span><@=list.regdate @></span>
	</a></li>
<@});@>
</script> 
<script>
    var comment_limit = 1000;
    $('textarea[name=editor]').keyup(function() {});


    var $li_contentsBox=$(".contentsBox>ul");
    var $li_myp_nav_list=$("#myp_nav_list>li");
    var $likeBtn =$(".likeBtn");
    var $moreBtn =$(".moreBtn");
    var $_follower=$("#_follower");
    var $search =$("#search_in_myp");
    var $userpic = $("#_user_pic");
    var $profileBundle=$(".profileBundle");
  	var $followCard =$(".followCard");
    
    var $pageOwnerNo = ""; // 해당페이지의 유저넘버
    var $loginUserNo ="";  // 로그인자의 유저넘버
    
    var reviewTmp = _.template($("#review_tmp").html());
    var ratingTmp = _.template($("#rating_tmp").html());
    var pickedTmp = _.template($("#picked_tmp").html());
    var myflagTmp = _.template($("#myflag_tmp").html());
    //var followTmp = _.template($("#follow_tmp").html());
    //var resultTmp = _.template($("#result_rt_tmp").html());
    //var resultTmp = _.template($("#result_rv_tmp").html());
    
    $li_myp_nav_list.on("click",function () {

        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        $li_contentsBox.removeClass("on");
        if($(this).index()==0){
			$li_contentsBox.empty(); 
            $("#review_list").addClass("on");
            
             
            //남의페이지 일 때, pageOwnerNo 가 있을 때,
            //나의 페이지일떄는  pageOwnerNo 가 없음! 
            //남의 페이지면 url을 spilt 해와도 되지만
            //나의 페이진 경우 session에서 no를 갖고와야함.
            var $pathname = $(location).attr("pathname");
            var userNo=0;
            if($pathname=='/mypage'){
            	userNo = <%=(Integer)session.getAttribute("no")%> ;
            }
            else { userNo = $pathname.replace("/user/",""); }
           //    /ajax/user/{no}/review/{page}
          //*************************************************************
            $.ajax({
                url: "/ajax/user/"+userNo+"/review/1",
                dataType: "json",
                error: function (a, b, c) {
                    alert("서비스 점검중입니다.");
                },
                success: function (json) {
                	console.log(json);
                    $("#categoryKeyword").empty();
                    $(json).each(function () {
                            var markup = reviewTmp({
                            	"list": json.reviewList,
                            	"paginate": json.paginate
                            	});
                            $("#review_list").html(markup);
                            
                    });
                }
            });
          //*************************************************************
        }
        else if($(this).index()==1){
            $("#rating_list").addClass("on");
        }
        else if($(this).index()==2){
            $("#picked_list").addClass("on");
        }
        else{
        	$("#myflagged_list").addClass("on");
        }
    });
    $likeBtn.on("click",function () {
        $(this).toggleClass("on");
    });

    $moreBtn.on("click",function () {
        //all non
        var tmp = $(this).parent().children("div").children(".moreOptionList");
        var optbox = $(".reviewForm .moreOptionList.in_my_review");
        if(tmp.hasClass("on")){
            optbox.removeClass("on");
        }
        else {
            optbox.removeClass("on");
            tmp.addClass("on");
        }
        //$(this).parent().children("div").children(".moreOptionList").toggleClass("on");
    });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $profileBundle.on("click","#myp_setting_btn",function () {
        var $covarea = $("#custom_cover_area");
        var $li_user_etc = $("#_user_etc>ul");

        $("#_user_flw").addClass("nonv");
        var userName=$("#_user_n>p").text();
        $("#_user_n").empty();
        $("#_user_n").append("<input type='text' value='"+userName+"'></input>");
        var comment=$("#_user_comt>p").text();
        $("#_user_comt").empty();
        $("#_user_comt").append("<textarea rows=\"3\" cols=\"50\">"+comment+"</textarea>");
        $("#_user_etc").prepend("<button class=\"tmpButton cancelBtn\">취소</button>");
        $("#_user_etc").prepend("<button class=\"tmpButton saveBtn\">저장</button>");
        $("#_user_etc").prepend("<button class=\"tmpButton \" >커버이미지 변경<input type=\"file\" id=\"cover_img\" accept=\"image/*\"></button>");

        //$userpic.addClass("edt");
        $userpic.append("<label><input type=\"file\" id=\"profile_img\" accept=\"image/*><i class=\"far fa-image\"></i></label>");
        
    });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var defPic_cover =""; // 기존의 경로제외 파일명만 가져오기 
	var defPic_profile =""; // 기존의 경로제외 파일명만 가져오기 
	var newPic_cover = "";  //파일 하나라도 올린게 있으면 여기에 리사이징된 파일명 들어감.
	var newPic_profile = ""; //파일 하나라도 올린게 있으면 여기에 리사이징된 파일명 들어감.
	
    $profileBundle.on("click",".cancelBtn",function () {
    	if(newPic_cover!=""||newPic_profile!="") { // 하나라도 파일 올란간게 있으면
    		 $.ajax({
                url: "/ajax/photo/delete",
     			type : "post",
     			dataType : "json",
     			data : {"tmpCover":newPic_cover,"tmpProfile":newPic_profile},
                error: function (a, b, c) {
                     alert("더미사진(들)이 올라간 상태입니다. "+b);
                },
                success: function (json) {
                 	
                 	
                 	//defPic_profile 랑 defPic_cover 값으로 리턴해야함.
                	newPic_cover=""; // 빈값으로 초기화
                	newPic_profile = ""; // 빈값으로 초기화
                }
         	});
    	}
    	console.log("마이페이지 정보수정__취소 ");
    });
	
	$profileBundle.on('change', 'input[type="file"]', function() {
    	var data = new FormData();
    	var id=$(this).attr('id');
    	
    	if(id.equals("profile_img")){
    		var file = $(this).get(0).files[0];
    		data.append('upload', file);
    		data.append('folder', 'cover');
    		data.append('size', 180);
    		$.ajax({
                url: "/ajax/photo/profile",
    			type : "post",
    			dataType : "json",
    			data : data,
    			processData : false,
    			contentType : false,
                error: function (a, b, c) {
                    alert("플필사진이 정상적으로 업로드 되지 않았습니다._"+b);
                },
                success: function (json) {
                	newPic_profile=json.name;
    				$("#_user_pic>img").attr("src", "/profile/" + json.name);
                }
        	});
            console.log("플필사진업로드 및 임시갱신 완료");
    		 
    	}
    	else if(id.equals("cover_img")){
    		var file = $(this).get(0).files[0];
    		data.append('upload', file);
    		data.append('folder', 'cover');
    		data.append('size', 1024);
    		$.ajax({
                url: "/ajax/photo/cover",
     			type : "post",
     			dataType : "json",
     			data : data,
     			processData : false,
     			contentType : false,
                error: function (a, b, c) {
                     alert("커버사진이 정상적으로 업로드 되지 않았습니다._"+b);
                },
                success: function (json) {
                	newPic_cover=json.name;
                 	$covarea.css("background","url('/cover/"+ json.name+") no-repeat center"); 
                }
         	});
    		console.log("커버사진업로드 및 임시갱신 완료");
    	}
    	
    });    
    $profileBundle.on("click",".saveBtn",function () {
        $("#_user_flw").removeClass("nonv");
        var ed_userName=$("#_user_n>input[type=\"text\"]").val();
        var ed_comment=$("#_user_comt>textarea").val();
        var ed_profileImg = newPic_profile;
        var ed_coverimg = newPic_cover;
        
        // Txt내용 업로드_Ajax
        $.ajax({
                url: "/ajax/userTxtInfo",
                type:'post',
                dataType: "json",
                data : {
					"cover": ed_coverimg,
					"profile": ed_profileImg,
					"nickname" :ed_userName,
					"introduce":ed_comment
					
				},
                error: function (a, b, c) {
                    alert("내용이 정상적으로 업로드 되지 않았습니다.");
                },
                success: function (data) {
                
                	$("#_user_n").empty();
                    $(".tmpButton").remove();
                    $("#_user_n").append("<p>"+ed_userName+"</p><button id=\"myp_setting_btn\"><i class=\"fa fa-cog\"></i></button>");
                    $("#_user_comt").empty();
                    $("#_user_comt").append("<p>"+ed_comment+"</p>");

                    //$userpic.removeClass("edt");
                    
                	newPic_cover="";
                	newPic_profile = "";
                }
        });
        
    });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $search.on("click",function () {
    	var $keywd = $(".mypNavBar>div input[type=\"text\"]").val().trim(); 
        $li_contentsBox.removeClass("on");
        $li_myp_nav_list.removeClass("on");
        $(".resultTitle>h2").empty();
        
        $.ajax({
            url: "/ajax/user/1/search/rv",
            type:'post',
            dataType: "json",
            data : { "keyword" : $keywd },
            error: function (a, b, c) {
                alert("검색불가"+a+b+c);
            },
            success: function (json) {
                $(".resultTitle>h2").append( $keywd+"의 검색결과");
                
                $("#result_list").addClass("on");
            }
    	});
    });
    ///ajax/user/1/search/rt
    ///ajax/user/1/search/rv
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
    
    $("#_follower").on("click",function () {
        $li_myp_nav_list.siblings().removeClass("on");
        $li_contentsBox.removeClass("on");
      
        $.ajax({
            url: "/ajax/user/1/followers",
            dataType: "json",
            data : {"loginUserNo" : $loginUserNo },
            error: function (a, b, c) {
                alert("서비스 점검중입니다.");
            },
            success: function (json) {
                //리스트 받아온거 템플릿화 하면 됨. //모델은 다 만들어짐
                //#팔로워
            	$("#follower_list").addClass("on");
            }
        });
      
     
    });
    $("#_following").on("click",function () {
        $li_myp_nav_list.siblings().removeClass("on");
        $li_contentsBox.removeClass("on");
      
        $.ajax({
            url: "/ajax/user/1/followings",
            dataType: "json",
            data : { "pageOwnerNo" : $pageOwnerNo , "loginUserNo" : $loginUserNo },
            error: function (a, b, c) {
                alert("서비스 점검중입니다.");
            },
            success: function (json) {
            	//리스트 받아온거 템플릿화 하면 됨. //모델은 다 만들어짐
            	//#팔로잉 
            	$("#following_list").addClass("on");
            }
        });
    });
    
    
    $followCard.on("click","button.flwed",function(){
    	//비로그인자는 이쪽이 애당초 붙지않음.
    	var $pickedUser = $(this).data("userid");
    	$.ajax({
            url: "/ajax/user/unfollow",
            dataType: "json",
            data : { "pickedUser" : $pickedUser },
            error: function (a, b, c) {
                alert("서비스 점검중입니다.");
            },
            success: function (json) {
            	
            	 $(this).removeClass("flwed");
            	
            }
        });	
    });
    $followCard.on("click","button",function(){
    	//비로그인자는 이쪽이 애당초 붙지않음.
    	var $pickedUser = $(this).data("userid");
    	$.ajax({
            url: "/ajax/user/follow",
            dataType: "json",
            data : { "pickedUser" : $pickedUser},
            error: function (a, b, c) {
                alert("서비스 점검중입니다.");
            },
            success: function (json) {
            	
            	 
            	$(this).addClass("flwed");
            }
        });	
    });
    
    $(".resultTitle").on("click","h3",function(){
        if($(this).attr("id")=="to_result_rt"){
            $("#to_result_rt").addClass("chk");
            $("#to_result_rv").removeClass("chk");
        }
        else {
            $("#to_result_rv").addClass("chk");
            $("#to_result_rt").removeClass("chk");
        }
    });
</script>
</body>
</html>
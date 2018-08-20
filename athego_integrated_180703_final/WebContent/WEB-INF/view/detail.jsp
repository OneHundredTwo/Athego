<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>상세페이지</title>
<c:import url="/WEB-INF/view/template/link.jsp"></c:import>
<link rel="stylesheet" href="/css/detail.css?date=1806231" />
<link rel="stylesheet" href="/css/paginate.css?date=180622" />
<link rel="stylesheet" href="/css/slick.css" />
<link rel="stylesheet" href="/css/slick-theme.css" />
<link rel="stylesheet" href="/css/video-js.css" />
<link rel="stylesheet" href="/css/fontawesome-stars.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">
<link rel="stylesheet" href="/css/jquery.tag-editor.css">
<link rel="stylesheet" href="/css/billboard.css">
<link rel="stylesheet" href="/css/index_card.css" />
<link rel="stylesheet" href="/css/jqcloud.css" />
<style>
</style>
</head>
<body>
	<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
	<%-- content --%>
	<section id="img_slide_area">	
	<div class="imgSlide">
		<c:set var="pictures" value="${fn:split(nolgo.pictures,',')}" />
		<c:forEach items="${pictures }" var="picture">
			<img src="/img/${picture}" alt="PICTURE" onError="this.src='/img/def(1024x440).png';">				
		</c:forEach>		
	</div>
	<div class="arrowBtn left">
		<i class="fa fa-chevron-left" ></i>
	</div>
	<div class="arrowBtn right">
		<i class="fa fa-chevron-right"></i>
	</div>
	</section>
	<section id="simple_info_area">
	<ul>
		<!-- 여기에 없는 글자들은 전부 css의  before_after을 사용한 부분입니다. -->
		<!--  각 부분마다 input 박스를 넣고 아이디 안겹치게 잘 지정해주시면 될꺼같습니다. -->
		<li>
			<!-- 상세 페이지에서 나오게 할 찜 버튼-->			
			<c:choose> 
    			<c:when test="${isLike eq true}">
    				<div class="goBtn nolgo on" data-content_type="nolgo" data-content_no="${nolgo.no }">
						<i class="fas fa-heart"></i><span class="goCount nolgo">${likingCnt }</span>
					</div>
    			</c:when>
    			<c:otherwise>
        			<div class="goBtn nolgo" data-content_type="nolgo" data-content_no="${nolgo.no }">
						<i class="far fa-heart"></i><span class="goCount nolgo">${likingCnt }</span>
					</div>
    			</c:otherwise>
			</c:choose>
		</li>
		<li class="author">
			<div class="authorImg">
				<a target="_blank" href="/user/${user.no }"><img src="/img/${user.profile }" onError="this.src='/img/user.png';"/></a>
			</div>
			<div class="authorInfo">
				<a target="_blank" class="userName" href="/user/${user.no }">${user.nickname }</a>
			</div>
		</li>
		<li id="_name"><h2>${nolgo.name}</h2></li>
		<li id="_category"><h3>${nolgo.categoryName} > 
			<c:forEach items="${tags }" var="tag">
			 	<span>#${tag.content }</span>
			</c:forEach>
			</h3>
		</li>
		<li id="_address"><h3>${nolgo.address}</h3></li>
		<li id="_dayoff">${nolgo.offDay}</li>
		<li id="_op_time"><fmt:formatDate value="${nolgo.openTime}" pattern="a h" />시 ~ <fmt:formatDate value="${nolgo.closeTime}" pattern="a h" />시</li>		
		<c:set value="${fn:substring(nolgo.stayTime, 0, 2)}" var="stayHour"/>
		<li id="_stay_time"> <c:if test="${ stayHour > 0}"></c:if><fmt:parseNumber type="number" value="${stayHour}" />시간 ${fn:substring(nolgo.stayTime, 2, 4)}분</li>
		<li id="_phone"><i class="fas fa-phone"></i> ${nolgo.phone}</li>
		<li><div class="gab"></div></li>			
		<li id="_budget"><fmt:formatNumber type = "number" groupingUsed="true" value = "${nolgo.minBudget }" />원 ~ <fmt:formatNumber type = "number" groupingUsed="true" value = "${nolgo.maxBudget }" />원</li>
		<li>
			<ul id="option_price_list">
				<li data-optionNo="">
					<div>
						<div class="optionName">메뉴 모음</div>
						<div class="optionPrice"></div>
					</div>
				</li>
				<c:forEach items="${menues }" var="menu">
					<li data-optionNo="">
						<div>
							<div class="optionName">${menu.name}</div>
							<div class="optionPrice"><fmt:formatNumber type = "number" groupingUsed="true" value = "${menu.price }" />원</div>
						</div>
					</li>					
				</c:forEach>
			</ul>
		</li>
		<li id="_report">
			<button class="report" data-content_type="nolgo" data-content_no="${nolgo.no }">신고하기</button>
		</li>
		<li>
			<ul id="_facility_list">
				<c:forEach items="${convenients }" var="convenient">
					<li class="facilityBox">
						<span class="f${convenient.no }" title="${convenient.name }"></span>
					</li>				
				</c:forEach>					 
			</ul>
		</li>
		<li>
			<ul id="share_list">
				<li class="shareIcon" id="FaceBookBtn"><i
					class="fab fa-facebook-f"></i></li>
				<li class="shareIcon" id="TwitterBtn"><i class="fab fa-twitter"></i></li>
				<li class="shareIcon" id="InstargramBtn"><i
					class="fab fa-instagram"></i></li>
			</ul>
		</li>
	</ul>
	<div id="minimap_area">M A P</div>
	 
	<c:if test="${loginUser.no eq nolgo.userNo }">
		<div id="modify_btn"><a class="btn" href="/nolgo/modify/${nolgo.no }">수정</a></div>
	</c:if>
	</section>
	<section id="word_cloud">
		<div>
		</div>
	</section>
	<section id="info_area_navi">
	<ul>
		<li><a href="#" class="on" data-info_tab="detail_info">상세</a></li><!--
         --><li><a href="#" data-info_tab="rating">평점</a></li><!--
         --><li><a href="#" data-info_tab="review">리뷰</a></li>
	</ul>
	</section>
	<section id="detail_info_area">
	<div class="infoArea on" id="detail_info">
	${nolgo.content }
 
 	<!--  
		<div class="videoEntry youtube">
			<object width="860" height="484"
				data="https://www.youtube.com/embed/kKBndcp78NQ" type="text/html"
				frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
			</object>
		</div>
	-->
	</div>
	<!--//end detail_info-->
	<div class="infoArea" id="rating">
		<div id="summary_rate"></div>
		<div id="detail_rate">			
			<div class="chart">
				<div class="average">
					<div>
						<span>평균 평점</span>
						<div class="brWrapCover">
							<div>
								<span><i class="fas fa-star"></i></span>
								<span><i class="fas fa-star"></i></span>
								<span><i class="fas fa-star"></i></span>
								<span><i class="fas fa-star"></i></span>
								<span><i class="fas fa-star"></i></span>
							</div>			
						</div>						 
						<div class="brWrap">							
							<span><i class="fas fa-star"></i></span>
							<span><i class="fas fa-star"></i></span>
							<span><i class="fas fa-star"></i></span>
							<span><i class="fas fa-star"></i></span>
							<span><i class="fas fa-star"></i></span>								
							<span class="">
								<em class="">4</em>/5
							</span>							
						</div>
					</div>
				</div>
				<div id="rating_chart"></div>
			</div>
			<div class="wrapRatingForm">
				<form id="rating_form" method="post" action="/" >
					<fieldset>
						<legend>
							<span class="screen_out">평점 입력란</span>
						</legend>
						<div class="starScore">
							<select id="rating_option_list" name="score">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3" selected>3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>
						<div class="ratingSubmitBtn">
							<button type="submit">등록</button>
						</div>
						<div class="wrapCommentTextarea">
							<textarea name="content" row="1" cols="1" rows="1"
								class="inputTextarea"
								placeholder="간단한 코멘트를 남겨 주세요. 최대 한글 400자까지 가능합니다."
								maxlength="400"></textarea>
							<p class="textAreaLength">
								<em id="comment_cnt">0</em>/400
							</p>
						</div>
						<div class="wrapTag">
							<input type="text" name='tag'>
						</div>
					</fieldset>
				</form>
			</div>
			<div class="alignBundle">
				<button class="on">평점</button>				
				<button class="">등록일</button>
			</div>
			<ul class="ratingList">
				<!-- 구 모델
                    <li data-RateNo="20">
                        <div class="rateCard">
                            <div class="profileImg"></div>
                            <div class="ratedUserName">TAnDURIChiken...</div>
                            <div class="totalScore">4.5</div>
                            <div class="scoreBundle">
                                <!--<div data-ratetype="service"></div>-->
				<!--<div data-ratetype="price"></div>-->
				<!--</div>
                    <div class="comments">COOOMENNNNNNTOOOOOO</div>
                    <div class="hashTags">#nomore #Project #Eoooong</div>
                    <button><i class="fa fa-thumbs-up"></i>200</button>
                </div>
            </li>-->

			</ul>
		</div>
	</div>
	<div class="infoArea" id="review">
		<div></div>
		<div class="reviewWriteBtn">
			<button>
				<i class="fa fa-pencil"></i> 작성
			</button>
		</div>
		<ul class="reviewList">
			 
		</ul>
	</div>
	</section>
	<section class="recommendation_area_place_area">
       
	</section>
	<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>

	<!-- report dialog -->
	<div id="report_dialog" title="신고 하기" >
		<p class="reportTips">신고 사유를 간단히 입력해주세요</p>
		<form class="reportForm">
			<fieldset>
				<textarea name="content"  
					placeholder="욕설, 비방 등 불건전한 내용을 금지합니다."></textarea>

				<ul class="list_report">
					<li><i class="fa fa-check"></i>&nbsp; 허위신고일 경우, 신고자의 서비스 활동이
						제한될 수 있으니, 유의하시어 신중하게 신고해 주세요.</li>
					<li><i class="fa fa-check"></i>&nbsp; 신고해주신 내용은 운영정책 및 서비스 약관에
						따라 처리됩니다.</li>
					<li><i class="fa fa-check"></i>&nbsp; 명예훼손, 저작권 등 신고자의 권리가 침해된
						경우에는 <a href="https://cs.daum.net/redbell/top.html"
						class="link_center" target="_blank">권리침해 신고센터</a>로 문의해주세요.</li>
				</ul>

				<!-- Allow form submission with keyboard without duplicating the dialog button -->
				<input type="submit" tabindex="-1"
					style="position: absolute; top: -1000px">
			</fieldset>
		</form>
	</div>
	<!-- dialog end -->

	<!-- reviewEditor -->
	<div class="bodyCover reviewEditor">
		<!-- add on -->
		<div class="wrapReviewEditor">
			<div class="modalHeader">
				<h1 class="modalTitle">리뷰 작성</h1>
				<button class="close">
					<i></i>x
				</button>
			</div>
			<div class="modalBody">
				<form action="" id="review_form">
					<ul class="modalInputList">
						<li class="modalSpotInfo"><i class="fas fa-map-marker-alt"></i>&nbsp;${nolgo.name }</li>
						<li class="modalInputTitle"><input type="text" name="title" id=""
							placeholder="제목" maxlength="100" required/></li>
						<li class="modalInputContents"><textarea id="input_contents" name="content"
								placeholder="내용을 적어주세요"></textarea></li>
						<li class="modalInputTags"><i class="fas fa-hashtag"></i><input id="input_tags" name="tag"
								placeholder="내용을 적어주세요"></input></li>
					</ul>
					<button class="submit" type="submit">등록</button>
				</form>
			</div>
		</div>
	</div>
	<!-- 리뷰 상세-->
	<div class="bodyCover reviewDetail">
	</div>
	<!-- -->
	<script type="text/template" id="ratingTmpl">
    <@ _.each(list,function(rating){ @>
        <li data-user_no="<@=rating.userNo @>" class="facebookUser"><!-- 유저번호? 등록번호? -->
            <div class="rateCard">
                <div>
                    <div class="profileImg">
                       <a href="#"><img src="/img/<@=rating.profile @>"  onError="this.src='/img/user.png';"/></a>
                    </div>
                    <div class="ratedScore">
                        <i class="fa fa-star"></i>&nbsp<em><@=rating.score @></em><span>/5</span>
                    </div>
                </div>
                <div class="commentBallon">
                    <div class="nickName"><a href="#"><em><@=rating.nickname @></em></a></div>
                    <div class="regdate"><@=moment(rating.regdate).format('YY/MM/DD HH:mm') @></div>
                    <div class="report" data-content_type="rating" data-content_no=<@=rating.no @>><button>신고하기</button></div>
                    <div class="commentBox"><@=rating.content @></div>
                    <div class="hashTagBox">
						<@ _.each(rating.tags,function(tag){ @>
							<span><a href="/search/<@=tag.content @>">#<@=tag.content @></a> </span>	
						<@ }) @>
					</div>
					<@ if(loginUserNo == rating.userNo) { @>
					<button class="modifyBtn" data-no="<@=rating.no @>"><i class="fas fa-edit"></i></button>
                    <button class="deleteBtn" data-no="<@=rating.no @>"><i class="fas fa-times"></i></button>	
					<@ } @>				
                </div>
            </div>
        </li>
    <@ }) @>
<@=paginate @>
</script>
<script type="text/template" id="reviewTmpl">
    <@ _.each(list,function(review){ @>
        <li data-no="<@=review.no @>">
			<div class="reviewArea" >
				<!-- write a sroty 버튼이 있냐없냐 여부에 따라서 top:값이 달라집니다. -->
				<div class="titBar">
						<div class="authorImg">
							<a target="_blank"
								href="/myPage/user/c63980181b9fd970?active=myPlan"><img
								src="/img/<@=review.profile @>" onError="this.src='/img/user.png';"></a>
						</div>
						<div class="authorInfo">
							<a target="_blank" class="userName"
								href="/myPage/user/c63980181b9fd970?active=myPlan"><@=review.nickname @></a> <span
								class="regdate"><@=moment(review.regdate).format('YY/MM/DD HH:mm') @></span>
						</div>
						<div class="titRightInfo">
							<h1><@=review.title @></h1>
							<@ _.each(review.tags,function(tag){ @>
								<span><a href="/search/<@=tag.content @>">#<@=tag.content @></a> </span>	
							<@ }) @>
						</div>
						<div class="goBtn <@=review.isLike == true? 'on' : '' @>" data-content_type="review" data-content_no="<@=review.no @>">
							<i class="<@=review.isLike == true? 'fas' : 'far' @> fa-heart"></i><span class="goCount"><@=review.likeCnt @></span>
						</div>	
					</div>
					<!-- titBar -->

					<div class="spotContent ">
						 <@=review.content @>
					</div>
				</div>
			</li>
    <@ }) @>
<@=paginate @>
</script>
<script type="text/template" id="reviewDetailTmpl">
<div>
	<div class="reviewArea" data-no="<@=review.no @>" >
		<!-- write a sroty 버튼이 있냐없냐 여부에 따라서 top:값이 달라집니다. -->
		<div class="titBar">
			<div class="authorImg">
				<a target="_blank"
					href="/myPage/user/c63980181b9fd970?active=myPlan"><img
					src="/img/<@=review.profile @>"></a>
			</div>
			<div class="authorInfo">
				<a target="_blank" class="userName"
					href="/myPage/user/c63980181b9fd970?active=myPlan"><@=review.nickname @></a> <span
					class="regdate"><@=moment(review.regdate).format('YY/MM/DD HH:mm') @></span>
			</div>
			<div class="titRightInfo">
				<h1><@=review.title @></h1>
				<@ _.each(review.tags,function(tag){ @>
					<span><a href="/search/<@=tag.content @>">#<@=tag.content @></a> </span>	
				<@ }) @>
			</div>
			<div class="goBtn <@=review.isLike == true? 'on' : '' @>" data-content_type="review" data-content_no="<@=review.no @>">
				<i class="<@=review.isLike == true? 'fas' : 'far' @> fa-heart"></i><span class="goCount"><@=review.likeCnt @></span>
			</div>			
		</div>
		<div class="moreWrapper">
				<button class="moreBtn">
					<i class="fas fa-ellipsis-v"></i>
				</button>
				<ul class="subList reviewDropdownList">
					<@ console.log(loginUserNo); console.log(review.userNo); @>	
					<@ if(loginUserNo == review.userNo) { @>
					<li><button class="modify">수정하기</button></li>
					<li><button class="delete">삭제하기</button></li>
					<@ }; @>
					<li><button class="report" data-content_type="review" data-content_no=<@=review.no @>>신고하기</button></li>					
				</ul>
				<span></span>
		</div>
		<!-- titBar -->

		<div class="spotContent ">
			 <@=review.content @>
		</div>
	</div>
</div>			
</script>
	<c:import url="/WEB-INF/view/template/recomTmpl.jsp"></c:import>
	<c:import url="/WEB-INF/view/template/js.jsp"></c:import>
	<script
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2f7c350955a20559cfcb4fe15bd5160e"></script>
	<script src="/js/slick.js"></script>
	<script src="/js/video.js"></script>
	<script src="/js/jquery.barrating.js"></script>
	<script src="/js/jquery.caret.min.js"></script>
	<script src="/js/jquery-ui.min.js"></script>
	<script src="/js/jquery.tag-editor.min.js"></script>
	<script src="/js/d3.v4.min.js"></script>
	<script src="/js/billboard.js"></script>
	<script src="/js/ckeditor/ckeditor.js?date=1"></script>
	<script src="/js/jqcloud.js"></script>
	<script>
	var loginUserNo = '${loginUser.no}';
	var nolgoNo = '${nolgo.no}';
	var nolgoAvgScore = '${nolgo.avgScore}';
	var nolgoName = '${nolgo.name}';
	var nolgoAddress = '${nolgo.address}';
	var nolgoLat = '${nolgo.lat}';
	var nolgoLng = '${nolgo.lng}';
	var nolgoPicture = 	'${nolgo.pictures}'.split(',')[0];
	var nolgoRelInfo = '${nolgo.relInfo}';
	var recoms = ${recoms};
	var reviewList = [];
	var ratingList = [];
	var reviewPaginate = "";
	var ratingPaginate = "";
	
	var $body = $("body");
	var $reviewEditor = $(".bodyCover.reviewEditor");
	var $tag = $("input[name=tag]");
	var $review_form = $("#review_form");
	var $rating_form = $("#rating_form");
	
	$imgSlide = $('.imgSlide');
	$imgSlide.on('init', function() {
		$imgSlide.css({
          visibility: 'visible'
        });
	})
		/*상단 이미지 슬라이드*/
		$imgSlide.slick({
			infinite : true,
			slidesToShow : 1,
			slidesToScroll : 1,
			speed : 1500,
			nextArrow : $(".arrowBtn.right"),
			prevArrow : $(".arrowBtn.left"),
			autoplay : true,
			autoplaySpeed : 2000,
			dots : true
		});

		/* GO (좋아요) 관련*/
		var $goBtn = $(".goBtn");
		$body.on("click", ".goBtn",function() {
			if(loginUserNo.length === 0) {
				alert("로그인이 필요합니다.");
				return false;
			}
			console.log("goBtn");
			var contentType = $(this).data("content_type");
			var contentNo = $(this).data("content_no");
			
			var method = $(this).hasClass("on") == true ? "DELETE" : "POST";

			modifyGo(contentType, contentNo, method, $(this));
			
			return false;
		})
		
		// 비동기로 좋아요 관련 디비 수정
	 	function modifyGo(contentType, contentNo, method, $this) {
			console.log("loginUserNo",loginUserNo);						
			
			$.ajax({			
				url: '/ajax/' + contentType +'/' + contentNo + "/liking",
				type: method,
				success: function(data) {
					console.log(data);
					
					if ($this.hasClass("on")) {
						//go 해제
						$this.removeClass("on");
						$this.children("i").attr("class", "far fa-heart");
					} else {
						//go 등록
						$this.addClass("on");
						$this.children("i").attr("class", "fas fa-heart");
					}
					
					//좋아요 카운트 수정
					$this.children(".goCount").text(data);
					
					if(contentType == "review") {
						//리뷰에서 좋아요 누를때는 저장되어있는 리스트 갱신
						reviewList = _.map(reviewList, function (review) {
							if(review.no == contentNo) {
								review.isLike = !review.isLike;
								review.likeCnt = data;
							}
							return review;
						});//end map
						
						if ($(".bodyCover.reviewDetail").hasClass("on")) {
							var reviewTmpl = _.template($("#reviewTmpl").html());
							var markup = reviewTmpl({
								"list" : reviewList,
							    "paginate": reviewPaginate
							});	
							$('ul.reviewList').html(markup);
						}//end $(".bodyCover.reviewDetail").hasClass("on")
					}//end contentType compare 
				}
			});
		}

		/*지도 영역*/
		var container = document.getElementById('minimap_area'); //지도를 담을 영역의 DOM 레퍼런스
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center : new daum.maps.LatLng(nolgoLat, nolgoLng), //지도의 중심좌표.
			level : 4
		//지도의 레벨(확대, 축소 정도)
		};

		var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

		// 커스텀 오버레이에 표시할 내용입니다
		// HTML 문자열 또는 Dom Element 입니다
		var src = nolgoPicture != null ? nolgoPicture:'def(1024x440).png';
		src = /^http:/.test(src) ? src : "/img/" + src; 
		var content = '<div class="overlayInfo">';
		content += '    <a href="http://map.daum.net/?map_type=TYPE_MAP&q='+ nolgoName +'" target="_blank"><i class="fas fa-map-marker-alt"></i><span>'+ nolgoName +'</span></a>';
		content += '    <div class="desc">';
		content += '        <img src='+ src + '  alt="" onError="this.src=\'/img/def(1024x440).png\';">';
		content += '        <span class="address">' + nolgoAddress + '</span>';
		content += '    </div>';
		content += '</div>';

		// 커스텀 오버레이가 표시될 위치입니다
		var position = new daum.maps.LatLng(nolgoLat,
				nolgoLng);

		// 커스텀 오버레이를 생성합니다
		var mapCustomOverlay = new daum.maps.CustomOverlay({
			position : position,
			content : content,
			xAnchor : 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
			yAnchor : 1.1
		// 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
		});

		// 커스텀 오버레이를 지도에 표시합니다
		mapCustomOverlay.setMap(map);

		/*
		//http://docs.videojs.com/
		var options = {
			seeking : false
		};

		//비디오 플레이 영역
		var player = videojs('my_player', options, function onPlayerReady() {
			videojs.log('Your player is ready!');

			// In this context, `this` is the player that was created by Video.js.

			// How about an event listener?
			this.on('ended', function() {
				videojs.log('Awww...over so soon?!');
			});

			this.on('seeking', function() {
				videojs.log('seeking', this.currentTime());
			});

			this.on('seeked', function() {
				videojs.log('seeked');
			});
		});
		*/
		/* info area 네비탭 */
		var $info_area_navi_tab = $("#info_area_navi a");
		
		/* info area 내용 */
		var $infoArea = $(".infoArea");
		$info_area_navi_tab.on("click", function(e) {

			scrollTo("#info_area_navi");
			
			$info_area_navi_tab.removeClass("on");
			$infoArea.removeClass("on");
			var infoTab = $(this).data("info_tab");
			
			if (infoTab === "rating") {
				//평점탭 클릭시
				showRating();
			} else if (infoTab === "review") {
				//리뷰탭 클릭시
				showReview();
			}

			$(this).addClass("on");
			$("#" + infoTab).addClass("on");
			e.preventDefault();

		});

		/*평점 리스트 가짜 데이터*/
		var ratingList = [
				{
					"ratedScore" : 4,
					"nickname" : "가가멜르",
					"regdate" : "2018.06.12, 17:12",
					"img" : "got1.jpg",
					"socialIcon" : "iconFB",
					"comment" : "가나다라마바사아자가차f",
					"hashTag" : "#ABC #DFV #ZAGoshipDat"
				},
				{
					"ratedScore" : 2,
					"nickname" : "가가멜르",
					"regdate" : "2018.06.12, 17:12",
					"img" : "got2.jpg",
					"socialIcon" : "iconINSTA",
					"comment" : "서울대 입구역 라붐 아울렛 14층서울대 입구역 라붐 아울렛 14층서울대 입구역 라붐 아울렛 14층서울대 입구역 라붐 아울렛 14층서울대 입구역 라붐 아울렛 14층 서울대 입구역 라붐 아울렛 14층 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 서울대 입구역 라붐 아울렛 14층 서울대 입구역 라붐 아울렛 14층 서울대 입구역 라붐 아울렛 14층 서울대 입구역 라붐 아울렛 14층",
					"hashTag" : "#가수 #오오 #두두두"
				},
				{
					"ratedScore" : 5,
					"nickname" : "오랜만갑습니다.",
					"regdate" : "2018.06.12, 17:12",
					"img" : "got3.jpg",
					"socialIcon" : "iconTWEET",
					"comment" : "커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 서울대 입구역 라붐 아울렛 14층 서울대 입구역 라붐 아울렛 14층",
					"hashTag" : "#낙성대 #서울대입구 #짱짱"
				},
				{
					"ratedScore" : 2,
					"nickname" : "뱅뱅.",
					"regdate" : "2018.06.12, 17:12",
					"img" : "p1.jpg",
					"socialIcon" : "iconGO",
					"comment" : "커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 서울대 입구역 라붐 아울렛 14층 서울대 입구역 라붐 아울렛 14층",
					"hashTag" : "#낙성대 #서울대입구 #짱짱"
				} ]

		function showRating(url) {
			
			if (typeof url == 'undefined') {
				//페이징이 아닐때
				
				url = "/ajax/nolgo/" + nolgoNo + "/rating/1";
				
				// 평점 불러오기
				$('.chart .brWrapCover').css("width", ((nolgoAvgScore * 35)+2));
				$('.chart .brWrap em').text(nolgoAvgScore);
				
				// 평점 등록 옵션
				$('#rating_option_list').barrating("clear");
				$('#rating_option_list').barrating({
					theme : 'fontawesome-stars',
					onSelect : function(value, text, event) {
						if (typeof (event) !== 'undefined') {
							// rating was selected by a user
							console.log(event.target);
						} else {
							// rating was selected programmatically
							// by calling `set` method
							console.log('a');
						}
					}
				});//end 평점 등록 옵션

				//입력 정보 삭제
				$("#rating_form")[0].reset();
				$("#comment_cnt").text("0");
				
				//태그 삭제
				removeAllTags();
				
				//버튼 리셋
				$rating_form.find("button").text("등록");
			}//end if
			
			$.ajax({
				url : url,
				dataType : "json",				
				success : function(data) {
					console.log(data);
					ratingList = data.ratingList;
					ratingPaginate = data.paginate;
					
					var ratingTmpl = _.template($("#ratingTmpl").html());
					var markup = ratingTmpl({
						"list" : ratingList,
						"paginate": ratingPaginate
					});
					
					$('#detail_rate .ratingList').html(markup);
					
					getChart(data.chartData);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});//end ajax		
		}//end showRating
		
		//스크롤이동
		function scrollTo(element) {
			console.log("scrollTo");
			$('html, body').animate({
		        scrollTop: $(element).offset().top
		    }, 500);
		}//end scrollTo

		/*평점 차트*/
		function getChart(chartData) {
			
			var mCountList = ["m"];
			var wCountList = ["w"];
			_.each(chartData, function(each){
				mCountList.push(each.mCnt);
				wCountList.push(each.wCnt);
			})
			var chart = bb.generate({
				size : {
					height : 240,
					width : 800
				},
				data : {
					x : "x",
					columns : [ [ "x", 1, 2, 3, 4, 5 ],
						mCountList, wCountList ],
					type : "bar",
					axes : { m : "y2" , w : "y2" },
					labels : {
					      format: {
					          m: function(x) { return x + "명" },
					          w: function(x) { return x + "명" },
						}
					},
					names: {
						m : "남성",
						w : "여성"
					},
					colors: {
					   	m: "#0e2979",
						w: "#d676cfbd"
					}
				},
				legend : { show : false	},
				bar : {
					width : {
						ratio : 0.5
					}
				},
				axis : {					
					y : { show : false },
					y2 : { show : true }
				},
				bindto : "#rating_chart"
			});	
		}//end getChart		

		/*
		 * tag input https://goodies.pixabay.com/jquery/tag-editor/demo.html
		 * http://api.jqueryui.com/autocomplete/#option-source
		 */
		function createTagsForm (){
			 console.log("createTagsForm");
			$tag.tagEditor({
				initialTags: [''], // 초기 입력
				maxTags : 5,
				maxLength : 10,
				delimiter : ', ', /* space and comma */
				placeholder : '관련 태그를 입력 하세요',
				onChange : function(field, editor, tags) {
					console.log(tags);
					//console.log(field);
				},
				beforeTagSave : function(field, editor, tags, tag, val) {

					// $('#response').prepend('Tag ' + val + ' saved' + (tag ? ' over ' +
					// tag : '') + '.');
					// 특수문자를 제외하고 태그를 반환 하도록
					var replace = val.replace(/[^a-z0-9ㄱ-힣]/gi, '');
					if (replace.length > 0) {
						console.log(replace);
						//getTagIdOrInsert(replace);

						return '#' + replace;
					} else {
						return false;
					}

				},
				beforeTagDelete : function(field, editor, tags, val) {
					// 삭제된 태그는 인풋에서 제외
					$.each($('input[name=tags]'), function(idx) {
						console.log(idx, $('input[name=tags]')[idx]);
						var $thisTagInput = $($('input[name=tags]')[idx]);
						if ($thisTagInput.data('tag') == val) {
							$thisTagInput.remove();
						}
					})
				},
				autocomplete : { // 자동 완성
					delay : 500, // show suggestions immediately
					position : {
						collision : 'down'
					}, // automatic menu position up/down / flip
					source : function(request, response) {
						console.log("request", request);
						$.ajax({
							url : "/ajax/getTagList.json",
							dataType : "json",
							data : {
								"name" : request.term
							},
							success : function(data) {
								console.log(data);
								// 입력한 태그가 포함된 단어를 검색하여 리턴 받고
								// 자동완성 창에 보여준다
								/*
								 * var matcher = new RegExp("^" +
								 * $.ui.autocomplete.escapeRegex(request.term), "i");
								 * response($.grep(data, function(item) { return
								 * matcher.test(item.name); }).slice(0, 10));
								 */
								var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
								response($.grep(data, function(item) {
									//console.log(item);
									return matcher.test(item);
								}).slice(0, 10));

								/*
								// 태그 테이블 리스트 중에서 네임만 골라서 자동 완성 되도록
								var tags = $.map(data, function(item) {
								    console.log(item.name);
								    return item.name
								});
								console.log(tags);
								response(tags);
								 */
							},
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(textStatus);
							}
						});
					}, // end source
					open : function(event, ui) {
						$(this).autocomplete("widget").width("300px");

					}, // end open
					create : function() {
						// access to jQuery Autocomplete widget differs depending
						// on jQuery UI version - you can also try .data('autocomplete')
					}// end create
				}// end autocomplete			
			});
		 }//end createTagsForm();
		 createTagsForm();
		 
		/*평점 코멘트 */
		var $comment_cnt = $("#comment_cnt");
		$body.on("change keyup paste propertychange input focus",".wrapCommentTextarea .inputTextarea", function(object) {
			var textLength = this.value.length;
			console.log(textLength);
			if (textLength > 400) {
				// Split the string on first 200 words and rejoin on spaces
				var trimmed = $(this).val().split(/\s+/, 400).join(" ");
				// Add a space at the end to make sure more typing creates new words
				//console.log(trimmed);
				//$(this).val(trimmed + " ");
			} else {
				$comment_cnt.text(textLength);
			}

			$(this).height(1).height($(this).prop('scrollHeight') - 16);
		});

		//평점 등록 및 수정
		$body.on("submit", "#rating_form", function (e) {
			if(loginUserNo.length === 0) {
				alert("평점을 등록하시려면 로그인이 필요합니다.");
				return false;
			}
			e.preventDefault();
			console.log("평점이 작성 될때");			
			
			var $inputTag = $("#rating_form input[name=tag]");
			var tmptags = $inputTag.tagEditor('getTags')[0].tags;
			
			//해시태그에서 샵 제거
			var tags = $.map(tmptags, function(tag) {			    
			    return tag.replace('#', '');
			});
			
			$inputTag.val(tags);
			
			//인풋 데이터 직렬화
			var formData = $(this).serialize();
			var method = $(this).attr("method");
			var url = "/ajax/nolgo/" + nolgoNo + "/rating";
			if(method == "put") {
				url = "/ajax/rating/" + $(this).data("no");
				var tmpData = {
						score : $("#rating_option_list").val(),
						content : $(".wrapCommentTextarea textarea[name='content']").val(),
						tags : tags
				};
				
				formData = JSON.stringify(tmpData);
			}
			
			console.log(formData);
			
			$.ajax({
				url: url,
				data: formData,
				type: method,
				error: function (xhr, err, code) {
					alert(err);
				},
				success: function (data) {
					console.log(data);
					if(!data.isSucc && method == "post") {
						alert(data.msg);
					} else {
						showRating();
						setTimeout(function(){ getRelInfo(); }, 3000);
					}
					//showRating();					
				}
				 
			});//$.ajax() end						
		})//end
		
		//평점 삭제하기
		$body.on("click", ".ratingList .deleteBtn" , function() {			
			var no = $(this).data("no");
			 if(confirm("삭제 하시겠습니까?")) {
				 $.ajax({
						url: "/ajax/rating/" + no,
						type: "delete",
						error: function (xhr, err, code) {
							alert(err);
						},
						success: function (data) {
							console.log(data);
							showRating();					
						}						 
				});//$.ajax() end
		     }
		});//end click delete
		
		//평점 수정버튼 클릭
		var $ratingInputContent = $(".wrapCommentTextarea .inputTextarea");		
		$body.on("click", ".ratingList .modifyBtn" , function() {			
			var no = $(this).data("no");
			scrollTo("#info_area_navi");
			var rating = _.findWhere(ratingList, {no: no});
			console.log(rating);
			
			//평점 로드
			$('#rating_option_list').barrating('set', rating.score);
			
			//태그 로드
			_.each(rating.tags, function(each, index){
				$tag.tagEditor('addTag', each.content);	
			});
			
			//내용 로드
			$ratingInputContent.val(rating.content);
			$ratingInputContent.focus();
			
			//등록버튼 수정버튼으로 변경
			$rating_form.find("button").text("수정");
			//메서드 변경
			$rating_form.attr("method", "put");
			//평점 번호 설정
			$rating_form.data("no", rating.no);
		});//end click modify
		
		
		//신고하기
		var reportForm = $(".reportForm");
		var report_dialog = $("#report_dialog");
		$body.on("click", ".report", function() {
			if(loginUserNo.length === 0) {
				alert("신고를 작성하시려면 로그인이 필요합니다.");
				return false;
			}
			var contentType = $(this).data("content_type");
			var contentNo = $(this).data("content_no");
			
			report_dialog.dialog({
				autoOpen : true,
				height : 400,
				width : 796,
				modal : true,
				buttons : {
					"신고하기" : function() {
						console.log("report submit");
						if(confirm("신고 하시겠습니까?")) {
							$.ajax({
								url: "/ajax/" + contentType + "/" + contentNo + "/" + "report",
								type: "post",
								data: reportForm.serialize(),
								error: function (xhr, err, code) {
									alert(err);
								},
								success: function (data) {
									console.log(data);
									alert("신고 접수가 완료 되었습니다.");
									report_dialog.dialog("close");
								}						 
							});//$.ajax() end
						}//end if confirm						
					}//submit
					/* ,
					"취소" : function() {
						report_dialog.dialog("close");
					} */
				},
				close : function() {
					reportForm[0].reset();
				}
			});
		})
 
		////////////////////////review
		//리뷰탭 클릭시
		function showReview(url) {
			if (typeof url == 'undefined') {
				url = "/ajax/nolgo/" + nolgoNo + "/review/1";
			}
			$.ajax({
				url : url,
				dataType : "json",				
				success : function(data) {
					console.log(data);
					reviewList = data.reviewList;
					reviewPaginate = data.paginate;
					
					var reviewTmpl = _.template($("#reviewTmpl").html());
					var markup = reviewTmpl({
						"list" : reviewList,
					    "paginate": reviewPaginate
					});

					$('ul.reviewList').html(markup);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus);
				}
			});//end ajax

		}//end showReview
		
		//리뷰 paginate
		$body.on("click", '.ratingList>.paginate>a', function (e) {
			console.log("reviewList paginate");
			e.preventDefault();
			var url = $(this).attr("href");
			showRating(url);
			scrollTo("#info_area_navi");
		});
		
		//리뷰작성 버튼		
		$(".infoArea").on( "click", ".reviewWriteBtn button", function() {
			//텍스트 교체
			if(loginUserNo.length === 0) {
				alert("리뷰를 작성하시려면 로그인이 필요합니다.");
				return false;
			}
			$reviewEditor.find(".modalTitle").text("리뷰 등록");
			$reviewEditor.find("button.submit").text("등록");
			$review_form.data("method", "post");
			
			$reviewEditor.addClass("on");
			$("body").addClass("modalOpen").css("margin-right",	getScrollBarWidth() + "px");
		})

		//리뷰작성 닫기 버튼
		$(".close").on("click", function() {
			resetReviewEditor();
			closeBodyCover();
		})
		
		//팝업닫기
		function closeBodyCover() {
			$(".bodyCover.on").removeClass("on");
			$("body").removeClass("modalOpen").css("margin-right", "");
		}
		
		/*에디터 로드*/
		CKEDITOR.replace('input_contents', {
			"contentsCss" : "/css/detail.css"
		});
		
		//사용하지 않음
		var regex = new RegExp(/(^|\s|\<p>)(#[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+)/);
		CKEDITOR.instances['input_contents'].on('change', function() {
					
		});
		//사용하지 않음
		function setCkeditorData (data) {
			console.log("setCkeditorData");
			CKEDITOR.instances['input_contents'].setData(data);
		}
		
		//에디터에서 실시간 텍스트 변경
		/*
		CKEDITOR.instances['input_contents'].on( 'contentDom', function() {
			  CKEDITOR.instances['input_contents'].document.on('keyup', function(e) {
				  //스페이스바 키업
				  if(e.data.$.keyCode == 13 || e.data.$.keyCode == 32) {
					  console.log('key up');
					  var data = CKEDITOR.instances['input_contents'].getData();
						if(regex.test(data)) {
							var word = data.match(regex)[2];
							console.log(word);
							data = data.replace(regex, ' <a>'+ word + '</a> ');
							setCkeditorData(data);							 
						} else {
							console.log('aaa');
						}
				  }
			  });
	     });
		*/
		
		/*리뷰가 작성 될때*/		
		$body.on("submit", "#review_form", function (e) {
			console.log("리뷰가 작성 될때");
			//submit 이벤트 막기
			e.preventDefault();
			
			//에디터에 적어도 10글자 이상인지 검사
			var contentLength = CKEDITOR.instances['input_contents'].getData().replace(/<[^>]*>/gi, '').length;
			console.log("contentLength:", contentLength);
			if(contentLength < 10) {
				alert("리뷰를 남기시려면 최소 10글자 이상 입력 바랍니다.");
				return false;
			}			
			var tmptags = $(".reviewEditor input[name=tag]").tagEditor('getTags')[0].tags;
			//해시태그에서 샵 제거
			var tags = $.map(tmptags, function(tag) {			    
			    return tag.replace('#', '');
			});

			var reviewNo = $(this).data("review_no");
			var method = $(this).data("method");
			var formData = "";
			var url = "";
			
			if(method == "post") {
				url= "/ajax/nolgo/" + nolgoNo + "/review" ;
				
				$(".reviewEditor input[name=tag]").val(tags);
				//인풋 데이터 직렬화
				formData = $(this).serialize(); 
			} else {
				url= "/ajax/review/" + reviewNo ;
				//tags = tmptags.join().replace("/#/gi","");
				var tmpData = {
						title : $(".reviewEditor input[name=title]").val(),
						content : CKEDITOR.instances['input_contents'].getData(),
						tags : tags						
				}
				formData = JSON.stringify(tmpData);
			}
			
			console.log(method,":",formData,":",tags);
		
			$.ajax({
				url: url,
				data: formData,
				dataType : 'json',
				type: method,				
				error: function (xhr, err, code) {
					alert(err);
				},
				success: function (data) {
					console.log(data);
					closeBodyCover();
					showReview();	
					setTimeout(function(){ getRelInfo(); }, 3000);
				}
				 
			});//$.ajax() end
			
			//입력 정보 삭제			
			resetReviewEditor();
		})
		
		//입력 정보 삭제
		function resetReviewEditor () {
			CKEDITOR.instances['input_contents'].setData(" ");
			$review_form[0].reset();
			removeAllTags();
		}
		
		//태그 삭제
		function removeAllTags() {
			console.log("removeAllTags");
			$(".tag-editor").remove();
			
			/*
			var tags = $(element).tagEditor('getTags')[0].tags;
  			for (i = 0; i < tags.length; i++) {
    			$tag.tagEditor('removeTag', tags[i]);
  			}
  			$(element).tagEditor("destroy");
  			*/
			
			createTagsForm();			
  			
		}// end removeAllTags
		
		//리뷰 paginate
		$body.on("click", '.reviewList>.paginate>a', function (e) {
			console.log("reviewList paginate");
			e.preventDefault();
			var url = $(this).attr("href");
			showReview(url);
			scrollTo("#info_area_navi");
		});
		
		//리뷰 카드 클릭시		
		$body.on("click", '.reviewList>li', function () {
			console.log("reviewDetail");
			 var reviewNo = $(this).data("no");
			 var review;
			_.each(reviewList, function (each, index) {
				if (reviewNo == each.no) {
					review = each;
				}
			})
			$(".bodyCover.reviewDetail").addClass("on");
			//var review = $(this).data("review");
			
			var reviewDetailTmpl = _.template($("#reviewDetailTmpl").html());
			var markup = reviewDetailTmpl({
				"review" : review
			});
			
			$('.bodyCover.reviewDetail.on').html(markup);
			$("body").addClass("modalOpen").css("margin-right",	getScrollBarWidth() + "px");		
		});
		
		//리뷰 상세에서 더보기 버튼 클릭시
		$body.on("click", '.reviewArea .moreWrapper .moreBtn', function () {
			//리뷰 우측 더보기 버튼 내용 목록
			var $subList = $('.reviewArea .moreWrapper .subList');
			//리뷰 우측 더보기 버튼 내용 목록 삼각형 이미지
			var $spanTri = $('.reviewArea .moreWrapper span');
			
			if ($subList.is(":visible")) {
				$subList.hide();
				$spanTri.hide();
			} else {
				$subList.show();
				$spanTri.show();
			}
		  	return false;
		});
		
		//바디 클릭시에 더보기 내용 사라짐
		$body.on("click", function() {
			//리뷰 우측 더보기 버튼 내용 목록
			var $subList = $('.reviewArea .moreWrapper .subList');
			//리뷰 우측 더보기 버튼 내용 목록 삼각형 이미지
			var $spanTri = $('.reviewArea .moreWrapper span');
			
			if ($subList.is(":visible")) {
				$subList.hide();
				$spanTri.hide();
			}
		});
		
		//리뷰 더보기 수정하기
		$body.on("click", ".reviewDropdownList .modify" , function(e) {
			e.preventDefault();
			closeBodyCover();
			$reviewEditor.addClass("on");			
			$("body").addClass("modalOpen").css("margin-right",	getScrollBarWidth() + "px");

			var no = $(this).closest(".reviewArea").data("no");
			var review = _.findWhere(reviewList, {no: no});			
			
			//텍스트 교체
			$reviewEditor.find(".modalTitle").text("리뷰 수정");
			$reviewEditor.find("button.submit").text("수정");			
			$review_form.attr("data-review_no", no);
			$review_form.data("method", "put");
			
			//제목 로드
			$reviewEditor.find(".modalInputTitle>input").val(review.title);
			//내용 로드
			CKEDITOR.instances['input_contents'].setData(review.content);
			//태그 로드
			_.each(review.tags, function(each, index){
				$tag.tagEditor('addTag', each.content);	
			})
			
			return false;
		});//end click modify
		
		//리뷰 더보기 삭제하기
		$body.on("click", ".reviewDropdownList .delete" , function(e) {
			e.preventDefault();
			var no = $(this).closest(".reviewArea").data("no");
			 if(confirm("삭제 하시겠습니까?")) {
				 $.ajax({
						url: "/ajax/review/" + no,
						type: "delete",
						error: function (xhr, err, code) {
							alert(err);
						},
						success: function (data) {
							console.log(data);
							closeBodyCover();
							showReview();					
						}						 
				});//$.ajax() end
		     }//end confirm
		});//click delete
				
		//최하단 추천 영역
		if(loginUserNo.length > 0) {
			$.ajax({
				url: "/ajax/nolgo/topten-for-userrecom",
				type: "get",
				error: function (xhr, err, code) {
					alert(err);
				},
				success: function (data) {
					console.log(data);
					//var noArray = $.map(data, function(val, i){ return val.nolgo.no;});
					//console.log("noArray:",noArray);
					
					//return gen_nums
					for (var i=0; i < 3; i++) {
						getRandom(data);
					}
					console.log(gen_nums);
					getRecoms(gen_nums);		
				}						 
		});//$.ajax() end
		} else {
			getRecoms(recoms);
		}
		function getRecoms(recomList) {
			var recomTmpl = _.template($("#user_recom_item_area_tmpl").html());
			$(".recommendation_area_place_area").append(recomTmpl({list:recomList}));
 
			$(".recommendation_area_place_area .nolGoItem").each(function(){
				var $ratingList = $(this).find(".averageRatingOptionList");
				$ratingList.barrating({
				    theme: 'fontawesome-stars',
				    initialRating: $ratingList.data("rating"),
				    readonly: true,
				    showSelectedRating:false
				})
			});
		} 
		
		function isAMPM(time) {
		    //시간에 따라 AM,PM 태그를 생성해서 반환하는 함수
		    time = moment(time, 'x').hour();
		    l(time);
		    if (time < 12) {
		       return "<span class='am'>AM</span>";
		    } else {
		       return "<span class='pm'>PM</span>";
		    }
		 }
		
	
	//
	function getRelInfo() {
		$.ajax({
			url: "/ajax/nolgo/" + nolgoNo,
			type: "get",
			error: function (xhr, err, code) {
				alert(err);
			},
			success: function (data) {
				console.log(data);
				generateWordCloud(data.nolgo.relInfo, true);					
			}						 
	});//$.ajax() end
	}
	//jqcloud
	function generateWordCloud(newRelInfo, isUpdate) {
		if(typeof newRelInfo != 'undefined' && newRelInfo.length > 0) {
		  var words = [];

			if(newRelInfo.includes(',')) {
				var relInfos = newRelInfo.split(',');
				console.log("relInfos", relInfos);
				$.each(relInfos, function(idx, value) {
					//console.log("value", value);
					var word = value.split(':')[0];
					var count = parseInt(value.split(':')[1]) * 5;
					words.push({
						text: value.split(':')[0], 
						weight: word.length == 2 ? count - 4 : count
					});//end push
				});//each
				console.log("words", words);
				
				if(isUpdate) {
					$('#word_cloud>div').jQCloud('update', words);
				} else {
					$('#word_cloud>div').jQCloud(words, {
						  delay: 50
				    });
				} 
			} else {
				console.log("x");
				
			}//end if 
		}//end if nolgoRelInfo > 0
	}//end genrateRelInfo
	
	generateWordCloud(nolgoRelInfo, false); 
	
	</script>
</body>
</html>
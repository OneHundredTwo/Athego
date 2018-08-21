<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%-- Writer___________B__180615  --%>
<!DOCTYPE html >
<html>
<head>
<meta charset="UTF-8">
<title>${searchParams.keyword }검색 결과 - AtheGo?</title>
<c:import url="/WEB-INF/view/template/link.jsp"></c:import>

<!-- minimap 관련 css-->
<link rel="stylesheet" href="/css/minimap.css" />
<link rel="stylesheet" href="/css/detail.css" />
<!--검색 결과 페이지 관련 css-->
<link rel="stylesheet" href="/css/searchList.css" />
<link rel="stylesheet" href="/css/fontawesome-stars.css" />


<!-- 다른 css에서 정의한 css를 이 페이지에서만 다르게 보일경우 재정의하는 부분-->
<style>
/*fontawesome-stars.css*/
.br-theme-fontawesome-stars .br-widget a {
	font: normal normal normal 13px 'Font Awesome\ 5 Free';
}
/*detail.css*/
.br-theme-fontawesome-stars .br-widget a.br-active:after,
	.br-theme-fontawesome-stars .br-widget a.br-selected:after {
	line-height: 16px;
}
/*mini_map.css*/
#minimap_area {
	width: 250px;
	min-height: 250px;
}
/* 지역 <-> 맵은 시간남으면 하는걸로 */
.mapWrapper {
	display: none;
}

.reviewDetail .moreWrapper {
	display: none;
}

.reviewArea .goBtn {
	float: right;
}
</style>
</head>
<body>
	<c:import url="/WEB-INF/view/template/header.jsp"></c:import>

	<!-- 1.필터링 컴포넌트 -->
	<section id="filters">
		<form id="search_form" action="/search" method="GET">
			<div id="search_keywords" class="row">
				<input type="text" id="keyword" name="keyword"
					value="${searchParams.keyword }" />
				<div id="filter_keywords">
					<span id='locationFilterKeyword'></span>
				</div>
				<button id="btn_search">
					<i class="fa fa-search"></i>
				</button>
			</div>
			<div id="search_filters" class="row filter">
				<!--<span id="filters_title">세부검색</span>-->
				<div class="left filtersWrapper ">
					<div id="location_filter" class="row">
						<span class="filterName">위치</span>
						<div id="_address">
							<select class="addressSelector" name="depth1Code" id="depth1Code">
								<option class="defaultOption" value="0"<c:if test="${searchParams.depth1Code==0 }">selected</c:if><%----%>>도/특별시</option>
								<optgroup label="도/특별시">
									<%--답은 display:none과 disabled를 제거하는 것이여따 --%>
									<option value="0">전국</option>
									<c:set var="selectedDepth1" />
									<c:forEach items="${depth1List }" var="depth1">
										<option value="${depth1.depth1Code }"<c:if test="${searchParams.depth1Code == depth1.depth1Code }">
										${selectedDepth1 = depth1}
										selected
									</c:if><%----%>>${depth1.depth1}</option>
									</c:forEach>
								</optgroup>
							</select> <select class="addressSelector" name="depth2Code"
								id="depth2Code">

								<option class="defaultOption" value="0"<c:if test="${searchParams.depth2Code==0 }">selected</c:if><%----%>>시/군/구</option>
								<optgroup label="시/군/구">
									<c:if test="${searchParams.depth2Code != 0}">
										<option value="0">${selectedDepth1.depth1}전체</option>
									</c:if>
									<c:set var="selectedDepth2" />
									<c:forEach items="${depth2List }" var="depth2">
										<option value="${depth2.depth2Code }"<c:if test="${searchParams.depth2Code == depth2.depth2Code }">
									${selectedDepth2 = depth2}
									selected
									</c:if><%----%>>${depth2.depth2}</option>
									</c:forEach>
								</optgroup>
							</select>
							<script type="text/template" id="depth2Tmpl">
							<@if(depth1!=0){@><option value="0"><@=$depth1Code.find('option:selected').text()@><@}@> 전체</option>
							<@_.each(locations, function(location){@>
								<option value="<@=location.depth2Code@>"><@=location.depth2@></option>
							<@});@>
						</script>
							<select class="addressSelector" name="depth3Code" id="depth3Code">
								<option class="defaultOption" value="0"<c:if test="${searchParams.depth3Code==0 }">selected</c:if><%----%>>읍/면/동</option>
								<optgroup label="읍/면/동">
									<c:if test="${searchParams.depth3Code != 0}">
										<option value="0">${selectedDepth2.depth2}전체</option>
									</c:if>
									<c:forEach items="${depth3List }" var="depth3">
										<option value="${depth3.depth3Code }"
											<c:if test="${searchParams.depth3Code == depth3.depth3Code }">selected</c:if>><%----%>${depth3.depth3}</option>
									</c:forEach>
								</optgroup>
							</select>
							<script type="text/template" id="depth3Tmpl">
							<@if(depth2!=0){@><option value="0"><@=$depth2Code.find('option:selected').text()@> 전체</option><@}@>
							<@_.each(locations, function(location){@>
								<option value="<@=location.depth3Code@>"><@=location.depth3@></option>
							<@});@>
						</script>
						</div>
					</div>
					<div id="categories_filter" class="row filter">

						<span class="filterName">장소 카테고리</span>
						<ul>
							<c:forEach items="${categories }" var="category">
								<li class="categoryItem"><input type="checkbox"
									value="${category.no }" name="categories"
									<c:forEach items="${searchParams.categories}" var="catNo">
									<c:if test="${category.no==catNo }">checked</c:if>
								</c:forEach> />
									<label><span title="${category.name}"
										class="cat${category.no }"></span></label></li>
							</c:forEach>

						</ul>
					</div>
					<div id="convenients_filter" class="row filter">
						<span class="convenientName">편의시설</span>

						<ul>
							<c:forEach items="${convenients}" var="convenient">
								<li class="convenientItem"><input type="checkbox"
									value="${convenient.no }" name="convenients"
									<c:forEach items="${searchParams.convenients}" var="convNo">
									<c:if test="${convenient.no==convNo }">checked</c:if>
								</c:forEach> />
									<label><span title="${convenient.name }"
										class="conv${convenient.no }"></span></label></li>
							</c:forEach>
						</ul>
					</div>
					<div id="price_range_filter" class="row filter">
						<c:set var="maxBudgetValue"
							value="${searchParams.maxBudget<0?'':searchParams.maxBudget}" />
						<span class="filterName">가격대</span> <input type="text"
							id="min_budget" placeholder="최소가격" name="minBudget"
							value="${searchParams.minBudget<0?'':searchParams.minBudget }" />원
						~ <input type="text" id="max_budget" placeholder="최대가격"
							name="maxBudget" value="${maxBudgetValue }" />원
					</div>
				</div>
				<div class="left mapWrapper">
					<div id="map_area">
						<div id="minimap_area">M A P</div>
						<span class="map_info map_info_first">주소를 모르신다구요?</span> <span
							class="map_info map_info_second">지도에서 원하는 위치를 클릭하세요!</span>
						<div id="clickLatlng"></div>
					</div>
				</div>
			</div>
			<button type="button" id="btn_show_filters" class="down">
				<span>필터 펼치기</span> <i class="fas fa-angle-down"></i>
			</button>
		</form>
	</section>
	<!-- 2.놀곳 검색결과 리스트 -->
	<section id="nolgo_list_area" class="searchListArea">

		<div class="searchResultTitleBundle">
			<span class="searchItemName">놀GO</span> <span class="totItems"><strong>0</strong>개의
				검색 결과</span>
		</div>
		<div class="searchResultFrame horizontal" data-type="nolgo">
			<div class="leftRightBtnBox">
				<button class="left">
					<i class="fas fa-angle-left"></i>
				</button>
				<button class="right">
					<i class="fas fa-angle-right"></i>
				</button>
			</div>
			<!-- little_show = j : 빼꼼히 보이는 width값-->
			<div class="noShowBox">
				검색된 놀Go가 없습니다ㅠㅠ
				<!--  놀Go를 등록해보시겠어요? <a class="nolgoBtn" href="/nolgo/register">놀Go 등록하기</a> -->
			</div>
			<ul class="leftList" data-little_show="50">


			</ul>
			<script type="text/template" id="nolgo_item_tmpl" class="tmpl">
                        <@_.each(list,function(nolgoItem){
							var nolgo = nolgoItem.nolgo;
							var nolgoConvenients = nolgoItem.nolgoConvenients;
							var location = nolgoItem.location;
							@>
                            <li class="searchItem nolGoItem shutterable" data-id="<@=nolgo.no@>">
                                <a href="/nolgo/<@=nolgo.no@>">
                                    <!--nolgo 상세페이지 링크 -->
                                    <div class="imgBox">
                                    	<@ var src = nolgo.pictures!=null?nolgo.pictures.split(',',1):'def(1024x440).png'; @>
										<@ src = /^http:/.test(src) ? src : "/img/" + src; @>
                                    	<img class="nolGoImg" src="<@=src@>" onError="this.src='/img/def(1024x440).png';"/>
									</div>
                                    <div class="infoBundle">
                                        <span class="cntGo" title="Go수">
                                        <@if(nolgo.isGoCheck){@>
                                            <i class="fas fa-heart"></i>
                                        <@}else{@>
                                            <i class="far fa-heart"></i>
                                        <@}@>
                                        <@=nolgo.goCnt@>
                                    </span>
                                        <div class="basicInfoBox">
                                            <div class="catImg">
                                                <img src="img/cat_<@=nolgo.categoryNo@>.png" />
                                            </div>
                                            <div class="basicTextInfo">
                                                <div class="row nolgoName">
                                                    <span><@=nolgo.name@></span>
                                                </div>
                                                <div class="row nolgoLocation">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                    <span><@=location.depth1@> <@=location.depth2@></span>
                                                </div>
                                                <div class="row nolgoSubCategories">
                                                    <span class="relInfos decoable">
                                            <@ var relInfo = nolgo.relInfo == null ? '': nolgo.relInfo; @>
													<@ relInfo = relInfo.replace(/:\w+ */g,""); @>
													<@ relInfo = relInfo.replace(/, */g , ""); @>
													<@ var cutLength = relInfo.length < 20 ? relInfo.length : 20; console.log('cutLength:',cutLength); @>
													<@ relInfo = relInfo.substring(0, cutLength); @>
													<@=relInfo@>
                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="shutterInfoBox">
                                            <div class="row price">
                                                <i class="fas fa-dollar-sign"></i> 1인당 최소<span><@=nolgo.minBudget@></span>원 최대 <span><@=nolgo.maxBudget@></span>원
                                            </div>
                                            <div class="row facilityBox">
                                                <@for(var i in nolgoConvenients){@>
													<span class="f<@=nolgoConvenients[i].convenientNo@>"></span>
												<@}@>
                                            </div>
                                            <div class="row">
                                                <span>평점</span>
                                                <@ var score = Math.round(nolgo.avgScore);@>
                                                <select class="averageRatingOptionList" data-rating="<@=score@>">
                                                    <option value="1" <@=score==1?'selected':''@>>1</option>
                                                    <option value="2" <@=score==2?'selected':''@>>2</option>
                                                    <option value="3" <@=score==3?'selected':''@>>3</option>
                                                    <option value="4" <@=score==4?'selected':''@>>4</option>
                                                    <option value="5" <@=score==5?'selected':''@>>5</option>
                                                </select>
												<span class="ratingNumber"><@=nolgo.avgScore@></span>
                                            </div>
                                            <div class="row">
                                                <span class="operTime" title="영업시간">
                                        <span class="open">OPEN</span>
                                                <@=isAMPM(nolgo.openTime)@> <strong><@=moment(nolgo.openTime,"x").format("hh:mm")@></strong>
                                                    </span>
                                                    <span class="operTime" title="영업시간">
                                        <span class="close">CLOSE</span>
                                                    <@=isAMPM(nolgo.closeTime)@> <strong><@=moment(nolgo.closeTime,"x").format("hh:mm")@></strong>
                                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <@});@>
                    </script>
		</div>
	</section>
	<!-- 3.유저 검색 결과 리스트 -->
	<section id="user_list_area" class="searchListArea">
		<div class="searchResultTitleBundle">
			<span class="searchItemName">유저</span> <span class="totItems"><strong>${fn:length(userList)}</strong>개의
				검색 결과</span>
		</div>
		<div class="searchResultFrame horizontal" data-type="user">
			<div class="leftRightBtnBox">
				<button class="left">
					<i class="fas fa-angle-left"></i>
				</button>
				<button class="right">
					<i class="fas fa-angle-right"></i>
				</button>
			</div>
			<div class="noShowBox">
				검색된 유저가 없습니다ㅠㅠ
				<!--  놀Go를 등록해보시겠어요? <a class="nolgoBtn" href="/nolgo/register">놀Go 등록하기</a> -->
			</div>
			<ul class="leftList">
			</ul>
			<script type="text/template" id="user_item_template" class="tmpl">
                        <@_.each(list,function(userItem){
							var user=userItem;
							@>
                            <li class="searchItem userItem shutterable" data-no="<@=user.no@>">
                                <a href="/user/<@=user.no@>">
                                    <div class="userInfoBox">
                                        <div class="profileBox">
                                            <div class="profile">
                                                <div class="row">
                                                    <img class="imgUserProfile" src="/img/<@=user.profile@>" onError="this.src='/img/user.png';"/>
                                                </div>
                                                <div class="row">
                                                    <span class="nickname"><@=user.nickname@></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="textInfoBox">
                                            <div class="row icons">
                                                <span class="cntFollower" title="팔로워"><i class="imgIcon"></i> <@=user.followerCnt@></span>
                                                <span class="bar"></span>
                                                <span class="cntAddGo" title="등록한 놀GO"><i class="imgIcon"></i> <@=user.addNolgoCnt@></span>
                                                <span class="bar"></span>
                                                <span class="cntAddReview" title="작성한 리뷰"><i class="imgIcon"></i> <@=user.wrritenReviewCnt@></span>
                                            </div>
											<@ /* @>
                                            <div class="row relInfosBox"> 
                                                <p class="relInfos decoable">
                                                    #나중에#relInfo#넣을것
                                                </p>
                                            </div>
											<@ */ @>
                                            <div class="row introBox">
                                                <p>
                                                    <@=user.introduce@>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <@});@>
                    </script>
		</div>
	</section>
	<!-- 4.리뷰 검색 결과 리스트-->
	<!--review_list_area = c -->
	<section id="review_list_area" class="searchListArea">
		<div class="searchResultTitleBundle">
			<span class="searchItemName">리뷰</span> <span class="totItems"><strong>${fn:length(reviewList)}</strong>개의
				검색 결과</span>
		</div>
		<div Class="searchResultFrame vertical" data-type="review">
			<div class="noShowBox">
				검색된 리뷰가 없습니다ㅠㅠ
				<!--  놀Go를 등록해보시겠어요? <a class="nolgoBtn" href="/nolgo/register">놀Go 등록하기</a> -->
			</div>
			<ul class="topDown">
			</ul>
			<script type="text/template" id="review_item_template" class="tmpl">

                        <@_.each(list,function(reviewItem){
							
							var review = reviewItem.review;
							var tags = reviewItem.tags;
							reviewList.push(reviewItem); // 리뷰상세보기를 위한 글로벌 배열변수에 추가.

							@>
                            <@//미디어가 포함된 리뷰인지 확인하기위한 변수@>
                                <@ var contentInfo=getContentInfo(review.content);
                                var isMedia = contentInfo.isMedia; @>
                                    <li class="searchItem reviewItem <@if(isMedia){@>mediaReview<@}@>" data-no="<@=review.no@>">
                                        <span>
                                            <@if(isMedia){ //<!--이미지가 있는 리뷰만 추가되는 div-->
                                                @>
                                                <div class="previewImg">
                                                    <img src="<@=contentInfo.src@>" onError="this.src='/img/def(1024x440).png';"/>
                                                </div>
                                                <@}@>
                                                    <div class="basicInfoBox">
                                                        <div class="row nolgoInfoBox">
                                                            <i class="fas fa-map-marker-alt"></i> <span class="nolgoName"><@=review.nolgoName@></span>
                                                            <span class="relInfos right">
                                            <@for(var i in tags){@>#<@=tags[i].content@> <@}@>
                                        </span>
                                                        </div>
                                                        <div class="row writeInfoBox">
                                                            <span class="reviewTitle">
                                <@=review.title@>
                            </span>
                                                            <span class="bar"></span>
                                                            <i class="fas fa-user-circle"></i> <strong><@=review.wrriter@></strong> <span class="bar"></span> <span class="writeTime"><@=moment(review.regdate,'x').fromNow()@></span>
                                                        </div>
                                                        <div class="row previewBox decoable">

															<@ var tagContent = review.content; 
//console.log(tagContent);
															var newText = tagContent.replace(/(<([^>]+)>)/ig,"").replace(/&;/ig,"");
@>
                                                            <@=contentTextFormatting(newText,isMedia)@>
                                                        </div>
                                                    </div>
                                        </span>

                                    </li>
                                    <@});@>
                    </script>
			<!-- 리뷰 상세-->
			<div class="bodyCover reviewDetail"></div>
			<!-- -->
		</div>
		<script type="text/template" id="reviewDetailTmpl">
<@ 
	var review = reviewItem.review;
	var tags = reviewItem.tags;
	l(review);
@>

<div>
	<div class="reviewArea" data-no="<@=review.no @>" >
		<!-- write a sroty 버튼이 있냐없냐 여부에 따라서 top:값이 달라집니다. -->
		<div class="titBar">
			<div class="authorImg">
				<a target="_blank"
					href="/myPage/user/c63980181b9fd970?active=myPlan"><img
					src="/img/<@=review.writerProfile @>"></a>
			</div>
			<div class="authorInfo">
				<a target="_blank" class="userName"
					href="/myPage/user/c63980181b9fd970?active=myPlan"><@=review.wrriter @></a> <span
					class="regdate"><@=moment(review.regdate).format('YY/MM/DD HH:mm') @></span>
			</div>
			<div class="titRightInfo">
				<h1><@=review.title @></h1>
				<@ _.each(tags,function(tag){ @>
					<span><a href="/search/?keyword=<@=tag.content @>&minBudget=-1&maxBudget=-1">#<@=tag.content @></a> </span>	
				<@ }) @>
			</div>
			<div class="goBtn <@=review.isLike? 'on' : '' @>" data-type='<@=review.isLike@>' data-content_type="review" data-content_no="<@=review.no @>">
				<i class="<@=review.isLike? 'fas' : 'far' @> fa-heart"></i><span class="goCount"><@=review.likeCnt @></span>
			</div>			
		</div>
		<div class="moreWrapper">
				<button class="moreBtn">
					<i class="fas fa-ellipsis-v"></i>
				</button>
				
				<ul class="subList reviewDropdownList">
					<@if(loginUserNo == review.userNo){@>
						<li><button class="modify">수정하기</button></li>
						<li><button class="delete">삭제하기</button></li>
					<@}@>
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
							<li class="modalInputTitle"><input type="text" name="title"
								id="" placeholder="제목" maxlength="100" required /></li>
							<li class="modalInputContents"><textarea id="input_contents"
									name="content" placeholder="내용을 적어주세요"></textarea></li>
							<li class="modalInputTags"><i class="fas fa-hashtag"></i><input
								id="input_tags" name="tag" placeholder="내용을 적어주세요"></input></li>
						</ul>
						<button class="submit" type="submit">등록</button>
					</form>
				</div>
			</div>
		</div>

	</section>


	<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>
	<c:import url="/WEB-INF/view/template/js.jsp"></c:import>
	<script src="/js/jquery.barrating.js"></script>
	<!-- daum map api-->
	<script
		src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2f7c350955a20559cfcb4fe15bd5160e&libraries=services"></script>
	<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
	<script src="/js/daum_map.js"></script>
	<!--//daum map api-->
	<!--  header의 simpleSearch 칸 안보이게하는 스크립트 -->
	<script>
		$(".simpSearch").addClass("off");
	</script>
	<!--searchResultFrame 관련 스크립트 : 리스트 초기화, 리스트아이템 추가, 리스트 움직임 -->
	<script>
		//한칸 움직이는 단위 계산하는 함수
		var boxWidthAttrs = [ "width", "margin-left", "margin-right",
				"padding-left", "padding-right", "border-right-width",
				"border-left-width" ];
		var boxHeightAttrs = [ 'margin-top', 'margin-bottom', 'padding-top',
				'padding-bottom', 'border-top-width', 'border-bottom-width' ];

		function calcHorizontalWidth($li) {
			var boxWidth = 0;
			for ( var i in boxWidthAttrs) {
				boxWidth += delPx($li.css(boxWidthAttrs[i]));
			}
			return boxWidth;
		}

		function calcVerticalHeight($li) {
			var boxHeight = 0;
			var maxHeight = delPx($li.css('maxHeight'));
			var height = $li.height();
			if (maxHeight != 'none') {
				boxHeight += maxHeight;
			} else {
				boxHeight += height;
			}
			for ( var i in boxHeightAttrs) {
				boxHeight += delPx($li.css(boxHeightAttrs[i]));
			}
			return boxHeight;
		}

		function delPx(px) {
			if (px == null)
				return 0;
			return parseInt(px.substr(0, px.lastIndexOf('p')));
		}

		function moveHorizontalList(direction, listStatus, $list) {

			direction = direction == "left" ? 1 : -1;
			var unit = listStatus.moveUnit;
			var listLeft = delPx($list.css("left"));
			$list.css("left", (listLeft + (unit * direction)) + "px");

			listStatus.isClickable = false;
			setTimeout(function() {
				listStatus.isClickable = true;
			}, listStatus.duration);
		}

		function initLists() {
			//length가 0이면 noShowBox가 보여지도록 함
			$(".searchResultFrame").each(function() {
				if ($(this).find("ul>li").length == 0) {
					$(this).find(".noShowBox").show();
				}
			});
			//list에 아이템들이 다 할당되고나서 수행(한번에 보여질 아이템 최대갯수는 설정해놔야할듯하다.)
			//list의 동작 초기화.(혹은 ajax로 갱신할때 적용해야할 동작함수)
			//1. searchResultFrame 중 가로방향으로 이동할 녀석들에 먼저 클릭이벤트 적용. 
			$(".searchResultFrame.horizontal")
					.each(
							function() {
								//1.한 번 클릭했을때 이동할 단위를 지정한다.
								//li의 가로박스모델 : width+margin-left/right+padding-left/right
								var $frame = $(this), $ul = $frame.find("ul");

								var $li = $frame.find("ul>li");

								if ($li.length != 0) {
									var moveUnit = calcHorizontalWidth($li);

									//2. li의 갯수 = n, 한 프레임에 보일 수 있는 li의 갯수 = m, list의 width 설정
									var n = $ul.find('.searchItem').length, m = Math
											.round($frame.width() / moveUnit);
									//화면 확대축소할때 뭔가 계산이 깨지는듯, 한 10px정도만 넉넉하게 잡아줌.
									$ul.width(n * moveUnit + 10);

									//3.left, right 버튼 보이기설정, 버튼 및 리스트 상태를 저장하는 객체 정의
									var listStatus = {
										isClickable : true,
										totRightClickCnt : 0,
										availableRightClickCnt : 0,
										page : 1,
										itemType : $frame.data('type'),
										totItemCnt : parseInt($ul.parent()
												.parent().find(
														".totItems strong")
												.text()),
										template : _.template($frame.find(
												".tmpl").html()),
										moveUnit : moveUnit,
										duration : 400
									};
									l(listStatus);
									//left, right 버튼
									var left = $frame
											.find(".leftRightBtnBox .left"), right = $frame
											.find(".leftRightBtnBox .right");
									//left는 초기상태 : hide
									//right의 초기상태는 리스트 크기에따라
									if (n > m) {
										right.show();
										//4.right가 보여지는 상황이면, 최대로 right버튼이 클릭될 수 있는 횟수 계산.
										listStatus.totRightClickCnt = n - m;
										listStatus.availableRightClickCnt = n
												- m;

										//5.버튼을 클릭했을 때 해당하는 ul을 이동단위로 움직인다.
										//right가 show인 상태에서만 클릭이벤트를 할당한다.

										left
												.on(
														"click",
														function() {
															if (listStatus.isClickable) {
																listStatus.availableRightClickCnt++;

																moveHorizontalList(
																		"left",
																		listStatus,
																		$ul);
																//맨왼쪽인경우 -> 오른쪽클릭가능횟수와 총 클릭횟수가 같을경우 left를 숨긴다.
																if (listStatus.availableRightClickCnt == listStatus.totRightClickCnt) {
																	left.hide();
																} else {
																	//left를 눌렀을때 availableRightClickCnt가 0인경우는 없으니까
																	//right을 show한다.
																	right
																			.show();
																}
															}
														});
										right
												.on(
														"click",
														function() {
															if (listStatus.isClickable) {
																listStatus.availableRightClickCnt--;
																moveHorizontalList(
																		"right",
																		listStatus,
																		$ul);
																//맨오른쪽인경우 -> 오른쪽클릭가능횟수가 0이면 right를 숨긴다.
																if (listStatus.availableRightClickCnt == 0) {
																	right
																			.hide();
																} else {
																	//마찬가지로 right를 눌렀을때 availableRightClickCnt가 totRightClickCnt와 같은경우는 없으니까
																	//right을 show한다.
																	left.show();
																}

																if (listStatus.availableRightClickCnt == 1) {
																	if ($ul
																			.find("li").length < listStatus.totItemCnt) {
																		appendNextPage(
																				listStatus,
																				$ul,
																				function(
																						result) {
																					var appendedSize = result.length;
																					$ul
																							.width($ul
																									.width()
																									+ (appendedSize * listStatus.moveUnit));
																					setTimeout(
																							function() {
																								$ul
																										.append(listStatus
																												.template({
																													list : result
																												}));
																							},
																							listStatus.duration);//ul에 적용된 transition 시간만큼 timeout을 줘야함.
																					listStatus.totRightClickCnt += appendedSize;
																					listStatus.availableRightClickCnt += appendedSize;

																				});
																	}
																}
															}
														}

												);
									} else {
										right.hide();
									}
								}
							});
			//2. searchResultFrame 중 세로방향으로 이동할 녀석들에 스크롤이벤트 적용. 
			$('.searchResultFrame.vertical')
					.each(
							function() {
								//스크롤 이벤트
								var $frame = $(this), $ul = $frame.find("ul"), $li = $ul
										.find('li');
								var liHeight = calcVerticalHeight($li);
								var listStatus = {
									page : 1,
									itemType : $frame.data('type'),
									totItemCnt : parseInt($frame.parent().find(
											".totItems strong").text()),
									template : _.template($frame.find(".tmpl")
											.html()),
									loadHeight : $frame.height()
								};

								$frame
										.on(
												'scroll',
												function() {
													if ($ul.find('li').length < listStatus.totItemCnt) {
														if ($frame.scrollTop() >= $ul.height() - listStatus.loadHeight) {
															appendNextPage(
																	listStatus,
																	$ul,
																	function(result) {
																		$ul.append(listStatus.template({list : result}));
																	});
														}
													}
												});

							});

		}

		function appendNextPage(listStatus, $ul, afterAjax) {
			listStatus.page = listStatus.page + 1;
			searchParams.page = listStatus.page;

			$.ajax({
				url : '/ajax/search/' + listStatus.itemType,
				data : searchParams,
				traditional : true,
				dataType : 'json',
				error : function(xhr, status, error) {
					l(error);
				},
				'success' : function(result, status, xhr) {
					console.log(result);
					afterAjax(result);
				}
			});
		}

		//페이지 로드될때 페이지 내에서 총 검색결과를 저장할 변수
		var nolgoTotalCnt, usersTotalCnt, reviewsTotalCnt;

		//처음 페이지 로드될때 총 검색결과 갯수 셋팅하는 함수
		function setTotalCount(result) {
			nolgoTotalCnt = result.nolgoTotalCnt;
			usersTotalCnt = result.usersTotalCnt;
			reviewsTotalCnt = result.reviewsTotalCnt;

			$("#nolgo_list_area .searchResultTitleBundle strong").text(
					result.nolgoTotalCnt);
			$("#user_list_area .searchResultTitleBundle strong").text(
					result.usersTotalCnt);
			$("#review_list_area .searchResultTitleBundle strong").text(
					result.reviewsTotalCnt);
		}
		//review의 content중에 미디어가 있는지 확인하는 함수
		var p = 0;
		function getContentInfo(content) {

			var result = {
				isMedia : false,
				src : ""
			};
			/*
			<div class="ytp-cued-thumbnail-overlay-image" 
			style="background-image: url(&quot;https://i.ytimg.com/vi_webp/1wXRVPZv_Wo/maxresdefault.webp&quot;);">
			</div>
			 */
			//유튜브영상 iframe은 같은도메인이 아니면 접근이 안된다고함. 그래서 일단 스킵.
			var $content = $("<div>").html(content).find(
					"img,.ytp-cued-thumbnail-overlay-image").addClass(
					"searchImage");

			result.isMedia = $content.length != 0
			if (result.isMedia) {
				result.src = $($content[0]).attr("src");
			}
			if (p == 2) {
				console.log(content)
				console.log(result);
			}
			p++;
			return result;
		}
		function contentTextFormatting(text, isMedia) {
			var limit = isMedia ? 205 : 250;
			if (text.length > limit) {
				text = text.substr(0, limit) + "...";
			}
			return text;
		}
	</script>
	<!-- 필터 컴포넌트 클릭이나 변경시 필터키워드 생성 및 제거하는 함수정의하는 스크립트-->
	<script>
		//filter에서 이벤트가 발생하는 부분에 다 넣는다.
		//filter컴포넌트의 이벤트 init부분에서 해당 컴포넌트에 해당하는 filterObject를 생성하고, 바라보게함.
		var $filterKeywords = $("#filter_keywords");

		function toggleFilterKeyword(object) {
			if ($filterKeywords.find("#" + object.id).length == 0) {
				l("filterObject add");
				$filterKeywords.append($("<span id='" + object.id + "'>#"
						+ object.filterKeyword + " </span>"));
			} else {
				l("filterObject remove");
				$("#" + object.id).remove();
			}
		}

		var filterKeywordIdx = 0;
		var i = 0;

		//imageCheckbox init and change event apply
		$("#search_filters input[type='checkbox']")
				.each(
						function() {
							var $imageCheckbox = $(this).attr("id",
									"imgCheckbox" + i).next().attr("for",
									"imgCheckbox" + i).find("span");
							var filterKeywordObject = {
								id : "filterKeyword" + (filterKeywordIdx++),
								filterKeyword : $imageCheckbox.attr("title")
							};
							//init - 체크 되있으면 필터키워드로 추가해서 default로 함.
							if ($(this).is(":checked")) {
								toggleFilterKeyword(filterKeywordObject);
								$imageCheckbox.addClass("checked");
							}

							//체크박스가 체크/해제될땐 체크될때 filter키워드를 추가, 해제될때 filter키워드를 제거
							$(this).change(function() {
								toggleFilterKeyword(filterKeywordObject);
								if ($(this).is(':checked')) {
									$imageCheckbox.addClass("checked");
								} else {
									$imageCheckbox.removeClass("checked");
								}
							});

							i++;
						});

		var $searchFilters = $("#search_filters"), $showFilterBtn = $("#btn_show_filters"), oriSearchFiltersHeight = $searchFilters
				.height();
		//애니메이션 효과를 위한 기본셋팅.
		$searchFilters.height(0);

		/*!애니메이션하고(slideUp,Down등 포함) transition은 충돌나므로,
		효과를 같이 안쓰는게 좋음.*/
		$showFilterBtn.on("click", function() {
			var speed = 700, easing = "swing";
			if ($searchFilters.is(":visible")) {
				$searchFilters.animate({
					height : 0
				}, speed, easing, function() {
					$showFilterBtn.removeClass("up").addClass("down").find("i")
							.removeClass("fa-angle-up").addClass(
									"fas-angle-down");
					$showFilterBtn.find("span").text("필터 펼치기");
					$searchFilters.hide();
				})
			} else {
				$searchFilters.show();
				$searchFilters.animate({
					height : oriSearchFiltersHeight
				}, speed, easing, function() {
					$showFilterBtn.removeClass("down").addClass("up").find("i")
							.removeClass("fas-angle-down").addClass(
									"fa-angle-up");
					$showFilterBtn.find("span").text("필터 숨기기");
				});
			}
		});

		//태그형식으로 주소를 선택하면 검색창 옆에 붙는 주소 영역(하나만, 주소는 depth1_depth2_depth3 식으로)
		var $locationTag = $("#locationFilterKeyword");
		//depthCode select 변경시 하위 depth의 목록 변경
		//depth1 option 변경시 -> depth2, depth3 를 초기화하고, depth2의 하위 option을 dpeth1하위 depth2리스트로 ajax로 가져와 할당한다.
		var $depth1Code = $("#depth1Code");
		var $depth2Code = $("#depth2Code"), depth2Tmpl = _.template($(
				"#depth2Tmpl").html());
		var $depth3Code = $("#depth3Code"), depth3Tmpl = _.template($(
				"#depth3Tmpl").html());

		$depth1Code.on('change', function() {
			//이러면 자동으로 optgroup 위에있는 .defaultOption이 자동으로 선택됨.(get으로 전송될때도 0으로 셋팅됨)
			$depth2Code.find("optgroup").empty();
			$depth3Code.find("optgroup").empty();

			$.ajax({
				url : '/ajax/location/depth1/' + $depth1Code.val(),
				error : function(xhr, status, error) {
					l('/ajax/location/ : ' + error);
				},
				success : function(depth2List, status, xhr) {
					console.log(depth2List);
					$depth2Code.find("optgroup").append(depth2Tmpl({
						depth1 : $depth1Code.val(),
						locations : depth2List
					}));
					$depth2Code.focus();
				}
			});

		});

		$depth2Code.on('change', function() {
			$depth3Code.find("optgroup").empty();

			$.ajax({
				url : '/ajax/location/depth2/' + $depth2Code.val(),
				error : function(xhr, status, error) {
					l('/ajax/location/ : ' + error);
				},
				success : function(depth3List, status, xhr) {
					$depth3Code.find("optgroup").append(depth3Tmpl({
						depth2 : $depth2Code.val(),
						locations : depth3List
					}));
					$depth3Code.focus();
				}
			});
		});

		$depth3Code.on('change', function() {
			//depth3Code가 변경될때 수행되는 함수- 아직없다
		});
		//검색 필드에 지역태그를 셋팅하는 함수
		function combinLocationTag() {
			var tagString = "";
			if ($depth1Code.val() != 0) {
				tagString += "#" + $depth1Code.find("option:selected").text();
			}
			if ($depth2Code.val() != 0) {
				tagString += '_' + $depth2Code.find("option:selected").text();
			}
			if ($depth3Code.val() != 0) {
				tagString += '_' + $depth3Code.find("option:selected").text();
			}
			$locationTag.text(tagString);
		}
		//초기화
		combinLocationTag();

		//행정코드로 맵의 선택지역을 변경하는 함수
		function changeMap(code) {
			if (code != 0) {
				l("맵을 변경합니다.")
				//행정코드로 맵의 선택지역을 변경하는 함수
			} else {
				//맵 초기화
				l("맵을 초기화 합니다.")
			}
		}
		//
		function changeMapBySelector() {
			var code = 0;
			if ($depth3Code.val() != 0) {
				code = $depth3Code.val();
			} else if ($depth2Code.val() != 0) {
				code = $depth3Code.val();
			} else if ($depth1Code.val() != 0) {
				code = $depth1Code.val();
			}
			changeMap(code);
		}
		//select에 선택된 지역으로 맵 초기화;
		changeMapBySelector();

		//select option이 변경될때마다 적용해야하는 공통이벤트 리스너
		$("#_address").on('change', 'select', function() {
			//지도변경함수 호출
			changeMapBySelector();
			//지역태그 변경함수 호출
			combinLocationTag();
		});

		//가격대 입력값 유효성검사
		//최저입력x => 0 , 최고입력x =>0 : 이 두개는 onSubmit에서 , 최저<=최고
		var $minBudget = $("#min_budget");
		var $maxBudget = $("#max_budget");
		$minBudget.on('focusout', function() {
			if (isBudgetInvalid()) {
				$minBudget.val($maxBudget.val());
				alert("최저값은 최고값보다 크게 설정할 수 없습니다");
				$minBudget.focus();
			}
		})
		$maxBudget.on('focusout', function() {
			if (isBudgetInvalid()) {
				$maxBudget.val($minBudget.val());
				alert("최고값은 최저값보다 작게 설정할 수 없습니다");
				$maxBudget.focus();
			}
		});

		var $searchForm = $("#search_form");
		$searchForm.on('submit', function() {
			if ($minBudget.val() == "") {
				$minBudget.val(-1);
			}
			if ($maxBudget.val() == "") {
				$maxBudget.val(-1);
			}
		});
		function isBudgetInvalid() {
			if ($minBudget.val() != "" && $maxBudget.val() != "") {
				if (parseInt($minBudget.val()) > parseInt($maxBudget.val())) {
					return true;
				}
			}
			return false;
		}
		//엔터 막기
		$searchForm.find('input[type="text"]').keydown(function() {
			if (event.keyCode === 13) {
				event.preventDefault();
			}
		});
	</script>
	<!--nolgoItem template으로 추가하는 스크립트-->
	<script>
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

		//init lists - data mapping
		//nolgo list init
		/*
		    nolgo
		        id
		        image - 대표이미지
		        cntGo - 좋아요 수
		        firstCat - 대분류카테고리 
		        name 
		        firstArea - 상위지역
		        secondArea - 하위지역
		        customCats - 세부카테고리(배열)
		        minPrice - 1인당 최소가격
		        maxPrice - 1인당 최대가격
		        rating  - 평점
		        openTime - 24시간 표기법으로 표시한 장소여는시간
		        closeTime
		        isGoCheck - 로그인유저가 해당장소에 Go를 눌렀는지 확인하는 속성
		        facils - 편의시설(배열)
		 */
		var nolgoTmpl = _.template($("#nolgo_item_tmpl").html());

		//user list init
		/*
		user
		    intro   소개글
		    relInfo 태그로보여지는 관련 단어들(속성명 변경될 수 있음, 배열)
		    cntFollower 팔로워수
		    cntAddNolgo 추가한 놀 곳수
		    cntWrritenReview    작성한 리뷰 수
		    nickname    닉네임
		    profileImage    프로필이미지
		    no  유저 no
		 */
		var userTmpl = _.template($("#user_item_template").html());

		//review list init 
		/*
		review  
		    media   미디어가 포함된 리뷰인경우 있는 미디어 파일
		    nolgoName   리뷰가 등록된 장소 이름
		    relInfos    관련키워드(배열)
		    title   리뷰제목
		    wrriter 작성자 유저 닉네임
		    wrritenDate YYYY/MM/dd HH:mm:ss
		    textContent 리뷰의 텍스트 컨텐츠(간략)
		 */

		var reviewsTmpl = _.template($("#review_item_template").html());

		//filters
		var $keyword = $("#keyword"); // input text 
		var $depth1 = $("#depth1Code");
		var $depth2 = $("#depth2Code");
		var $depth3 = $("#depth3Code");
		var $categories = $("#categories_filter");
		var $convenients = $("#convenients_filter");
		var listSelector = "input[type='checkbox']:checked"; // cats or convs .find(listSelector) => selected list
		var $minBudget = $("#min_budget");
		var $maxBudget = $("#max_budget");

		//서버에 넘기는 파라미터(서버에선 SearchVO) 스키마
		/*
		{
			keyword string,
			location string,
			categories int[],
			convenients int[],
			minBudget int,
			maxBudget int
		}
		 */
		//searchParam을 생성해서 반환하는 함수
		function getSearchParams() {
			l("getSearchParams");
			var categoriesNo = [];
			var convenientsNo = [];

			$categories.find(listSelector).each(function() {
				l("categoriesNo.push");
				categoriesNo.push($(this).val());
			});
			$convenients.find(listSelector).each(function() {
				l("convenientsNo.push");
				convenientsNo.push($(this).val());
			});

			// pageNo는 한 프레임에서 보여지는 녀석보다 한 두개더 많이? 
			return {
				keyword : $keyword.val(),
				depth1Code : $depth1.val(),
				depth2Code : $depth2.val(),
				depth3Code : $depth3.val(),
				categories : categoriesNo,
				convenients : convenientsNo,
				minBudget : parseInt($minBudget.val() == "" ? -1 : $minBudget
						.val()),
				maxBudget : parseInt($maxBudget.val() == "" ? -1 : $maxBudget
						.val()),
				page : 1,
				pageNo : 10
			}
		}

		// serachAll
		//지금은 page이동방식으로 하는데, ajax로 단일페이지로 구성할 여지를 남겨두기위해 jquery로 요소값을 가져오는걸로 함.
		//생각해보니까이거는 바뀌면 안되는구나 => 아니다 페이지로드될때 바뀌는거하고 안바뀌는거하고 따로두면되지.
		/*
		 ** json/obejct 형태로 서버로 데이터를 넘길땐 직렬화가 필요하다(1시간 삽질)
		ex) Array, Image(multipart-form data), File 등 
		traditional : true
		ajax에서 넘겨주는 데이터가 null이면 spring에서 받을땐 무조건 빈객체라도 생성하는갑다... null이 안되네
		 */

		//처음 GET방식으로 페이지가 로드됐을때 필터상태를 저장.
		//완전 ajax로 다 할것도 아니고, 필터상태가 바뀌면 리스트상태도 바뀌기때문에 다시 검색버튼을 누르는게 아니라면 처음 필터상태로 검색을 해야함.
		var searchParams = getSearchParams();
		//처음 페이지로드 될때 통합검색 ajax
		var reviewList = [/*review json객체가 들어갑니다.*/];
		// 구현이형이 구현한 리뷰상세보기스크립트를 실행시기위한 review 배열변수.
		//리뷰리스트 초기화
		$.ajax({
			url : '/ajax/search/all',
			dataType : 'json',
			traditional : true,
			data : searchParams,
			error : function(xhr, status, error) {
				l(error);
			},
			success : function(result, status, xhr) {
				console.log(result);
				//nolgo list 추가
				var nolgoItems = nolgoTmpl({
					'list' : result.nolgoList
				});
				//DOM으론 barrating을 적용할 수 없음 - append 후, 추가된 item을 다시 검색해서 그요소에 barrating을 적용해야함.
				//방법 1. item으로 온 nolgo리스트의 순서와 모두 추가가 완료된 후 .nolgoItem으로 조회한 아이템들의 순서가 완전히 동일하면 template로 추가하고 .nolgoItem으로 조회해서 다시 얻어온 데이터배열을 조회하면서 하나식 barrating 적용.
				//방법 2. data-rating이란 속성을 추가하고 .nolgoItem으로 조회해서 각각 data-rating으로 barrating 적용
				$("#nolgo_list_area ul").empty().append(nolgoItems);

				//방법2로함
				$(".nolGoItem").each(function() {
					var $ratingList = $(this).find(".averageRatingOptionList");
					$ratingList.barrating({
						theme : 'fontawesome-stars',
						initialRating : $ratingList.data("rating"),
						readonly : true,
						showSelectedRating : false
					})
				});

				//user list 추가 
				var userItems = userTmpl({
					'list' : result.userList
				});
				$("#user_list_area ul").empty().append(userItems);

				//review list 추가
				var reviewItems = reviewsTmpl({
					"list" : result.reviewList
				//템플릿에서 each를 돌때 reviewList에다가 리뷰들을 넣어야겠다.
				});
				$("#review_list_area ul").empty().append(reviewItems);

				setTotalCount(result);
				initLists();
			}
		});
	</script>

	<!-- 리뷰 더 보기 관련 스크립트 by  구현이형 -->
	<script src="/js/ckeditor/ckeditor.js"></script>
	<script>
		//리뷰 카드 클릭시
		var reviewDetailTmpl = _.template($("#reviewDetailTmpl").html());
		$("#review_list_area ul").on(
				"click",
				'li',
				function() {
					var reviewNo = $(this).data("no");
					var review;
					_.each(reviewList, function(each, index) {
						if (reviewNo == each.review.no) {
							review = each; //리뷰 모델 변경 ,구현이형 모델로
						}
					});
					$(".bodyCover.reviewDetail").addClass("on");
					//var review = $(this).data("review");

					var markup = reviewDetailTmpl({
						"reviewItem" : review
					});

					$('.bodyCover.reviewDetail.on').html(markup);
					$("body").addClass("modalOpen").css("margin-right",
							getScrollBarWidth() + "px");
				});

		var $body = $("body");
		var $reviewEditor = $(".bodyCover.reviewEditor");
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
		$body.on("click", ".reviewDropdownList .modify", function(e) {
			e.preventDefault();
			closeBodyCover();
			$reviewEditor.addClass("on");
			$("body").addClass("modalOpen").css("margin-right",
					getScrollBarWidth() + "px");

			var no = $(this).closest(".reviewArea").data("no");
			var review = _.findWhere(reviewList, {
				no : no
			});

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
			_.each(review.tags, function(each, index) {
				$tag.tagEditor('addTag', each.content);
			})

			return false;
		});//end click modify

		//리뷰 더보기 삭제하기
		$body.on("click", ".reviewDropdownList .delete", function(e) {
			e.preventDefault();
			var no = $(this).closest(".reviewArea").data("no");
			if (confirm("삭제 하시겠습니까?")) {
				$.ajax({
					url : "/ajax/review/" + no,
					type : "delete",
					error : function(xhr, err, code) {
						alert(err);
					},
					success : function(data) {
						console.log(data);
						closeBodyCover();
						showReview();
					}
				});//$.ajax() end
			}//end confirm
		});//click delete

		//리뷰 라이크버튼 이벤트

		/* GO (좋아요) 관련*/
		var $goBtn = $(".goBtn");
		$body.on("click", ".goBtn", function() {
			console.log("goBtn");
			var contentType = $(this).data("content_type");
			var contentNo = $(this).data("content_no");

			var method = $(this).hasClass("on") == true ? "DELETE" : "POST";

			modifyGo(contentType, contentNo, method, $(this));

			return false;
		})

		var loginUserNo = $
		{
			loginUser == null ? -1 : loginUser.no
		};
		// 비동기로 좋아요 관련 디비 수정
		function modifyGo(contentType, contentNo, method, $this) {
			console.log("loginUserNo", loginUserNo);
			if (loginUserNo != -1) {
				$.ajax({
					url : '/ajax/' + contentType + '/' + contentNo + "/liking",
					type : method,
					success : function(data) {
						console.log('like ajax data : ' + data);

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

						if (contentType == "review") {
							//리뷰에서 좋아요 누를때는 저장되어있는 리스트 갱신
							reviewList = _.map(reviewList,
									function(reviewItem) {
										var review = reviewItem.review;
										l(review);
										if (review.no == contentNo) {
											review.isLike = !review.isLike;
											review.likeCnt = data;
										}
										l(review);
										l(reviewItem);
										return reviewItem;
									});//end map

						}//end contentType compare 
					}
				});
			}
		}

		//리뷰 상세에서 더보기 버튼 클릭시
		$body.on("click", '.reviewArea .moreWrapper .moreBtn', function() {
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
	</script>
	<!-- 테스트코드 스크립트-->
	<script>
		var p = 1;
		$("body *").on("click", function() {

		})
	</script>
</body>
</html>
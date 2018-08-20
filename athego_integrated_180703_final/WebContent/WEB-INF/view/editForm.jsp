<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>
    <c:choose>
    	<c:when test="${idModify }">놀곳 수정 페이지</c:when>
	    <c:otherwise>놀곳 입력 페이지</c:otherwise>
    </c:choose>
    </title>
    <c:import url="/WEB-INF/view/template/link.jsp"></c:import>
    <link rel="stylesheet" href="/css/reset.css?ver=1"/>
    <link rel="stylesheet" href="/css/default.css"/>
    <link rel="stylesheet" href="/css/header.css?ver=3"/>
    <link rel="stylesheet" href="/css/editForm.css?ver=4"/>
    <link rel="stylesheet" href="/css/fontawesome-all.css"/>
    <link rel="stylesheet" href="/css/slick.css"/>
    <link rel="stylesheet" href="/css/slick-theme.css"/>
    <link rel="stylesheet" href="/css/jquery-ui.min.css">
    <link rel="stylesheet" href="/css/jquery.tag-editor.css">
</head>
<body>
<!-- header.jsp start -->
<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
<c:choose>    
	<c:when test="${isModify }">
		<form id="nolgo_form" action="/nolgo/modify" method="POST">
		<input type="hidden" name="_method" value="PUT">
		<input type="hidden" name="no" value="${nolgo.no}">
		<input type="hidden" name="userNo" value="${nolgo.userNo}">
		<input type="hidden" name="locationNo" value="${nolgo.locationNo}">
	</c:when>
	<c:otherwise>
	    <form id="nolgo_form" action="/nolgo/register" method="POST">
	</c:otherwise>
</c:choose>
<c:forEach items="${tags }" var="tag" varStatus="status">
	<input type="hidden" name="tag" id="tag${tag.content }" value="${tag.content }">
</c:forEach>
	<input type="hidden" id="picSize" value="
		<c:choose>
			<c:when test="${pictures==null}">${pictures.size()}</c:when>
			<c:otherwise>0</c:otherwise>
		</c:choose>">
	
        <section id="img_slide_area">
            <div id="call_eitor_title">+</div>
            <div class="imgSlide">
            <c:forEach items="${pictures }" var="picture">
                <img src="/img/${picture }" alt="${picture }">
            </c:forEach>
            </div>
            <div class="arrowBtn left"><i class="fa fa-chevron-left"></i></div>
            <div class="arrowBtn right"><i class="fa fa-chevron-right"></i></div>
        </section>
        <section id="simple_info_area">
            <ul>
                <!-- 여기에 없는 글자들은 전부 css의  before_after을 사용한 부분입니다. -->
                <!--  각 부분마다 input 박스를 넣고 아이디 안겹치게 잘 지정해주시면 될꺼같습니다. -->
                <li id="_name" >
                	<input id="nameInput" type="text" name="name" placeholder="장소,업소 이름" value="${nolgo.name}">
                </li>
                <li id="_category">
                    <select id="categories" name="categoryNo">
                        <option data-categoryNo="1" value="1" <c:if test="${nolgo.categoryNo==1}">selected="selected"</c:if>>관광</option>
                        <option data-categoryNo="2" value="2" <c:if test="${nolgo.categoryNo==2}">selected="selected"</c:if>>축제</option>
                        <option data-categoryNo="3" value="3" <c:if test="${nolgo.categoryNo==3}">selected="selected"</c:if>>문화예술</option>
                        <option data-categoryNo="4" value="4" <c:if test="${nolgo.categoryNo==4}">selected="selected"</c:if>>맛집/술집</option>
                        <option data-categoryNo="5" value="5" <c:if test="${nolgo.categoryNo==5}">selected="selected"</c:if>>레저/스포츠</option>
                        <option data-categoryNo="6" value="6" <c:if test="${nolgo.categoryNo==6}">selected="selected"</c:if>>뷰티/힐링</option>
                        <option data-categoryNo="7" value="7" <c:if test="${nolgo.categoryNo==7}">selected="selected"</c:if>>오락</option>
                        <option data-categoryNo="8" value="8" <c:if test="${nolgo.categoryNo==8}">selected="selected"</c:if>>제조/공예</option>
                        <option data-categoryNo="9" value="9" <c:if test="${nolgo.categoryNo==9}">selected="selected"</c:if>>카페</option>
                        <option data-categoryNo="10" value="10" <c:if test="${nolgo.categoryNo==10}">selected="selected"</c:if>>이벤트룸</option>
                    </select>
                    <input id="sub_categories" type="text" name="subCategoryInput" placeholder="(예:코인노래방, VR룸)">
                </li>
                <li id="_address">
                    <input type="text" id="full_addr" readonly onclick="searchMapByAddr()" placeholder="주소입력"  value="${nolgo.address}">
               		<input type="hidden" name="address" value="${nolgo.address }">
                    <input type="hidden" id="lat" name="lat" value="${nolgo.lat}">
                    <input type="hidden" id="lng" name="lng" value="${nolgo.lng}">
                    <button id="search_addr" type="button" class="btn" onclick="searchMapByAddr()"><i class="fas fa-search"></i></button>
                </li>

                <hr/>

                <li id="_dayoff"><input type="text" name="offDay" placeholder="휴무일" value="${nolgo.offDay }"></li>
                <li id="_opTime">
                    <select class="timeAmPm" name="opTimeAmPm">
                        <option value="ap">오전</option>
                        <option value="pm" <c:if test="${openTimeAmPm=='pm' }"> selected="selected"</c:if>>오후</option>
                    </select>
                    
                    <select class="selectHour opHour" id="hourFrom" name="opHour">
                    	<c:forEach begin="0" end="12" varStatus="status">
                    	<option value="${status.index }" <c:if test="${status.index==openHour}"> selected="selected"</c:if>>${status.index }</option>
                    	</c:forEach>
                    </select>시
                    <select class="selectMin opMin" id="minFrom" name="opMin">
                    	<c:forEach begin="0" end="5" varStatus="status">
                    	<option value="${status.index*10 }" <c:if test="${status.index*10==openMin}"> selected="selected"</c:if>>${status.index*10 }</option>
                    	</c:forEach>
                    </select>분 ~
                    <select class="timeAmPm" name="edTimeAmPm">
                        <option value="ap">오전</option>
                        <option value="pm" <c:if test="${closeTimeAmPm=='pm' }"> selected="selected"</c:if>>오후</option>
                    </select>
                    <select class="selectHour edHour" id="hourTo" name="edHour">
                    	<c:forEach begin="0" end="12" varStatus="status">
                    	<option value="${status.index }" <c:if test="${status.index==closeHour}"> selected="selected"</c:if>>${status.index }</option>
                    	</c:forEach>
                    </select>시
                    <select class="selectMin edMin" id="minTo" name="edMin">
                    	<c:forEach begin="0" end="5" varStatus="status">
                    	<option value="${status.index*10 }" <c:if test="${status.index*10==closeMin}"> selected="selected"</c:if>>${status.index*10 }</option>
                    	</c:forEach>
                    </select>분
                </li>
                <li id="_stayTime">
                    <select id="stayHour" name="stayHour">
                    	<c:forEach begin="0" end="24" varStatus="status">
                    	<option value="${status.index }"<c:if test="${nolgo.stayHour==status.index}"> selected="selected"</c:if>>${status.index }</option>
                    	</c:forEach>
                    </select>시간
                    <select id="stayMin" name="stayMin">
                    	<c:forEach begin="0" end="11" varStatus="status">
                    	<option value="${status.index*5 }"<c:if test="${nolgo.stayMin==status.index*5}"> selected="selected"</c:if>>${status.index*5 }</option>
                    	</c:forEach>
                    </select>분
                </li>
                <li id="_phone">
                    <input class="phone" id="phone" name="phone" type="text" placeholder="전화번호" value="${nolgo.phone}">
                </li>
                <li id="_budget">
                    <input class="budget" id="budgetMin" name="minBudget" type="text" placeholder="최저" value="${nolgo.minBudget}"> 원 ~
                    <input class="budget" id="budgetMax" name="maxBudget" type="text" placeholder="최고" value="${nolgo.maxBudget}"> 원
                    <i id="budget_question" class="fas fa-question-circle"></i>
                    <div id="budget_info" class="infoTxt">1인 기준 지출 예상 비용을 적어주세요!</div>
                </li>
                <li id="_option_price_list">
                    <ul>
                    <c:forEach items="${menues }" var="menu">
                    	<li data-optionNo="">
                            <input type="text" class="optionName" name="optionName" placeholder="메뉴" value="${menu.name}">
                            <input type="text" class="optionPrice" name="optionPrice" placeholder="가격/이용요금" value="${menu.price}"> 원<!--
                            --><button class="priceOption priceRmv btn on">-</button><button class="priceOption priceAdd btn">+</button>
                        </li>
                    </c:forEach>
                    <c:if test="${!isModify }">
                        <li data-optionNo="">
                            <input type="text" class="optionName" placeholder="메뉴">
                            <input type="text" class="optionPrice" placeholder="가격/이용요금"> 원<!--
                            --><button class="priceOption priceRmv btn on">-</button><button class="priceOption priceAdd btn">+</button>
                        </li>
                    </c:if>
                    </ul>
                </li>

                <hr/>

                <li id="_facility_list">
                    <ul>
                    <c:forEach items="${convenientList }" var="convenient" varStatus="status">
                        <li class="tooltip facilityBox <c:forEach items="${nolgoConvenients }" var="nolgoConvenient">
                    			<c:if test="${nolgoConvenient.convenientNo==convenient.no }"> on </c:if>
                   				</c:forEach>" value="${convenient.no }">
                    		<span class="f${status.count }" ></span>
                    		<div class="tooltiptext" style="">${convenient.name }</div>
                    		<c:forEach items="${nolgoConvenients }" var="nolgoConvenient">
                    			<c:if test="${nolgoConvenient.convenientNo==convenient.no }">
		                    		<input type="hidden" class="convenient" name="convenients" value="${convenient.no }">
								</c:if>
                   			</c:forEach>
                        </li>
                    </c:forEach>
                    </ul>
                </li>
            </ul>
            <div id="map_area">
                <div id="minimap_area"> M A P</div>
                <span class="infoTxt" id="map_info_first">주소를 모르신다구요?</span>
                <span class="infoTxt" id="map_info_second">지도에서 원하는 위치를 클릭하세요!</span>
                <div id="clickLatlng"></div>
            </div>
        </section>
        <section id="detail_info_area">
            <div class="wrapReviewEditor">
                 <div class="modalHeader">
                    <h1 class="modalTitle">놀곳 상세내용 작성</h1>
                </div>
                <div class="modalBody">
                 
                        <ul class="modalInputList">
                            <li class="modalInputContents"><textarea id="input_contents" name="content" placeholder="내용을 적어주세요">${nolgo.content }</textarea></li>
                        </ul>
 
                        <button id="submit" class="submit" type="submit">
                        <c:choose>
                        	<c:when test="${idModify }">수정</c:when>
	    					<c:otherwise>등록</c:otherwise>
	    					</c:choose>
                        </button>
                
                </div>
            </div>
        </section>
        <div class="popPictEditor"><!--on--></div>
        <div class="pictEditor inDetail"><!-- on -->
            <div id="editor_title">사진 추가</div>
            <ul class="pictList">
                <li class="_addPic">
					<label class="picAdd">+<input type="file" id="upload" name="upload"></label>
                </li>
            	<c:forEach items="${pictures }" var="picture">
                <li class="_addPic"><img src="/img/${picture }" alt="${picture }"/>
                    <button class="picRmv btn">─</button>
                    <input type="hidden" name="pictures" value="${picture }">
                </li>
            	</c:forEach>
            </ul>
        </div>
	</form>
<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>

<!-- footer.jsp end -->

<!-- 백단에서 ajax로 템플릿 처리할것 -->
<!--사진 template-->
<script type="text/template" id="pic_tmp">
    <li class="_addPic"><img src="/img/<@=name@>" alt="<@=name@>" value="<@=name@>"/>
        <button class="picRmv btn">─</button>
		<input type="hidden" name="pictures" value="<@=name@>">
    </li>
</script>

<!-- 메뉴추가 template -->
<script type="text/template" id="menu_add_tmp">
    <li data-optionNo="">
        <input type="text" class="optionName" placeholder="메뉴" value="">
        <input type="text" class="optionPrice" placeholder="가격/이용요금" value=""> 원<!--
        --><button class="priceOption priceRmv btn">-</button><button class="priceOption priceAdd btn on">+</button>
    </li>
</script>

<c:import url="/WEB-INF/view/template/js.jsp"></c:import>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2f7c350955a20559cfcb4fe15bd5160e&libraries=services"></script>
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
<script src="/js/slick.js"></script>
<script src="/js/jquery.caret.min.js"></script>
<script src="/js/jquery-ui.min.js"></script>
<script src="/js/jquery.tag-editor.min.js"></script>
<script src="/js/ckeditor/ckeditor.js"></script>

<script>
    _.templateSettings = {
        interpolate : /\<\@\=(.+?)\@\>/gim,
        evaluate : /\<\@(.+?)\@\>/gim,
        escape : /\<\@\-(.+?)\@\>/gim
    };
</script>

<script>
	
//전화번호 유효성검사
$("#phone").on('keydown', function (e) {
    // 숫자만 입력받기
    var trans_num = $(this).val().replace(/-/gi, '');
    var k = e.keyCode;

    if (trans_num.length >= 11 && ((k >= 48 && k <= 126) 
    		|| (k >= 12592 && k <= 12687 || k == 32 || k == 229 || (k >= 45032 && k <= 55203)))) {
        e.preventDefault();
    }
}).on('blur', function () { // 포커스를 잃었을때 실행합니다.
    if ($(this).val() == '') return;

    // 기존 번호에서 - 를 삭제합니다.
    var trans_num = $(this).val().replace(/-/gi, '');

    // 입력값이 있을때만 실행합니다.
    if (trans_num != null && trans_num != '') {
        // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
        if (trans_num.length == 11 || trans_num.length == 10 || trans_num.length == 9) {
            // 유효성 체크
            var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
            if (regExp_ctn.test(trans_num)) {
                // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
                trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
                $(this).val(trans_num);
            }
            else {
                alert("유효하지 않은 전화번호 입니다.");
                $(this).val("");
                $(this).focus();
            }
        }
        else {
            alert("유효하지 않은 전화번호 입니다.");
            $(this).val("");
            $(this).focus();
        }
    }
});

//최저,최고가격, 상세요금가격 숫자 이외 입력받으면 공백처리
$('#budgetMin').keyup(function () {
    $(this).val($(this).val().replace(/[^0-9]/g,''));
}).on('blur', function(){
	if ($(this).val() == '') return;
	$(this).val($(this).val().replace(/[^0-9]/g,''));
});
$('#budgetMax').keyup(function () {
    $(this).val($(this).val().replace(/[^0-9]/g,''));
}).on('blur', function(){
	if ($(this).val() == '') return;
	$(this).val($(this).val().replace(/[^0-9]/g,''));
});
$('.optionPrice').keyup(function () {
    $(this).val($(this).val().replace(/[^0-9]/g,''));
}).on('blur', function(){
	if ($(this).val() == '') return;
	$(this).val($(this).val().replace(/[^0-9]/g,''));
});
	
//수정폼에서 상세요금 마지막li 버튼 바꿔줌
$('#_option_price_list li:last').find('.btn').toggleClass('on');

//상세요금 추가, 삭제
var menuAddTmp = _.template($("#menu_add_tmp").html());

$('#_option_price_list ul').on('click', '.priceAdd', function(){
	$(this).parent().find('.optionName').attr('name','optionName');
	$(this).parent().find('.optionPrice').attr('name','optionPrice');
    var markup = menuAddTmp({
    });
    $('#_option_price_list ul').append(markup);
    $(this).parent().find('.priceRmv').addClass('on');
    $(this).parent().find('.priceAdd').removeClass('on');
    return false;
});

$('#_option_price_list ul').on('click', '.priceRmv', function(){
    $(this).parent().remove();
    return false;
});

//운영시간
var i=0;
/*
for(i=0; i <60; i+=10){
    var option = $('<option>').text(i).val(i);
    //$('.opMin').append(option);
    //$('.edMin').append(option);
}
for(i=1; i <=12; i++){
    var option = $('<option>').text(i).val(i);
	//$('.opHour').append(option);
	//$('.edHour').append(option);
}*//*
for(i=0; i <60; i+=5){
	if(i<10){
		var q = '0'+i;
	    var option = $('<option>').text(q).val(q);
	}else{
	    var option = $('<option>').text(i).val(i);		
	}
	if(${nolgo.stayMin}==i){
    	option = option.attr('selected','selected');
	}
    $('#stayMin').append(option);
}
for(i=0; i <=24; i++){
	if(i<10){
		i = '0'+i;
	}
    var option = $('<option>').text(i).val(i);
	if(${nolgo.stayHour}==i){
    	option = option.attr('selected','selected');
	}
    $('#stayHour').append(option);
}*/

imageSlick();

function imageSlick(){
	//이미지 슬라이드 slick
	$('.imgSlide').slick({
	    infinite: true,
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    speed: 1500,
	    nextArrow: $(".arrowBtn.right"),
	    prevArrow: $(".arrowBtn.left"),
	    autoplay: true,
	    autoplaySpeed: 2000,
	    dots:true
	});
}

var lat = $('#lat').val();
var lng = $('#lng').val();
if(lat == ""){
	lat = 37.4809892
}
if(lng == ""){
	lng = 126.95208560000003
}
console.log("lat : " +lat);
console.log("$('#lat').val() : " +$('#lat').val());
console.log("lng : " +lng);
console.log("$('#lng').val() : " +$('#lng').val());

//지도 api
var locationName;
var container = document.getElementById('minimap_area'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
    center: new daum.maps.LatLng(lat, lng), //지도의 중심좌표.
    level: 4 //지도의 레벨(확대, 축소 정도)
};

var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

var geocoder = new daum.maps.services.Geocoder();

var marker = new daum.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter()
});

// 지도에 마커를 표시합니다
marker.setMap(map);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
daum.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === daum.maps.services.Status.OK) {

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
            
            var lat = mouseEvent.latLng.jb;
            var lng = mouseEvent.latLng.ib;
            
            console.log("lat : " + lat);
            console.log("lng : " + lng);
            console.log();
            
            $('#lat').val(lat);
            $('#lng').val(lng);

            //도로명주소
            var roadAddress = !!result[0].road_address?result[0].road_address.address_name:'';
            var extraAddr = '';

            console.log(result[0]);

            //만약 도로명주소가 있다면 " (법정동명, 건물명)"
            if(result[0].address !== null)
                extraAddr = " (" + result[0].address.region_3depth_name;
            if(result[0].road_address !== null && result[0].road_address.building_name !== "")
                extraAddr += ", " + result[0].road_address.building_name + ")";
            else
                extraAddr += ")"

            // 인포윈도우에 클릭한 위치에 대한 도로명주소나 법정동 상세 주소정보를 표시합니다
            if(roadAddress==''){
                $('#full_addr').val(result[0].address.address_name);
            }else{
                $('#full_addr').val(roadAddress + extraAddr);
            }
            $("input[name=address]").val(result[0].address.address_name);
            
            locationName = result[0].address.address_name;
            console.log(locationName);
            
        }
    });
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

//다음 우편 api를 사용해서 얻어오는 주소와 latlng
function searchMapByAddr() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = data.address; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 기본 주소가 도로명 타입일때 조합한다.
            if(data.addressType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("full_addr").value = fullAddr;
            //console.log(data)
            //console.log("autoJibunAddress : " + data.autoJibunAddress);
            //console.log("jibunAddress : " + data.jibunAddress);
            if(data.autoJibunAddress != ''){
	            locationName = data.autoJibunAddress;
	            $("input[name=address]").val(data.autoJibunAddress);
            }else{
	            locationName = data.jibunAddress;
	            $("input[name=address]").val(data.jibunAddress);
            }
            //console.log("locationName + " + locationName);
            
            // 주소로 상세 정보를 검색
            geocoder.addressSearch(data.address, function(results, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {

                    var result = results[0]; //첫번째 결과의 값을 활용

                    // 해당 주소에 대한 좌표를 받아서
                    var coords = new daum.maps.LatLng(result.y, result.x);
                    // 지도를 보여준다.
                    //mapContainer.style.display = "block";
                    //map.relayout();
                    var lng = result.x;
		            var lat = result.y;
		            
		            $('#lat').val(lat);
		            $('#lng').val(lng);

                    marker.setMap(null);

                    marker = new daum.maps.Marker({
                    });

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    marker = new daum.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 지도 중심을 변경한다.
                    map.setCenter(coords);
                    // 마커를 결과값으로 받은 위치로 옮긴다.
                    marker.setPosition(coords)
                }
            });
        }
    }).open();
}

$('.popPictEditor').click(function () {
    $('.popPictEditor').removeClass('on');
    $('.pictEditor').removeClass('on');
});

//사진추가 div
$('#call_eitor_title').click(function () {
    $('.popPictEditor').addClass('on');
    $('.pictEditor').addClass('on');
});


//사진추가 div '-'클릭시
$('.pictEditor').on('click', '.picRmv', function () {
	var str = $(this).parent().find('img').attr('alt');
	/*console.log("str : " + str);
	console.log($('.p'+str));
	console.log($(this).parent().parent().find('input'));
	console.log($('.p'+str).parent());*/
	$('.p'+str).parent().remove();
    $(this).parent().remove();
    
    //var picSlideTmp = _.template($("#pic_slide_tmp").html());
    
    $('.imgSlide').slick('unslick');
    $('.imgSlide').empty();
	imageSlick();

	for(var i = 0 ; i < $('.pictList').find('img').length ; i ++){
		var src = $('.pictList').find('img').eq(i).attr('alt');
		//console.log("src : " + src);
//		var markup = picSlideTmp({"name":src});
 //   	$('.imgSlide').append(markup);
    	$('.imgSlide').slick('slickAdd','<img src="/img/' + src + '" alt="' + src + '">');
	}
	
	picSize -= 1;
	console.log(picSize)
});

//편의시설 토글클래스 'on'
$('.facilityBox').click(function () {
    $(this).toggleClass('on');
	
	var input = $('<input type="hidden" class="convenient" name="convenients" value="' + $(this).val() + '">');
	if($(this).hasClass('on')){
		$(this).append(input);
	}else{
		$(this).find('.convenient').remove();	
	}
});

/////////////////////////////////////////////////////////////////
//사진 추가
var $upload = $("#upload");
var picSize = $('#picSize').val();
console.log("사진들 크기 : " +  picSize)

//업로드의 이미지가 변경되면
$upload.change(uploadProfile);

//파일 업로드 함수
function uploadProfile() {
	if(picSize < 5){
	    var data = new FormData();
	
	    var file = $upload.get(0).files[0];
	    console.log(file);
	    data.append('upload', file);
	    //console.log(data);
	
	    $.ajax({
	        url : '/ajax/upload',
	        type : "post",
	        dataType : "json",
	        data : data,
	        processData : false,
	        contentType : false,
	        success : function(json) {
	        	
		        	$('#defaultImg').remove();
		            
		            var picAddTmp = _.template($("#pic_tmp").html());
		
		            var markup = picAddTmp({"name":json.name});
		            $('.pictList').append(markup);
		                
		            $('.imgSlide').slick('slickAdd','<img src="/img/' + json.name +'" alt="' + json.name +'">');
		            //$('.pictEditor').append($('<input type="hidden" class='+ json.name+'" name="pictures" value="'+ json.name +'">'));
		            
		            picSize += 1;
		            console.log("사진들 크기 : " + picSize);
	        },
	        error : function(jqXHR, textStatus, errorThrown) {
	            alert(textStatus);
	        }
	    });
	}else{
		alert("사진은 최대 5개까지 삽입 가능합니다");
	}
}

var $tag = $("input[name=subCategoryInput]");
$tag.tagEditor({
    //initialTags: ['#교육'], // 초기 입력
    maxTags: 5,
    maxLength: 10,
    delimiter: ', ', /* space and comma */
    placeholder: '관련 태그를 입력 하세요',
    onChange: function(field, editor, tags) {
        console.log("tags : " + tags);
        console.log("field : " + field);
    },
    beforeTagSave: function(field, editor, tags, tag, val) {

        // $('#response').prepend('Tag ' + val + ' saved' + (tag ? ' over ' +
        // tag : '') + '.');
        // 특수문자를 제외하고 태그를 반환 하도록
        var replace = val.replace(/[^a-z0-9ㄱ-힣]/gi, '');
        if (replace.length > 0) {
            console.log("replace : " + replace);
            //getTagIdOrInsert(replace);
            
   			var input = $('<input type="hidden" name="tags" class="SC'+replace+'">').val(replace);
			$('#_category').append(input);

			return '#' + replace;
        }

    },
    beforeTagDelete: function(field, editor, tags, val) {
        // 삭제된 태그는 인풋에서 제외
        $.each($('input[name=tags]'), function(idx) {
            console.log(idx, $('input[name=tags]')[idx]);
            var $thisTagInput = $($('input[name=tags]')[idx]);
            if ($thisTagInput.data('tag') == val) {
                $thisTagInput.remove();
            }
        })
    },
    autocomplete: { // 자동 완성
        delay: 500, // show suggestions immediately
        position: {
            collision: 'down'
        }, // automatic menu position up/down / flip
        source: function(request, response) {
            console.log("request",request);
            $.ajax({
                url: "ajax/getTagList.json",
                dataType: "json",
                data: {"name" : request.term},
                success: function(data) {
                    console.log(data);
                    // 입력한 태그가 포함된 단어를 검색하여 리턴 받고
                    // 자동완성 창에 보여준다
                    /*
                     * var matcher = new RegExp("^" +
                     * $.ui.autocomplete.escapeRegex(request.term), "i");
                     * response($.grep(data, function(item) { return
                     * matcher.test(item.name); }).slice(0, 10));
                     */
                    var matcher = new RegExp("^" +
                        $.ui.autocomplete.escapeRegex(request.term), "i");
                    response($.grep(data, function(item) {
                        //console.log(item);
                        return matcher.test(item); }).slice(0, 10));

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
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                }
            });
        }, // end source
        open: function(event, ui) {
            $(this).autocomplete("widget").width("300px");

        }, // end open
        create: function() {
            // access to jQuery Autocomplete widget differs depending
            // on jQuery UI version - you can also try .data('autocomplete')
        }// end create
    }
//end autocomplete
});

console.log("태그 갯수 : " + $("input[name='tag']").length);

for(var i = 0; i < $("input[name='tag']").length; i++){
	var tagName = $($("input[name='tag']")[i]).val();
	console.log("tagName : " + tagName);
	$tag.tagEditor('addTag', tagName);
}

$('.tag-editor').on('click','.tag-editor-delete',function(){
	console.log($(this).parent().find('.tag-editor-tag').text().substring(1));
	var tagName = $(this).parent().find('.tag-editor-tag').text().substring(1);
	$('#tag'+tagName).remove();
	$('.SC'+tagName).remove();
})


//예산 물음표 마우스오버 시
$('#budget_question').mouseover(function () {
    $('#budget_info').addClass('on');
});
$('#budget_question').mouseleave(function () {
    $('#budget_info').removeClass('on');
});

/*에디터*/
CKEDITOR.replace( 'input_contents', {
	"contentsCss" : "/css/detail.css"
});

//summit
$('#nolgo_form').submit(function (){
	if($("#nameInput").val()==""){
		alert("장소 이름을 입력하세요.")
		$("#nameInput").focus();
		return false;
	}
	if($("#full_addr").val()==""){
		alert("주소를 입력하세요.")
		return false;
	}
	
	if($("#budgetMin").val()==""){
		$("#budgetMin").val("0")
		//console.log("최저0")
	}
	if($("#budgetMax").val()==""){
		$("#budgetMax").val("0")
		//console.log("최고0")
	}
	
	/*
	//지번주소
	if(locationName != null){
    	var input = $('<input type="hidden" name="addressName" value="' + locationName + '">');
		$('#nolgo_form').prepend(input);
		console.log("지역번호")
		console.log("locationName : " + locationName)
	}*/
	
	var a = $('#budgetMin').val();
	var b = $('#budgetMax').val();
	if(parseInt(a)>parseInt(b)){
		alert("최저예산이 최고보다 높습니다! 올바르게 입력해주세요");
		return false;
	}
	
	//return false;

	//submit 내부에서 가장 하단에 위치할것
	if($('.optionName:last').val() =="" && $('.optionPrice:last').val()==""){
		return true;
	}else if($('.optionName:last').val() =="" || $('.optionPrice:last').val()==""){
		alert("상세메뉴를 입력해주세요.")
		return false;
	}else if($('.optionName:last').val() !="" && $('.optionPrice:last').val() !=""){
		$('.optionName:last').attr('name','optionName');
		$('.optionPrice:last').attr('name','optionPrice');
	}

})
</script>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="EUC-KR"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head> 
<meta charset="UTF-8">
<title>AtheGO?</title>
<c:import url="/WEB-INF/view/template/link.jsp"></c:import>
<link rel="stylesheet" href="/css/slick.css"/>
<link rel="stylesheet" href="/css/index.css"/>
<link rel="stylesheet" href="/css/slick-theme.css"/>
<link rel="stylesheet" href="/css/index_card.css" />
<link rel="stylesheet" href="/css/fontawesome-stars.css" />
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
</style>
</head>
<body>
<c:import url="/WEB-INF/view/template/header.jsp"></c:import>
	<%-- content --%>
<div class="fullContainer">
    <div class="wiDTh1o24 mainBody">
        <h1 hidden>어디GO indexPage</h1>
        <section id="hero_image_area">              
            <div class="imgSlide">
                <a href=""><img src="img/cat_1_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_2_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_3_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_4_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_5_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_6_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_7_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_8_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_9_main_img.png" alt="PICTURE"></a>
                <a href=""><img src="img/cat_10_main_img.png" alt="PICTURE"></a>
            </div>
            <div class="arrowBtn left"><i class="fa fa-chevron-left"></i></div>
            <div class="arrowBtn right"><i class="fa fa-chevron-right"></i></div>
        </section>
        <section id="user_recommendation_area_place_area">
       
		</section>
    </div>
</div>
<c:import url="/WEB-INF/view/template/footer.jsp"></c:import>
<c:import url="/WEB-INF/view/template/indexTmpl.jsp"></c:import>
<c:import url="/WEB-INF/view/template/recomTmpl.jsp"></c:import>
<c:import url="/WEB-INF/view/template/js.jsp"></c:import>
<script src="/js/jquery.barrating.js"></script>
<script src="/js/slick.js"></script>
<script>
var loginUserNo = '${loginUser.no}';
$("#hero_image_area>div.imgSlide>a").on("click", function (e) {
	e.preventDefault();
})
$(".likeHeart").click(function () {
    if ($(this).children("i").hasClass("far")) {
        $(this).children("i").attr("class", "fas fa-heart");
    } else {
        $(this).children("i").attr("class", "far fa-heart");
    }//if~else end
});

var heroImageArea = $('#hero_image_area .imgSlide');
heroImageArea.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    nextArrow: $(".arrowBtn.right"),
    prevArrow: $(".arrowBtn.left"),
    autoplay: true,
    autoplaySpeed: 2000,
    dots:true
},100);

function isAMPM(time){
//시간에 따라 AM,PM 태그를 생성해서 반환하는 함수
time = moment(time,'HH:mm').hour();
if(time < 12 ){
    return "<span class='am'>AM</span>";
}else{
    return "<span class='pm'>PM</span>";
}
}
//평점 불러오기
//each를 놀곳 배열을 받아온 후, 스크립트에서 돌려야 해당하는 장소에 rating을 지정할 수 있다.
//밑에선 받아고, 생성한녀석
$('.averageRatingOptionList').barrating({
theme: 'fontawesome-stars',
initialRating: 4,
readonly: true,
showSelectedRating:false

});



console.log('nolgos');
var nolgos = ${nolgos};


console.log(nolgos);

var num = 0;
var recommList =[];
$.each(nolgos, function (nolgoItemList,value) {
		
	var recommData= {
			title: value.title,
			list:value.list
		}
	var nolgos = [];
	/*
	$.each(values, function (e, v) {
		console.log(e,v);
		
		recommData.list.push({
			no:v.no,
			name:v.name,
			cntGo:1,
			avgScore:v.avgScore,
			pictures:v.pictures,
			relInfo:v.relInfo,
			address:v.address,
			minBudget:v.minBudget,
			maxBudget:v.maxBudget,
			openTime:v.openTime,
			closeTime:v.closeTime,
			isGoCheck:true,
            facils:[1,3,5,7,9,10]
			
		})
	}); //end each2
	*/
	recommList.push(recommData);
});//end each1
 
 
var recomTmpl = _.template($("#nolgo_item_area_tmpl").html());	

$(".fullContainer>.wiDTh1o24.mainBody").append(recomTmpl({'recommList':recommList}));


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
} 

function getRecoms(recomList) {
	var userRecomTmpl = _.template($("#user_recom_item_area_tmpl").html());
	$("#user_recommendation_area_place_area").append(userRecomTmpl({list:recomList}));

	$("#user_recommendation_area_place_area .nolGoItem").each(function(){
		var $ratingList = $(this).find(".averageRatingOptionList");
		$ratingList.barrating({
		    theme: 'fontawesome-stars',
		    initialRating: $ratingList.data("rating"),
		    readonly: true,
		    showSelectedRating:false
		})
	});
} 

 
//방법2로함
$(".wiDTh1o24.mainBody .nolGoItem").each(function(){
var $ratingList = $(this).find(".averageRatingOptionList");
$ratingList.barrating({
  theme: 'fontawesome-stars',
  initialRating: $ratingList.data("rating"),
  readonly: true,
  showSelectedRating:false
})
});
</script>
</body>
</html>
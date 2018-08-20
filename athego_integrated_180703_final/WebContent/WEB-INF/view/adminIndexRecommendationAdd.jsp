<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>관리자 - 신고</title>
<!-- Bootstrap core CSS-->
<link href="/css/admin/bootstrap.min.css" rel="stylesheet">
<!-- Custom fonts for this template-->
<link href="/css/admin/font-awesome.css" rel="stylesheet">
<!-- Custom styles for this template-->
<link href="/css/admin/sb-admin.css" rel="stylesheet">
<link href="/css/paginate.css" rel="stylesheet">
<link href="/css/fontawesome-all.css" rel="stylesheet" />

<style>
th {
	text-align: center;
}
th.no {
	width: 70px;
}
th.categoryName {
	width: 100px;
} 
th.title {
	cursor: pointer;
	width: 220px;
}
th.regdate {
	width: 150px;
}
tr>td:nth-child(1) {
	text-align: center;
}
td>input[type="checkbox"] {
	cursor:pointer;
}
th.keyword {
	width: 130px;
}
th.nolgoNos {
	width: 100px;
}
th.currentOrder {
	width: 100px;
}
th.setOrder {
	width: 120px;
}
th.delete {
	width: 100px;
}
th.count,
th.score {
	width:74px;
}
td.relInfo {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
a {
	color:#424242;
}
.textCenter {
	text-align: center;
}


</style>

</head>
<body class="fixed-nav sticky-footer bg-dark" id="page-top">
	<!-- Navigation-->
	<c:import url="/WEB-INF/view/template/adminHeader.jsp"></c:import>
	<c:set var="nowDate">
		<fmt:formatDate value="${now}" pattern="yyyy/MM/dd HH:mm" />
	</c:set>
	<div class="content-wrapper">
		<div class="container-fluid">
			<!-- Breadcrumbs-->
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/admin">메인</a></li>
				<li class="breadcrumb-item active">인덱스 추천 추가</li>
			</ol>
			<div class="row">
				<div class="col-12">
					<div class="card mb-3">
						<div class="card-header">
							<i class="fa fa-table"></i> 추천 설정
						</div>						
						<div class="card-body">
							<div>
								<p class="bg-info" style="padding:15px;color:#fff">인덱스 페이지에 추가할 놀곳 과 테마를 설정할 수 있습니다.</p>
							</div>							
							<form action="" method="get" id="search_nolgo">
							</form>
								<div class="input-group mb-3">
	  								<div class="input-group-prepend">
	    								<span class="input-group-text" id="basic-addon3">키워드</span>
	  								</div>
	  								<input value="${keyword }" type="text" class="form-control" name="keyword" id="serch_input" aria-describedby="basic-addon3">
	  								<button id="search_nolgo_btn" class="btn btn-primary btn-lg">검색</button>
	  							</div>  																					
							<div class="table-responsive">
								<table class="table table-bordered table-hover" id="dataTable" width="100%"
									cellspacing="0">
									<thead>
										<tr>
											<th class="no">번호</th>
											<th class="categoryName">1차</th>
											<th class="title">타이틀</th>
											<th>추천 태그</th>
											<th class="score">평점</th>
											<th class="count">평점수</th>
											<th class="count">리뷰수</th>
											<th class="regdate">등록일</th>
										</tr>
									</thead>
									<tbody>
									 <c:forEach items="${nolgos }" var="nolgo">
										<tr>												
											<td><input type="checkbox" name="checkedIndexRecom" value="${nolgo.no}" /></td>
											<td>${nolgo.categoryName} </td>
											<td class="title">${nolgo.name}</td>																								
											<td class="relInfo">${nolgo.relinfo}</td>
											<td class="textCenter">${nolgo.avgScore}</td>
											<td class="textCenter">${nolgo.ratingCnt}</td>
											<td class="textCenter">${nolgo.reviewCnt}</td>
											<td>
											<c:set var = "regdateLength" value="${fn:length(nolgo.regdate.toString()) - 5}"/>
											<c:set var = "regdate" value = "${fn:substring(nolgo.regdate, 0, regdateLength)}" />												
											${regdate}
											</td>
										</tr>
									</c:forEach>
									</tbody>
								</table>
								${paginate}
							</div>
							<div class="input-group mb-3">
  								<div class="input-group-prepend">
    								<span class="input-group-text" >테마 재정의</span>
  								</div>
  								<input type="text" class="form-control" id="theme_input" aria-describedby="basic-addon3">
  								<button class="btn btn-danger btn-lg" id="register_recom_btn">등록</button>
							</div>
							<div class="table-responsive">
								<table class="table table-bordered table-hover"  width="100%"
									cellspacing="0">
									<thead>
										<tr>									
											<th class="currentOrder">현재 순위</th>		
											<th class="keyword">키워드</th>
											<th>테마명</th>
											<th class="nolgoNos">놀고 번호</th>
											<th class="setOrder">순위 설정</th>
											<th class="delete">삭제</th>
										</tr>
									</thead>
									<tbody>
									 <c:forEach items="${indexRecommendations }" var="indexRecommendation">
										<tr>
											<td class="textCenter">${indexRecommendation.orderNo}</td>																						
											<td class="title">${indexRecommendation.keyword} </td>
											<td class="title">${indexRecommendation.title}</td>																								
											<td class="textCenter">${indexRecommendation.nolgoNos}</td>
											<td class="textCenter updateOrderTd" data-order_no="${indexRecommendation.orderNo}" data-recom_no="${indexRecommendation.no}"><button class="btn btn-info updateOrder" data-order_type="up"><i class="fas fa-arrow-up"></i></button><button class="btn btn-warning updateOrder" data-order_type="down"><i class="fas fa-arrow-down"></i></button></td>
											<td class="textCenter"><button class="btn btn-danger removeRecom" data-recom_no="${indexRecommendation.no}">삭제</button></td>											
										</tr>
									</c:forEach>
									</tbody>
									<tfoot>
										<tr>
											<td colspan="6">전체 추천 테마 (${recomCnt})</td>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>						
						<div class="card-footer small text-muted">업데이트 <c:out value="${nowDate}" /></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<form action="/ajax/admin/index-recommendation-add" method="post" id="update_recom_form">	
		<input type="hidden" name="_method" value="put" />
		<input type="hidden" name="recomNo" value="" />
		<input type="hidden" name="orderNo" value="" />
		<input type="hidden" name="orderType" value="" />
	</form>
	<!-- review Modal -->
	
	<div id="content_modal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
		aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title"><a href="" target="_blank"></a></h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>					
				</div>
				<div class="modal-body" id="">        			
      			</div>
      			<div class="modal-footer">
      				<button type="button" data-content_type="" data-_no ="" class="btn btn-primary" id="delete_btn">삭제</button>
      				<button type="button" class="btn btn-warning">숨김</button>
        			<button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>        			
      			</div>
			</div>
		</div>
	</div>

	<c:import url="/WEB-INF/view/template/adminFooter.jsp"></c:import>
	<!-- Bootstrap core JavaScript-->
	<script src="/js/jquery.min.js"></script>
	<script src="/js/admin/bootstrap.bundle.min.js"></script>
	<!-- Core plugin JavaScript-->
	<script src="/js/admin/jquery.easing.min.js"></script>
	<!-- Custom scripts for all pages-->
	<script src="/js/admin/sb-admin.js"></script>	
	<script>
		var nolgo = ${nolgosJson }; 
		var recomCnt = ${recomCnt };
		var $update_recom_form = $('#update_recom_form');
		var $register_recom_btn = $('#register_recom_btn');
		var $theme_input = $('#theme_input');
		var recomCnt = ${recomCnt};
		
		//모달 오픈
		$(".modalBtn").on("click", function (e) {
			var no = $(this).data("no");
			var contentType = $(this).data("content_type");
			$.ajax({
				url: "/ajax/"+ contentType + "/" + no,
				type: "get",
				error: function (xhr, err, code) {
					alert(err);
				},
				success: function (data) {					
					console.log(data);					
					if (!data.isNull) {
						var typeName = contentType == "review" ? "리뷰" : "평점" ;
						$(".modal-title>a").text(data.nolgo.name + "  [" + typeName + "]");
						$(".modal-title>a").attr("href","/nolgo/" + data[contentType].nolgoNo);
						var title = typeof data[contentType].title == "undefined" ? "평점 > " + data[contentType].score + "점" 
								: "제목 > " + data[contentType].title ;
						var titleElement = $("<h5></h5>").text(title);
						var contentElement = $("<div></div>").html(data[contentType].content);
						
						var tags = "";
						$.each(data.tags, function (each, value) {
							tags += "#" + value.content + " "; 
						})
						var tagElement = $("<div></div>").text(tags);
						var userNameElement = $('<div class="float-xl-right font-weight-bold"></div>').text("닉네임 :  " + data.user.nickname);
						var $modalBody = $(".modal-body");
						$modalBody.html(titleElement);						
						$modalBody.append(contentElement);
						$modalBody.append(tagElement);
						$modalBody.append(userNameElement);
						
						var $content_model = $("#content_modal");
						$content_model.modal('show');	
						
						$content_model.data("content_type", contentType);
						$content_model.data("no", no);
					} else {
						alert("정보가 삭제되었거나 존재 하지 않습니다.");
					}//end if							
				}//end success
			})//end ajax
			e.preventDefault();				
		})	
	
	var $search_nolgo = $("#search_nolgo");
	var $serch_input = $("#serch_input");
	
	$("#search_nolgo_btn").on("click", function () {		
		submitSearch();
	});
	$serch_input.on("keyup", function (e) {
		if(e.keyCode == 13) {
			submitSearch();	
		}		
	});
	function submitSearch() {
		var keyword = $serch_input.val();
		var action = "/admin/index-recommendation-add/" + keyword;
		$search_nolgo.attr("action", action);
		$search_nolgo.submit();
	}
	
	//추천 등록
	$register_recom_btn.on("click", function () {		
		var theme = $theme_input.val();
		$theme_input.val("");
		console.log(theme);
		
		var checkedLength = $("input[type=checkbox]:checked").length;
		
		if(checkedLength !== 3) {
			alert("반드시 3개의 컨텐츠를 선택하세요");
			return false;
		}
		
		if(theme.length === 0) {
			alert("추천할 테마명을 입력하세요");
			return false;
		}
		
		var nolgoNoArr = [];
		$("input[type=checkbox]:checked").each(function() {
			//console.log($(this).val());
			nolgoNoArr.push($(this).val());
		});
		
		var nolgoNos = nolgoNoArr.join(",");
		
		var dataSet = {
				title : theme,
				keyword : $serch_input.val(),
				nolgoNos : nolgoNos,
				orderNo : recomCnt + 1
				}
		console.log(dataSet);
		$.ajax({
	           type: "post",
	           url: $update_recom_form.attr("action"),
	           data: dataSet, 
	           success: function(data){
	               //alert(data); // show response from the php script.
	        	   location.reload();
	           }//end succ
         });//end ajax
	})//end click
	
	$('.updateOrder').on("click", function () {
		var $this = $(this);
		var orderType = $this.data("order_type");
		var orderNo = $this.parents('.updateOrderTd').data("order_no");
		var recomNo = $this.parents('.updateOrderTd').data("recom_no");
		console.log("orderType:", orderType);
		console.log("orderNo:", orderNo);
		console.log("recomNo:", recomNo);
		
		if((orderNo == recomCnt && orderType === 'down') 
				|| (orderNo === 1 && orderType === 'up') ) {
			alert("순서를 더이상 변경 할 수 없습니다.");
			return false;
		}//end if
		
		$update_recom_form.find("input[name='recomNo']").val(recomNo);
		$update_recom_form.find("input[name='orderNo']").val(orderNo);
		$update_recom_form.find("input[name='orderType']").val(orderType);
		//$update_recom_form.submit();
		var dataSet = {
				recomNo : recomNo,
				orderNo : orderNo,
				orderType : orderType
		}
		$.ajax({
	           type: "put",
	           url: $update_recom_form.attr("action"),
	           data: JSON.stringify(dataSet), // serializes the form's elements.
	           success: function(data){
	               //alert(data); // show response from the php script.
	        	   location.reload();
	           }
	         });
	})//end click
	
	$('.removeRecom').on("click", function () {
		var $this = $(this);		 
		var recomNo = $this.data("recom_no");		
		console.log("recomNo:", recomNo);
		
		$.ajax({
	           type: "delete",
	           url: $update_recom_form.attr("action") + "/" + recomNo,
	           success: function(data){
	               //alert(data); // show response from the php script.
	        	   location.reload();
	           }
	         });
	})//end click
	</script>
</body>
</html>
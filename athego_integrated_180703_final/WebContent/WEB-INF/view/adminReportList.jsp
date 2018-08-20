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
th.contentType {
	width: 60px;
}
th.status {
	width:140px;
}
th.contentNo {
	width: 110px;
}
th.regdate {
	width: 150px;
}
tr>td:nth-child(1) {
	text-align: center;
}
tr>td:nth-child(2) {
	text-align: center;
}

a {
	color:#424242;
}


</style>

</head>
<body class="fixed-nav sticky-footer bg-dark" id="page-top">
	<!-- Navigation-->
	<c:import url="/WEB-INF/view/template/adminHeader.jsp"></c:import>
	<div class="content-wrapper">
		<div class="container-fluid">
			<!-- Breadcrumbs-->
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/admin">메인</a></li>
				<li class="breadcrumb-item active">신고 목록 페이지</li>
			</ol>
			<div class="row">
				<div class="col-12">
					<div class="card mb-3">
						<div class="card-header">
							<i class="fa fa-table"></i> 신고 목록
						</div>						
						<div class="card-body">
							<div>
								<p class="bg-info" style="padding:15px;color:#fff">종류 > N:놀고, V:리뷰, R:평점</p>
							</div>
							<div class="table-responsive">
								<table class="table table-bordered table-hover" id="dataTable" width="100%"
									cellspacing="0">
									<thead>
										<tr>
											<th class="no">번호</th>
											<th class="contentType">종류</th>
											<th class="status">상태</th>
											<th>내용</th>
											<th class="contentNo">컨텐츠 번호</th>
											<th class="regdate">등록일</th>
										</tr>
									</thead>
									<tbody>
										<c:forEach items="${reports }" var="report">
											<tr>												
												<td>${report.no}</td>
												<td>${report.type}</td>
												<td>
												<c:choose>
													<c:when test="${report.status eq '0'}">
														<c:set value="bg-danger text-white" var="selectBoxClass"/>
													</c:when>
													<c:when test="${report.status eq '5'}">
														<c:set value="bg-info text-white" var="selectBoxClass"/>
													</c:when>
													<c:otherwise>
														<c:set value="bg-secondary text-white" var="selectBoxClass"/>
													</c:otherwise>
												</c:choose>
												<div class="form-group">
													<select class="form-control reportStatus ${selectBoxClass }" data-no="${report.no}">
	  													<option data-status="0" <c:if test="${report.status eq '0'}">selected</c:if> >접수</option>
	  													<option data-status="5" <c:if test="${report.status eq '5'}">selected</c:if>>처리중</option>
	  													<option data-status="9" <c:if test="${report.status eq '9'}">selected</c:if>>처리완료</option>
													</select>			
												</div>								
												</td>
												<td>${report.content}</td>
												<td>
													<c:choose>
														<c:when test="${report.type eq 'R'}">
															<a href="" class="btn btn-dark modalBtn" data-no="${report.contentNo}" data-content_type="rating">평점 보기</a>
														</c:when>
														<c:when test="${report.type eq 'V'}">
															<a href=""  class="btn btn-dark modalBtn" data-no="${report.contentNo}" data-content_type="review">리뷰 보기</a>
														</c:when>
														<c:otherwise>
															<a href="/nolgo/${report.contentNo}" target="_blank" class="btn btn-dark">놀고 보기</a>
														</c:otherwise>
													</c:choose>
												</td>
												<td>
												<c:set var = "regdateLength" value="${fn:length(report.regdate.toString()) - 7}"/>
												<c:set var = "regdate" value = "${fn:substring(report.regdate, 0, regdateLength)}" />												
												${regdate}
												</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
						${paginate}
						<div class="card-footer small text-muted">Updated yesterday
							at 11:59 PM</div>
					</div>
				</div>
			</div>
		</div>
	</div>

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
		
		//상태를 변경 할때
		$(".reportStatus").on("change", function () {
			console.log("reportStatus");
			var optionSelected = $("option:selected", this);
		    //var valueSelected = this.value;1
		    var reportStatus = $(optionSelected).data("status");
		    var reportNo = $(this).data("no");
		    console.log(reportStatus,":" ,reportNo);
		    
		    $.ajax({
		    	url: "/ajax/report/" + reportNo,
		    	data: JSON.stringify({"status" : reportStatus }),
		    	type: "put",
		    	error:function(x,e) { console.log(e); },
		    	success:function(data) {
		    		console.log(data);	
		    		
		    		if (!data.isSucc) {
		    			alert(data.msg);
		    		} else {
		    			alert("신고 상태가 변경 되었습니다.");
		    			location.reload();
		    		}//end if else
		    	}//end success
		    })//end ajax
		})//end
		
		//삭제를 시도 할때
		$("body").on("click", "#delete_btn", function () {
			console.log("delete");
			var $content_model = $("#content_modal");
			var contentType = $content_model.data("content_type");
			var no = $content_model.data("no");
			
		    $.ajax({
		    	url: "/ajax/" + contentType + "/" + no,		    	
		    	type: "delete",
		    	error:function(x,e) { console.log(e); },
		    	success:function(data) {
		    		console.log(data);	
		    		
		    		if (data) {
		    			alert("정상적으로 삭제 되었습니다.");
		    		}//end if 
		    	}//end success
		    })//end ajax
		})//end
	</script>
</body>
</html>
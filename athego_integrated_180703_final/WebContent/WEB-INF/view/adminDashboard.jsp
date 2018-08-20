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
<title>관리자 - 대시보드</title>
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
	width: 140px;
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
	color: #424242;
}

.fixHeight {
	height: 260px;
}

.card-img-top {
	height: 240px;
}
p.card-text.small {
	max-width: 330px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

</head>
<body class="fixed-nav sticky-footer bg-dark" id="page-top">
	<!-- Navigation-->
	<c:import url="/WEB-INF/view/template/adminHeader.jsp"></c:import>
	<c:set var="now" value="<%=new java.util.Date()%>" />
	<c:set var="nowDate">
		<fmt:formatDate value="${now}" pattern="yyyy/MM/dd HH:mm" />
	</c:set>
	<div class="content-wrapper">
		<div class="container-fluid">
			<!-- Breadcrumbs-->
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="/admin">메인</a></li>
				<li class="breadcrumb-item active">대시보드</li>
			</ol>
			<!-- Icon Cards-->
			<div class="mb-0 mt-4">
            	<i class="fas fa-chart-pie"></i> 누적 정보</div>
          	<hr class="mt-2">
			<div class="row">
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="card text-white bg-warning o-hidden h-100">
						<div class="card-body">
							<div class="card-body-icon">
								<i class="fa fa-fw fa-map-marker-alt"></i>
							</div>
							<div class="mr-5">총 놀곳 갯수 25,056</div>
						</div>
						<a class="card-footer text-white clearfix small z-1" href="/admin/nolgo/page/1">
							<span class="float-left">상세보기</span> <span class="float-right">
								<i class="fa fa-angle-right"></i>
						</span>
						</a>
					</div>
				</div>
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="card text-white bg-primary o-hidden h-100">
						<div class="card-body">
							<div class="card-body-icon">
								<i class="fas fa-fw fa-star"></i>
							</div>
							<div class="mr-5">총 평점 갯수 222,226</div>
						</div>
						<a class="card-footer text-white clearfix small z-1" href="#">
							<span class="float-left">상세보기</span> <span class="float-right">
								<i class="fa fa-angle-right"></i>
						</span>
						</a>
					</div>
				</div>
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="card text-white bg-success o-hidden h-100">
						<div class="card-body">
							<div class="card-body-icon">
								<i class="fas fa-fw fa-newspaper"></i>
							</div>
							<div class="mr-5">총 리뷰 갯수 91,986</div>
						</div>
						<a class="card-footer text-white clearfix small z-1" href="#">
							<span class="float-left">상세보기</span> <span class="float-right">
								<i class="fa fa-angle-right"></i>
						</span>
						</a>
					</div>
				</div>
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="card text-white bg-danger o-hidden h-100">
						<div class="card-body">
							<div class="card-body-icon">
								<i class="fas fa-users fa-fw"></i>
							</div>
							<div class="mr-5">총 유저 수 39,897</div>
						</div>
						<a class="card-footer text-white clearfix small z-1" href="#">
							<span class="float-left">상세보기</span> <span class="float-right">
								<i class="fa fa-angle-right"></i>
						</span>
						</a>
					</div>
				</div> 
			</div>
			<div class="mb-0 mt-4">
				<i class="fa fa-map-marker-alt"></i> 실시간 인기 컨텐츠
			</div>
			<hr class="mt-2">
			<div class="card-deck">
				<c:forEach items="${nolgos }" var="nolgo" begin="1" end="4" step="1">
					<c:set var="pictures" value="${fn:split(nolgo.pictures,',')}" />
					<div class="card mb-4">
						<a href="/nolgo/${nolgo.no }"> <img
							class="card-img-top img-fluid"
							src="/img/<c:out value="${pictures[0]}" />" alt="">
						</a>
						<div class="card-body">
							<h6 class="card-title mb-1">
								<a href="#">${nolgo.name }</a> <i
									class="fas fa-heart text-danger"></i>(${nolgo.ratingCnt })
							</h6>
							<p class="card-text small">${nolgo.relinfo }</p>
						</div>
					</div>
				</c:forEach>
			</div>
			<div class="card mb-3">
				<div class="card-header">
					<i class="fa fa-area-chart"></i> 등록되는 컨텐츠 추이
				</div>
				<div class="card-body">
					<div class="row">
						<div class="col-sm-10 my-auto fixHeight">
							<canvas id="content_chart" width="100" height="50"></canvas>
						</div>
						<div class="col-sm-2 text-center my-auto">
							<div class="h4 mb-0 text-primary">34,693</div>
							<div class="small text-muted">놀곳</div>
							<hr>
							<div class="h4 mb-0 text-warning">18,474</div>
							<div class="small text-muted">평점</div>
							<hr>
							<div class="h4 mb-0 text-success">16,219</div>
							<div class="small text-muted">리뷰</div>
						</div>
					</div>
				</div>
				<div class="card-footer small text-muted">
					업데이트
					<c:out value="${nowDate}" />
				</div>
			</div>
			<div class="card mb-3">
				<div class="card-header">
					<i class="fa fa-bar-chart"></i> 유저 가입 탈퇴 추이
				</div>
				<div class="card-body fixHeight">
					<canvas id="user_chart" width="100%" height="30"></canvas>
				</div>				
				<div class="card-footer small text-muted">
					업데이트
					<c:out value="${nowDate}" />
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
	<script src="/js/admin/Chart.js"></script>
	<script>
		var joinUserData = [ randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor() ]
		var exitUserData = [ randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor() ]
		var sampleData = [ randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor(), randomScalingFactor(),
				randomScalingFactor() ]
		var barChartData = {
			labels : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월' ],
			datasets : [ {
				label : '가입',
				backgroundColor : 'rgba(0, 123, 255, 0.5)',
				data : joinUserData
			}, {
				label : '탈퇴',
				backgroundColor : 'rgba(213, 52, 66, 0.5)',
				data : exitUserData
			} ]

		};

		var userChart = document.getElementById('user_chart').getContext('2d');
		userChart.height = 240;
		var uc = new Chart(userChart, {
			type : 'bar',
			data : barChartData,
			options : {
				title : {
					display : true,
					text : '유저 가입 탈퇴 추이'
				},
				tooltips : {
					mode : 'index',
					intersect : false
				},
				maintainAspectRatio : false,
				responsive : true,
				scales : {
					xAxes : [ {
						stacked : true,
					} ],
					yAxes : [ {
						stacked : true
					} ]
				}
			}
		});

		function randomScalingFactor() {
			var n = Math.floor(Math.random() * 100) + 1;
			console.log(n);
			return n;
		};

		var lineChartData = {
			labels : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월' ],
			datasets : [ {
				label : '놀곳',
				backgroundColor : 'rgba(0, 123, 255, 0.4)',
				data : joinUserData
			}, {
				label : '평점',
				backgroundColor : 'rgba(255, 193, 7, 0.4)',
				data : exitUserData
			}, {
				label : '리뷰',
				backgroundColor : 'rgba(40, 167, 69, 0.4)',
				data : sampleData
			} ]

		};

		var contentChart = document.getElementById('content_chart').getContext(
				'2d');
		//contentChart.height = 240;
		var lc = new Chart(contentChart, {
			type : 'line',
			data : lineChartData,
			options : {
				title : {
					display : true,
					text : '컨텐츠 등록 추이'
				},
				tooltips : {
					mode : 'index',
					intersect : false
				},
				maintainAspectRatio : false,
				responsive : true,
				scales : {
					xAxes : [ {
						display : true,
						scaleLabel : {
							display : true,
							labelStringL : 'Month'
						}
					} ],
					yAxes : [ {
						display : true,
						scaleLabel : {
							display : true,
							labelStringL : 'Value'
						}
					} ]
				}
			}
		});
	</script>
</body>
</html>
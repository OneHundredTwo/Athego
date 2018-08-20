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
footer.sticky-footer {
	width: 100%;
}

</style>

</head>
<body class="fixed-nav sticky-footer bg-dark" id="page-top">
	<!-- Navigation-->
	 <div class="container">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">관리자 로그인</div>
      <div class="card-body">
        <form action="/admin/session" method="post">
          <div class="form-group">
            <label for="exampleInputEmail1">이메일</label>
            <input class="form-control" id="exampleInputEmail1" type="email" name="email" aria-describedby="emailHelp" placeholder="이메일 입력">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">비밀번호</label>
            <input class="form-control" id="exampleInputPassword1" name="password" type="password" placeholder="비밀번호 입력">
          </div>
          <div class="form-group">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> 비밀번호 기억</label>
            </div>
          </div>
          <c:if test="${msg ne null}">
	          <div class=" p-3 mb-2 bg-danger text-white">	          
	          	${msg}
	          </div>
          </c:if>
          <button class="btn btn-primary btn-block" >로그인</button>
        </form>
        <div class="text-center">
          
        </div>
      </div>
    </div>
  </div>
    <footer class="sticky-footer">
      <div class="container">
        <div class="text-center">
          <small>Copyright © HEXA CORE 2018</small>
        </div>
      </div>
    </footer>
	<!-- Bootstrap core JavaScript-->
	<script src="/js/jquery.min.js"></script>
	<script src="/js/admin/bootstrap.bundle.min.js"></script>
	<!-- Core plugin JavaScript-->
	<script src="/js/admin/jquery.easing.min.js"></script>
	<!-- Custom scripts for all pages-->
	<script src="/js/admin/sb-admin.js"></script>
	<script>
		 
	</script>
</body>
</html>
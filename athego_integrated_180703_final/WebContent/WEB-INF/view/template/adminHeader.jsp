<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%-- adminTemplate.jsp start --%>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="/admin">관리자 페이지</a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="대시보드">
          <a class="nav-link" href="/admin">
            <i class="fas fa-chart-line fa-fw"></i>
            <span class="nav-link-text">대시보드</span>
          </a>
        </li>        
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="신고 목록">
          <a class="nav-link" href="/admin/report/page/1">
            <i class="fa fa-fw fa-exclamation-triangle"></i>
            <span class="nav-link-text">신고 목록 (1,012)</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="놀고 목록">
          <a class="nav-link" href="/admin/nolgo/page/1">
            <i class="fas fa-map-marker-alt fa-fw"></i>
            <span class="nav-link-text">놀고 목록 (25,056)</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="평점 목록">
          <a class="nav-link" href="#">
            <i class="fas fa-star fa-fw"></i>
            <span class="nav-link-text">평점 목록 (222,226)</span>
          </a>
        </li>
         <li class="nav-item" data-toggle="tooltip" data-placement="right" title="리뷰 목록">
          <a class="nav-link" href="#">
            <i class="fas fa-newspaper fa-fw"></i>
            <span class="nav-link-text">리뷰 목록 (91,986)</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="유저 목록">
          <a class="nav-link" href="#">
            <i class="fas fa-users fa-fw"></i>
            <span class="nav-link-text">유저 목록 (39,897)</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="설정">
          <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion">
            <i class="fa fa-fw fa-wrench"></i>
            <span class="nav-link-text">설정</span>
          </a>
          <ul class="sidenav-second-level collapse" id="collapseComponents">
            <li>
              <a href="/admin/index-recommendation-add">인덱스 추천</a>
            </li>
            <li>
              <a href="#">관리자 설정</a>
            </li>
          </ul>
        </li>       
      </ul>
      <ul class="navbar-nav sidenav-toggler">
        <li class="nav-item">
          <a class="nav-link text-center" id="sidenavToggler">
            <i class="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-fw fa-envelope"></i>
            <span class="d-lg-none">문의
              <span class="badge badge-pill badge-primary">12 New</span>
            </span>
            <span class="indicator text-primary d-none d-lg-block">
              <i class="fa fa-fw fa-circle"></i>
            </span>
          </a>
          <div class="dropdown-menu" aria-labelledby="messagesDropdown" style="left:-292px">
            <h6 class="dropdown-header">새 문의</h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <strong>가자즈아</strong>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <strong>유럽매니아</strong>
              <span class="small float-right text-muted">10:15 AM</span>
              <div class="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <strong>잔잔바리</strong>
              <span class="small float-right text-muted">09:41 AM</span>
              <div class="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item small" href="#">문의 더보기</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-fw fa-bell"></i>
            <span class="d-lg-none">알림
              <span class="badge badge-pill badge-warning">6 New</span>
            </span>
            <span class="indicator text-warning d-none d-lg-block">
              <i class="fas fa-fw fa-circle"></i>
            </span>
          </a>
          <div class="dropdown-menu" aria-labelledby="alertsDropdown" style="left:-292px">
            <h6 class="dropdown-header">새 알림:</h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <span class="text-success">
                <strong>
                  <i class="fas fa-long-arrow-up fa-fw"></i>Status Update</strong>
              </span>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <span class="text-danger">
                <strong>
                  <i class="fas fa-long-arrow-down fa-fw"></i>Status Update</strong>
              </span>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <span class="text-success">
                <strong>
                  <i class="fas fa-long-arrow-up fa-fw"></i>Status Update</strong>
              </span>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item small" href="#">알림 더보기</a>
          </div>
        </li>
         
        <li class="nav-item">
          <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
            <i class="fas fa-sign-out-alt"></i> 로그아웃</a>
        </li>
      </ul>
    </div>
  </nav>
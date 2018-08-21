# AtheGo
![어디고](https://github.com/OneHundredTwo/Athego/blob/master/img/intro.png "athego") 

> 세상의 모든 놀 곳 정보를 제공하고, 서로 공유하는 사이트입니다

## 개발 환경
* **개발언어** : JAVA 8, HTML5, javascript, css, JSP(el, jstl)
* **WAS** : Apache Tomcat 8.5
* **Server Framework** : Spring 5, Spring web MVC 5, Mybatis 3.4
* **IDE** : Eclipse 4.7 Oxygen, Web Storm 
* **OS** : windows 10
* **DBMS** : Oracle 11g SE

## 개발 파트
### 관광청 Open API와 연동하여 놀 곳 데이터 수집 및 가공
* 국문 관광정보 서비스 API를 이용해 전국의 관광지 정보를 수집(test프로젝트 NolgoDummyCreator.java)
* Nolgo 테이블 스키마와 API response 메세지 필드들을 매핑할 수 있도록 가공하여 Insert문 생성(DB_sql/Nolgos_Base_Data.sql)
* api key의 expire와 수집대상 지역에따라 유연하게 작동하도록 코드 작성 
![NolgoDummyCreator.java 작동모습](https://github.com/OneHundredTwo/Athego/blob/master/img/NolgoDummyCreator_operating.png "NolgoDummyCreator.java 작동모습")

### 지역정보 수집 및 지역선택 API 개발
* [도로명주소 개발자 센터](https://www.juso.go.kr/addrlink/main.do)에서 제공하는 주소 DB데이터를 가공하여 Athego 내에서 활용할 수 있도록 Location테이블에 할당
* 검색 필터링 컴포넌트 및 회원가입에 적용한 지역선택 API 개발
![Athego Location select API pigure](https://github.com/OneHundredTwo/Athego/blob/master/img/area_select.png "지역선택 API 작동 도식")

### 검색
* **검색 필터링 컴포넌트 개발** 

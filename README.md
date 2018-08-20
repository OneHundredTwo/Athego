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
![](https://github.com/OneHundredTwo/Athego/blob/master/img/NolgoDummyCreator_operating.png)
* 국문 관광정보 서비스 API를 이용해 전국의 관광지 정보를 수집(test프로젝트 NolgoDummyCreator.java)
* Nolgo 테이블 스키마와 API response 메세지 필드들을 가공하여 Insert문 생성(DB_sql/Nolgos_Base_Data.sql)


### 검색

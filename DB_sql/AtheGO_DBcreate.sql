/* PART0 INITAILIZATION(DROP TABLE, DROP SEQUENCE) */
/* PART1 TABLE CREATE */
/* PART2 SEQUENE CREATE */
/* PART3 ALTER TABLE */
/* 수정이 필요한 파트는 PART[N] 으로 검색해서 접근하세요*/


/* PART0 INITAILIZATION(DROP TABLE, DROP SEQUENCE) */

/*DROP TABLE AND SEQUENCE*/
DROP SEQUENCE "CATEGORIES_SEQ";
DROP SEQUENCE "CONFIRMS_SEQ";
DROP SEQUENCE "CONVENIENTS_SEQ";
DROP SEQUENCE "FOLLOWS_SEQ";
DROP SEQUENCE "INTEREST_CATEGORIES_SEQ";
DROP SEQUENCE "INTEREST_LOCATIONS_SEQ";
DROP SEQUENCE "LIKINGS_SEQ";
DROP SEQUENCE "LOCATIONS_SEQ";
DROP SEQUENCE "MENUES_SEQ";
DROP SEQUENCE "NOLGOS_SEQ";
DROP SEQUENCE "NOLGO_CONVENIENTS_SEQ";
DROP SEQUENCE "RATINGS_SEQ";
DROP SEQUENCE "REPORTS_SEQ";
DROP SEQUENCE "REVIEWS_SEQ";
DROP SEQUENCE "SUB_CATEGORIES_SEQ";
DROP SEQUENCE "TAGS_SEQ";
DROP SEQUENCE "USERS_SEQ";
DROP TABLE "CATEGORIES" CASCADE CONSTRAINTS;
DROP TABLE "CONFIRMS" CASCADE CONSTRAINTS;
DROP TABLE "CONVENIENTS" CASCADE CONSTRAINTS;
DROP TABLE "FOLLOWS" CASCADE CONSTRAINTS;
DROP TABLE "INTEREST_CATEGORIES" CASCADE CONSTRAINTS;
DROP TABLE "INTEREST_LOCATIONS" CASCADE CONSTRAINTS;
DROP TABLE "LIKINGS" CASCADE CONSTRAINTS;
DROP TABLE "LOCATIONS" CASCADE CONSTRAINTS;
DROP TABLE "MENUES" CASCADE CONSTRAINTS;
DROP TABLE "NOLGOS" CASCADE CONSTRAINTS;
DROP TABLE "NOLGO_CONVENIENTS" CASCADE CONSTRAINTS;
DROP TABLE "RATINGS" CASCADE CONSTRAINTS;
DROP TABLE "REPORTS" CASCADE CONSTRAINTS;
DROP TABLE "REVIEWS" CASCADE CONSTRAINTS;
DROP TABLE "SUB_CATEGORIES" CASCADE CONSTRAINTS;
DROP TABLE "TAGS" CASCADE CONSTRAINTS;
DROP TABLE "USERS" CASCADE CONSTRAINTS;


/* PART1 TABLE CREATE */
/* 사용자 */
CREATE TABLE users (
	no NUMBER NOT NULL, /* 번호 */
	email VARCHAR2(100) NOT NULL, /* 이메일 */
	password VARCHAR2(16) NOT NULL, /* 비밀번호 */
	nickname VARCHAR2(30) NOT NULL, /* 닉네임 */
	birthdate DATE, /* 생년월일 */
	phone VARCHAR2(13), /* 전화번호 */
	gender CHAR(1), /* 성별 */
	introduce VARCHAR2(400), /* 소개말 */
	profile VARCHAR2(40), /* 프로필사진 */
	cover VARCHAR2(40), /* 커버사진 */
	is_confirm NUMBER(1) NOT NULL, /* 인증여부 */
	role NUMBER(2) NOT NULL, /* 관리자여부 */
	follower_cnt NUMBER NOT NULL, /* 팔로워 수 */
	following_cnt NUMBER NOT NULL, /* 팔로잉 수 */
	regdate TIMESTAMP NOT NULL /* 등록날짜 */
);

CREATE UNIQUE INDEX PK_users
	ON users (
		no ASC
	);

ALTER TABLE users
	ADD
		CONSTRAINT PK_users
		PRIMARY KEY (
			no
		);

/* 놀곳 */
CREATE TABLE nolgos (
	no NUMBER NOT NULL, /* 번호 */
	name VARCHAR2(400) NOT NULL, /* 이름 */
	address VARCHAR2(400) NOT NULL, /* 상세 주소 */
	relinfo VARCHAR2(400), /* 관련 정보 */
	pictures VARCHAR2(200), /* 사진 */
	off_day VARCHAR2(400), /* 휴무일 */
	open_time TIMESTAMP, /* 시작 영업시간 */
	close_time TIMESTAMP, /* 종료 영업시간 */
	stay_time varchar2(4), /* 체류 시간 */
	phone VARCHAR2(13), /* 전화번호 */
	min_budget NUMBER, /* 최저예산 */
	max_budget NUMBER, /* 최고예산 */
	lat VARCHAR2(30) NOT NULL, /* 위도 */
	lng VARCHAR2(30) NOT NULL, /* 경도 */
	content CLOB, /* 상세 내용 */
	avg_score NUMBER(3,2) NOT NULL, /* 평균 별점 */
	review_cnt NUMBER NOT NULL, /* 리뷰 수 */
	rating_cnt NUMBER NOT NULL, /* 평점 수 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	category_no NUMBER NOT NULL, /* 대분류 번호 */
	location_no NUMBER NOT NULL, /* 주소 번호 */
	user_no NUMBER NOT NULL, /* 사용자 번호 */
	owner_no NUMBER /* 소유자 번호 */
);

CREATE UNIQUE INDEX PK_nolgos
	ON nolgos (
		no ASC
	);

ALTER TABLE nolgos
	ADD
		CONSTRAINT PK_nolgos
		PRIMARY KEY (
			no
		);

/* 대분류 */
CREATE TABLE categories (
	no NUMBER NOT NULL, /* 번호 */
	name VARCHAR2(400) NOT NULL, /* 이름 */
	sub_category_cnt NUMBER NOT NULL, /* 소분류 수 */
	nolgo_cnt NUMBER NOT NULL, /* 놀곳 수 */
	regdate TIMESTAMP NOT NULL /* 등록날짜 */
);

CREATE UNIQUE INDEX PK_categories
	ON categories (
		no ASC
	);

ALTER TABLE categories
	ADD
		CONSTRAINT PK_categories
		PRIMARY KEY (
			no
		);

/* 소분류 */
CREATE TABLE sub_categories (
	no NUMBER NOT NULL, /* 번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	category_no NUMBER NOT NULL, /* 대분류 번호 */
	tag_no NUMBER NOT NULL, /* 태그 번호 */
	nolgo_no NUMBER NOT NULL /* 놀곳 번호 */
);

CREATE UNIQUE INDEX PK_sub_categories
	ON sub_categories (
		no ASC
	);

ALTER TABLE sub_categories
	ADD
		CONSTRAINT PK_sub_categories
		PRIMARY KEY (
			no
		);

/* 신고 */
CREATE TABLE reports (
	no NUMBER NOT NULL, /* 번호 */
	content VARCHAR2(1000) NOT NULL, /* 내용 */
	type char(1) NOT NULL, /* 타입 */
	content_no NUMBER NOT NULL, /* 컨텐츠번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL /* 사용자번호 */
);

CREATE UNIQUE INDEX PK_reports
	ON reports (
		no ASC
	);

ALTER TABLE reports
	ADD
		CONSTRAINT PK_reports
		PRIMARY KEY (
			no
		);

/* 태그 */
CREATE TABLE tags (
	no NUMBER NOT NULL, /* 번호 */
	content VARCHAR2(30) NOT NULL, /* 내용 */
	type CHAR(1) NOT NULL, /* 타입 */
	content_no NUMBER NOT NULL, /* 컨텐츠번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL /* 사용자번호 */
);

CREATE UNIQUE INDEX PK_tags
	ON tags (
		no ASC
	);

ALTER TABLE tags
	ADD
		CONSTRAINT PK_tags
		PRIMARY KEY (
			no
		);

/* 좋아요 */
CREATE TABLE likings (
	no NUMBER NOT NULL, /* 번호 */
	type CHAR(1) NOT NULL, /* 타입 */
	content_no NUMBER NOT NULL, /* 컨텐츠번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL /* 유저 번호 */
);

CREATE UNIQUE INDEX PK_likings
	ON likings (
		no ASC
	);

ALTER TABLE likings
	ADD
		CONSTRAINT PK_likings
		PRIMARY KEY (
			no
		);

/* 팔로우 */
CREATE TABLE follows (
	no NUMBER NOT NULL, /* 번호 */
	follower_no NUMBER NOT NULL, /* 팔로워번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL /* 사용자번호 */
);

CREATE UNIQUE INDEX PK_follows
	ON follows (
		no ASC
	);

ALTER TABLE follows
	ADD
		CONSTRAINT PK_follows
		PRIMARY KEY (
			no
		);

/* 평점 */
CREATE TABLE ratings (
	no NUMBER NOT NULL, /* 번호 */
	score NUMBER(1) NOT NULL, /* 별점 */
	content VARCHAR2(420), /* 내용 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL, /* 사용자번호 */
	nolgo_no NUMBER NOT NULL /* 놀곳번호 */
);

CREATE UNIQUE INDEX PK_ratings
	ON ratings (
		no ASC
	);

ALTER TABLE ratings
	ADD
		CONSTRAINT PK_ratings
		PRIMARY KEY (
			no
		);

/* 리뷰 */
CREATE TABLE reviews (
	no NUMBER NOT NULL, /* 번호 */
	title VARCHAR2(400) NOT NULL, /* 제목 */
	content CLOB NOT NULL, /* 내용 */
	like_cnt NUMBER NOT NULL, /* 좋아요 수 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL, /* 사용자번호 */
	nolgo_no NUMBER NOT NULL /* 놀곳번호 */
);

CREATE UNIQUE INDEX PK_reviews
	ON reviews (
		no ASC
	);

ALTER TABLE reviews
	ADD
		CONSTRAINT PK_reviews
		PRIMARY KEY (
			no
		);

/* 편의시설 */
CREATE TABLE convenients (
	no NUMBER NOT NULL, /* 번호 */
	name VARCHAR2(400) NOT NULL, /* 이름 */
	regdate TIMESTAMP NOT NULL /* 등록날짜 */
);

CREATE UNIQUE INDEX PK_convenients
	ON convenients (
		no ASC
	);

ALTER TABLE convenients
	ADD
		CONSTRAINT PK_convenients
		PRIMARY KEY (
			no
		);

/* 메뉴 */
CREATE TABLE menues (
	no NUMBER NOT NULL, /* 번호 */
	name VARCHAR2(400) NOT NULL, /* 이름 */
	price NUMBER NOT NULL, /* 가격 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	nolgo_no NUMBER NOT NULL /* 놀곳 번호 */
);

CREATE UNIQUE INDEX PK_menues
	ON menues (
		no ASC
	);

ALTER TABLE menues
	ADD
		CONSTRAINT PK_menues
		PRIMARY KEY (
			no
		);

/* 주소 */
CREATE TABLE locations (
	no NUMBER NOT NULL, /* 번호 */
	code VARCHAR2(8) NOT NULL, /* 행정지역코드 */
	depth1 VARCHAR2(40), /* 시도 */
	depth2 VARCHAR2(40), /* 구군 */
	depth3 VARCHAR2(40), /* 동읍면 */
	depth1_code NUMBER, /* 시도 코드 */
	depth2_code NUMBER, /* 구군 코드 */
	depth3_code NUMBER, /* 동읍면 코드 */
	nolgo_cnt NUMBER NOT NULL, /* 놀곳 수 */
	interest_location_cnt NUMBER NOT NULL, /* 관심지역 수 */
	regdate TIMESTAMP NOT NULL /* 등록날짜 */
);

CREATE UNIQUE INDEX PK_locations
	ON locations (
		no ASC
	);

ALTER TABLE locations
	ADD
		CONSTRAINT PK_locations
		PRIMARY KEY (
			no
		);

/* 관심사 */
CREATE TABLE interest_categories (
	no NUMBER NOT NULL, /* 번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL, /* 유저 번호 */
	category_no NUMBER NOT NULL /* 대분류 번호 */
);

CREATE UNIQUE INDEX PK_interest_categories
	ON interest_categories (
		no ASC
	);

ALTER TABLE interest_categories
	ADD
		CONSTRAINT PK_interest_categories
		PRIMARY KEY (
			no
		);

/* 놀곳_편의시설 */
CREATE TABLE nolgo_convenients (
	no NUMBER NOT NULL, /* 번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	nolgo_no NUMBER NOT NULL, /* 놀곳 번호 */
	convenient_no NUMBER NOT NULL /* 편의시설 번호 */
);

CREATE UNIQUE INDEX PK_nolgo_convenients
	ON nolgo_convenients (
		no ASC
	);

ALTER TABLE nolgo_convenients
	ADD
		CONSTRAINT PK_nolgo_convenients
		PRIMARY KEY (
			no
		);

/* 관심지역 */
CREATE TABLE interest_locations (
	no NUMBER NOT NULL, /* 번호 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL, /* 유저 번호 */
	location_no NUMBER NOT NULL /* 주소 번호 */
);

CREATE UNIQUE INDEX PK_interest_locations
	ON interest_locations (
		no ASC
	);

ALTER TABLE interest_locations
	ADD
		CONSTRAINT PK_interest_locations
		PRIMARY KEY (
			no
		);

/* 인증 */
CREATE TABLE confirms (
	no NUMBER NOT NULL, /* 번호 */
	key CHAR(32) NOT NULL, /* 키 */
	is_confirm NUMBER(1) NOT NULL, /* 확정 */
	time_limit TIMESTAMP NOT NULL, /* 요청시간 */
	regdate TIMESTAMP NOT NULL, /* 등록날짜 */
	user_no NUMBER NOT NULL /* 유저 번호 */
);

CREATE UNIQUE INDEX PK_confirms
	ON confirms (
		no ASC
	);

ALTER TABLE confirms
	ADD
		CONSTRAINT PK_confirms
		PRIMARY KEY (
			no
		);

ALTER TABLE nolgos
	ADD
		CONSTRAINT FK_categories_TO_nolgos
		FOREIGN KEY (
			category_no
		)
		REFERENCES categories (
			no
		);

ALTER TABLE nolgos
	ADD
		CONSTRAINT FK_locations_TO_nolgos
		FOREIGN KEY (
			location_no
		)
		REFERENCES locations (
			no
		);

ALTER TABLE nolgos
	ADD
		CONSTRAINT FK_users_TO_nolgos
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE nolgos
	ADD
		CONSTRAINT FK_users_TO_nolgos2
		FOREIGN KEY (
			owner_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE sub_categories
	ADD
		CONSTRAINT FK_categories_TO_su
		FOREIGN KEY (
			category_no
		)
		REFERENCES categories (
			no
		);

ALTER TABLE sub_categories
	ADD
		CONSTRAINT FK_tags_TO_sub_categories
		FOREIGN KEY (
			tag_no
		)
		REFERENCES tags (
			no
		);

ALTER TABLE sub_categories
	ADD
		CONSTRAINT FK_nolgos_TO_sub_categories
		FOREIGN KEY (
			nolgo_no
		)
		REFERENCES nolgos (
			no
		);

ALTER TABLE reports
	ADD
		CONSTRAINT FK_users_TO_reports
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE tags
	ADD
		CONSTRAINT FK_users_TO_tags
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE likings
	ADD
		CONSTRAINT FK_users_TO_likings
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE follows
	ADD
		CONSTRAINT FK_users_TO_follows
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE ratings
	ADD
		CONSTRAINT FK_users_TO_ratings
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE ratings
	ADD
		CONSTRAINT FK_nolgos_TO_ratings
		FOREIGN KEY (
			nolgo_no
		)
		REFERENCES nolgos (
			no
		);

ALTER TABLE reviews
	ADD
		CONSTRAINT FK_users_TO_reviews
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE reviews
	ADD
		CONSTRAINT FK_nolgos_TO_reviews
		FOREIGN KEY (
			nolgo_no
		)
		REFERENCES nolgos (
			no
		);

ALTER TABLE menues
	ADD
		CONSTRAINT FK_nolgos_TO_menues
		FOREIGN KEY (
			nolgo_no
		)
		REFERENCES nolgos (
			no
		);

ALTER TABLE interest_categories
	ADD
		CONSTRAINT FK_users_TO_ic
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE interest_categories
	ADD
		CONSTRAINT FK_categories_TO_ic
		FOREIGN KEY (
			category_no
		)
		REFERENCES categories (
			no
		);

ALTER TABLE nolgo_convenients
	ADD
		CONSTRAINT FK_nolgos_TO_nolgo_convenients
		FOREIGN KEY (
			nolgo_no
		)
		REFERENCES nolgos (
			no
		);

ALTER TABLE nolgo_convenients
	ADD
		CONSTRAINT FK_convenients_TO_nc
		FOREIGN KEY (
			convenient_no
		)
		REFERENCES convenients (
			no
		);

ALTER TABLE interest_locations
	ADD
		CONSTRAINT FK_users_TO_interest_locations
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);

ALTER TABLE interest_locations
	ADD
		CONSTRAINT FK_locations_TO_il
		FOREIGN KEY (
			location_no
		)
		REFERENCES locations (
			no
		);

ALTER TABLE confirms
	ADD
		CONSTRAINT FK_users_TO_confirms
		FOREIGN KEY (
			user_no
		)
		REFERENCES users (
			no
		);




/* PART2 SEQUENE CREATE */
create sequence "MENUES_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "USERS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "NOLGOS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "REPORTS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "TAGS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "CATEGORIES_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "SUB_CATEGORIES_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "LIKINGS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "FOLLOWS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "RATINGS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "REVIEWS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "CONVENIENTS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "LOCATIONS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "INTEREST_CATEGORIES_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "NOLGO_CONVENIENTS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "INTEREST_LOCATIONS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;

create sequence "CONFIRMS_SEQ"
start with 1000
increment by 1
maxvalue 999999999
minvalue 1
nocache
nocycle
noorder;


/* PART3 ALTER TABLE */
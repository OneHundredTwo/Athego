/* 1tier base data */
--LOCATIONS INSERT 
INSERT INTO LOCATIONS(
NO,CODE,DEPTH1,DEPTH2,DEPTH3,DEPTH1_CODE,DEPTH2_CODE,DEPTH3_CODE,NOLGO_CNT,INTEREST_LOCATION_CNT,REGDATE
) VALUES(
    1,'11110126','서울특별시','종로구','종로1가',11,110,126,2,0,systimestamp
);

INSERT INTO LOCATIONS(
NO,CODE,DEPTH1,DEPTH2,DEPTH3,DEPTH1_CODE,DEPTH2_CODE,DEPTH3_CODE,NOLGO_CNT,INTEREST_LOCATION_CNT,REGDATE
) VALUES(
  2,'41250102','경기도','동두천시','지행동',41,250,102,1,0,systimestamp  
);

INSERT INTO LOCATIONS(
NO,CODE,DEPTH1,DEPTH2,DEPTH3,DEPTH1_CODE,DEPTH2_CODE,DEPTH3_CODE,NOLGO_CNT,INTEREST_LOCATION_CNT,REGDATE
) VALUES(
  3,'11710101','서울특별시','송파구','잠실동',11,710,101,1,0,systimestamp
);


INSERT INTO LOCATIONS(
NO,CODE,DEPTH1,DEPTH2,DEPTH3,DEPTH1_CODE,DEPTH2_CODE,DEPTH3_CODE,NOLGO_CNT,INTEREST_LOCATION_CNT,REGDATE
) VALUES(
  4,'28110147','인천광역시','중구','운서동',28,110,147,1,0,systimestamp
);

-- CATEGORIES INSERT
/* 대분류 */
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(1,'관광', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(2,'축제', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(3,'문화예술', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(4,'맛집/술집', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(5,'레저/스포츠', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(6,'뷰티/힐링', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(7,'오락', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(8,'제조/공예', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(9,'카페', 0, 0, systimestamp);
insert into categories(no, name, sub_category_cnt, nolgo_cnt, regdate)
values(10,'이벤트룸', 0, 0, systimestamp);

-- CONVENIENTS INSERT 


INSERT INTO convenients VALUES (1,'와이파이',SYSTIMESTAMP);
INSERT INTO convenients VALUES (2,'주차/발렛',SYSTIMESTAMP);
INSERT INTO convenients VALUES (3,'화장실',SYSTIMESTAMP);
INSERT INTO convenients VALUES (4,'음수대',SYSTIMESTAMP);
INSERT INTO convenients VALUES (5,'간식제공',SYSTIMESTAMP);
INSERT INTO convenients VALUES (6,'노키즈존',SYSTIMESTAMP);
INSERT INTO convenients VALUES (7,'콜키지',SYSTIMESTAMP);
INSERT INTO convenients VALUES (8,'흡연실',SYSTIMESTAMP);
INSERT INTO convenients VALUES (9,'반려동물입장가능',SYSTIMESTAMP);
INSERT INTO convenients VALUES (10,'짐보관',SYSTIMESTAMP);
INSERT INTO convenients VALUES (11,'개인콘센트',SYSTIMESTAMP);
INSERT INTO convenients VALUES (12,'충전기대여',SYSTIMESTAMP);
INSERT INTO convenients VALUES (13,'탈 것 대여',SYSTIMESTAMP);
INSERT INTO convenients VALUES (14,'놀이방',SYSTIMESTAMP);

/* 2tier */

-- USERS INSERT 

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(1,'jay65@naver.com','nottang1004!','예쁜이123','2000-07-04','01030785129','M','지난 크리스 마스때 신천 새마을 시장투어 했어요 그냥 시장 구경가서 맛있는 떡볶이집 가고 주섬주섬 길거리에서  먹기도 하고 아직 솔로 지만 전혀 질리지는 않아요 ㅎ ','user1.jpg','USA.jpg',1,1,12,13,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(2,'tkdwns@naver.com','nottang1004!','한이123','1996-03-24','01087655179','M','놀거리 찾아서 이 사이트 이용하고 있는데 가격싼 vr방이나 코인 노래방 정보도 디테일하게 알려주니까 너무 좋은 것같아요 나중에 시간 되시는 분 팔로우 해주세요 ','user2.jpg','UCA.jpg',1,1,15,11,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(3,'ejqmf@naver.com','nottang1004!','유이ascd','1998-09-04','01053214344','W','안녕하세요 남친이랑 사귄지 2년째고 여행가는걸 좋아해서 자주 여행가고 있어요 놀거리 추천도 많고 사이트가 정말 편리한 것 같아요','user3.jpg','UDA.jpg',1,1,13,18,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(4,'thadldid@naver.com','nottang1004!','솜이양','2000-05-14','01030783133','W','남친이랑 맛집 탐방하는 걸 좋아해서 여기저기 놀러가고 있어요 오늘은 여수로 갔는데 백반 맛집 들렀는데 6000원밖에 안하드라고여 검은모래해수욕장에서 바다 구경도 하고 좋았어요 여수 여행 추천드려요!','user4.jpg','UFA.jpg',1,1,15,3,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(5,'dkzkffl@naver.com','nottang1004','둘리jsd','1991-03-04','01037545411','M','친구들과 서울구경하러 왔습니다 부산사는지라 서울이 많이 친숙하지 않네요 홍대도 가고 한강도 갔다왔어요. 당구를 좀 치는데 자신 있으신분 팔로우 해주세요 ','user5.jpg','UGA.jpg',1,1,3,7,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(6,'rnfkaos@naver.com','nottang1004','구리구리abc','1992-12-04','01099234829','M','안녕하세요 태안사는 구리구리입니다 태안에 신진도 항구 있는데 여친이랑 같이 오기 좋아요 풍경도 좋고 주변에 맛집도 많고 많이 놀러오세요','user6.jpg','UHA.jpg',1,1,5,3,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(7,'dkfflqk@naver.com','nottang1004','레베카13','1988-03-14','01045456661','W','안녕하세요 오늘 영등포 갔다왔어요 영등포전통시장 갔는데전두 팔고 떡도 팔고 좀 더 들어가면 간식거리도 많아서 즐거웠어요 여기 사이트가 좋은 곳 추천 많이 해줘서 정말 편리한 것 같아요 ','user1.jpg','UJA.jpg',1,1,5,9,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(8,'thisman@naver.com','nottang1004','다솜이99','1998-09-15','01083137665','W','안녕하세요 과천사는 다솜이예요 오늘 과천동 양재천으로 꽃 구경하러 왔어요 남친이랑 소풍 가기에도 좋고 풍경도 좋아서 사진찍기에도 좋아요 ','user1.jpg','UKA.jpg',1,1,4,9,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(9,'dbfldbfl@naver.com','nottang1004','강남이123','1994-06-24','01077564432','M','오늘은 어디갈까 고민하지않고 사이트가 추천해주는 곳 갔다왔습니다 VR방 수면 까페도 갔다 오고 시설장비 좋은 코인노래방에서 노래도 부르고 정말 즐거 웠습니다','user1.jpg','ULA.jpg',1,1,9,3,'2018-06-20');

insert into users(no,email,password,nickname,birthdate,phone,gender,introduce,profile,cover,is_confirm,role,follower_cnt,following_cnt,regdate)
values(10,'qkqhdksi@naver.com','nottang1004','zpzp123','1882-11-24','01077664532','M','서울로 놀러왔습니다 한동안 지낼만한 방을 구하고 있는데 지금은 서울w호텔에 머물고 있어요 직원도 친절하고 서비스도 좋고 괞찮네요 이 사이트에서 둘러보다가 찾은거라 운이 좋았네요 ','user1.jpg','UQA.jpg',1,1,15,3,'2018-06-20');

/* 3tier */

--NOLGOS INSERT : categories, locations가 등록되야 등록가능합니다.

INSERT INTO NOLGOS(
NO,NAME,ADDRESS,RELINFO,OFF_DAY,PICTURES,OPEN_TIME,CLOSE_TIME,STAY_TIME,PHONE,MIN_BUDGET,MAX_BUDGET,LAT,LNG,CONTENT,AVG_SCORE,REVIEW_CNT,RATING_CNT,REGDATE,CATEGORY_NO,LOCATION_NO,USER_NO,OWNER_NO
)
VALUES(
1,'버거킹동두천DT점','경기 동두천시 평화로2261번길 2','#동두천유일의맛집#버거짱#와이파이안됨','연중무휴','ddc-bgk-000000000000001.jpg,ddc-bgk-000000000000002.jpg,ddc-bgk-000000000000003.jpg,ddc-bgk-000000000000004.jpg,ddc-bgk-000000000000005.jpg',to_date('00','HH24'),to_date('23','HH24'),65,'031-862-0332',7400,9700,'37.8899402','127.0544778','<p>버거킹 입니다</p><p><img src="/img/ddc-bgk-000000000000001.jpg"/>많이 사랑해주세요</p>',4.14,137,56,systimestamp,4,1,3,null
);


INSERT INTO NOLGOS(
NO,NAME,ADDRESS,RELINFO,OFF_DAY,PICTURES,OPEN_TIME,CLOSE_TIME,STAY_TIME,PHONE,MIN_BUDGET,MAX_BUDGET,LAT,LNG,CONTENT,AVG_SCORE,REVIEW_CNT,RATING_CNT,REGDATE,CATEGORY_NO,LOCATION_NO,USER_NO,OWNER_NO
)
VALUES(
2,'광장시장','서울특별시 종로구 종로1.2.3.4가동 창경궁로 88','#녹두전#연인과함께#전통시장','일요일 휴무','sul-gmk-000000000000001.jpg,sul-gmk-000000000000002.jpg,sul-gmk-000000000000003.jpg,sul-gmk-000000000000004.jpg,sul-gmk-000000000000005.jpg',to_date('09','HH24'),to_date('18','HH24'),120,'02-2267-0291',5000,55000,'37.5701569','126.9971517','<p>전통의 광장시장 입니다</p><p>리뷰가 짱많아요</p><p><img src="/img/sul-gmk-000000000000002.jpg"/>많이 사랑해주세요</p>',4.11,7067,113,systimestamp,1,1,2,null);


INSERT INTO NOLGOS(
NO,NAME,ADDRESS,RELINFO,OFF_DAY,PICTURES,OPEN_TIME,CLOSE_TIME,STAY_TIME,PHONE,MIN_BUDGET,MAX_BUDGET,LAT,LNG,CONTENT,AVG_SCORE,REVIEW_CNT,RATING_CNT,REGDATE,CATEGORY_NO,LOCATION_NO,USER_NO,OWNER_NO
)
VALUES(
3,'스타벅스 종각점','서울특별시 종로구 종로1.2.3.4가동 종로 64','#스터디카페#4층#항상붐벼','연중무휴','str-bgs-000000000000001.jpg,str-bgs-000000000000002.jpg,str-bgs-000000000000003.jpg,str-bgs-000000000000004.jpg,str-bgs-000000000000005.jpg',to_date('07','HH24'),to_date('23','HH24'),45,'02-758-8169',3700,13500,'37.5701648','126.9839005','<p>스타벅스 종각역점입니다</p><p>졸업작품의 한이 담겨있는 곳, 내 피.땀.눈물</p><p><img src="/img/sul-gmk-000000000000002.jpg"/>많이 사랑해주세요</p>',3.83,127,54,systimestamp,9,1,1,null);


INSERT INTO NOLGOS(
NO,NAME,ADDRESS,RELINFO,OFF_DAY,PICTURES,OPEN_TIME,CLOSE_TIME,STAY_TIME,PHONE,MIN_BUDGET,MAX_BUDGET,LAT,LNG,CONTENT,AVG_SCORE,REVIEW_CNT,RATING_CNT,REGDATE,CATEGORY_NO,LOCATION_NO,USER_NO,OWNER_NO
)
VALUES(
4,'잠실종합운동장','서울특별시 종로구 종로1.2.3.4가동 종로 64','#운동장#야구#한화이글스','연중무휴','jms-plg-000000000000001.jpg,jms-plg-000000000000002.jpg,jms-plg-000000000000003.jpg,jms-plg-000000000000004.jpg,jms-plg-000000000000005.jpg',to_date('00','HH24'),to_date('23','HH24'),45,'02-2240-8800',3000,60000,'37.5153186','127.0707642','<p>잠실 종합운동장입니다</p><p>서울올림픽주경기장은 대한민국 서울특별시 송파구의 스포츠 경기장 종합 단지인 서울종합운동장내에 있는 관중석 69,950석 규모의 다목적 경기장으로, 최대 10만 명 수용이 가능한 대한민국 최대 규모의 경기장이다. 서울종합운동장 올림픽주경기장이 전체 이름이며 잠실올림픽주경기장이라는 이름으로 더 많이 알려져 있다. 서울종합운동장 주경기장 혹은 잠실종합운동장 주경기장, 짧게는 올림픽주경기장, 잠실주경기장 등 여러 명칭으로 불리고 있다. K리그2팀 서울 이랜드 FC가 홈구장으로 사용중이며 서울 이랜드의 홈경기시 가변좌석을 설치해 운영한다.[3]</p><p><img src="/img/jms-plg-000000000000002.jpg"/>많이 사랑해주세요</p>',4.12,472,34,systimestamp,5,3,1,null);



INSERT INTO NOLGOS(
NO,NAME,ADDRESS,RELINFO,OFF_DAY,PICTURES,OPEN_TIME,CLOSE_TIME,STAY_TIME,PHONE,MIN_BUDGET,MAX_BUDGET,LAT,LNG,CONTENT,AVG_SCORE,REVIEW_CNT,RATING_CNT,REGDATE,CATEGORY_NO,LOCATION_NO,USER_NO,OWNER_NO
)
VALUES(
5,'인천국제공항','인천광역시 중구 공항로 272','#세계공항1등#비행기#너무좋아','연중무휴','ich-nap-000000000000001.jpg,ich-nap-000000000000002.jpg,ich-nap-000000000000003.jpg,ich-nap-000000000000004.jpg,ich-nap-000000000000005.jpg',to_date('00','HH24'),to_date('23','HH24'),180,'1577-2600',9000,1510846,'37.460195','126.438507','<p>인천국제공항입니다</p><p>인천국제공항(仁川國際空港, 영어: Incheon International Airport, IATA: ICN, ICAO: RKSI)은 대한민국 인천광역시 중구 운서동에 위치한 국제공항이다. 대한민국에서 가장 큰 공항으로, 대한민국 국제선의 약 80%가 이곳을 통해 운항된다. 이 공항은 국제선 전용 공항이기 때문에 이 공항의 국내선은 국제선 환승용이며, 간혹 심야에제주발 국내선의 커퓨 타임(야간운항통제 시간)에 따른 대체 착륙용으로 이용된다.</p><p>
인천국제공항은 2001년 3월 29일 개항과 동시에 서울특별시 강서구에 있는 김포국제공항의 당시 국제선 노선을 일괄 이관받았다. 영종도와 용유도 사이의 바다를 메워서 만든 해상공항이기 때문에 내륙공항인 김포국제공항과 달리 24시간 운항된다. 1999년 2월 1일 설립된 인천국제공항공사(IIAC)에서 공항 운영을 담당하고 있고, 세계공항서비스평가(ASQ)에서 2005년 이후 계속 세계 공항 순위 1위를 유지하고 있다.[2][3][4] 대한항공, 아시아나항공, 제주항공, 진에어, 이스타항공, 티웨이항공, 에어서울, 폴라에어 카고, 델타항공이 이 공항을 허브 공항으로 사용하고 있다.[3]</p><p><img src="/img/ich-nap-000000000000002.jpg"/>많이 사랑해주세요</p>',4.5,4615,357,systimestamp,1,4,2,null);


-- FOLLOWS INSERT

insert into follows(no,follower_no,regdate,user_no)
values(1,2,systimestamp,1);

insert into follows(no,follower_no,regdate,user_no)
values(2,3,systimestamp,1);

insert into follows(no,follower_no,regdate,user_no)
values(3,1,systimestamp,2);

insert into follows(no,follower_no,regdate,user_no)
values(4,5,systimestamp,2);

insert into follows(no,follower_no,regdate,user_no)
values(5,7,systimestamp,2);

insert into follows(no,follower_no,regdate,user_no)
values(6,2,systimestamp,3);

insert into follows(no,follower_no,regdate,user_no)
values(7,4,systimestamp,3);

insert into follows(no,follower_no,regdate,user_no)
values(8,8,systimestamp,3);

insert into follows(no,follower_no,regdate,user_no)
values(9,1,systimestamp,4);

insert into follows(no,follower_no,regdate,user_no)
values(10,2,systimestamp,4);

insert into follows(no,follower_no,regdate,user_no)
values(11,6,systimestamp,4);

insert into follows(no,follower_no,regdate,user_no)
values(12,10,systimestamp,4);

insert into follows(no,follower_no,regdate,user_no)
values(13,7,systimestamp,5);

insert into follows(no,follower_no,regdate,user_no)
values(14,8,systimestamp,5);

insert into follows(no,follower_no,regdate,user_no)
values(15,1,systimestamp,6);

insert into follows(no,follower_no,regdate,user_no)
values(16,3,systimestamp,6);

insert into follows(no,follower_no,regdate,user_no)
values(17,9,systimestamp,7);

insert into follows(no,follower_no,regdate,user_no)
values(18,3,systimestamp,8);

insert into follows(no,follower_no,regdate,user_no)
values(19,3,systimestamp,9);

insert into follows(no,follower_no,regdate,user_no)
values(20,4,systimestamp,9);

insert into follows(no,follower_no,regdate,user_no)
values(21,6,systimestamp,9);

insert into follows(no,follower_no,regdate,user_no)
values(22,2,systimestamp,10);

insert into follows(no,follower_no,regdate,user_no)
values(23,3,systimestamp,10);

insert into follows(no,follower_no,regdate,user_no)
values(24,7,systimestamp,10);

insert into follows(no,follower_no,regdate,user_no)
values(25,8,systimestamp,10);

insert into follows(no,follower_no,regdate,user_no)
values(26,9,systimestamp,10);

-- CONFIRMS INSERT


-- INTEREST_LOCATIONS INSERT

INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(1,'2018-06-21',1,1);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(2,'2018-06-21',2,2);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(3,'2018-06-21',3,3);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(4,'2018-06-21',4,4);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(5,'2018-06-21',5,1);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(6,'2018-06-21',6,2);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(7,'2018-06-21',7,3);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(8,'2018-06-21',8,4);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(9,'2018-06-21',9,1);
INSERT INTO interest_locations(no,regdate,user_no,location_no)
VALUES(10,'2018-06-21',10,2);


-- INTEREST_CATEGORIES INSERT

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(1,systimestamp,1,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(2,systimestamp,1,3);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(3,systimestamp,1,4);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(4,systimestamp,1,5);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(5,systimestamp,2,1);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(6,systimestamp,2,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(7,systimestamp,2,3);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(8,systimestamp,2,4);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(9,systimestamp,3,5);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(10,systimestamp,3,7);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(11,systimestamp,3,4);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(12,systimestamp,4,9);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(13,systimestamp,4,7);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(14,systimestamp,4,3);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(15,systimestamp,5,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(16,systimestamp,5,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(17,systimestamp,5,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(18,systimestamp,6,5);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(19,systimestamp,6,7);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(20,systimestamp,7,4);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(21,systimestamp,7,3);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(22,systimestamp,8,5);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(23,systimestamp,8,4);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(24,systimestamp,9,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(25,systimestamp,9,3);
INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(26,systimestamp,9,4);
INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(27,systimestamp,9,9);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(28,systimestamp,10,2);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(29,systimestamp,10,6);

INSERT INTO interest_categories(no,regdate,user_no,category_no)
VALUES(30,systimestamp,10,10);

-- TAGS INSERT
/* 태그 */
insert into tags(no, content, type, content_no, regdate, user_no)
values(1, '햄버거', 'N', '1', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(2, '버거킹', 'N', '2', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(3, '전통시장', 'N', '3', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(4, '스타벅스', 'N', '4', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(5, '카페', 'N', '5', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(6, '커피', 'N', '6', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(7, '콘서트', 'N', '7', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(8, '공연', 'N', '8', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(9, '인천공항', 'N', '9', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(10, '면세점', 'N', '10', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(11, '리무진', 'N', '11', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(12, '여행', 'N', '12', systimestamp, 1);
insert into tags(no, content, type, content_no, regdate, user_no)
values(13, '해외여행', 'N', '13', systimestamp, 1);

/* 4tier */

-- MENUS INSERT


insert into menues(no,name,price,regdate,nolgo_no)
values(1,'트러플콰트로머쉬룸 와퍼세트',8000,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(2,'트러플콰트로머쉬룸 스테이크버거세트',9000,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(3,'통새우와퍼주니어세트',6600,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(4,'통새우스테이크버거세트',9700,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(5,'통새우와퍼세트',8600,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(6,'와퍼세트',7700,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(7,'불고기와퍼세트',7700,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(8,'콰트로치즈와퍼세트',8500,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(9,'치즈와퍼세트',8300,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(10,'와퍼주니어세트',6000,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(11,'불고기와퍼주니어 ',6000,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(12,'콰트로치즈와퍼주니어',6600,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(13,'치즈와퍼주니어 ',6300,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(14,'프렌치프라이(L)',2100,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(15,'어니언링',2000,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(16,'너켓킹(한조각)',500,systimestamp,1);

insert into menues(no,name,price,regdate,nolgo_no)
values(17,'시장먹거리',10000,systimestamp,2);

insert into menues(no,name,price,regdate,nolgo_no)
values(18,'구제상가쇼핑',20000,systimestamp,2);

insert into menues(no,name,price,regdate,nolgo_no)
values(19,'시장판매상품구매',15000,systimestamp,2);

insert into menues(no,name,price,regdate,nolgo_no)
values(20,'아메리카노',4100,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(21,'카페라떼',4800,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(22,'카푸치노',4800,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(23,'콜드브루',5000,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(24,'프라푸치노',5000,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(25,'머핀',5000,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(26,'베이글',5000,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(27,'샌드위치',6000,systimestamp,3);

insert into menues(no,name,price,regdate,nolgo_no)
values(28,'입장료_어린이',6000,systimestamp,4);

insert into menues(no,name,price,regdate,nolgo_no)
values(29,'입장료_청소년',8000,systimestamp,4);

insert into menues(no,name,price,regdate,nolgo_no)
values(30,'입장료_성인',10000,systimestamp,4);

insert into menues(no,name,price,regdate,nolgo_no)
values(31,'단기주차비_소형(기본30분)',1200,systimestamp,5);

insert into menues(no,name,price,regdate,nolgo_no)
values(32,'장기주차비_소형(1시간)',1000,systimestamp,5);

insert into menues(no,name,price,regdate,nolgo_no)
values(33,'장기주차비_대형(30분)',1200,systimestamp,5);

insert into menues(no,name,price,regdate,nolgo_no)
values(34,'단기주차1일권_소형',24000,systimestamp,5);

insert into menues(no,name,price,regdate,nolgo_no)
values(35,'장기주차1일권_소형',9000,systimestamp,5);

insert into menues(no,name,price,regdate,nolgo_no)
values(36,'장기주차1일권_대형',12000,systimestamp,5);


-- NOLGO_CONVENIENTS INSERT

--1-버거킹동두천DT점
INSERT INTO nolgo_convenients VALUES (1,SYSTIMESTAMP,'1','1'); 
INSERT INTO nolgo_convenients VALUES (2,SYSTIMESTAMP,'1','2');
INSERT INTO nolgo_convenients VALUES (3,SYSTIMESTAMP,'1','3');

--2-광장시장 :서울 광장시장
INSERT INTO nolgo_convenients VALUES (4,SYSTIMESTAMP,'2','2');
INSERT INTO nolgo_convenients VALUES (5,SYSTIMESTAMP,'2','9');

--3-스타벅스 종각점 : 종각역
INSERT INTO nolgo_convenients VALUES (6,SYSTIMESTAMP,'3','1');
INSERT INTO nolgo_convenients VALUES (7,SYSTIMESTAMP,'3','2');
INSERT INTO nolgo_convenients VALUES (8,SYSTIMESTAMP,'3','3');
INSERT INTO nolgo_convenients VALUES (9,SYSTIMESTAMP,'3','8');
INSERT INTO nolgo_convenients VALUES (10,SYSTIMESTAMP,'3','11');


--4-잠실종합운동장
INSERT INTO nolgo_convenients VALUES (11,SYSTIMESTAMP,'4','2');
INSERT INTO nolgo_convenients VALUES (12,SYSTIMESTAMP,'4','3');
INSERT INTO nolgo_convenients VALUES (13,SYSTIMESTAMP,'4','10');

--5-인천국제공항
INSERT INTO nolgo_convenients VALUES (14,SYSTIMESTAMP,'5','1');
INSERT INTO nolgo_convenients VALUES (15,SYSTIMESTAMP,'5','2');
INSERT INTO nolgo_convenients VALUES (16,SYSTIMESTAMP,'5','3');
INSERT INTO nolgo_convenients VALUES (17,SYSTIMESTAMP,'5','4');
INSERT INTO nolgo_convenients VALUES (18,SYSTIMESTAMP,'5','8');
INSERT INTO nolgo_convenients VALUES (19,SYSTIMESTAMP,'5','9');
INSERT INTO nolgo_convenients VALUES (20,SYSTIMESTAMP,'5','10');
INSERT INTO nolgo_convenients VALUES (21,SYSTIMESTAMP,'5','11');
INSERT INTO nolgo_convenients VALUES (22,SYSTIMESTAMP,'5','14');


-- SUB_CATEGORIES INSERT
/* 소분류 */
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(1, systimestamp, 4, 1, 1);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(2, systimestamp, 4, 2, 1);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(3, systimestamp, 4, 3, 2);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(4, systimestamp, 9, 4, 3);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(5, systimestamp, 9, 5, 3);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(6, systimestamp, 9, 6, 3);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(7, systimestamp, 3, 7, 4);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(8, systimestamp, 3, 8, 4);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(9, systimestamp, 1, 9, 5);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(10, systimestamp, 1, 10, 5);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(11, systimestamp, 1, 11, 5);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(12, systimestamp, 1, 12, 5);
insert into sub_categories(no, regdate, category_no, tag_no, nolgo_no)
values(13, systimestamp, 1, 13, 5);



-- RATINGS INSERT
 DELETE FROM ratings WHERE no < 1000;
-- nolgo_no = 1, user_no = 1 기준
-- 현재 rating (1~5)

INSERT INTO ratings (no, score, content, regdate, user_no, nolgo_no)
VALUES (1, 1,'너무 지저분하고 볼거리도 별로 없습니다 절대 가지 마떼여', '2018-06-20', 1, 1);
INSERT INTO ratings (no, score, content, regdate, user_no, nolgo_no)
VALUES (2, 4,'자가용을 이용하니 이동시간이 많이 절약되어서 하루 당일치기로 단양 여행이 가능할듯합니다^.^떠오르는 관광도시 단양으로 여행 추천해요', '2018-06-20', 1, 1);
INSERT INTO ratings (no, score, content, regdate, user_no, nolgo_no)
VALUES (3, 3,'TV에서 여행프로그램을 볼때마다 타이완이란 나라는 매력적으로 다가왔다.홍등이 예쁜 지우펀에서 행방불명 된 센과 치히로도 찾고 꽃할배들이간 타이루거 협곡도 가보고자 시작된 3박4일 대만 패키지 여행~~', '2018-06-20', 1, 1);
INSERT INTO ratings (no, score, content, regdate, user_no, nolgo_no)
VALUES (4, 5,'함께 게임하며 친해진 3커플이 다녀온 통영 1박 2일 여행입니다. 모든 사람의 만족을 충족하기 위해 감성 + 액티비티를 포함하게 되었어요. 통영의 예쁨을 물씬 느낄 수 있는 포토스팟까지 추천해드릴게요! ', '2018-06-20', 1, 1);
INSERT INTO ratings (no, score, content, regdate, user_no, nolgo_no)
VALUES (5, 4,'장모님 생신을 맞이하여 처가집 식구들 어른8, 아이4 명의  대가족이 동해바다를 보기위해 첨으로 가족여행을 다녀왔습니다 어르신들과 아이들도 있고 인원도 좀 되는 편이라 동선을 최대한 적게 소모하며 알차게 잘다녀왔네요 ', '2018-06-20', 1, 1);


-- REVIEWS INSERT

 DELETE FROM reviews WHERE no < 1000;

-- nolgo_no = 1, user_no = 1 기준
-- 현재 reviews (1~5)

-- 1
INSERT INTO reviews (no, title, content, like_cnt, regdate, user_no, nolgo_no)
VALUES (1, '아좋다 좋다 여기너므', 
'<p>VIETJET.</p><p class="">뭔가 불안하시죠?</p><p class="">저도 걱정했으나..... 꽤나 괜찮더라구요??ㅋㅋㅋㅋㅋㅋ</p><p class=""><br></p><p class="">인천에서 베트남 하노이로 가는 비행기였는데요</p><p class="">사람이 20명정도 밖에 없었어요ㅋㅋㅋㅋ</p><p class=""><br></p><p class="">기내식도 주고~</p><p class="">편안하게 쉬면서 왔습니다!</p><p class=""><br></p><p class="">베트남 여행하실때 이용하시면 좋을 것 같아요 :)</p><p class=""><br></p><p class="">가격은 30만원정도 였는데 제가 급하게 예약한것이라 좀 비쌌어요ㅜㅜ</p><p class=""><br></p><p class=""><br></p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/YpS32_JHrDWSkB4i42GyvvTmveE=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1437032485062_03.JPG" style="height: auto"></figure></div><p class=""><br></p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/HqooYWCKMNfiobacpq7Qgh97750=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1437032469953_04.JPG" style="height: auto"></figure></div><p class=""><br></p><p class=""><br></p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/xWrCayR_DhFl1rZgECnvLoG9VTQ=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1437032469980_05.JPG" style="height: auto"></figure></div><p class=""><br></p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/k8et-XhEPegH29NWC3n1AgAMIkM=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1437032469934_02.JPG" style="height: auto"></figure></div><p class=""><br></p><p class=""><br></p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/z_u8U0PJbyW3_x8Spid5BymJ9tg=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1437032470096_06.JPG" style="height: auto"></figure></div><p class=""><br></p><p class=""><br></p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/SpmfS63UvukPOy8DAq8oGm8Tj68=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1437032494237_07.JPG" style="height: auto"></figure></div>'
, 0, '2018-06-20', 1, 1);

-- 2
INSERT INTO reviews (no, title, content, like_cnt, regdate, user_no, nolgo_no)
VALUES (2, '영수증 꼭곡 챙기기', 
'<div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/DaRpJaH-VG1qBuK7vMq3ujeGvyA=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1500360925209_KakaoTalk_20170718_152325782.jpg" style="height: auto"></figure></div><p class=""><br></p><p class="">나의 여행중에 가장 많은 경비를 사용한 돈키호테</p><p class="">집에 오자마자 텍스리펀으로 꽁꽁 싸여있던 뽁뽁이들을 풀어헤치고 떼샷 한 컷.</p><p class="">꼭 사고자 했던 쇼핑 list를 가기전에 만들어 갔기 때문에 충동구매는 딱히 없었다.</p><p class="">list &;: 모찌 / 곤약젤리 / 화장솜 / 파스 / 퍼펙트휩 클렝징폼 / 휴족 / &;킷캣 / 복숭아향 니베아 크림</p><p class="">급 끌려서 구매해온 스프 / 캔콘스프 / 맥주 / 상처연고</p><p class=""><br></p><p class="">사실 내가 쓰려고 사온건 끌려서 사온 것들 정도.. 다 선물용ㅎㅎㅎㅎ</p><p class="">첫 방문이라 이것저것 많이 사왔지만,&;</p><p class="">또 오사카를 방문하게 되면 정말 필요한 것만 딱 사올 수 있을 듯...</p>'
, 0, '2018-06-20', 1, 1);

-- 3
INSERT INTO reviews (no, title, content, like_cnt, regdate, user_no, nolgo_no)
VALUES (3, '와이파이 대여 가능', 
'<p>포켓와이파이(말톡)수령</p><p>국제선 2층 4번게이트앞 여행사데스크 미래샌딩</p><p>문의전화 : 070-7918-0035</p>'
, 0, '2018-06-20', 1, 1);

-- 4
INSERT INTO reviews (no, title, content, like_cnt, regdate, user_no, nolgo_no)
VALUES (4, '정말 마음에 든다', 
'<div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/2OmgNK8i7diBrywnka06Fq11qbE=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1510390440691_IMG_20170210_150643.jpg" style="height: auto"></figure></div><p>위시빈 정보에는 오사카 성이 <b>"도요토미 히데요시의 부의 상징"</b>이라고 적혀있는데, 정말 맞는 말 같다고 느꼈다.</p><p>멀리서 걸어가면서도, 가까이서 보아도 정말 크고 웅장했으며, 멋있었다.</p><p>무엇보다 정말 예쁘고 마음에 들었던 것은 저 청록색 지붕과 금박 무늬의 조화였다. 정말 아름답다고 생각했다.</p><div class="medium-insert-images ui-sortable" contenteditable="false"><figure class="editor-insert-image"><a class="editor-img-cnl hide"><img src="/images/btn-editor-img-cnl.png" alt=""></a><img src="https://thumb-wishbeen.akamaized.net/LM5q0hpSmmp5TW6bcSYnAQY4hhw=/880x/smart/filters:no_upscale()/img-wishbeen.akamaized.net/post/1510390449063_2017-02-10-16-03-44.jpg" style="height: auto"></figure></div><p>그리고 오늘도 타코야끼!</p>'
, 0, '2018-06-20', 1, 1);

-- 5
INSERT INTO reviews (no, title, content, like_cnt, regdate, user_no, nolgo_no)
VALUES (5, '다시한번 또 꼭 가보고 싶다', 
'<p>모리노미야 역에서 내리면 금방 오사카성 입구가 보인다.</p><p class="">입구에 보면 열차 같은 게 있는데 이거 타고 쭉 둘러보면 괜찮다 :)</p><p class="">우린 시간이 좀 늦어서 못 했는데, 주유패스가 있으면 뱃놀이도 이용 할 수 있다.</p><p class=""><br></p><p class="">난 예전에 오사카성 안 내부를 본 적이 있어서, 이번에는 안에 안 들어가고 앞에서 사진만 좀 찍고 나왔다.</p><p class="">사실 안에 들어갈 필요가 없는게</p><p class="">도요토미 히데요시가 오사카성을 지었고, 이 사람의 업적에 대해 잘 나열되어 있다.</p><p class="">일본인 입장에서는 전국을 통일했기 때문에 뭐 존경받을만하다고 생각은 하지만</p><p class="">한국인 입장에서는 임진왜란을 일으킨 장본인이기에 그닥 마음에 들진 않았다.</p><p class="">그래도 역사는 역사로 보고 당시 오사카성 내부를 오디오가이드를 들으며 쭉 다녔는데</p><p class="">전국통일한 거 까진 그렇다치는데, 한국을 침략하려고 한 게 아쉽지만 당연한 듯하게 포장 한 게 좀 짜증이 많이 났었다.</p><p class="">당시 조선은 따로 독보적인 나라고 니네가 그냥 쳐들어온건데..</p><p class=""><br></p><p class="">그래서 굳이 들어갈 필요를 못 느끼고 그냥 사진만 찰칵찰칵후 나옴 :)</p>'
, 0, '2018-06-20', 1, 1);


/* 5tier */

-- LIKINGS INSERT 


insert into likings(no,type,content_no,regdate,user_no)
values(1,'N',1,systimestamp,1);
insert into likings(no,type,content_no,regdate,user_no)
values(2,'V',1,systimestamp,1);
insert into likings(no,type,content_no,regdate,user_no)
values(3,'N',2,systimestamp,1);
insert into likings(no,type,content_no,regdate,user_no)
values(4,'V',2,systimestamp,1);
insert into likings(no,type,content_no,regdate,user_no)
values(5,'N',3,systimestamp,2);
insert into likings(no,type,content_no,regdate,user_no)
values(6,'V',3,systimestamp,2);
insert into likings(no,type,content_no,regdate,user_no)
values(7,'N',4,systimestamp,2);
insert into likings(no,type,content_no,regdate,user_no)
values(8,'V',4,systimestamp,2);
insert into likings(no,type,content_no,regdate,user_no)
values(9,'N',5,systimestamp,3);
insert into likings(no,type,content_no,regdate,user_no)
values(10,'V',5,systimestamp,3);
insert into likings(no,type,content_no,regdate,user_no)
values(11,'N',1,systimestamp,3);
insert into likings(no,type,content_no,regdate,user_no)
values(12,'V',1,systimestamp,3);
insert into likings(no,type,content_no,regdate,user_no)
values(13,'N',2,systimestamp,4);
insert into likings(no,type,content_no,regdate,user_no)
values(14,'V',2,systimestamp,4);
insert into likings(no,type,content_no,regdate,user_no)
values(15,'N',3,systimestamp,4);
insert into likings(no,type,content_no,regdate,user_no)
values(16,'V',3,systimestamp,4);
insert into likings(no,type,content_no,regdate,user_no)
values(17,'N',2,systimestamp,5);
insert into likings(no,type,content_no,regdate,user_no)
values(18,'V',3,systimestamp,5);
insert into likings(no,type,content_no,regdate,user_no)
values(19,'N',3,systimestamp,6);
insert into likings(no,type,content_no,regdate,user_no)
values(20,'V',3,systimestamp,6);
insert into likings(no,type,content_no,regdate,user_no)
values(21,'N',5,systimestamp,7);
insert into likings(no,type,content_no,regdate,user_no)
values(22,'V',3,systimestamp,7);
insert into likings(no,type,content_no,regdate,user_no)
values(23,'N',4,systimestamp,8);
insert into likings(no,type,content_no,regdate,user_no)
values(24,'N',4,systimestamp,8);
insert into likings(no,type,content_no,regdate,user_no)
values(25,'N',4,systimestamp,9);
insert into likings(no,type,content_no,regdate,user_no)
values(26,'N',5,systimestamp,10);
insert into likings(no,type,content_no,regdate,user_no)
values(27,'V',5,systimestamp,10);
insert into likings(no,type,content_no,regdate,user_no)
values(28,'V',3,systimestamp,10);
insert into likings(no,type,content_no,regdate,user_no)
values(29,'N',4,systimestamp,10);



-- REPORTS INSERT
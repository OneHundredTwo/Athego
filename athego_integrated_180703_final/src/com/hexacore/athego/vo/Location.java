package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Location {
	private int no;
	private Timestamp regdate;
	
	private String depth1, depth2, depth3, code;
	private int depth1Code, depth2Code, depth3Code, nolgoCnt, interestLocationCnt;
	
	public Location() {
		// TODO Auto-generated constructor stub
	}
	
	public Location(String[] depths) {
		switch(depths[0]) {
		case "서울" :
			depths[0] = "서울특별시";
			break;
		case "부산" :
			depths[0] = "부산광역시";
			break;
		case "인천" :
			depths[0] = "인천광역시";
			break;
		case "광주" :
			depths[0] = "광주광역시";
			break;
		case "대구" :
			depths[0] = "대구광역시";
			break;
		case "경기" :
			depths[0] = "경기도";
			break;
		case "대전" :
			depths[0] = "대전광역시";
			break;
		case "울산" :
			depths[0] = "울산광역시";
			break;
		case "강원" :
			depths[0] = "강원도";
			break;
		case "충남" :
			depths[0] = "충청남도";
			break;
		case "충북" :
			depths[0] = "충청북도";
			break;
		case "전북" :
			depths[0] = "전라북도";
			break;
		case "전남" :
			depths[0] = "전라남도";
			break;
		case "경북" :
			depths[0] = "경상북도";
			break;
		case "경남" :
			depths[0] = "경상남도";
			break;
		}
		
		switch(depths[2]) {
		case "장안구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "권선구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "팔달구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "영통구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "수정구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "중원구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "분당구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "상당구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "서원구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "흥덕구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "청원구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "남구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "북구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "의창구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "성산구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "마산합포구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "마산회원구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "진해구" :
			depths[1] = depths[1] + " " + depths[2];
			depths[2] = depths[3];
			break;
		case "만안구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "동안구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "처인구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "기흥구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "수지구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "상록구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "단원구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "덕양구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "일산동구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "동남구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "서북구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "완산구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		case "덕진구" :
			depths[1] = depths[1] + depths[2];
			depths[2] = depths[3];
			break;
		}
		this.depth1 = depths[0];
		this.depth2 = depths[1];
		this.depth3 = depths[2];
	}

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}

	public String getDepth1() {
		return depth1;
	}

	public void setDepth1(String depth1) {
		this.depth1 = depth1;
	}

	public String getDepth2() {
		return depth2;
	}

	public void setDepth2(String depth2) {
		this.depth2 = depth2;
	}

	public String getDepth3() {
		return depth3;
	}

	public void setDepth3(String depth3) {
		this.depth3 = depth3;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getDepth1Code() {
		return depth1Code;
	}

	public void setDepth1Code(int depth1Code) {
		this.depth1Code = depth1Code;
	}

	public int getDepth2Code() {
		return depth2Code;
	}

	public void setDepth2Code(int depth2Code) {
		this.depth2Code = depth2Code;
	}

	public int getDepth3Code() {
		return depth3Code;
	}

	public void setDepth3Code(int depth3Code) {
		this.depth3Code = depth3Code;
	}

	public int getNolgoCnt() {
		return nolgoCnt;
	}

	public void setNolgoCnt(int nolgoCnt) {
		this.nolgoCnt = nolgoCnt;
	}

	public int getInterestLocationCnt() {
		return interestLocationCnt;
	}

	public void setInterestLocationCnt(int interestLocationCnt) {
		this.interestLocationCnt = interestLocationCnt;
	}
	
	
}

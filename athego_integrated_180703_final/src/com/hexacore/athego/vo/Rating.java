package com.hexacore.athego.vo;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Rating {
	private int no;
	private Timestamp regdate;
	
	private int userNo, nolgoNo;
	private String content;
	
	//Writer___________K__180625 평점 수정시(put) 필요
	@JsonProperty("score")
	private int score;
	
	//Writer___________K__180625 평점 수정시(put) 필요 
	@JsonProperty("tags")
	private String[] tags;
	
	public Rating() {
		// TODO Auto-generated constructor stub
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

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public int getNolgoNo() {
		return nolgoNo;
	}

	public void setNolgoNo(int nolgoNo) {
		this.nolgoNo = nolgoNo;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}	
	
}

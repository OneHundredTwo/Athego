package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Follow {
	private int no;
	private Timestamp regdate;
	
	private int followerNo, userNo;
	
	public Follow() {
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

	public int getFollowerNo() {
		return followerNo;
	}

	public void setFollowerNo(int followerNo) {
		this.followerNo = followerNo;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	
	
}

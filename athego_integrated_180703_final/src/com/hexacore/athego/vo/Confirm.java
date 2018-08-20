package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Confirm {
	private int no;
	private Timestamp regdate;
	
	private boolean isConfirm, userNo;
	private Timestamp timeLimit;
	private String key;
	
	public Confirm() {
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

	public boolean isConfirm() {
		return isConfirm;
	}

	public void setConfirm(boolean isConfirm) {
		this.isConfirm = isConfirm;
	}

	public boolean isUserNo() {
		return userNo;
	}

	public void setUserNo(boolean userNo) {
		this.userNo = userNo;
	}

	public Timestamp getTimeLimit() {
		return timeLimit;
	}

	public void setTimeLimit(Timestamp timeLimit) {
		this.timeLimit = timeLimit;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	
}

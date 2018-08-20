package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Tag {
	private int no;
	private Timestamp regdate;
	
	private int contentNo, userNo;
	private String type, content;
	
	public Tag() {
		
	}
	
	/* Writer___________Y__180624 */
	public Tag(int contentNo, String type, String content, int userNo) {
		super();
		this.contentNo = contentNo;
		this.userNo = userNo;
		this.type = type;
		this.content = content;
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

	public int getContentNo() {
		return contentNo;
	}

	public void setContentNo(int contentNo) {
		this.contentNo = contentNo;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}

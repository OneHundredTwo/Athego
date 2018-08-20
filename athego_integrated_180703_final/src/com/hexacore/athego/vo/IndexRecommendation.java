package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class IndexRecommendation {
	
	private int no, orderNo;
	private Timestamp regdate;
	
	private String keyword, title, nolgoNos;
	
	public IndexRecommendation() {
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

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNolgoNos() {
		return nolgoNos;
	}

	public void setNolgoNos(String nolgoNos) {
		this.nolgoNos = nolgoNos;
	}

	public int getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}
 	
}

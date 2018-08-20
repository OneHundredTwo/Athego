package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Convenient {
	private int no;
	private Timestamp regdate;
	
	private String name;
	
	public Convenient() {
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}

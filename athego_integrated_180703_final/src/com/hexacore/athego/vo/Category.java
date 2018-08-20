package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Category {
	private int no;
	private Timestamp regdate;
	
	private String name;
	private int subCategoriesCnt, nolgoCnt;
	
	public Category() {
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

	public int getSubCategoriesCnt() {
		return subCategoriesCnt;
	}

	public void setSubCategoriesCnt(int subCategoriesCnt) {
		this.subCategoriesCnt = subCategoriesCnt;
	}

	public int getNolgoCnt() {
		return nolgoCnt;
	}

	public void setNolgoCnt(int nolgoCnt) {
		this.nolgoCnt = nolgoCnt;
	}
	
	
}

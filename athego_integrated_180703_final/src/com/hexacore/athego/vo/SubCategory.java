package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class SubCategory {
	private int no;
	private Timestamp regdate;
	
	private int categoryNo, tagNo, nolgoNo;
	
	public SubCategory() {
		
	}
	
	/* Writer___________Y__180624 */
	public SubCategory(int categoryNo, int tagNo, int nolgoNo) {
		super();
		this.categoryNo = categoryNo;
		this.tagNo = tagNo;
		this.nolgoNo = nolgoNo;
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

	public int getCategoryNo() {
		return categoryNo;
	}

	public void setCategoryNo(int categoryNo) {
		this.categoryNo = categoryNo;
	}

	public int getTagNo() {
		return tagNo;
	}

	public void setTagNo(int tagNo) {
		this.tagNo = tagNo;
	}

	public int getNolgoNo() {
		return nolgoNo;
	}

	public void setNolgoNo(int nolgoNo) {
		this.nolgoNo = nolgoNo;
	}
	
}

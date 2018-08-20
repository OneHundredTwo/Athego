package com.hexacore.athego.vo;

import java.sql.Timestamp;
import java.util.List;

public class NolgoSimple {
	private int no;
	private String nolgoName, category, locationA, locationB, picture;
	private List<String> subCategory;
	private Timestamp updatedDate;
	



	public NolgoSimple() {}
	
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getNolgoName() {
		return nolgoName;
	}
	public void setNolgoName(String nolgoName) {
		this.nolgoName = nolgoName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getLocationA() {
		return locationA;
	}
	public void setLocationA(String locationA) {
		this.locationA = locationA;
	}
	public String getLocationB() {
		return locationB;
	}
	public void setLocationB(String locationB) {
		this.locationB = locationB;
	}
	public List<String> getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(List<String> subCategory) {
		this.subCategory = subCategory;
	}

	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public Timestamp getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Timestamp updatedDate) {
		this.updatedDate = updatedDate;
	}
}

package com.hexacore.athego.vo;

import java.sql.Date;
import java.sql.Timestamp;

public class Nolgo {
	private int no;
	private Timestamp regdate, openTime, closeTime;
	
	private String name, address, relInfo, pictures, offDay, 
	phone, lat, lng, content, stayTime, stayMin, stayHour;
	private int minBudget, maxBudget, reviewCnt, 
	ratingCnt, categoryNo, locationNo, userNo, ownerNo;
	private double avgScore;
	//기원 start
	/* Writer___________B__180623 로그인유저 Go체크 */
	private int goCnt;
	private boolean isGoCheck;
	
	public int getGoCnt() {
		return goCnt;
	}

	public void setGoCnt(int goCnt) {
		this.goCnt = goCnt;
	}

	public boolean getIsGoCheck() {
		return isGoCheck;
	}

	public void setGoCheck(boolean isGoCheck) {
		this.isGoCheck = isGoCheck;
	}
	//기원 end
	
	//Writer___________K__180624 놀고 부가 정보 -->
	private String categoryName;
		
	public Nolgo() {
		// TODO Auto-generated constructor stub
	}

	/* Writer___________Y__180624 체류시간, 시, 분 추가*/
	public String getStayMin() {
		return stayMin;
	}

	public void setStayMin(String stayMin) {
		this.stayMin = stayMin;
	}

	public String getStayHour() {
		return stayHour;
	}

	public void setStayHour(String stayHour) {
		this.stayHour = stayHour;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRelInfo() {
		return relInfo;
	}

	public void setRelInfo(String relInfo) {
		this.relInfo = relInfo;
	}

	public String getPictures() {
		return pictures;
	}

	public void setPictures(String pictures) {
		this.pictures = pictures;
	}

	public String getOffDay() {
		return offDay;
	}

	public void setOffDay(String offDay) {
		this.offDay = offDay;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getOpenTime() {
		return openTime;
	}

	public void setOpenTime(Timestamp openTime) {
		this.openTime = openTime;
	}

	public Timestamp getCloseTime() {
		return closeTime;
	}

	public void setCloseTime(Timestamp closeTime) {
		this.closeTime = closeTime;
	}

	public String getStayTime() {
		return stayTime;
	}

	public void setStayTime(String stayTime) {
		this.stayTime = stayTime;
	}

	public int getMinBudget() {
		return minBudget;
	}

	public void setMinBudget(int minBudget) {
		this.minBudget = minBudget;
	}

	public int getMaxBudget() {
		return maxBudget;
	}

	public void setMaxBudget(int maxBudget) {
		this.maxBudget = maxBudget;
	}

	public int getReviewCnt() {
		return reviewCnt;
	}

	public void setReviewCnt(int reviewCnt) {
		this.reviewCnt = reviewCnt;
	}

	public int getRatingCnt() {
		return ratingCnt;
	}

	public void setRatingCnt(int ratingCnt) {
		this.ratingCnt = ratingCnt;
	}

	public int getCategoryNo() {
		return categoryNo;
	}

	public void setCategoryNo(int categoryNo) {
		this.categoryNo = categoryNo;
	}

	public int getLocationNo() {
		return locationNo;
	}

	public void setLocationNo(int locationNo) {
		this.locationNo = locationNo;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public int getOwnerNo() {
		return ownerNo;
	}

	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}

	public double getAvgScore() {
		return avgScore;
	}

	public void setAvgScore(double avgScore) {
		this.avgScore = avgScore;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
}

package com.hexacore.athego.vo;

import java.sql.Date;
import java.sql.Timestamp;

public class User {
	private int no;
	private Timestamp regdate;
	
	private String email, password, nickname, phone, gender, introduce,
	profile, cover;
	private Date birthDate;
	private boolean isConfirm;
	private int role, followerCnt, followingCnt;
	
	//기원 start
	/* Writer___________B__180624 리뷰작성갯수, 놀곳등록 갯수*/
	private int wrritenReviewCnt, addNolgoCnt;

	public int getWrritenReviewCnt() {
		return wrritenReviewCnt;
	}

	public void setWrritenReviewCnt(int wrritenReviewCnt) {
		this.wrritenReviewCnt = wrritenReviewCnt;
	}

	public int getAddNolgoCnt() {
		return addNolgoCnt;
	}

	public void setAddNolgoCnt(int addNolgoCnt) {
		this.addNolgoCnt = addNolgoCnt;
	}
	//기원 end
	
	
	public User() {
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public boolean isConfirm() {
		return isConfirm;
	}

	public void setConfirm(boolean isConfirm) {
		this.isConfirm = isConfirm;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public int getFollowerCnt() {
		return followerCnt;
	}

	public void setFollowerCnt(int followerCnt) {
		this.followerCnt = followerCnt;
	}

	public int getFollowingCnt() {
		return followingCnt;
	}

	public void setFollowingCnt(int followingCnt) {
		this.followingCnt = followingCnt;
	}
	
	
}

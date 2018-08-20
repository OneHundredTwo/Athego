package com.hexacore.athego.vo;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Review {
	private int no;
	private Timestamp regdate;
	
	private String title, content;
	private int userNo, nolgoNo, likeCnt;
	
	//Writer___________K__180624 리뷰 수정시 필요 
	@JsonProperty("tags")
	private String[] tags;
	
	public Review() {
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public int getNolgoNo() {
		return nolgoNo;
	}

	public void setNolgoNo(int nolgoNo) {
		this.nolgoNo = nolgoNo;
	}

	public int getLikeCnt() {
		return likeCnt;
	}

	public void setLikeCnt(int likeCnt) {
		this.likeCnt = likeCnt;
	}
	
	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	} 
	
	/*Writer___________B__180624 */
	private String nolgoName;
	private String wrriter;

	public String getNolgoName() {
	return nolgoName;
	}

	public void setNolgoName(String nolgoName) {
	this.nolgoName = nolgoName;
	}

	public String getWrriter() {
	return wrriter;
	}

	public void setWrriter(String wrriter) {
	this.wrriter = wrriter;
	}
	
	/*Writer___________B__180628 */
	private String writerProfile;
	private boolean isIsLike;
	
	public String getWriterProfile() {
		return writerProfile;
	}

	public void setWrriterProfile(String writerProfile) {
		this.writerProfile = writerProfile;
	}

	public void setWriterProfile(String writerProfile) {
		this.writerProfile = writerProfile;
	}

	public boolean isIsLike() {
		return isIsLike;
	}

	public void setLike(boolean isIsLike) {
		this.isIsLike = isIsLike;
	}


	/*Writer___________B__180627 */
	@Override
	public String toString() {
		return "no="+no+" : "+
				"title="+title+" : "+
				"content="+content+" : "+
				"userNo="+userNo+" : "+
				"nolgoNo="+nolgoNo+" : "+
				"likeCnt="+likeCnt+" : "+
				"regdate="+regdate+" : "+
				"userNo="+nolgoName+" : "+
				"wrriter="+wrriter+" : "+
				"writerProfile="+writerProfile;
	}
	
}

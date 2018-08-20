package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class NolgoConvenient {
	private int no;
	private Timestamp regdate;
	
	private int nolgoNo, convenientNo;
	
	public NolgoConvenient() {
		
	}
	
	/* Writer___________Y__180624 */
	public NolgoConvenient(int nolgoNo, int convenientNo) {
		super();
		this.nolgoNo = nolgoNo;
		this.convenientNo = convenientNo;
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

	public int getNolgoNo() {
		return nolgoNo;
	}

	public void setNolgoNo(int nolgoNo) {
		this.nolgoNo = nolgoNo;
	}

	public int getConvenientNo() {
		return convenientNo;
	}

	public void setConvenientNo(int convenientNo) {
		this.convenientNo = convenientNo;
	}
	
	
}

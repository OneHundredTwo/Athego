package com.hexacore.athego.vo;

import java.sql.Timestamp;

public class Menu {
	private int no;
	private Timestamp regdate;
	
	private int nolgoNo, price;
	private String name;
	
	public Menu() {
		
	}
	
	/* Writer___________Y__180624 */
	public Menu(String name, int price, int nolgoNo) {
		super();
		this.nolgoNo = nolgoNo;
		this.price = price;
		this.name = name;
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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}

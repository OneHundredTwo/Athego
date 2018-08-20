package com.hexacore.athego.dao;

import org.apache.ibatis.session.SqlSession;

public abstract class DAO {
protected SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session = session;
	}
}

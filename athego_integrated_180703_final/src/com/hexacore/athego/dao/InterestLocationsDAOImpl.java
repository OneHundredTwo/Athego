package com.hexacore.athego.dao;

import com.hexacore.athego.vo.InterestLocation;

public class InterestLocationsDAOImpl extends DAO implements InterestLocationsDAO {
	// 상준 시작
	// Writer_________N__180629
	@Override
	public int insertAttentionCity_N(InterestLocation interestLocation) {

		return session.insert("interest_locations.insertAttentionCity_N", interestLocation);
	}
	// 상준 END
}

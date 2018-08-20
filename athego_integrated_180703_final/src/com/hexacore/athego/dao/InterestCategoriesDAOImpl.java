package com.hexacore.athego.dao;

import com.hexacore.athego.vo.InterestCategory;

public class InterestCategoriesDAOImpl extends DAO implements InterestCategoriesDAO {
	
	
	
	//상준 시작
	//Writer_________N__180625 
	@Override
	public int insertInterest_N(InterestCategory interestCategory) {
		// TODO Auto-generated method stub
		return session.insert("interest_categories.insertCategory_N",interestCategory);
	}
	//상준 END
 
}

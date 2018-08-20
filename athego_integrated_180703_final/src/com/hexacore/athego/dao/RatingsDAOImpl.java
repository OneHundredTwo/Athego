package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.OptionMyp;
import com.hexacore.athego.vo.Rating;

public class RatingsDAOImpl extends DAO implements RatingsDAO {
 
	/**
	 * Writer___________K__180624
	 */
	@Override
	public int insert_K(Rating rating) {
		// TODO Auto-generated method stub
		return session.insert("ratings.insert_K", rating);
	}
	
	/**
	 * Writer___________K__180624
	 * @param userNo
	 * @return
	 */
	@Override
	public Rating selectOneByUserNoAndNolgoNo_K(Rating rating) {
		// TODO Auto-generated method stub
		return session.selectOne("ratings.selectOneByUserNoAndNolgoNo_K", rating);
	}
	
	/**
	 * Writer___________K__180624
	 * @param userNo
	 * @return
	 */
	@Override
	public List<CamelHashMap> selectListByNolgoNo_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("ratings.selectListByNolgoNo_K", map);
	}	
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public int selectTotalCountByNolgoNo_K(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectOne("ratings.selectTotalCountByNolgoNo_K", nolgoNo);
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public int deleteByNo_K(int no) {
		// TODO Auto-generated method stub
		return session.delete("ratings.deleteByNo_K", no);
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public List<CamelHashMap> selectGroupByScoreCountByNolgoNo_K(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectList("ratings.selectGroupByScoreCountByNolgoNo_K", nolgoNo);
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public double selectAvgScoreByNolgoNo_K(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectOne("ratings.selectAvgScoreByNolgoNo_K", nolgoNo);
	}
	
	/**
	 * Writer___________K__180625
	 */
	@Override
	public int update_K(Rating rating) {
		// TODO Auto-generated method stub
		return session.update("ratings.update_K", rating);
	}
	/**
	 * Writer___________K__180626
	 */
	@Override
	public List<CamelHashMap> selectListByUserNo_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("ratings.selectListByUserNo_K", map);
	}
	
	/**
	 * Writer___________K__180626
	 */
	@Override
	public int selectTotalCountByUserNo_K(int userNo) {
		// TODO Auto-generated method stub
		return session.selectOne("ratings.selectTotalCountByUserNo_K", userNo);
	}
	
	@Override
	public List<Rating> getRatingInMypByT(OptionMyp option) {
		return session.selectOne("ratings.selectRatingListbyTag_A", option);
	}

	@Override
	public List<Rating> getRatingInMypage(OptionMyp option) {
		return session.selectOne("ratings.selectRatingList_A", option);
	}
	
	/**
	 * Writer___________K__180627
	 */
	@Override
	public Rating selectOneByNo_K(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("ratings.selectOneByNo_K", no);
	}
}

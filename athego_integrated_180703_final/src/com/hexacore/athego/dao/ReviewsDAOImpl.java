package com.hexacore.athego.dao;
 
import java.util.List;

import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.OptionMyp;

public class ReviewsDAOImpl extends DAO implements ReviewsDAO {
 
	/**
	 * Writer___________K__180620
	 * 
	 * @param review
	 * @return
	 */
	@Override
	public int insert_K(Review review) {
		// TODO Auto-generated method stub
		return session.insert("reviews.insert_K", review);
	}

	/**
	 * Writer___________K__180620
	 * 
	 * @param map
	 * @return
	 */
	@Override
	public List<CamelHashMap> selectListByNolgoNo_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("reviews.selectListByNolgoNo_K", map);
	}

	/**
	 * Writer___________K__180623
	 */
	@Override
	public int selectTotalCountByNolgoNo_K(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectOne("reviews.selectTotalCountByNolgoNo_K", nolgoNo);
	}
	
	/**
	 * Writer___________K__180623
	 */
	@Override
	public Review selectOneByNo_K(int contentNo) {
		// TODO Auto-generated method stub
		return session.selectOne("reviews.selectOneByNo_K", contentNo);
	}
	
	/**
	 * Writer___________K__180623
	 */
	@Override
	public int update_K(Review review) {
		// TODO Auto-generated method stub
		return session.update("reviews.update_K", review);
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public int deleteByNo_K(int no) {
		// TODO Auto-generated method stub
		return session.update("reviews.deleteByNo_K", no);
	}
	/**
	 * Writer___________K__180626
	 */
	@Override
	public List<CamelHashMap> selectListByUserNo_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("reviews.selectListByUserNo_K", map);
	}
	
	/**
	 * Writer___________K__180626
	 */
	@Override
	public int selectTotalCountByUserNo_K(int userNo) {
		// TODO Auto-generated method stub
		return session.selectOne("reviews.selectTotalCountByUserNo_K", userNo);
	}
	
	@Override
	public List<Review> getReviewInMypByT(OptionMyp option) {
		return session.selectOne("reviews.selectReviewListbyTag_A", option);
	}

	@Override
	public List<Review> getReviewInMypage(OptionMyp option) {
		return session.selectOne("reviews.selectReviewList_A", option);
	}
	
	/* Writer___________A__180627 */
	@Override
	public int updateCnt_A(int reviewNo, int changeN) {
		if(changeN<0) {return session.update("reviews.upLikingCnt_A", reviewNo); }
		else {return session.update("reviews.downLikingCnt_A", reviewNo); }
		
	}
	
	// 기원 start
	/* Writer___________B__180622 */
	@Override
	public List<Review> selectListBySearchParams_B(SearchVO searchParams) {
		// TODO Auto-generated method stub
		return session.selectList("reviews.selectListBySearchParams_B", searchParams);
	}
	/* Writer___________B__180626 */
	@Override
	public int selectListBySearchParamsTotalCount_B(SearchVO searchParams) {
		// TODO Auto-generated method stub
		return session.selectOne("reviews.selectListBySearchParamsTotalCount_B", searchParams);
	}
	// 기원 end


	
	
}

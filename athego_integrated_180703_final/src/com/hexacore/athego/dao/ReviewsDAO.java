package com.hexacore.athego.dao;

import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.OptionMyp;
public interface ReviewsDAO {
	 
	/**
	 * Writer___________K__180620
	 * 입력
	 * @param review 
	 * @return
	 */
	public int insert_K(Review review);

	/**
	 * Writer___________K__180620
	 * 리뷰 리스트
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectListByNolgoNo_K(Map<String, Object> map);
	
	/**
	 * Writer___________K__180622
	 * @param nolgoNo
	 * @return
	 */
	public int selectTotalCountByNolgoNo_K(int nolgoNo);

	/**
	 * Writer___________K__180623
	 * @param contentNo
	 * @return
	 */
	public Review selectOneByNo_K(int contentNo);

	/**
	 * Writer___________K__180623
	 * @param review
	 * @return
	 */
	public int update_K(Review review);
	
	/**
	 * Writer___________K__180624
	 * @param no
	 * @return
	 */
	public int deleteByNo_K(int no);
	/**
	 * Writer___________K__180626
	 * 마이페이지에서 리뷰 호출시
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectListByUserNo_K(Map<String, Object> map);

	/**
	 * Writer___________K__180626
	 * 
	 * @param userNo
	 * @return
	 */
	public int selectTotalCountByUserNo_K(int userNo);

	public List<Review> getReviewInMypByT(OptionMyp option);/* Writer___________A__180626 */
	public List<Review> getReviewInMypage(OptionMyp option);/* Writer___________A__180626 */
	public int updateCnt_A(int reviewNo, int changeN);/* Writer___________A__180627 */
	
	
	//기원 start

	public List<Review> selectListBySearchParams_B(SearchVO searchParams);/* Writer___________B__180622 */
	public int selectListBySearchParamsTotalCount_B(SearchVO searchParams);/* Writer___________B__180626 */
	
	//기원 end
}

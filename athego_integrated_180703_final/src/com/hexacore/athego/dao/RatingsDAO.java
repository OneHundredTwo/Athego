package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.OptionMyp;
import com.hexacore.athego.vo.Rating;

public interface RatingsDAO {
	/**
	 * Writer___________K__180624
	 * 
	 * @param rating
	 * @return
	 */
	public int insert_K(Rating rating);

	/**
	 * Writer___________K__180624
	 * 
	 * @param userNo
	 * @return
	 */
	public Rating selectOneByUserNoAndNolgoNo_K(Rating rating);

	/**
	 * Writer___________K__180624
	 * 
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectListByNolgoNo_K(Map<String, Object> map);

	/**
	 * Writer___________K__180624
	 * @param nolgoNo
	 * @return
	 */
	public int selectTotalCountByNolgoNo_K(int nolgoNo);

	/**
	 * Writer___________K__180624
	 * @param no
	 * @return
	 */
	public int deleteByNo_K(int no);
	
	/**
	 * Writer___________K__180624
	 * @param nolgoNo
	 * @return
	 */
	public List<CamelHashMap> selectGroupByScoreCountByNolgoNo_K(int nolgoNo);

	/**
	 * Writer___________K__180624
	 * @param nolgoNo
	 * @return
	 */
	public double selectAvgScoreByNolgoNo_K(int nolgoNo);

	/**
	 * Writer___________K__180625
	 * @param rating
	 * @return
	 */
	public int update_K(Rating rating);
	
	/**
	 * Writer___________K__180626
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectListByUserNo_K(Map<String, Object> map);

	/**
	 * Writer___________K__180626
	 * @param userNo
	 * @return
	 */
	public int selectTotalCountByUserNo_K(int userNo);
	
	public List<Rating> getRatingInMypByT(OptionMyp option);/* Writer___________A__180626 */
	public List<Rating> getRatingInMypage(OptionMyp option);/* Writer___________A__180626 */

	/**
	 * Writer___________K__180627
	 * @param userNo
	 * @return
	 */
	public Rating selectOneByNo_K(int no);
}

package com.hexacore.athego.service;

import java.util.List;
import java.util.Map;

import com.hexacore.athego.vo.Convenient;
import com.hexacore.athego.vo.IndexRecommendation;
import com.hexacore.athego.vo.Location;
import com.hexacore.athego.vo.Menu;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.NolgoConvenient;
import com.hexacore.athego.vo.Rating;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.SubCategory;
import com.hexacore.athego.vo.Tag;

public interface NolgosService {
	
	/* Writer___________Y__180627 */
	public int getLocationNo(String depths);
	
	/* Writer___________Y__180627 */
	public List<Convenient> convenientList();

	/* Writer___________Y__180626 */
	public Map<String, Object> modifyNolgo_Y(Nolgo nolgo);
	
	/* Writer___________Y__180624 */
	public boolean registerNolgo_Y(Nolgo nolgo);
	
	/* Writer___________Y__180624 */
	public boolean registerMenu_Y(Menu menu);
	
	/* Writer___________Y__180624 */
	public boolean registerNolgoConvenient_Y(NolgoConvenient nolgoConvenient);
	
	/* Writer___________Y__180624 */
	public boolean registerSubCategory_Y(SubCategory subCategory);
	
	/* Writer___________Y__180624 */
	public boolean registerTag_Y(Tag tag);
	
	/* Writer___________Y__180624 */
	public boolean addLocationNolgoCnt_Y(int nolgoNo);
	
	/* Writer___________Y__180626 */
	public boolean updateCategoryCnt_Y(int no);
	
	/* Writer___________Y__180625 */
	public Map<String, Object> selectNolgo_Y(int nolgoNo);

	/**
	 *  Writer___________K__180620
	 *  놀고 상세
	 * @param no
	 * @param loginUserNo
	 * @return
	 */
	public Map<String, Object> getNolgo_K(int no, int loginUserNo);

	/**
	 *  Writer___________K__180620
	 *  리뷰 등록
	 * @param review
	 * @param tags  
	 * @return
	 */
	public boolean registerReview_K(Review review, String[] tags);

	/**
	 *  Writer___________K__180620
	 *  리뷰 리스트
	 * @param nolgoNo
	 * @param page
	 * @param loginUserNo
	 * @return
	 */
	public Map<String, Object> getReviewListByNolgoNo_K(int nolgoNo, int page, int loginUserNo);
	

	/**
	 * Writer___________K__180623
	 * @param contentType
	 * @param contentNo
	 * @param userNo
	 * @return
	 */
	public int registerLiking_K(String contentType, int contentNo, int userNo);
	
	/**
	 * Writer___________K__180623
	 * @param contentType
	 * @param contentNo
	 * @param userNo
	 * @return
	 */
	public int removeLiking_K(String contentType, int contentNo, int userNo);

	/**
	 * Writer___________K__180624
	 * @param no
	 * @return
	 */
	public boolean removeReviewByNo_K(int no);

	/**
	 * Writer___________K__180624
	 * @param rating
	 * @param tags
	 * @return
	 */
	public Map<String, Object> registerRating_K(Rating rating, String[] tags);
	
	/**
	 * Writer___________K__180624
	 * @param nolgoNo
	 * @param page
	 * @param loginUserNo
	 * @return
	 */
	public Map<String, Object> getRatingListByNolgoNo_K(int nolgoNo, int page, int loginUserNo);

	/**
	 * Writer___________K__180624
	 * @param no
	 * @return
	 */
	public boolean removeRatingByNo_K(int no);

	/**
	 * Writer___________K__180624
	 * @param no
	 * @return
	 */
	public boolean modifyReview_K(Review review, String[] tags);

	/**
	 * Writer___________K__180625
	 * @param rating
	 * @param tags
	 * @return
	 */
	public boolean modifyRating_K(Rating rating, String[] tags);
 
	
	/**
	 * Writer___________K__180625
	 * @param report
	 * @return
	 */
	public boolean registerReport_K(String contentType, int contentNo, String content, int loginUserNo);
	
	/**
	 * Writer___________H__180625
	 * 
	 */
	public List<Nolgo> getNolgo();
	public List<IndexRecommendation> getRecommendation();
	/**
	 * Writer___________H__180627 
	 * @param nolgoNos
	 * @return
	 */
	public List<Map<String,Object>> getNolgoListByNolgoNos_H(String nolgoNos, int loginUserNo);
	
	
	/*기원 start*/
	public Map<String,Object> getSearchFilterValues_B(SearchVO searchFilters);/* Writer___________B__180625 */
	public List<Location> getDepth2List_B(int depth1Code);/* Writer___________B__180625 */
	public List<Location> getDepth3List_B(int depth2Code);/* Writer___________B__180625 */
	/*기원 end*/
	

	public String getLocationUntilMid(int locationNo);/* Writer___________A__180627 */
	public int getUserNolgoCnt(int userNo, String type);/* Writer___________A__180627 */

	/**
	 * Writer___________K__180629
	 * @param nolgoNos
	 * @param loginUserNo
	 * @return
	 */
	List<Map<String, Object>> getNolgoListForRecom_K(int loginUserNo);

	/**
	 * Writer___________K__180701
	 * @param loginUserNo
	 * @return
	 */
	public List<Map<String, Object>> getNolgoListTopTenForUserRecom_K(int loginUserNo);
}

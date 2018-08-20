package com.hexacore.athego.service;

import java.util.Collection;
import java.util.Map;

import com.hexacore.athego.vo.IndexRecommendation;
import com.hexacore.athego.vo.User;

public interface AdminsService {

	/**
	 * Writer___________K__180626
	 * @param page
	 * @return
	 */
	public Map<String, Object> getReportList_K(int page);
	 
	/**
	 * Writer___________K__180626	  
	 * @param no
	 * @return
	 */
	public Map<String, Object> getReviewByNo_K(int no);

	/**
	 * Writer___________K__180627	
	 * @param no
	 * @param parseInt
	 * @return
	 */
	public Map<String, Object> modifyReportStatus(int no, int status);

	/**
	 * Writer___________K__180627
	 * @param no
	 * @return
	 */
	public Map<String, Object> getRatingByNo_K(int no);

	/**
	 * Writer___________K__180627
	 * @param user
	 * @return
	 */
	public User getUserForLogin_K(User user);

	/**
	 * Writer___________K__180628
	 * @param keyword
	 * @param i
	 * @return
	 */
	public Map<String, Object> getNolgoListForAdminIndexRecom_K(String keyword, int page);
	
	/**
	 * Writer___________K__180628 
	 * @param page
	 * @return
	 */
	public Map<String, Object> getNolgoListForAdmin_K(int page);

	/**
	 * Writer___________K__180629 
	 * @param page
	 * @return
	 */
	public boolean modifyIndexRecomOrder_K(Map<String, String> map);
	
	/**
	 * Writer___________K__180629 
	 * @param no
	 * @return
	 */
	public boolean remove_K(int no);

	/**
	 * Writer___________K__180629
	 * @param indexRecommendation
	 * @return
	 */
	public boolean registerRecom_K(IndexRecommendation indexRecommendation);

	/**
	 * Writer___________K__1800701
	 */
	public void generateRelInfo_K();
}

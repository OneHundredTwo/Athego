package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.IndexRecommendation;

public interface IndexRecommendationsDAO {
	 
	public List<IndexRecommendation> selectlist_H();
	
	/**
	 * Writer___________K__180629
	 * @return
	 */
	public List<IndexRecommendation> selectListForAdmin_K();
	
	/**
	 * Writer___________K__180629
	 * @return
	 */
	public int updateOrder_K(IndexRecommendation indexRecommendation);
	
	/**
	 * Writer___________K__180629
	 * @return
	 */
	public IndexRecommendation selectOneByOrderNo_K(int orderNo);

	/**
	 * Writer___________K__180629
	 * @return
	 */
	public IndexRecommendation selectOneByNo_K(int no);
	
	/**
	 * Writer___________K__180629
	 * @return
	 */
	public int selectTotalCount_K();
	
	/**
	 * Writer___________K__180629
	 * @param no
	 * @return
	 */
	public int delete_K(int no);

	/**
	 * Writer___________K__180629
	 * @param indexRecommendation
	 * @return
	 */
	public int insert_K(IndexRecommendation indexRecommendation);
}

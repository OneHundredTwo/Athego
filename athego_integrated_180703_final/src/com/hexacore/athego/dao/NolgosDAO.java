package com.hexacore.athego.dao;

import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.SearchVO;

public interface NolgosDAO {
	
	/* Writer___________Y__180626 */
	public int update_Y(Nolgo nolgo);
	 
	/* Writer___________Y__180624 */
	public int insert_Y(Nolgo nolgo);
	
	/* Writer___________Y__180625 */
	public Nolgo selectOne_Y(int no);
	
	/**
	 *  Writer___________K__180620
	 *  놀고 상세
	 * @param no
	 * @return
	 */
	public Nolgo selectOneByNo_K(int no);
	
	/**
	 * Writer___________K__180624
	 * 놀고 수정
	 * - 평점이나 리뷰가 달릴시에 카운트 수정
	 * @param nolgo
	 * @return
	 */
	public int update_K(Nolgo nolgo);

	/**
	 * Writer___________H__180625
	 * 인덱스 놀고 리스트
	 * */
	public List<Nolgo> InterestCardlist_H();
	
	/**
	 * Writer___________H__180627 
	 * @param 
	 * @return
	 */
	List<Nolgo> selectInterestCardListByNolgoNos_H(Map<String,Object> nos);
	
	
	// 기원 start
	 public List<Nolgo> selectListBySearchParams_B(SearchVO searchParams);/* Writer___________B__180622 */
	 public int selectListBySearchParamsTotalCount_B(SearchVO searchParams);/* Writer___________B__180626 */
	// 기원 end

	 
 	public Nolgo selectNolgoSimpdata(int i);/* Writer___________A__180627 */
	public int selectCtn_A(int userNo);/* Writer___________A__180627 */
	public List<Nolgo> selectByOwnerNo(Map<String, Object> map); /* Writer___________A__180627 */
	 
	/**
	 * Writer___________K__180628
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectListForAdminIndexRecom_K(Map<String, Object> map);
	
	/**
	 * Writer___________K__180628
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectListForAdmin_K(Map<String, Object> map);

	/**
	 * Writer___________K__180628
	 * @param map
	 * @return
	 */
	public int selectTotalCountForAdminIndexRecom_K(Map<String, Object> map);

	/**
	 * Writer___________K__180629
	 * @param map
	 * @return
	 */
	public List<Nolgo> selectListTopThreeForRecom_K();

	/**
	 * Writer___________K__1800701
	 * @param map
	 * @return
	 */
	List<Nolgo> selectSimpleListByUserNo_K(Map<String, Object> map);

	/**
	 * Writer___________K__1800701
	 * @param map
	 * @return
	 */
	List<Nolgo> selectListTopTenForUserRecom_K(Map<String, Object> categoryNos);

	/**
	 * Writer___________K__1800701
	 * @return
	 */
	public List<Nolgo> selectListForGenerateRelInfo_K();
	
}



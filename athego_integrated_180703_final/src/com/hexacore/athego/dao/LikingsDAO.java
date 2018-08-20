package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.vo.Liking;

public interface LikingsDAO {
	 
	/**
	 * Writer___________K__180623
	 * @param map
	 * @return
	 */
	public int insert_K(Liking liking);
	
	/**
	 * Writer___________K__180623
	 * @param map
	 * @return
	 */
	public int delete_K(Liking liking);
	 
	/**
	 * Writer___________K__180623
	 * @param liking
	 * @return
	 */
	public int selectCountByContentNo_K(Liking liking);

	/**
	 * Writer___________K__180623
	 * @param liking
	 * @return
	 */
	public int selectCountByContentNoAndUserNo_K(Liking liking);
	

	public List<Integer> selectByUserNo(Map<String, Object> map);	/* Writer___________A__180627*/
	public int selectCtn_A(int userNo);	/* Writer___________A__180627*/
	public int deleteLikingR_A(Map<String,Object> map);/* Writer___________A__180627*/
	public int insertLikingR_A(Map<String,Object> map);/* Writer___________A__180627*/
	
	
}

package com.hexacore.athego.dao;

import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.Report;
 
public interface ReportsDAO {
	/**
	 * Writer___________K__180624
	 * 
	 * @param report
	 * @return
	 */
	public int insert_K(Report report);
	
	/**
	 * Writer___________K__180626
	 * @param map
	 * @return
	 */
	public List<CamelHashMap> selectList_K(Map<String, Object> map);

	/**
	 * Writer___________K__180626
	 * @return
	 */
	public int selectTotalCount_K();

	/**
	 * Writer___________K__180627
	 * @param no
	 * @return
	 */
	public Report selectOne_K(int no);

	/**
	 * Writer___________K__180627
	 * @param report
	 * @return
	 */
	public int update_K(Report report);
}

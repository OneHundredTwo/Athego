package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.Report;

public class ReportsDAOImpl extends DAO implements ReportsDAO {
 
	/**
	 *  Writer___________K__180625
	 */
	@Override
	public int insert_K(Report report) {
		// TODO Auto-generated method stub
		return session.insert("reports.insert_K", report);
	}
	

	/**
	 * Writer___________K__180626
	 */
	@Override
	public List<CamelHashMap> selectList_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("reports.selectList_K", map);
	}
	
	/**
	 * Writer___________K__180626
	 */
	@Override
	public int selectTotalCount_K() {
		// TODO Auto-generated method stub
		return session.selectOne("reports.selectTotalCount_K");
	}
	
	/**
	 * Writer___________K__180627
	 */
	@Override
	public Report selectOne_K(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("reports.selectOne_K", no);
	}
	
	/**
	 * Writer___________K__180627
	 */
	@Override
	public int update_K(Report report) {
		// TODO Auto-generated method stub
		return session.update("reports.update_K", report);
	}
}

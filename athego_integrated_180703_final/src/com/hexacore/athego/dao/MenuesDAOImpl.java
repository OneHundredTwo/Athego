package com.hexacore.athego.dao;
 
import java.util.List;

import com.hexacore.athego.vo.Menu;

public class MenuesDAOImpl extends DAO implements MenuesDAO {
	 
	/* Writer___________Y__180627 */
	public int delete_Y(int nolgoNo) {
		return session.delete("menues.delete_Y", nolgoNo);
	}
		
	/* Writer___________Y__180624 */
	public int insert_Y(Menu menu) {
		return session.insert("menues.insert_Y", menu);
	}
	
	/* Writer___________Y__180625 */
	public List<Menu> selectListByNolgoNo_Y(int nolgoNo) {
		return session.selectList("menues.selectListByNolgoNo_Y", nolgoNo);
	}
	
	/**
	 * Writer___________K__180625
	 */
	@Override
	public List<Menu> selectListByNolgoNo_K(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectList("menues.selectListByNolgoNo_K", nolgoNo);
	}
}

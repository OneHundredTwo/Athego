package com.hexacore.athego.dao;
 
import java.util.List;

import com.hexacore.athego.vo.Menu;

public interface MenuesDAO {

	/* Writer___________Y__180627 */
	public int delete_Y(int nolgoNo);
	 
	/* Writer___________Y__180624 */
	public int insert_Y(Menu menu);
	
	/* Writer___________Y__180625 */
	public List<Menu> selectListByNolgoNo_Y(int nolgoNo);
	
	/**
	 * Writer___________K__180625
	 * @param nolgoNo
	 * @return
	 */
	public List<Menu> selectListByNolgoNo_K(int nolgoNo);
}

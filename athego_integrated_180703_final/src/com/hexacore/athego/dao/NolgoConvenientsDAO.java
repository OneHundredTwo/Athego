package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.NolgoConvenient;

public interface NolgoConvenientsDAO {
	/* Writer___________Y__180627 */
	public int delete_Y(int nolgoNo);
	
	/* Writer___________Y__180624 */
	public int insert_Y(NolgoConvenient nolgoConvenient);
	
	/* Writer___________Y__180625 */
	public List<NolgoConvenient> selectListByNolgoNo(int nolgoNo);
	
	//기원 start
	public List<NolgoConvenient> selectNolgoConvenientList_B(int nolgoNo);/* Writer___________B__180626 */
	//기원 end
}

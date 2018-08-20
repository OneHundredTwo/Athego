package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.NolgoConvenient;

public class NolgoConvenientsDAOImpl extends DAO implements NolgoConvenientsDAO {
	/* Writer___________Y__180627 */
	public int delete_Y(int nolgoNo) {
		return session.delete("nolgo_convenients.delete_Y", nolgoNo);
	}
	
	/* Writer___________Y__180624 */
	public int insert_Y(NolgoConvenient nolgoConvenient) {
		return session.insert("nolgo_convenients.insert_Y", nolgoConvenient);
	}
	
	/* Writer___________Y__180625 */
	public List<NolgoConvenient> selectListByNolgoNo(int nolgoNo) {
		return session.selectList("nolgo_convenients.selectListByNolgoNo", nolgoNo);
	}
	
	//기원 start
	/* Writer___________B__180626 */
	@Override
	public List<NolgoConvenient> selectNolgoConvenientList_B(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectList("nolgo_convenients.selectNolgoConvenientList_B", nolgoNo);
	}
	//기원 end
}

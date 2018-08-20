package com.hexacore.athego.dao;
 
import java.util.List;
import com.hexacore.athego.vo.Convenient;

public class ConvenientsDAOImpl extends DAO implements ConvenientsDAO {
 
	/* Writer___________Y__180627 */
	public List<Convenient> selectList_Y() {
		return session.selectList("convenients.selectList_Y");
	}
	
	/**
	 * Writer___________K__180625 놀고 기준으로 연결된 편의시설 호출
	 */
	@Override
	public List<Convenient> selectListByNolgoNo_K(int nolgoNo) {
		// TODO Auto-generated method stub
		return session.selectList("convenients.selectListByNolgoNo_K", nolgoNo);
	}
	
	/*기원 start*/
	@Override
	/* Writer___________B__180624 */
	public List<Convenient> selectList_B() {
		// TODO Auto-generated method stub
		return session.selectList("convenients.selectList_B");
	}
	/*기원 end*/
}

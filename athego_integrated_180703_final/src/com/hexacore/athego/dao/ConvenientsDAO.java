package com.hexacore.athego.dao;
 
import java.util.List;
import com.hexacore.athego.vo.Convenient;

public interface ConvenientsDAO {
	 
	/* Writer___________Y__180627 */
	public List<Convenient> selectList_Y();
	
	/**
	 * Writer___________K__180625 놀고 기준으로 연결된 편의시설 호출
	 * @param nolgoNo
	 * @return
	 */
	public List<Convenient> selectListByNolgoNo_K(int nolgoNo);
	
	/*기원 start*/
	public List<Convenient> selectList_B();/* Writer___________B__180624 */
	/*기원 end*/
}

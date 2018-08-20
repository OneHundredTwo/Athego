package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.Category;
import com.hexacore.athego.vo.NolgoConvenient;

public class CategoriesDAOImpl extends DAO implements CategoriesDAO {
	
	/* Writer___________Y__180626 */
	public int updateNolgoCnt_Y(int no) {
		return session.update("categories.updateNolgoCnt_Y", no);
	}
	
	/* Writer___________Y__180626 */
	public int updateSubCategoryCnt_Y(int no) {
		return session.update("categories.updateSubCategoryCnt_Y", no);
	}
	
	/*기원 start*/
	@Override
	/* Writer___________B__180624 */
	public List<Category> selectList_B() {
		// TODO Auto-generated method stub
		return session.selectList("categories.selectList_B");
	}
	/*기원 end*/
	
	/* Writer___________K__180701 */
	@Override
	public List<Category> selectListByUserNo_K(int loginUserNo) {
		// TODO Auto-generated method stub
		return session.selectList("categories.selectListByUserNo_K", loginUserNo);
	}
}

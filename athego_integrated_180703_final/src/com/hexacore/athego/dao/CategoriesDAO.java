package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.Category;

public interface CategoriesDAO {
	/* Writer___________Y__180626 */
	public int updateNolgoCnt_Y(int no);
	
	/* Writer___________Y__180626 */
	public int updateSubCategoryCnt_Y(int no);
	
	/*기원 start*/
	public List<Category> selectList_B();/* Writer___________B__180624 */
	/*기원 end*/

	/* Writer___________K__1800701 */
	public List<Category> selectListByUserNo_K(int loginUserNo);
}

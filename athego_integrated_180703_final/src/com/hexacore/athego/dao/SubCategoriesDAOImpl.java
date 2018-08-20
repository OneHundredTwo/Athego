package com.hexacore.athego.dao;

import com.hexacore.athego.vo.SubCategory;

public class SubCategoriesDAOImpl extends DAO implements SubCategoriesDAO {

	/* Writer___________Y__180627 */
	public int delete_Y(int nolgoNo) {
		return session.delete("sub_categories.delete_Y", nolgoNo);
	}
	/* Writer___________Y__180624 */
	public int insert_Y(SubCategory subCategory) {
		return session.insert("sub_categories.insert_Y", subCategory);
	}
}

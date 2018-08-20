package com.hexacore.athego.dao;
   
import java.util.List;
import java.util.Map;

import com.hexacore.athego.vo.Tag;
import com.hexacore.athego.vo.TypeVO;

public class TagsDAOImpl extends DAO implements TagsDAO {

	/* Writer___________Y__180627 */
	public int delete_Y(int contentNo) {
		return session.delete("tags.delete_Y", contentNo);
	}
 
	/* Writer___________Y__180624 */
	public int insert_Y(Tag tag) {
		return session.insert("tags.insert_Y", tag);
	}
	
	/* Writer___________Y__180625 */
	public List<Tag> selectListByContentNo(Map<String, Object> map) {
		return session.selectList("tags.selectListByContentNo", map);
	}
	
	/**
	 * Writer___________K__180623 태그 등록
	 */
	@Override
	public int insert_K(Tag tag) {
		// TODO Auto-generated method stub
		return session.insert("tags.insert_K", tag);
	}

	/**
	 * Writer___________K__180623 태그 select
	 */
	@Override
	public List<Tag> selectListByContentNo_K(Tag tag) {
		// TODO Auto-generated method stub
		return session.selectList("tags.selectListByContentNo_K", tag);
	}
	
	/**
	 * Writer___________K__180623 태그 삭제
	 */
	@Override
	public int deleteByContentNo_K(Tag tag) {
		// TODO Auto-generated method stub
		return session.delete("tags.deleteByContentNo_K", tag);
	}
	
	//기원 start
	/* Writer___________B__180626 */
	@Override
	public List<Tag> selectList_B(TypeVO typevo) {
		// TODO Auto-generated method stub
		return session.selectList("tags.selectList_B", typevo);
	}
	//기원 end
	
	@Override
	public List<Tag> selectListByCategoryNo_A(int categoryNo) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}

package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.vo.Tag;
import com.hexacore.athego.vo.TypeVO;

public interface TagsDAO {
	
	/* Writer___________Y__180627 */
	public int delete_Y(int contentNo);
	
	/* Writer___________Y__180624 */
	public int insert_Y(Tag tag);
	
	/* Writer___________Y__180625 */
	public List<Tag> selectListByContentNo(Map<String, Object> map);

	/** 
	 * Writer___________K__180623 리뷰 태그 등록
	 * */
	public int insert_K(Tag tag);

	/**
	 * Writer___________K__180623 리뷰 태그 select
	 * @param object
	 * @return
	 */
	public List<Tag> selectListByContentNo_K(Tag tag);
	 
	/**
	 * Writer___________K__180624 리뷰 태그 삭제
	 * @param tag
	 * @return
	 */
	public int deleteByContentNo_K(Tag tag);
	
	//기원 start
	public List<Tag> selectList_B(TypeVO typevo); /* Writer___________B__180626 */
	//기원 end

	/* Writer___________A__180629 */
	public List<Tag> selectListByCategoryNo_A(int categoryNo); // N
}

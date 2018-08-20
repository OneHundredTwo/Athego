package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.vo.Liking;

public class LikingsDAOImpl extends DAO implements LikingsDAO {
 
	/**
	 * Writer___________K__180623
	 */
	@Override
	public int insert_K(Liking liking) {

		return session.insert("likings.insert_K", liking);		
	}
	
	/**
	 * Writer___________K__180623
	 * @param map
	 * @return
	 */
	@Override
	public int delete_K(Liking liking) {

		return session.delete("likings.delete_K", liking);		
	}
	
	/**
	 * Writer___________K__180623
	 */
	@Override
	public int selectCountByContentNo_K(Liking liking) {
		// TODO Auto-generated method stub
		return session.selectOne("likings.selectCountByContentNo_K", liking);	
	}
	
	/**
	 * Writer___________K__180623
	 */
	@Override
	public int selectCountByContentNoAndUserNo_K(Liking liking) {
		// TODO Auto-generated method stub
		return session.selectOne("likings.selectCountByContentNoAndUserNo_K", liking);	
	}
	/* Writer___________A__180627 */
	@Override
	public List<Integer> selectByUserNo(Map<String, Object> map) {
		System.out.println("inDAO____Start_"+map.get("start")+"__End_"+map.get("end")+"__UserNO:"+map.get("userNo"));
		return session.selectList("likings.selectByUserNo_A", map);
	}
	/* Writer___________A__180627 */
	@Override
	public int selectCtn_A(int userNo) {
		return session.selectOne("likings.selectCtn_A", userNo);
	}
	/* Writer___________A__180627 */
	@Override
	public int deleteLikingR_A(Map<String,Object> map) {
		return session.selectOne("likings.deleteLikingR_A", map);
	}
	/* Writer___________A__180627 */
	@Override
	public int insertLikingR_A(Map<String,Object> map) {
		return session.selectOne("likings.insertLikingR_A",  map);
	}
	
}

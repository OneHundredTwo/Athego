package com.hexacore.athego.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.hexacore.athego.vo.IndexRecommendation;

public class IndexRecommendationsDAOImpl extends DAO implements IndexRecommendationsDAO {
 
	private SqlSession session;
	
	public void setSession(SqlSession session) {
		this.session=session;
	}

	@Override
	public List<IndexRecommendation> selectlist_H() {
		// TODO Auto-generated method stub
		return session.selectList("index_recommendations.selectlist_H");
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public List<IndexRecommendation> selectListForAdmin_K() {
		// TODO Auto-generated method stub
		return session.selectList("index_recommendations.selectListForAdmin_K");
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public int updateOrder_K(IndexRecommendation indexRecommendation) {
		
		return session.update("index_recommendations.updateOrder_K", indexRecommendation);
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public IndexRecommendation selectOneByOrderNo_K(int orderNo) {
		// TODO Auto-generated method stub
		return  session.selectOne("index_recommendations.selectOneByOrderNo_K", orderNo);
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public IndexRecommendation selectOneByNo_K(int no) {
		// TODO Auto-generated method stub
		return  session.selectOne("index_recommendations.selectOneByNo_K", no);
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public int selectTotalCount_K() {
		return  session.selectOne("index_recommendations.selectTotalCount_K");
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public int delete_K(int no) {
		// TODO Auto-generated method stub
		return session.delete("index_recommendations.delete_K", no);
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public int insert_K(IndexRecommendation indexRecommendation) {
		// TODO Auto-generated method stub
		return session.insert("index_recommendations.insert_K", indexRecommendation);
	}
}

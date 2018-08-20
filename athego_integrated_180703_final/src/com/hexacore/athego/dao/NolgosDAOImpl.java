package com.hexacore.athego.dao;
 
import java.util.List;
import java.util.Map;

import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.SearchVO;

public class NolgosDAOImpl extends DAO implements NolgosDAO {
 
	/* Writer___________Y__180626 */
	public int update_Y(Nolgo nolgo) {
		return session.update("nolgos.update_Y", nolgo);
	}
	
	/* Writer___________Y__180624 */
	public int insert_Y(Nolgo nolgo) {
		return session.insert("nolgos.insert_Y",nolgo);
	}
	
	/* Writer___________Y__180625 */
	public Nolgo selectOne_Y(int no) {
		return session.selectOne("nolgos.selectOne_Y", no);
	}
	
	/**
	 * Writer___________K__180620
	 * @param no
	 * @return
	 */
	@Override
	public Nolgo selectOneByNo_K(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("nolgos.selectOneByNo_K", no);
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public int update_K(Nolgo nolgo) {
		// TODO Auto-generated method stub
		return session.update("nolgos.update_K", nolgo);
	}
	/**
	 * Writer___________H__180625
	 * */
	@Override
	public List<Nolgo> InterestCardlist_H() {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.interestCardlist_H");
	}
	
	/**
	 * Writer___________H__180627 
	 * @param nolgoNos
	 * @return
	 */
	@Override
	public List<Nolgo> selectInterestCardListByNolgoNos_H(Map<String, Object> nolgoNos) {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectInterestCardListByNolgoNos_H", nolgoNos);
	}
	
	// 기원 start
	@Override
	/* Writer___________B__180622 */
	public List<Nolgo> selectListBySearchParams_B(SearchVO searchParams) {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectListBySearchParams_B", searchParams);
	}
	/* Writer___________B__180626 */
	@Override
	public int selectListBySearchParamsTotalCount_B(SearchVO searchParams) {
		// TODO Auto-generated method stub
		return session.selectOne("nolgos.selectListBySearchParamsTotalCount_B", searchParams);
	}
	// 기원 end
	/* Writer___________A__180627 */
	@Override
	public Nolgo selectNolgoSimpdata(int i) {
		System.out.println("selectNolgoSimpdata___");
		return session.selectOne("nolgos.selectNolgoSimpdata_A", i);
	}
	/* Writer___________A__180627 */
	@Override
	public int selectCtn_A(int userNo) {
		return session.selectOne("nolgos.selectCtn_A", userNo);
	}
	/* Writer___________A__180627 */
	@Override
	public List<Nolgo> selectByOwnerNo(Map<String, Object> map) {
		return session.selectList("nolgos.selectByOwnerNo_A", map);
	}
	
	/**
	 * Writer___________K__180701
	 * 
	 */
	@Override
	public List<Nolgo> selectSimpleListByUserNo_K(Map<String, Object> map) {
		return session.selectList("nolgos.selectSimpleListByUserNo_K", map);
	} 

	/**
	 * Writer___________K__180628
	 */
	@Override
	public List<CamelHashMap> selectListForAdminIndexRecom_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectListForAdminIndexRecom_K", map);
	}
	/**
	 * Writer___________K__180628
	 */
	@Override
	public List<CamelHashMap> selectListForAdmin_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectListForAdmin_K", map);
	}
	/**
	 * Writer___________K__180628
	 */
	@Override
	public int selectTotalCountForAdminIndexRecom_K(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return session.selectOne("nolgos.selectTotalCountForAdminIndexRecom_K", map);
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public List<Nolgo> selectListTopThreeForRecom_K() {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectListTopThreeForRecom_K");
	}
	
	/**
	 * Writer___________K__180701
	 */
	@Override
	public List<Nolgo> selectListTopTenForUserRecom_K(Map<String, Object> categoryNos) {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectListTopTenForUserRecom_K", categoryNos);
	}
	
	/**
	 * Writer___________K__1800701
	 */
	@Override
	public List<Nolgo> selectListForGenerateRelInfo_K() {
		// TODO Auto-generated method stub
		return session.selectList("nolgos.selectListForGenerateRelInfo_K");
	}
	
}

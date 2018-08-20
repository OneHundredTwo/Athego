package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.Location;

public class LocationsDAOImpl extends DAO implements LocationsDAO {
	/* Writer___________Y__180627 */
	public Location selectOne(Location location) {
		return session.selectOne("locations.selectOne", location);
	}

	/* Writer___________Y__180624 */
	public int updateNolgoCnt_Y(int no) {
		return session.update("locations.updateNolgoCnt_Y", no);
	}

	/* 기원 start */
	/* Writer___________B__180625 */
	@Override
	public List<Location> selectDepth1List_B() {
		// TODO Auto-generated method stub
		return session.selectList("locations.selectDepth1List_B");
	}

	/* Writer___________B__180625 */
	@Override
	public List<Location> selectDepth2List_B(int depth1Code) {
		// TODO Auto-generated method stub
		return session.selectList("locations.selectDepth2List_B", depth1Code);
	}

	/* Writer___________B__180625 */
	@Override
	public List<Location> selectDepth3List_B(int depth2Code) {
		// TODO Auto-generated method stub
		return session.selectList("locations.selectDepth3List_B", depth2Code);
	}

	/* Writer___________B__180626 */
	@Override
	public Location selectNolgoLocation_B(int nolgoLocationNo) {
		// TODO Auto-generated method stub
		return session.selectOne("locations.selectNolgoLocation_B", nolgoLocationNo);
	}
	/* 기원 end */

	/* Writer___________A__180627 */
	@Override
	public String selectDepth12_A(int locationNo) {
		return session.selectOne("locations.selectDepth12_A", locationNo);
	}

	// 상준 start
	/* Writer___________N__180628 */
	@Override
	public List<Location> selectDepth1List_N() {
		// TODO Auto-generated method stub
		return session.selectList("locations.selectDepth1List_N");
	}

	/* Writer___________N__180628 */
	@Override
	public List<Location> selectDepth2List_N(int depth1Code) {
		// TODO Auto-generated method stub
		return session.selectList("locations.selectDepth2List_N", depth1Code);
	}
	// 상준 END
}

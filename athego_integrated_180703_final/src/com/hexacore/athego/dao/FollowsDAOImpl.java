package com.hexacore.athego.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import com.hexacore.athego.vo.Follow;

public class FollowsDAOImpl extends DAO implements FollowsDAO {
	private SqlSession session;
	public void setSession(SqlSession session) {
		this.session = session;
	}
	
	/* Writer___________A__180622 */
	@Override
	public List<Integer> getFollowersNo(int userNo) {
		return session.selectList("follows.selectFlwsNo_A", userNo);
	}
	
	/* Writer___________A__180622 */
	@Override
	public List<Integer> getFollowingsNo(int userNo) {
		return session.selectList("follows.selectFlwingsNo_A", userNo);
	}

	/* Writer___________A__180625 */
	@Override
	public int removeFollow(Follow f) {
		int result = session.delete("follows.deleteFollowRec_A", f);
		return result;
	}
	/* Writer___________A__180625 */
	@Override
	public int addFollow(Follow f) {
		int result = session.insert("follows.insertFollowRec_A", f); 
		return result;
	}
}

package com.hexacore.athego.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.hexacore.athego.vo.Follow;
import com.hexacore.athego.vo.FollowList;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.User;

public class UsersDAOImpl extends DAO implements UsersDAO {

	@Override
	public User selectOne(int no) {
		// TODO Auto-generated method stub
		return session.selectOne("users.selectOne", no);
	}
	  
	/* Writer___________A__180622 */
	@Override
	public FollowList getFollowdata(int no) {
		return session.selectOne("users.selectFlwsNo_A", no);
	}
	/* Writer___________A__180623 */
	@Override
	public String getIntroduce(int no) {
		return session.selectOne("users.selectIntroduce_A", no);
	}
	/* Writer___________A__180624 */
	@Override
	public boolean setUserTextInfo(User user) {
		int result = session.update("users.updateUserTxtInfo_A", user);
		
		if(result==1) { return true; }
		else { return false; }
	}
	
	/* Writer___________A__180625 */
	@Override
	public int updatefollowingCnt(int pickedUser, int i) {
		int result=0;
		if(i<0) { result = session.update("users.updateFlwingCntDown_A", pickedUser);}
		else {result = session.update("users.updateFlwingCntUp_A", pickedUser);}
		return result;
	}
	/* Writer___________A__180625 */ 
	@Override
	public int updatefollowerCnt(int loginUserNo, int i) {
		int result=0;
		if(i<0) { result = session.update("users.updateFlwerCntDown_A", loginUserNo);}
		else {result = session.update("users.updateFlwerCntUp_A",loginUserNo);}
		return result;
		
	}
	
	// 기원 start
		@Override
		/* Writer___________B__180622 */
		public User selectOne_B(int no) {
			// TODO Auto-generated method stub
			return session.selectOne("users.selectOne_B", no);
		}
		/* Writer___________B__180622 */
		public User selectLogin_B(User loginUser) {
			
			return session.selectOne("users.selectLogin_B", loginUser);
		}
		/* Writer___________B__180622 */
		@Override
		public List<User> selectListBySearchParams_B(SearchVO searchParams) {
			// TODO Auto-generated method stub
			return session.selectList("users.selectListBySearchParams_B", searchParams);
		}
		/* Writer___________B__180626 */
		@Override
		public int selectListBySearchParamsTotalCount_B(SearchVO searchParams) {
			// TODO Auto-generated method stub
			return session.selectOne("users.selectListBySearchParamsTotalCount_B", searchParams);
		}
		// 기원 end
		
		//상준 시작
		@Override
		//Writer_________N__180622 
		public int insertUser_N(User user) {
			return session.insert("users.insertUser_N",user);
		}
		//Writer_________N__180626 
		@Override
		public User selectUserPassowrd_N(User user) {
			
			return session.selectOne("users.selectUserPassowrd_N",user);
		}
		//Writer_________N__180626 
		//비밀번호 수정부분
		@Override
		public int updateUserPassword_N(User user) {
			
			return session.update("users.updateUserPassword_N", user);
		}
		//상준 END
	
		/**
		 * Writer___________K__180627 
		 */
		@Override
		public User selectOneForLogin_K(User user) {
			// TODO Auto-generated method stub
			return session.selectOne("users.selectOneForLogin_K", user);
		}
		
		/**
		 * Writer___________K__180630
		 */
		@Override
		public int update_K(User user) {
			// TODO Auto-generated method stub
			return session.update("users.update_K", user);
		}
}

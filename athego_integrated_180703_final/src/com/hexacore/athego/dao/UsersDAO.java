package com.hexacore.athego.dao;

import com.hexacore.athego.vo.User;

import java.util.List;

import com.hexacore.athego.vo.FollowList;
import com.hexacore.athego.vo.SearchVO;

public interface UsersDAO {
	
	public User selectOne(int no);
	
	public FollowList getFollowdata(int i); /* Writer___________A__180622 */
	public String getIntroduce(int loginUserNo);/* Writer___________A__180623 */
	public boolean setUserTextInfo(User user);/* Writer___________A__180624 */
	public int updatefollowingCnt(int pickedUser, int i);/* Writer___________A__180625 */
	public int updatefollowerCnt(int loginUserNo, int i);/* Writer___________A__180625 */	
	
	// 기원 start
		public User selectOne_B(int no);/* Writer___________B__180622 */
		public User selectLogin_B(User loginUser); /* Writer___________B__180622 */
		public List<User> selectListBySearchParams_B(SearchVO searchParams);/* Writer___________B__180622 */
		public int selectListBySearchParamsTotalCount_B(SearchVO searchParams);/* Writer___________B__180626 */
		// 기원 end
		
		//상준 시작
		 //회원가입 이메일 , 비밀번호 닉네임 생년월일
		//Writer_________N__180622 
		 public int insertUser_N(User user);
		 
		 //회원가입한 유저의 비밀번호를 찾는 구문 
		//Writer_________N__180626 
		 public User selectUserPassowrd_N(User user);
		//회원가입한 유저의 비밀번호를 변경 하는 구문 
		//Writer_________N__180626
		 public int updateUserPassword_N(User user);		 
		 //상준 END
		
		 /**
		 * Writer___________K__180627
		 * @param user
		 * @return
		 */
		public User selectOneForLogin_K(User user);

		/**
		 * Writer___________K__180630
		 * @param user
		 * @return
		 */
		public int update_K(User user); 
}

package com.hexacore.athego.service;
import java.util.List;
import java.util.Map;

import com.hexacore.athego.vo.FollowList;
import com.hexacore.athego.vo.InterestCategory;
import com.hexacore.athego.vo.InterestLocation;
import com.hexacore.athego.vo.Location;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.Rating;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.User;

public interface UsersService {
	public User getUser(int no);
	
	public User getpageOwner(int userno);/* Writer___________A__180622 */
	public List<FollowList> getFollowers(int userNo);/* Writer___________A__180622 */
	public List<FollowList> getFollowers(int pageOwnNo, int lgnUNo);/* Writer___________A__180625 */
	public List<FollowList> getFollowings(int userNo);/* Writer___________A__180622 */
	public List<FollowList> getFollowings(int pageOwnNo, int lgnUNo);/* Writer___________A__180625 */
	public List<Integer> getFollowerNos(int loginUserNo);/* Writer___________A__180622 */
	public List<Integer> getFollowingNos(int loginUserNo);/* Writer___________A__180622 */
	public String getComment(int loginUserNo);/* Writer___________A__180623 */
	public String getlgnFollowPageOwn(int no);/* Writer___________A__180624 */
	public boolean setUserTextInfo(User user);/* Writer___________A__180624 */
	public boolean removeFollowRec(int pickedUserNo, int loginUserNo);/* Writer___________A__180625 */
	public boolean addFollowRec(int pickedUserNo, int loginUserNo);/* Writer___________A__180625 */
	public List<Rating> getRatingsOnKeyw(String keyword, String pageOwnerNo, int pageNo);/* Writer___________A__180626 */
	public List<Review> getReviewsOnKeyw(String keyword, String pageOwnerNo, int pageNo);/* Writer___________A__180626 */
	public List<Nolgo> getNolgos_A(int userNo, int pageNo, int numPage, int numBlock, String type);/* Writer___________A__180627 */
	public int toggleLikingBtn(int userNo, String strReviewNo, String type);/* Writer___________A__180627 */
	
	/**
	 * Writer___________K__180626
	 * @param userNo
	 * @param page
	 * @param loginUserNo
	 * @return
	 */
	Map<String, Object> getReviewListByUserNo_K(int userNo, int page, int loginUserNo);

	/**
	 * Writer___________K__180626
	 * @param no
	 * @param page
	 * @param no2
	 * @return
	 */
	public Map<String, Object> getRatingListByUserNo_K(int userNo, int page, int loginUserNo);
	
	
	//기원 start
		public User getUser_B(int no);/* Writer___________B__180622 */
		public User login_B(User loginUser);/* Writer___________B__180622 */
		public Map<String,Object> searchAll_B(SearchVO searchParams);/* Writer___________B__180622 */
		public List<Map<String,Object>> searchNolgo_B(SearchVO searchParams);/* Writer___________B__180626 */
		public List<User> searchUser_B(SearchVO searchParams);/* Writer___________B__180626 */
		public List<Map<String,Object>> searchReview_B(SearchVO searchParams);/* Writer___________B__180626 */
	//기원 end
		//상준 시작
		//회원가입 폼 이메일 비밀번호 닉네임 생년월일 
		//회원가입 부분 insert 부분 수행 부분
		//Writer_________N__180622 
		public boolean register_N
		(User user, String phone1 ,String phone2,String phone3,String year,String month,String date,String introduce, String userProfile);
		
		//Writer_________N__180625 
		//관심사 insert 부분
		public boolean interest_N(InterestCategory  interestCategory); 
		
		//Writer_________N__180626
		//비밀번호 찾기 부분
		 public User passwordFind_N(User user); 
		//Writer_________N__180626
		 //비밀번호 수정 부분
		 public boolean modify_N(User user);
		//Writer_________N__180628
		 //관심지역 depth1 부분
		 public List<Location> getAttentionDepth1List_N(); 
		 /* Writer___________N__180628 */
		 //관심지역 depth2 부분
		 public List<Location> getDepth2List_B(int depth1Code);
		 /* Writer___________N__180628 */
		 //관심도시 추가 insert 구문 
		 public boolean getAttentionCity_N(InterestLocation interestLocation);
		 //상준 END

		 //Writer___________K__180630
		public boolean modifyProfile_K(User user);
		 //Writer___________K__180630
		public boolean modifyCover_K(User user);
}

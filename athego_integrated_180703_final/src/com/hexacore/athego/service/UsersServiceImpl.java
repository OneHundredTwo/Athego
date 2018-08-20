package com.hexacore.athego.service;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.hexacore.athego.dao.CategoriesDAO;
import com.hexacore.athego.dao.FollowsDAO;
import com.hexacore.athego.dao.InterestCategoriesDAO;
import com.hexacore.athego.dao.InterestLocationsDAO;
import com.hexacore.athego.dao.LikingsDAO;
import com.hexacore.athego.dao.LocationsDAO;
import com.hexacore.athego.dao.NolgosDAO;
import com.hexacore.athego.dao.RatingsDAO;
import com.hexacore.athego.dao.ReviewsDAO;
import com.hexacore.athego.dao.SubCategoriesDAO;
import com.hexacore.athego.dao.TagsDAO;
import com.hexacore.athego.dao.UsersDAO;
import com.hexacore.athego.dao.NolgoConvenientsDAO;
import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.util.PaginateUtil;
import com.hexacore.athego.vo.User;
import com.hexacore.athego.vo.Follow;
import com.hexacore.athego.vo.FollowList;
import com.hexacore.athego.vo.InterestCategory;
import com.hexacore.athego.vo.InterestLocation;
import com.hexacore.athego.vo.Liking;
import com.hexacore.athego.vo.Location;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.NolgoConvenient;
import com.hexacore.athego.vo.OptionMyp;
import com.hexacore.athego.vo.Rating;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.Tag;
import com.hexacore.athego.vo.TypeVO;


public class UsersServiceImpl implements UsersService {
	private UsersDAO usersDAO;
	private FollowsDAO followsDAO;
	private RatingsDAO ratingsDAO;
	private ReviewsDAO reviewsDAO;
	private TagsDAO tagsDAO;
	private LikingsDAO likingsDAO;
	private NolgosDAO nolgosDAO; //주입성 지금은 제외했음. => 0626기원 : 제외한거 필요해서 다시넣음
	private LocationsDAO locationsDAO;
	private NolgoConvenientsDAO nolgoConvenientsDAO;
	private CategoriesDAO categoriesDAO;
	private SubCategoriesDAO subCategoriesDAO;
	private InterestCategoriesDAO interestCategoriesDAO;
	private InterestLocationsDAO interestLocationsDAO;
	/* DAO *************************************************************************************************************/
	
	public void setRatingsDAO(RatingsDAO ratingsDAO) {
		this.ratingsDAO = ratingsDAO;
	}
	public void setUsersDAO(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}
	public void setFollowsDAO(FollowsDAO followsDAO) {
		this.followsDAO = followsDAO;
	}
	public void setReviewsDAO(ReviewsDAO reviewsDAO) {
		this.reviewsDAO = reviewsDAO;
	}
	public void setTagsDAO(TagsDAO tagsDAO) {
		this.tagsDAO = tagsDAO;
	}
	public void setLikingsDAO(LikingsDAO likingsDAO) {
		this.likingsDAO = likingsDAO;
	}
	public void setNolgosDAO(NolgosDAO nolgosDAO) {
		this.nolgosDAO = nolgosDAO;
	}
	public void setLocationsDAO(LocationsDAO locationsDAO) {
		this.locationsDAO = locationsDAO;
	}
	public void setNolgoConvenientsDAO(NolgoConvenientsDAO nolgoConvenientsDAO) {
		this.nolgoConvenientsDAO = nolgoConvenientsDAO;
	}	
	public void setCategoriesDAO(CategoriesDAO categoriesDAO) {
		this.categoriesDAO = categoriesDAO;
	}
	public void setSubCategoriesDAO(SubCategoriesDAO subCategoriesDAO) {
		this.subCategoriesDAO = subCategoriesDAO;
	}
	public void setInterestCategoriesDAO(InterestCategoriesDAO interestCategoriesDAO) {
		this.interestCategoriesDAO = interestCategoriesDAO;
	}
	public void setInterestLocationsDAO(InterestLocationsDAO interestLocationsDAO) {
		this.interestLocationsDAO = interestLocationsDAO;
	}
	/* DAO_setter *************************************************************************************************************/
	
	@Override
	public User getUser(int no) {
		// TODO Auto-generated method stub
		return usersDAO.selectOne(no);
	}
	
	/* Writer___________A__180622 */
	@Override
	public  User getpageOwner(int userno) {
		User u = usersDAO.selectOne(userno);
		System.out.println(u.getNickname());
		
		return u;
	}
	/* Writer___________A__180622 */
	@Override
	public List<FollowList> getFollowers(int userNo){
		List<FollowList> list = new ArrayList<FollowList>();
		List<Integer> noList= new ArrayList<Integer>();
		
		noList = followsDAO.getFollowersNo(userNo); //역순으로 번호들 수집  
		for(int no : noList) {
			list.add(usersDAO.getFollowdata(no));// 팔로워 번호당 닉네임,플필사진 
		}
		return list; 
	}
	/* Writer___________A__180624 */
	@Override
	public List<FollowList> getFollowings(int userNo) {
		List<FollowList> list = new ArrayList<FollowList>();
		List<Integer> noList = new ArrayList<Integer>();
		List<Integer> flwerList = new ArrayList<Integer>();
		
		//내 팔로잉 리스트 갖고와야함
		noList = followsDAO.getFollowingsNo(userNo); //역순으로 번호들 수집
		for(int no : noList) {	
			list.add(usersDAO.getFollowdata(no)); // 팔로잉 번호당 닉네임,플필사진
		}
		
		//내 팔로우 리스트 갖고와야함
		flwerList = followsDAO.getFollowersNo(userNo);
		for(int i : flwerList) {
			for(int j=0;j<list.size();j++) {
				if(i==list.get(j).getFollowUNo()) // 나를 팔로인중인 사람번호와 자신의 팔로워 번호가 일치할 경우, 
				list.get(j).setAfollowB("Y"); // 팔로관계임을 리스트에 적용 
			}
		}
		return list; 
	}
	/* Writer___________A__180622 */
	@Override
	public List<Integer> getFollowerNos(int loginUserNo) {
		List<Integer> list= new ArrayList<Integer>();
		list = followsDAO.getFollowersNo(loginUserNo);
				
		return list;
	}
	/* Writer___________A__180622 */
	@Override
	public List<Integer> getFollowingNos(int loginUserNo) {
		List<Integer> list= new ArrayList<Integer>();
		list = followsDAO.getFollowingsNo(loginUserNo);
		return list;
	}
	/* Writer___________A__180623 */
	@Override
	public String getComment(int loginUserNo) {
		String commt = usersDAO.getIntroduce(loginUserNo);
		return commt;
	}
	/* Writer___________A__180624 */
	@Override
	public boolean setUserTextInfo(User user) {
		boolean result = usersDAO.setUserTextInfo(user);
		return result;
	}
	/* Writer___________A__180624 */
	@Override
	public String getlgnFollowPageOwn(int no) {
		// *************************************************************************************8
		return null;
	}
	
	
	/* Writer___________A__180625 */
	@Override
	public List<FollowList> getFollowers(int pageOwnNo, int lgnUNo) {
		List<FollowList> list = new ArrayList<FollowList>();
		List<Integer> noList= new ArrayList<Integer>();
		List<Integer> flwerList = new ArrayList<Integer>();
		
		noList = followsDAO.getFollowersNo(pageOwnNo); //역순으로 번호들 수집  
		for(int no : noList) {
			list.add(usersDAO.getFollowdata(no));// 팔로워 번호당 닉네임,플필사진 
		}
		flwerList = followsDAO.getFollowersNo(lgnUNo);
		for(int i : flwerList) {
			for(int j=0;j<list.size();j++) {
				if(i==list.get(j).getFollowUNo()) // 해당페이지 주인을 팔로인중인 사람번호와 자신의 팔로워 번호가 일치할 경우, 
				list.get(j).setAfollowB("Y"); // 팔로관계임을 리스트에 적용 
			}
		}
		return list; 
	}
	/* Writer___________A__180625 */
	@Override
	public List<FollowList> getFollowings(int pageOwnNo, int lgnUNo) {
		List<FollowList> list = new ArrayList<FollowList>();
		List<Integer> noList = new ArrayList<Integer>();
		List<Integer> flwerList = new ArrayList<Integer>();
		
		noList = followsDAO.getFollowingsNo(pageOwnNo); //역순으로 번호들 수집
		for(int no : noList) {	
			list.add(usersDAO.getFollowdata(no)); // 팔로잉 번호당 닉네임,플필사진
		}
		
		//내 팔로우 리스트 갖고와야함
		flwerList = followsDAO.getFollowersNo(lgnUNo);
		for(int i : flwerList) {
			for(int j=0;j<list.size();j++) {
				if(i==list.get(j).getFollowUNo()) // 타인을 팔로인중인 사람번호와 자신의 팔로워 번호가 일치할 경우, 
				list.get(j).setAfollowB("Y"); // 팔로관계임을 리스트에 적용 
			}
		}
		return null;
	}
	/* Writer___________A__180625 */
	@Transactional
	@Override
	public boolean removeFollowRec(int pickedUser, int loginUserNo) {
		Follow follow = new Follow();
		follow.setUserNo(loginUserNo);
		follow.setFollowerNo(pickedUser);
		
		
		//** 세 개중에 하나라도 안되면 롤백 되게 하는거 how to? //Transaction  
		int result1 = followsDAO.removeFollow(follow);
		int result2 = usersDAO.updatefollowingCnt(pickedUser,-1); //remove  //팔로우 
		int result3 = usersDAO.updatefollowerCnt(loginUserNo,-1); //remove //팔로잉
		
		
		if(result1==1&&result2==1&&result3==1) return true;
		else return false;
	}
	/* Writer___________A__180625 */
	@Transactional
	@Override
	public boolean addFollowRec(int pickedUser, int loginUserNo) {
		Follow follow = new Follow();
		follow.setUserNo(loginUserNo);
		follow.setFollowerNo(pickedUser);

		int result1 = followsDAO.addFollow(follow);
		int result2 = usersDAO.updatefollowingCnt(pickedUser,1);  
		int result3 = usersDAO.updatefollowerCnt(loginUserNo,1); 
		
		if(result1==1&&result2==1&&result3==1) return true;
		else return false;
	}
	@Override
	public List<Rating> getRatingsOnKeyw(String keyword, String pageOwnerNo, int pageNo) {
		List<Rating> rts = new ArrayList<Rating>() ;
		OptionMyp option = new OptionMyp();
		option.setKeyword(keyword);
		option.setPageOwnerNo(Integer.parseInt(pageOwnerNo));
		if(pageNo!=0) {		
			option.setStartP(pageNo);
			option.setEndP(pageNo+10);
		}
		
		//평점결과__ 태그유무,페이지유무
		//페이지는 10개 단위로 끊자 
		if(keyword.contains("#")) { rts=ratingsDAO.getRatingInMypByT(option); }
		else { rts=ratingsDAO.getRatingInMypage(option); }
		
		/*for(int i=0;i<rts.size();i++) {
			rts.get(i).setNolgoName(nolgosDAO.getNolgoName(rts.get(i).getNolgoNo()));
		}*/
		return rts;
	}
	@Override
	public List<Review> getReviewsOnKeyw(String keyword, String pageOwnerNo, int pageNo) {
		List<Review> rvs = new ArrayList<Review>() ;
		OptionMyp option = new OptionMyp();
		option.setKeyword(keyword);
		option.setPageOwnerNo(Integer.parseInt(pageOwnerNo));
		if(pageNo!=0) {		
			option.setStartP(pageNo);
			option.setEndP(pageNo+10);
		}
		
		if(keyword.contains("#")) { rvs=reviewsDAO.getReviewInMypByT(option);}
		else { rvs=reviewsDAO.getReviewInMypage(option); }
		
		/*for(int i=0;i<rvs.size();i++) {
			rvs.get(i).setNolgoName(nolgosDAO.getNolgoName(rvs.get(i).getNolgoNo()));
		}*/
		return rvs;
	}
	/* Writer___________A__180627 */
	@Override
	public List<Nolgo> getNolgos_A(int userNo, int pageNo, int numPage, int numBlock, String type) {
		Map<String, Object> map = new HashMap<>();		
		int end = pageNo * numPage;
		int start = end - (numPage - 1);

		map.put("start", start);
		map.put("end", end);
		map.put("type", "N");
		map.put("userNo", userNo);
		
		System.out.println("Start_"+map.get("start")+"__End_"+map.get("end")+"__UserNO:"+map.get("userNo"));
		
		// 좋아요 누른건 likes_TB -> nolgo_TB
		// 소유한 놀곳은 nolgo_TB
		List<Integer> nolist =new ArrayList<Integer>();
		List<Nolgo> n= new ArrayList<Nolgo>();
		if(type.equals("picked")) {
			System.out.println("찜리스트_서비스임플");
			nolist = likingsDAO.selectByUserNo(map);
			System.out.println("리스트 사이즈:"+nolist.size());
			for(int i : nolist) { 	
				System.out.println("놀고카드용 데이터 로드--->" + i);
				Nolgo nolgo = nolgosDAO.selectNolgoSimpdata(i);
				if (nolgo != null) {
					System.out.println("nolgo:succ");
					n.add(nolgo);	
				}
			}
		}
		else { 
			n = nolgosDAO.selectSimpleListByUserNo_K(map);
		}
		return n;
	}
	
	/* Writer___________A__180627 */
	@Transactional
	@Override
	public int toggleLikingBtn(int userNo, String strReviewNo, String type) {
		// userNo 로그인 유저의 번호 
	
		int result1=-1;
		int result2=-2;
		int reviewNo = Integer.parseInt(strReviewNo);	
		Map<String,Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("reviewNo", Integer.parseInt(strReviewNo));
	
		if(type.equals("dlt")) {
			result1 = reviewsDAO.updateCnt_A(reviewNo, -1);
			result2 = likingsDAO.deleteLikingR_A(map);	
		}
		else {
			result1 = reviewsDAO.updateCnt_A(reviewNo, 1);
			result2 = likingsDAO.insertLikingR_A(map);
		}
		return result1+result2; //둘다 안됬으면 -3 //문제없으면 2
	}
	
	
	
	/**
	 * Writer___________K__180626 리뷰 리스트 마이페이지에서
	 */
	@Override
	public Map<String, Object> getReviewListByUserNo_K(int userNo, int page, int loginUserNo) {
		Map<String, Object> result = new HashMap<>();
		// TODO Auto-generated method stub
		// 한 페이지에 보여질 게시물 수
		int numPage = 5;

		// 한 페이지에 보여질
		// 페이징 블록 갯수
		int numBlock = 3;

		// 페이징 처리용 Map
		Map<String, Object> map = new HashMap<>();

		int end = page * numPage;
		int start = end - (numPage - 1);

		map.put("start", start);
		map.put("end", end);
		map.put("userNo", userNo);
		List<CamelHashMap> resultList = reviewsDAO.selectListByUserNo_K(map);
		
		
		int countTotal = reviewsDAO.selectTotalCountByUserNo_K(userNo);

		String url = String.format("/ajax/user/%d/review/", userNo);
		String paginate = PaginateUtil.getPaginate(page, countTotal, numPage, numBlock, url);
		
		//1.각 리뷰에 해당하는 태그를 호출
		Tag tag = new Tag();
		tag.setType("V");		
		for (CamelHashMap reviewMap : resultList) {			
			//System.out.println(reviewMap.get("no"));		
			tag.setContentNo(Integer.parseInt(String.valueOf(reviewMap.get("no"))));
			List<Tag> tags = tagsDAO.selectListByContentNo_K(tag);
			reviewMap.put("tags", tags);
			
		}
		
		//2.각 리뷰에 좋아요를 클릭한 상태인지
		if(loginUserNo > 0) {
			Liking liking = new Liking();
			liking.setUserNo(loginUserNo);
			liking.setType("V");			
			for (CamelHashMap reviewMap : resultList) {			
				//System.out.println(reviewMap.get("no"));
				liking.setContentNo(Integer.parseInt(String.valueOf(reviewMap.get("no"))));				
				
				if (likingsDAO.selectCountByContentNoAndUserNo_K(liking) > 0) {
					reviewMap.put("is_like", true);
				}				
			}	
		}
		
		

		result.put("reviewList", resultList);
		result.put("count", countTotal);
		result.put("paginate", paginate);

		
		return result;
	}
	
	/**
	 * Writer___________K__180626
	 */
	@Override
	public Map<String, Object> getRatingListByUserNo_K(int userNo, int page, int loginUserNo) {
		Map<String, Object> result = new HashMap<>();
		// TODO Auto-generated method stub
		// 한 페이지에 보여질 게시물 수
		int numPage = 5;

		// 한 페이지에 보여질
		// 페이징 블록 갯수
		int numBlock = 3;

		// 페이징 처리용 Map
		Map<String, Object> map = new HashMap<>();

		int end = page * numPage;
		int start = end - (numPage - 1);

		map.put("start", start);
		map.put("end", end);
		map.put("userNo", userNo);
		
		List<CamelHashMap> resultList = ratingsDAO.selectListByUserNo_K(map);

		int countTotal = ratingsDAO.selectTotalCountByUserNo_K(userNo);

		String url = String.format("/ajax/user/%d/rating/", userNo);
		String paginate = PaginateUtil.getPaginate(page, countTotal, numPage, numBlock, url);
		
		//1.각 평점 에 해당하는 태그를 호출
		Tag tag = new Tag();
		tag.setType("R");		
		for (CamelHashMap ratingMap : resultList) {			
			//System.out.println(reviewMap.get("no"));		
			tag.setContentNo(Integer.parseInt(String.valueOf(ratingMap.get("no"))));
			List<Tag> tags = tagsDAO.selectListByContentNo_K(tag);
			ratingMap.put("tags", tags);		
			
			Nolgo nolgo = nolgosDAO.selectOneByNo_K(Integer.parseInt(String.valueOf(ratingMap.get("nolgoNo"))));
			ratingMap.put("nolgo", nolgo);
			
			/* Writer___________A__180629*/
			List<Tag> subCategories = tagsDAO.selectListByCategoryNo_A(nolgo.getCategoryNo()); // Max_3
			ratingMap.put("subcateg", subCategories);		
			
		}
		
		result.put("ratingList", resultList);
		result.put("count", countTotal);
		result.put("paginate", paginate);
		//result.put("chartData", ratingsDAO.selectGroupByScoreCountByUserNo_K(userNo)); 

		return result;
	}
	
	
	// 기원 start
		@Override
		/* Writer___________B__180622 */
		public User getUser_B(int no) {
			// TODO Auto-generated method stub
			return usersDAO.selectOne_B(no);
		}
		/* Writer___________B__180622 */
		public User login_B(User loginUser) {
			
			return usersDAO.selectLogin_B(loginUser);
		}
		/* Writer___________B__180622 */
		@Override
		//searchService
		public Map<String, Object> searchAll_B(SearchVO searchParams) {
			// TODO Auto-generated method stub
			Map<String, Object> searchAllMap = new HashMap<String,Object>(); 
			
			searchParams.setStartEnd();
			
			//NolgoList
			searchAllMap.put("nolgoList", getSearchNolgoList_B(searchParams));
			//UserList 
			searchAllMap.put("userList", getSearchUserList_B(searchParams));
			//ReviewList
			searchAllMap.put("reviewList", getSearchReviewList_B(searchParams));
			
			//totalCnts
			searchAllMap.put("nolgoTotalCnt", nolgosDAO.selectListBySearchParamsTotalCount_B(searchParams));
			searchAllMap.put("usersTotalCnt", usersDAO.selectListBySearchParamsTotalCount_B(searchParams));
			searchAllMap.put("reviewsTotalCnt", reviewsDAO.selectListBySearchParamsTotalCount_B(searchParams));
			
			return searchAllMap;
		}
		
		/* Writer___________B__180626 */
		@Override
		public List<Map<String, Object>> searchNolgo_B(SearchVO searchParams) {
			// TODO Auto-generated method stub
			searchParams.setStartEnd();
			return getSearchNolgoList_B(searchParams);
		}
		/* Writer___________B__180626 */
		@Override
		public List<User> searchUser_B(SearchVO searchParams) {
			// TODO Auto-generated method stub
			searchParams.setStartEnd();
			return getSearchUserList_B(searchParams);
		}
		/* Writer___________B__180626 */
		@Override
		public List<Map<String, Object>> searchReview_B(SearchVO searchParams) {
			// TODO Auto-generated method stub
			searchParams.setStartEnd();
			return getSearchReviewList_B(searchParams);
		}
		
		/* Writer___________B__180626 */
		public List<Map<String,Object>> getSearchNolgoList_B(SearchVO searchParams){
			//nolgoList : nolgo, nolgoConvenients, location
					List<Map<String,Object>> nolgoList= new ArrayList<Map<String,Object>>();
					List<Nolgo> nolgos = nolgosDAO.selectListBySearchParams_B(searchParams);
					for(Nolgo nolgo : nolgos) {
						List<NolgoConvenient> nolgoConvenients = nolgoConvenientsDAO.selectNolgoConvenientList_B(nolgo.getNo());
						Location location = locationsDAO.selectNolgoLocation_B(nolgo.getLocationNo());
						Map<String,Object> nolgoItem = new HashMap<String,Object>();
						nolgoItem.put("nolgo", nolgo);
						nolgoItem.put("nolgoConvenients", nolgoConvenients);
						nolgoItem.put("location", location);
						
						nolgoList.add(nolgoItem);
					}
					
					return nolgoList;
		}
		/* Writer___________B__180627 */
		public List<User> getSearchUserList_B(SearchVO searchParams){
			//userList를 검색해서 받아오는 메소드.(모델이 변경되면 여기서 변경함.)
			return usersDAO.selectListBySearchParams_B(searchParams);
		}
		
		/* Writer___________B__180627 */
		public List<Map<String,Object>> getSearchReviewList_B(SearchVO searchParams){
			//reviewList : review, tags
			//keyword로 reviews like검색
			List<Map<String,Object>> reviewList= new ArrayList<Map<String,Object>>();
			List<Review> reviews = reviewsDAO.selectListBySearchParams_B(searchParams);
			for(Review review : reviews) {
				List<Tag> tags = tagsDAO.selectList_B(new TypeVO("V", review.getNo()));
				Map<String,Object> reviewItem = new HashMap<String,Object>();
				reviewItem.put("review", review);
				reviewItem.put("tags", tags);
				
				reviewList.add(reviewItem);
			}
					
			return reviewList;
		}
		
		// 기원 end
		
		//상준 시작
		//회원가입 부분 insert 부분 수행 부분 
		@Override
		//Writer_________N__180622 
		public boolean register_N
		(User user, String phone1 ,String phone2,String phone3,String year,String month,String date,String introduce,String userProfile) {
			System.out.println(phone1);
			System.out.println(phone2);
			System.out.println(phone3);
			System.out.println(year);
			System.out.println(month);
			System.out.println(date);
			System.out.println(introduce);
			String phone = phone1+"-"+phone2+"-"+phone3;
			String birthDate = year+"-"+month+"-"+date;
			Date birthDates = Date.valueOf(birthDate);
			user.setIntroduce(introduce);
			user.setPhone(phone);
			user.setBirthDate(birthDates);
			user.setProfile(userProfile);
			return 1==usersDAO.insertUser_N(user);
		}//register_N end 
		
		//Writer_________N__180622 
		// 관심사 insert 부분
		@Override
		public boolean interest_N(InterestCategory interestCategory) {
			
			return 1== interestCategoriesDAO.insertInterest_N(interestCategory);
		}
		//Writer_________N__180626
		//비밀번호 찾기 
		@Override
		public User passwordFind_N(User user) {
			
			return usersDAO.selectUserPassowrd_N(user);
		}
		//Writer_________N__180626
			//비밀번호 수정
		@Override
		public boolean modify_N(User user) {
			return 1==usersDAO.updateUserPassword_N(user);
		}
		//Writer_________N__180628
		 //관심지역 depth1 부분
		@Override
		public List<Location> getAttentionDepth1List_N() {
		
			return locationsDAO.selectDepth1List_B();
		}
		//Writer_________N__180628
			 //관심지역 depth2 부분
		@Override
		public List<Location> getDepth2List_B(int depth1Code) {
			
			return locationsDAO.selectDepth2List_B(depth1Code);
		}
		//Writer_________N__180629
		 //관심도시 추가 부분
		@Override
		public boolean getAttentionCity_N(InterestLocation interestLocation) {
			// TODO Auto-generated method stub
			return	1 == interestLocationsDAO.insertAttentionCity_N(interestLocation);
		}
		//상준 END
	
		/**
		 * Writer___________K__180630
		 */
		@Override
		public boolean modifyProfile_K(User user) {
			// TODO Auto-generated method stub
			
			return 1 == usersDAO.update_K(user);
		}
		 
		/**
		 * Writer___________K__180630
		 */
		@Override
		public boolean modifyCover_K(User user) {
			// TODO Auto-generated method stub
			
			return 1 == usersDAO.update_K(user);
		}
}

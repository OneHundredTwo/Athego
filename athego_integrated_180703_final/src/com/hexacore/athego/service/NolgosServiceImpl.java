package com.hexacore.athego.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.hexacore.athego.dao.CategoriesDAO;
import com.hexacore.athego.dao.ConvenientsDAO;
import com.hexacore.athego.dao.IndexRecommendationsDAO;
import com.hexacore.athego.dao.LikingsDAO;
import com.hexacore.athego.dao.LocationsDAO;
import com.hexacore.athego.dao.MenuesDAO;
import com.hexacore.athego.dao.NolgoConvenientsDAO;
import com.hexacore.athego.dao.NolgosDAO;
import com.hexacore.athego.dao.RatingsDAO;
import com.hexacore.athego.dao.ReportsDAO;
import com.hexacore.athego.dao.ReviewsDAO;
import com.hexacore.athego.dao.SubCategoriesDAO;
import com.hexacore.athego.dao.TagsDAO;
import com.hexacore.athego.dao.UsersDAO;
import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.util.MorphologicalAnalysisUtil;
import com.hexacore.athego.util.PaginateUtil;
import com.hexacore.athego.util.SortUtil;
import com.hexacore.athego.vo.Category;
import com.hexacore.athego.vo.Convenient;
import com.hexacore.athego.vo.IndexRecommendation;
import com.hexacore.athego.vo.Liking;
import com.hexacore.athego.vo.Location;
import com.hexacore.athego.vo.Menu;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.NolgoConvenient;
import com.hexacore.athego.vo.Rating;
import com.hexacore.athego.vo.Report;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.SubCategory;
import com.hexacore.athego.vo.Tag;

public class NolgosServiceImpl implements NolgosService {

	private NolgosDAO nolgosDAO;
	private ReviewsDAO reviewsDAO;
	private RatingsDAO ratingsDAO;
	private TagsDAO tagsDAO;
	private LikingsDAO likingsDAO;	
	private ConvenientsDAO convenientsDAO;
	private MenuesDAO menuesDAO;
	private ReportsDAO reportsDAO;
	private NolgoConvenientsDAO nolgoConvenientsDAO;
	private SubCategoriesDAO subCategoriesDAO;
	private LocationsDAO locationsDAO;
	private CategoriesDAO categoriesDAO;
	private IndexRecommendationsDAO indexRecommendationsDAO;
	private UsersDAO usersDAO;

	public void setCategoriesDAO(CategoriesDAO categoriesDAO) {
		this.categoriesDAO = categoriesDAO;
	}
	
	public void setLocationsDAO(LocationsDAO locationsDAO) {
		this.locationsDAO = locationsDAO;
	}
	
	public void setNolgoConvenientsDAO(NolgoConvenientsDAO nolgoConvenientsDAO) {
		this.nolgoConvenientsDAO = nolgoConvenientsDAO;
	}
	
	public void setSubCategoriesDAO(SubCategoriesDAO subCategoriesDAO) {
		this.subCategoriesDAO = subCategoriesDAO;
	}
	
	public void setNolgosDAO(NolgosDAO nolgosDAO) {
		this.nolgosDAO = nolgosDAO;
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

	public void setRatingsDAO(RatingsDAO ratingsDAO) {
		this.ratingsDAO = ratingsDAO;
	}
	
	public void setConvenientsDAO(ConvenientsDAO convenientsDAO) {
		this.convenientsDAO = convenientsDAO;
	}
	
	public void setMenuesDAO(MenuesDAO menuesDAO) {
		this.menuesDAO = menuesDAO;
	}
	
	public void setReportsDAO(ReportsDAO reportsDAO) {
		this.reportsDAO = reportsDAO;
	}
	
	public void setIndexRecommendationsDAO(IndexRecommendationsDAO indexRecommendationsDAO) {
		this.indexRecommendationsDAO = indexRecommendationsDAO;
	}
	
	public void setUsersDAO(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}
	
	/* Writer___________Y__180627 */
	public int getLocationNo(String addressName) {
		
		String[] depths = addressName.split(" ");
		System.out.println("addressName : " + addressName);
		System.out.println("depth1 : " + depths[1]);
		System.out.println("depth2 : " + depths[2]);
		System.out.println("depth3 : " + depths[3]);
		Location location = new Location(depths);
		
		System.out.println("depth1 : " + location.getDepth1());
		System.out.println("depth2 : " + location.getDepth2());
		System.out.println("depth3 : " + location.getDepth3());
		return locationsDAO.selectOne(location).getNo();
	}
	
	/* Writer___________Y__180627 */
	public List<Convenient> convenientList() {
		return convenientsDAO.selectList_Y();
	}
	
	/* Writer___________Y__180626 */
	public Map<String, Object> modifyNolgo_Y(Nolgo nolgo) {
		StringBuilder oldSb = new StringBuilder(nolgo.getContent());
		
		/// 매 수정 등록때마다 실행하기에는 부하가 클것으로 보임
		// 추후 수정이 필요로함
		//리뷰 호출
		Map<String,Object> reviewMap = new HashMap<>();
		reviewMap.put("start", 1);
		reviewMap.put("end", reviewsDAO.selectTotalCountByNolgoNo_K(nolgo.getNo()));
		reviewMap.put("nolgoNo", nolgo.getNo());
		List<CamelHashMap> reviewList = reviewsDAO.selectListByNolgoNo_K(reviewMap);
		for (CamelHashMap camelHashMap : reviewList) {
			oldSb.append(camelHashMap.get("content"));
		}
		
		//평점 호출
		Map<String,Object> ratingMap = new HashMap<>();
		ratingMap.put("start", 1);
		ratingMap.put("end", ratingsDAO.selectTotalCountByNolgoNo_K(nolgo.getNo()));
		ratingMap.put("nolgoNo", nolgo.getNo());
		List<CamelHashMap> ratingList = ratingsDAO.selectListByNolgoNo_K(ratingMap);
		for (CamelHashMap camelHashMap : ratingList) {
			oldSb.append(camelHashMap.get("content"));
		}
			//태그 추출
			Map<String, Integer> map = MorphologicalAnalysisUtil.generateWordCount(oldSb.toString());
			TreeMap<String, Integer> sortedMap = SortUtil.sortMapByValue(map);
			//태그를 스트링으로(relInfo)
			StringBuilder sb = new StringBuilder();

			int idx = 0;
			for(Map.Entry<String, Integer> entry : sortedMap.entrySet()) {
				idx++;
			    String key = entry.getKey();
			    int value = entry.getValue();
	 
			    System.out.println("key:" + key + "/ value:" + value);
			    if(key.length() == 1) {
			    	continue;
			    }
			    sb.append("#");
			    sb.append(key);
			    sb.append(":");
			    sb.append(value);
			    
			    if(map.entrySet().size() != idx) {
			    	sb.append(",");
			    }
			    if(sb.length() > 900) {
			    	break;
			    }
			}
			nolgo.setRelInfo(sb.toString());
		 
		
		nolgosDAO.update_Y(nolgo);
		menuesDAO.delete_Y(nolgo.getNo());
		nolgoConvenientsDAO.delete_Y(nolgo.getNo());
		subCategoriesDAO.delete_Y(nolgo.getNo());
		tagsDAO.delete_Y(nolgo.getNo());
		return null;
	}
	
	/* Writer___________Y__180624 */
	public boolean registerNolgo_Y(Nolgo nolgo) {
		
		//태그 추출
		Map<String, Integer> map = MorphologicalAnalysisUtil.generateWordCount(nolgo.getContent());
		StringBuilder sb = new StringBuilder();
		TreeMap<String, Integer> sortedMap = SortUtil.sortMapByValue(map);
		int idx = 0;
		for(Map.Entry<String, Integer> entry : sortedMap.entrySet()) {
			idx++;
		    String key = entry.getKey();
		    int value = entry.getValue();
 
		    System.out.println("key:" + key + "/ value:" + value);
		    if(key.length() == 1) {
		    	continue;
		    }
		    sb.append("#");
		    sb.append(key);
		    sb.append(":");
		    sb.append(value);
		    
		    if(map.entrySet().size() != idx) {
		    	sb.append(",");
		    }
		    
		    if(sb.length() > 900) {
		    	break;
		    }
		}
		nolgo.setRelInfo(sb.toString());
		return nolgosDAO.insert_Y(nolgo) == 1;
	}
	
	/* Writer___________Y__180624 */
	public boolean registerMenu_Y(Menu menu) {
		return menuesDAO.insert_Y(menu)==1;
	}
	
	/* Writer___________Y__180624 */
	public boolean registerNolgoConvenient_Y(NolgoConvenient nolgoConvenient) {
		
		return nolgoConvenientsDAO.insert_Y(nolgoConvenient)==1;
	}
	
	/* Writer___________Y__180624 */
	public boolean registerSubCategory_Y(SubCategory subCategory) {
		return subCategoriesDAO.insert_Y(subCategory)==1;
	}
	
	/* Writer___________Y__180624 */
	public boolean registerTag_Y(Tag tag) {
		return tagsDAO.insert_Y(tag)==1;
	}
	
	/* Writer___________Y__180624 */
	public boolean addLocationNolgoCnt_Y(int locationNo) {
		return locationsDAO.updateNolgoCnt_Y(locationNo)==1;
	}
	
	/* Writer___________Y__180626 */
	public boolean updateCategoryCnt_Y(int no) {
		categoriesDAO.updateSubCategoryCnt_Y(no);
		return categoriesDAO.updateNolgoCnt_Y(no)==1;
	}
	
	/* Writer___________Y__180625 */
	public Map<String, Object> selectNolgo_Y(int nolgoNo) {
		Map<String, Object> map = new HashMap<>();
		Nolgo nolgo = nolgosDAO.selectOne_Y(nolgoNo);
		List<Menu> menues = menuesDAO.selectListByNolgoNo_Y(nolgoNo);
		
		Map<String, Object> map2 = new HashMap<>();
		map2.put("nolgoNo", nolgoNo);
		map2.put("type", "N"); 
		List<Tag> tags = tagsDAO.selectListByContentNo(map2);
		/*
		System.out.println("태그 사이즈 : " + tags.size());
		for(Tag tag : tags) {
			System.out.println("태그번호 : " + tag.getContent());
		}*/
		
		List<NolgoConvenient> nolgoConvenients = nolgoConvenientsDAO.selectListByNolgoNo(nolgoNo);
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
		String openTimeStr = dateFormat.format(nolgo.getOpenTime());
		String closeTimeStr = dateFormat.format(nolgo.getCloseTime());
		
		String openTimeAmPm = "am";
		String closeTimeAmPm = "am";
		int openHour = Integer.parseInt(openTimeStr.substring(11, 13)) ;
		int openMin = Integer.parseInt(openTimeStr.substring(14, 16));
		int closeHour = Integer.parseInt(closeTimeStr.substring(11, 13));
		int closeMin = Integer.parseInt(closeTimeStr.substring(14, 16));
		
		if(openHour>12) {
			openTimeAmPm="pm";
			openHour -= 12;
		}
		if(closeHour>12) {
			closeTimeAmPm="pm";
			closeHour -= 12;
		}
		
		//사진을 ','기준으로 쪼개서 배열에 저장
		String[] picArr = null;
		if(nolgo.getPictures() != null) {
			picArr = nolgo.getPictures().split(",");
		}
		List<String> pictures = null;
		if(picArr != null) {
			pictures = Arrays.asList(picArr);
		}
		
		//체류시간 시,분 쪼개서 VO에 넘김
		nolgo.setStayHour(nolgo.getStayTime().substring(0, nolgo.getStayTime().length()-2));
		nolgo.setStayMin(nolgo.getStayTime().substring(2, nolgo.getStayTime().length()));

		map.put("nolgo", nolgo);
		map.put("pictures", pictures);
		map.put("menues", menues);
		map.put("tags", tags);
		map.put("nolgoConvenients", nolgoConvenients);

		//시작시간, 종료시간을 넘겨줌
		map.put("openTimeAmPm", openTimeAmPm);
		map.put("closeTimeAmPm", closeTimeAmPm);
		map.put("openHour", openHour);
		map.put("openMin", openMin);
		map.put("closeHour", closeHour);
		map.put("closeMin", closeMin);
		map.put("isModify", true);
		return map;
	}
	
	
	/**
	 * Writer___________K__180620
	 */
	@Override
	public Map<String, Object> getNolgo_K(int no, int loginUserNo) {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<>();
		Nolgo nolgo = nolgosDAO.selectOneByNo_K(no);
		map.put("nolgo", nolgo);
		map.put("convenients", convenientsDAO.selectListByNolgoNo_K(no));		
		map.put("user", usersDAO.selectOne(nolgo.getUserNo()));
		
		Tag tag = new Tag();
		tag.setType("N");
		tag.setContentNo(no);
				
		map.put("tags", tagsDAO.selectListByContentNo_K(tag));		
		map.put("menues", menuesDAO.selectListByNolgoNo_K(no));
		
		Liking liking = new Liking();
		liking.setUserNo(loginUserNo);
		liking.setType("N");			
		liking.setContentNo(nolgo.getNo());
		
		//놀고에 좋아요를 클릭한 상태인지
		if(loginUserNo > 0) {			
			if (likingsDAO.selectCountByContentNoAndUserNo_K(liking) > 0) {
				map.put("isLike", true);
			}	
		}
		//놀고의 총 좋아요 갯수
		map.put("likingCnt", likingsDAO.selectCountByContentNo_K(liking));
		
		map.put("recoms", this.getNolgoListForRecom_K(loginUserNo));
		
		return map;
	}

	/**
	 * Writer___________K__180620 리뷰 등록
	 */
	@Override
	public boolean registerReview_K(Review review, String[] tags) {
		// TODO Auto-generated method stub
		int result = reviewsDAO.insert_K(review);

		Tag tag = new Tag();
		tag.setUserNo(review.getUserNo());
		tag.setContentNo(review.getNo());
		tag.setType("V");

		for (String tagContent : tags) {
			tag.setContent(tagContent);
			tagsDAO.insert_K(tag);
		}
		
		int nolgoNo = review.getNolgoNo();
		Nolgo nolgo = nolgosDAO.selectOne_Y(nolgoNo);
		updateRelInfo_K(nolgo);
		
		return result == 1;
	}
	
	/**
	 * Writer___________K__180624 리뷰 수정
	 */
	@Override
	public boolean modifyReview_K(Review review, String[] tags) {
		Liking liking = new Liking();
		liking.setType("V");
		liking.setContentNo(review.getNo());
		liking.setUserNo(review.getUserNo());	
		int likeCnt = likingsDAO.selectCountByContentNoAndUserNo_K(liking);
		review.setLikeCnt(likeCnt);
		
		int result = reviewsDAO.update_K(review);
		
		//리뷰에 해당하는 태그 삭제
		Tag tag = new Tag();
		tag.setType("V");
		tag.setContentNo(review.getNo());
		
		tagsDAO.deleteByContentNo_K(tag);

		//리뷰등록
		tag.setUserNo(review.getUserNo());		
		for (String tagContent : tags) {
			tag.setContent(tagContent);
			tagsDAO.insert_K(tag);
		}

		return result == 1;
	}

	/**
	 * Writer___________K__180621 리뷰 리스트- 놀고 상세에서
	 */
	@Override
	public Map<String, Object> getReviewListByNolgoNo_K(int nolgoNo, int page, int loginUserNo) {
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
		map.put("nolgoNo", nolgoNo);
		List<CamelHashMap> resultList = reviewsDAO.selectListByNolgoNo_K(map);

		int countTotal = reviewsDAO.selectTotalCountByNolgoNo_K(nolgoNo);

		String url = String.format("/ajax/nolgo/%d/review/", nolgoNo);
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
			System.out.println("aa" + loginUserNo);
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

		/*
		 * 결과 데이터 검사 System.out.println(result.size()); for (CamelHashMap camelHashMap :
		 * result) { for (Entry<String, Object> entry : camelHashMap.entrySet()) {
		 * String key = entry.getKey(); System.out.println(entry.getKey());
		 * System.out.println(entry.getValue()); } }
		 */

		return result;
	}
	
	/**
	 * Writer___________K__180623
	 * 좋아요 등록
	 */
	@Override
	public int registerLiking_K(String contentType, int contentNo, int userNo) {
		// TODO Auto-generated method stub
		Liking liking = new Liking();
		liking.setType(contentType.equals("nolgo")? "N" : "V");
		liking.setContentNo(contentNo);
		liking.setUserNo(userNo);	
		
		likingsDAO.insert_K(liking);
		int count = likingsDAO.selectCountByContentNo_K(liking);
		
		//좋아요가 리뷰인지 놀고인지 확인후 카운트 수정
		if(contentType.equals("nolgo")) {
			// *리뷰는 좋아요 카운트 필드가 있지만 놀고에는 없다 
			//Nolgo nolgo = nolgosDAO.selectOneByNo_K(contentNo);			
			//nolgosDAO.update_K(nolgo);	
		} else {
			Review review = reviewsDAO.selectOneByNo_K(contentNo);
			review.setLikeCnt(count);
			reviewsDAO.update_K(review);
		}
		
		return count;
	}
	
	/**
	 * Writer___________K__180623
	 * 좋아요 삭제
	 */
	@Override
	public int removeLiking_K(String contentType, int contentNo, int userNo) {
		Liking liking = new Liking();
		liking.setType(contentType.equals("nolgo")? "N" : "V");
		liking.setContentNo(contentNo);
		liking.setUserNo(userNo);	
		
		likingsDAO.delete_K(liking);
		
		int count = likingsDAO.selectCountByContentNo_K(liking);
		
		//좋아요가 리뷰인지 놀고인지 확인후 카운트 수정
		if(contentType.equals("nolgo")) {
			// *리뷰는 좋아요 카운트 필드가 있지만 놀고에는 없다 
			//Nolgo nolgo = nolgosDAO.selectOneByNo_K(contentNo);			
			//nolgosDAO.update_K(nolgo);	
		} else {
			Review review = reviewsDAO.selectOneByNo_K(contentNo);
			review.setLikeCnt(count);
			reviewsDAO.update_K(review);
		}
		
		return count;
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public boolean removeReviewByNo_K(int no) {
		//리뷰에 해당하는 좋아요 삭제
		Liking liking = new Liking();
		liking.setType("V");
		liking.setContentNo(no);	
		
		likingsDAO.delete_K(liking);
		
		//리뷰에 해당하는 태그 삭제
		Tag tag = new Tag();
		tag.setType("V");
		tag.setContentNo(no);
		
		tagsDAO.deleteByContentNo_K(tag);
		
		return 1 == reviewsDAO.deleteByNo_K(no);
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public Map<String, Object> registerRating_K(Rating rating, String[] tags) {
		
		Map<String, Object> map = new HashMap<>();
		
	    Rating selectedRating = null;
	     
	    selectedRating = ratingsDAO.selectOneByUserNoAndNolgoNo_K(rating);
		if(selectedRating == null) {
			ratingsDAO.insert_K(rating);
			Tag tag = new Tag();
			tag.setUserNo(rating.getUserNo());
			tag.setContentNo(rating.getNo());
			tag.setType("R");

			for (String tagContent : tags) {
				tag.setContent(tagContent);
				tagsDAO.insert_K(tag);
			}
			
			//전체 평점 갯수를 구해서 놀고 정보에 업데이트한다
			int countTotal = ratingsDAO.selectTotalCountByNolgoNo_K(rating.getNolgoNo());
			double avgScore = ratingsDAO.selectAvgScoreByNolgoNo_K(rating.getNolgoNo());			
			double avg = Double.parseDouble(String.format("%.2f",avgScore));

			System.out.println("avg:" +  avg);
			Nolgo nolgo = nolgosDAO.selectOneByNo_K(rating.getNolgoNo());
			nolgo.setRatingCnt(countTotal);
			nolgo.setAvgScore(avg);
			
			nolgosDAO.update_K(nolgo);
			
			updateRelInfo_K(nolgo);
				
			map.put("isSucc", true);
		} else {
			map.put("isSucc", false);
			map.put("msg", "평점은 한번만 등록 가능합니다.");
		}
		
		return map;
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public Map<String, Object> getRatingListByNolgoNo_K(int nolgoNo, int page, int loginUserNo) {
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
		map.put("nolgoNo", nolgoNo);
		
		List<CamelHashMap> resultList = ratingsDAO.selectListByNolgoNo_K(map);

		int countTotal = ratingsDAO.selectTotalCountByNolgoNo_K(nolgoNo);

		String url = String.format("/ajax/nolgo/%d/rating/", nolgoNo);
		String paginate = PaginateUtil.getPaginate(page, countTotal, numPage, numBlock, url);
		
		//1.각 평점 에 해당하는 태그를 호출
		Tag tag = new Tag();
		tag.setType("R");		
		for (CamelHashMap reviewMap : resultList) {			
			//System.out.println(reviewMap.get("no"));		
			tag.setContentNo(Integer.parseInt(String.valueOf(reviewMap.get("no"))));
			List<Tag> tags = tagsDAO.selectListByContentNo_K(tag);
			reviewMap.put("tags", tags);						
		}
		
		result.put("ratingList", resultList);
		result.put("count", countTotal);
		result.put("paginate", paginate);
		result.put("chartData", ratingsDAO.selectGroupByScoreCountByNolgoNo_K(nolgoNo));
 

		return result;
	}
	
	/**
	 * Writer___________K__180624
	 */
	@Override
	public boolean removeRatingByNo_K(int no) {
		//리뷰에 해당하는 좋아요 삭제
		Liking liking = new Liking();
		liking.setType("R");
		liking.setContentNo(no);	
		
		likingsDAO.delete_K(liking);
		
		//리뷰에 해당하는 태그 삭제
		Tag tag = new Tag();
		tag.setType("R");
		tag.setContentNo(no);
		
		tagsDAO.deleteByContentNo_K(tag);
		
		return 1 == ratingsDAO.deleteByNo_K(no);
	}
	
	/**
	 * Writer___________K__180625 
	 */
	@Override
	public boolean modifyRating_K(Rating rating, String[] tags) {
		int result = ratingsDAO.update_K(rating);
		
		//리뷰에 해당하는 태그 삭제
		Tag tag = new Tag();
		tag.setType("R");
		tag.setContentNo(rating.getNo());
		
		tagsDAO.deleteByContentNo_K(tag);

		//리뷰등록
		tag.setUserNo(rating.getUserNo());		
		for (String tagContent : tags) {
			tag.setContent(tagContent);
			tagsDAO.insert_K(tag);
		}

		return result == 1;
	}
	
	/**
	 * Writer___________K__180625
	 */
	@Override
	public boolean registerReport_K(String contentType, int contentNo, String content, int loginUserNo) {
		// TODO Auto-generated method stub
		
		String type = "N";
		if(contentType.equals("rating")) {
			type = "R";
		} else if(contentType.equals("review")) {
			type = "V";
		} 
		Report report = new Report();
		report.setType(type);
		report.setContentNo(contentNo);
		report.setContent(content);
		report.setUserNo(loginUserNo);
		
		return 1 == reportsDAO.insert_K(report);
	}
	/**
	 * Writer___________H__180625
	 */
	@Override
	public List<Nolgo> getNolgo() {
		// TODO Auto-generated method stub
		return nolgosDAO.InterestCardlist_H();
	}
	
	@Override
	public List<IndexRecommendation> getRecommendation() {
		// TODO Auto-generated method stub

		return indexRecommendationsDAO.selectlist_H();
	}
	
	/**
	 * Writer___________H__180627
	 */
	@Override
	public List<Map<String,Object>> getNolgoListByNolgoNos_H(String nolgoNos, int loginUserNo) {
		// TODO Auto-generated method stub
		
		List<Integer> nos = Arrays.stream(nolgoNos.split(","))
		        .map(Integer::parseInt)
		        .collect(Collectors.toList());
		
		Map<String, Object> map = new HashMap<>();
		map.put("nolgoNos", nos);
		map.put("loginUserNo", loginUserNo);
		
		//nolgoList : nolgo, nolgoConvenients, location
        List<Map<String,Object>> nolgoList= new ArrayList<Map<String,Object>>();
        List<Nolgo> nolgos = nolgosDAO.selectInterestCardListByNolgoNos_H(map);
        for(Nolgo nolgo : nolgos) {
           List<NolgoConvenient> nolgoConvenients = nolgoConvenientsDAO.selectNolgoConvenientList_B(nolgo.getNo());
           Location location = locationsDAO.selectNolgoLocation_B(nolgo.getLocationNo());
           System.out.println(location.getNo());
           Map<String,Object> nolgoItem = new HashMap<String,Object>();
           nolgoItem.put("nolgo", nolgo);
           nolgoItem.put("nolgoConvenients", nolgoConvenients);
           nolgoItem.put("location", location);
           
           nolgoList.add(nolgoItem);
        }
        
		return nolgoList;
	}
	
	
/*기원 start*/
	//구역 침범하지 마세요!
	@Override
	/* Writer___________B__180624 */
	public Map<String, Object> getSearchFilterValues_B(SearchVO searchParams) {
		// TODO Auto-generated method stub
		Map<String, Object> searchFilterValues = new HashMap<>();
		searchFilterValues.put("categories", categoriesDAO.selectList_B());
		searchFilterValues.put("convenients", convenientsDAO.selectList_B());
		searchFilterValues.put("depth1List", locationsDAO.selectDepth1List_B());
		if(searchParams.getDepth1Code()!=0) {
			searchFilterValues.put("depth2List", locationsDAO.selectDepth2List_B(searchParams.getDepth1Code()));
		}
		if(searchParams.getDepth1Code()!=0 && searchParams.getDepth2Code()!=0) {
			searchFilterValues.put("depth3List", locationsDAO.selectDepth3List_B(searchParams.getDepth2Code()));
		}
		
		searchFilterValues.put("searchParams", searchParams);
		return searchFilterValues;
	}
	
	/* Writer___________B__180625 */
	@Override
	public List<Location> getDepth2List_B(int depth1Code) {
		// TODO Auto-generated method stub
		return locationsDAO.selectDepth2List_B(depth1Code);
	}
	
	/* Writer___________B__180625 */
	@Override
	public List<Location> getDepth3List_B(int depth2Code) {
		// TODO Auto-generated method stub
		return locationsDAO.selectDepth3List_B(depth2Code);
	}
	/*기원 end*/
	
	/* Writer___________A__180627 */
	@Override
	public String getLocationUntilMid(int locationNo) {
		return  locationsDAO.selectDepth12_A(locationNo);
	}

	/* Writer___________A__180627 */
	@Override
	public int getUserNolgoCnt(int userNo, String type) {
		System.out.println("호출_"+type);
		if(type.equals("picked")) {return  likingsDAO.selectCtn_A(userNo); }
		else {return nolgosDAO.selectCtn_A(userNo); }
	
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public List<Map<String,Object>> getNolgoListForRecom_K(int loginUserNo) {
		// TODO Auto-generated method stub
		
		List<Nolgo> nolgoThree = nolgosDAO.selectListTopThreeForRecom_K();
		
		List<Integer> nos = nolgoThree.stream().map(p -> p.getNo()).collect(Collectors.toList());
		
		Map<String, Object> map = new HashMap<>();
		map.put("nolgoNos", nos);
		map.put("loginUserNo", loginUserNo);
		
		//nolgoList : nolgo, nolgoConvenients, location
        List<Map<String,Object>> nolgoList= new ArrayList<Map<String,Object>>();
        List<Nolgo> nolgos = nolgosDAO.selectInterestCardListByNolgoNos_H(map);
        for(Nolgo nolgo : nolgos) {
           List<NolgoConvenient> nolgoConvenients = nolgoConvenientsDAO.selectNolgoConvenientList_B(nolgo.getNo());
           Location location = locationsDAO.selectNolgoLocation_B(nolgo.getLocationNo());
           System.out.println(location.getNo());
           Map<String,Object> nolgoItem = new HashMap<String,Object>();
           nolgoItem.put("nolgo", nolgo);
           nolgoItem.put("nolgoConvenients", nolgoConvenients);
           nolgoItem.put("location", location);
           
           nolgoList.add(nolgoItem);
        }
        
		return nolgoList;
	}
	
	/**
	 * Writer___________K__180701
	 */
	@Override
	public List<Map<String, Object>> getNolgoListTopTenForUserRecom_K(int loginUserNo) {
		// TODO Auto-generated method stub
		//selectListTopTenForUserRecom_K
		//유저 관심사 호출
		List<Category> categories = categoriesDAO.selectListByUserNo_K(loginUserNo);
	
		List<Integer> nos = categories.stream().map(p -> p.getNo()).collect(Collectors.toList());
		Map<String, Object> map = new HashMap<>();
		map.put("categoryNos", nos);
		map.put("loginUserNo", loginUserNo);
		
		//유저 관심사로 놀고 목록 호출
		List<Map<String, Object>> result = new ArrayList();
		List<Nolgo> nolgos = nolgosDAO.selectListTopTenForUserRecom_K(map);
	 
        for(Nolgo nolgo : nolgos) {
            List<NolgoConvenient> nolgoConvenients = nolgoConvenientsDAO.selectNolgoConvenientList_B(nolgo.getNo());
            Location location = locationsDAO.selectNolgoLocation_B(nolgo.getLocationNo());
            System.out.println(location.getNo());
            Map<String,Object> nolgoItem = new HashMap<String,Object>();
            nolgoItem.put("nolgo", nolgo);
            nolgoItem.put("nolgoConvenients", nolgoConvenients);
            nolgoItem.put("location", location);
            
            result.add(nolgoItem);
         }
		
		return result;
	}
	
	/**
	 * Writer___________K__180701
	 * @param nolgo
	 */
	private void updateRelInfo_K(Nolgo nolgo) {
		int nolgoNo = nolgo.getNo();
		StringBuilder oldSb = new StringBuilder(nolgo.getContent());
		
		// 현재 놀고수정, 리뷰등록, 평점등록에 중복 소스임
		/// 매 수정 등록때마다 실행하기에는 부하가 클것으로 보임
		// 추후 수정이 필요로함
		// 리뷰 호출
		Map<String, Object> reviewMap = new HashMap<>();
		reviewMap.put("start", 1);
		reviewMap.put("end", reviewsDAO.selectTotalCountByNolgoNo_K(nolgoNo));
		reviewMap.put("nolgoNo", nolgoNo);
		List<CamelHashMap> reviewList = reviewsDAO.selectListByNolgoNo_K(reviewMap);
		for (CamelHashMap camelHashMap : reviewList) {
			oldSb.append(camelHashMap.get("content"));
		}

		// 평점 호출
		Map<String, Object> ratingMap = new HashMap<>();
		ratingMap.put("start", 1);
		ratingMap.put("end", ratingsDAO.selectTotalCountByNolgoNo_K(nolgoNo));
		ratingMap.put("nolgoNo", nolgoNo);
		List<CamelHashMap> ratingList = ratingsDAO.selectListByNolgoNo_K(ratingMap);
		for (CamelHashMap camelHashMap : ratingList) {
			oldSb.append(camelHashMap.get("content"));
		}
		// 태그 추출
		Map<String, Integer> map = MorphologicalAnalysisUtil.generateWordCount(oldSb.toString());

		TreeMap<String, Integer> sortedMap = SortUtil.sortMapByValue(map);
		// 태그를 스트링으로(relInfo)
		StringBuilder sb = new StringBuilder();

		int idx = 0;
		for (Map.Entry<String, Integer> entry : sortedMap.entrySet()) {
			idx++;
			String key = entry.getKey();
			int value = entry.getValue();

			int a = sb.length();
			System.out.println("key:" + key + "/ value:" + value);
			
			if(key.length() == 1) {
				continue;
			}
			
			sb.append("#");
			sb.append(key);
			sb.append(":");
			sb.append(value);
			
			if (map.entrySet().size() != idx) {
				sb.append(",");
			}
			
			int b = sb.length();
			int c = a + b;
			if (c > 900) {
				break;
			}
			System.out.println(c + ":" + sb.toString());
		}
		System.out.println(nolgo.getName() + ":" + sb.toString());
		nolgo.setRelInfo(sb.toString());
		
		nolgosDAO.update_Y(nolgo);
	}	
}

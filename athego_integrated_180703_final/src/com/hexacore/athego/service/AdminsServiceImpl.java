package com.hexacore.athego.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.hexacore.athego.dao.IndexRecommendationsDAO;
import com.hexacore.athego.dao.LikingsDAO;
import com.hexacore.athego.dao.NolgosDAO;
import com.hexacore.athego.dao.RatingsDAO;
import com.hexacore.athego.dao.ReportsDAO;
import com.hexacore.athego.dao.ReviewsDAO;
import com.hexacore.athego.dao.TagsDAO;
import com.hexacore.athego.dao.UsersDAO;
import com.hexacore.athego.util.CamelHashMap;
import com.hexacore.athego.util.MorphologicalAnalysisUtil;
import com.hexacore.athego.util.PaginateUtil;
import com.hexacore.athego.util.SortUtil;
import com.hexacore.athego.vo.IndexRecommendation;
import com.hexacore.athego.vo.Liking;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.Rating;
import com.hexacore.athego.vo.Report;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.Tag;
import com.hexacore.athego.vo.User;

import oracle.net.aso.i;

public class AdminsServiceImpl implements AdminsService {
	private UsersDAO usersDAO;
	private ReviewsDAO reviewsDAO;
	private RatingsDAO ratingsDAO;
	private TagsDAO tagsDAO;
	private LikingsDAO likingsDAO;
	private ReportsDAO reportsDAO;
	private NolgosDAO nolgosDAO;
	private IndexRecommendationsDAO indexRecommendationsDAO; 
	
	public void setUsersDAO(UsersDAO usersDAO) {
		this.usersDAO = usersDAO;
	}

	public void setReviewsDAO(ReviewsDAO reviewsDAO) {
		this.reviewsDAO = reviewsDAO;
	}

	public void setRatingsDAO(RatingsDAO ratingsDAO) {
		this.ratingsDAO = ratingsDAO;
	}

	public void setTagsDAO(TagsDAO tagsDAO) {
		this.tagsDAO = tagsDAO;
	}

	public void setLikingsDAO(LikingsDAO likingsDAO) {
		this.likingsDAO = likingsDAO;
	}

	public void setReportsDAO(ReportsDAO reportsDAO) {
		this.reportsDAO = reportsDAO;
	}

	public void setNolgosDAO(NolgosDAO nolgosDAO) {
		this.nolgosDAO = nolgosDAO;
	}
	
	public void setIndexRecommendationsDAO(IndexRecommendationsDAO indexRecommendationsDAO) {
		this.indexRecommendationsDAO = indexRecommendationsDAO;
	}
	/**
	 * Writer___________K__180626
	 */
	@Override
	public Map<String, Object> getReportList_K(int page) {
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

		List<CamelHashMap> list = reportsDAO.selectList_K(map);

		int countTotal = reportsDAO.selectTotalCount_K();

		String url = String.format("/admin/report/page/");
		String paginate = PaginateUtil.getPaginate(page, countTotal, numPage, numBlock, url);
		
		Map<String, Object> result = new HashMap<>();
		result.put("reports", list);
		result.put("paginate", paginate);
		return result;
	}
	
	/**
	 * Writer___________K__180626
	 */
	@Override
	public Map<String, Object> getReviewByNo_K(int no) {
		// TODO Auto-generated method stub
		
		Map<String, Object> map = new HashMap<>();
		Review review = reviewsDAO.selectOneByNo_K(no);
		if (review != null) {
			// 각각 1대 1 관계라서 조인하면되지만
			// 관리자 쪽이여서 그냥 각각 호출
			User user = usersDAO.selectOne(review.getUserNo());		
			Tag tag = new Tag();
			tag.setContentNo(review.getNo());
			tag.setType("V");
			map.put("review", review);
			map.put("user", user);
			map.put("tags", tagsDAO.selectListByContentNo_K(tag));
			map.put("nolgo", nolgosDAO.selectOneByNo_K(review.getNolgoNo()));
			map.put("isNull", false);
		} else {
			map.put("isNull", true);
		}
		return map;
	}
	
	/**
	 * Writer___________K__180627
	 */
	@Override
	public Map<String, Object> modifyReportStatus(int no, int status) {
		// TODO Auto-generated method stub\
		Map<String, Object> map = new HashMap<>();
		try {
			Report report = reportsDAO.selectOne_K(no);
			report.setStatus(status);
			reportsDAO.update_K(report);
			
			map.put("isSucc", true);
		} catch (Exception e) {
			map.put("isSucc", false);
			map.put("msg", e.getMessage());
		}
		
		return map;
	}
	
	/**
	 * Writer___________K__180627
	 */
	@Override
	public Map<String, Object> getRatingByNo_K(int no) {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<>();
		Rating rating = ratingsDAO.selectOneByNo_K(no);
		
		if(rating != null) {	
			User user = usersDAO.selectOne(rating.getUserNo());
			Tag tag = new Tag();
			tag.setContentNo(rating.getNo());
			tag.setType("R");
			
			// 각각 1대 1 관계라서 조인하면되지만
			// 관리자 쪽이여서 그냥 각각 호출		
			map.put("rating", rating);
			map.put("user", user);
			map.put("tags", tagsDAO.selectListByContentNo_K(tag));
			map.put("nolgo", nolgosDAO.selectOneByNo_K(rating.getNolgoNo()));	
			map.put("isNull", false);
		} else {
			map.put("isNull", true);
		}
		
		return map;
	}
	
	/**
	 *  Writer___________K__180627
	 */
	@Override
	public User getUserForLogin_K(User user) {
		// TODO Auto-generated method stub
		
		return usersDAO.selectOneForLogin_K(user);
	}
	
	/**
	 *  Writer___________K__180628
	 */
	@Override
	public Map<String, Object> getNolgoListForAdminIndexRecom_K(String keyword, int page) {
		// TODO Auto-generated method stub
		// 한 페이지에 보여질 게시물 수
		int numPage = 5;

		// 한 페이지에 보여질
		// 페이징 블록 갯수
		int numBlock = 3;
		int end = page * numPage;
		int start = end - (numPage - 1);

		Map<String, Object> map = new HashMap<>();
		map.put("keyword", keyword);
		map.put("start", start);
		map.put("end", end);
		List<CamelHashMap> nolgos = nolgosDAO.selectListForAdminIndexRecom_K(map);
		int countTotal = nolgosDAO.selectTotalCountForAdminIndexRecom_K(map);
		
		Tag tag = new Tag();
		tag.setType("N");
		
		for (CamelHashMap camelHashMap : nolgos) {
			tag.setContentNo(Integer.parseInt(String.valueOf(camelHashMap.get("no"))));			
			camelHashMap.put("tags", tagsDAO.selectListByContentNo_K(tag));
			camelHashMap.put("user", usersDAO.selectOne(Integer.parseInt(String.valueOf(camelHashMap.get("userNo")))));
		}
		
		String url = String.format("/admin/index-recommendation-add/"+ keyword +"/page/");
		String paginate = PaginateUtil.getPaginate(page, countTotal, numPage, numBlock, url);
		
		Map<String, Object> result = new HashMap<>();
		result.put("nolgos", nolgos);
		result.put("paginate", paginate);
		result.put("indexRecommendations", indexRecommendationsDAO.selectListForAdmin_K());
		result.put("recomCnt", indexRecommendationsDAO.selectTotalCount_K());
		return result;
	}
	
	/**
	 *  Writer___________K__180628
	 */
	@Override
	public Map<String, Object> getNolgoListForAdmin_K(int page) {
		// TODO Auto-generated method stub
		// 한 페이지에 보여질 게시물 수
		int numPage = 5;

		// 한 페이지에 보여질
		// 페이징 블록 갯수
		int numBlock = 3;
		int end = page * numPage;
		int start = end - (numPage - 1);

		Map<String, Object> map = new HashMap<>();		
		map.put("start", start);
		map.put("end", end);
		List<CamelHashMap> nolgos = nolgosDAO.selectListForAdmin_K(map);		
		// 따로 만들어야하지만 우선 인덱스 추천용으로 사용// 추후 이름 변경 필요
		int countTotal = nolgosDAO.selectTotalCountForAdminIndexRecom_K(map);
		
		Tag tag = new Tag();
		tag.setType("N");
		
		for (CamelHashMap camelHashMap : nolgos) {
			tag.setContentNo(Integer.parseInt(String.valueOf(camelHashMap.get("no"))));			
			camelHashMap.put("tags", tagsDAO.selectListByContentNo_K(tag));
			camelHashMap.put("user", usersDAO.selectOne(Integer.parseInt(String.valueOf(camelHashMap.get("userNo")))));
		}
		
		String url = String.format("/admin/nolgo/page/");
		String paginate = PaginateUtil.getPaginate(page, countTotal, numPage, numBlock, url);
		
		Map<String, Object> result = new HashMap<>();
		result.put("nolgos", nolgos);		
		result.put("paginate", paginate);
		
		return result;
	}
	
	/**
	 * Writer___________K__180628
	 */
	@Override
	public boolean modifyIndexRecomOrder_K(Map<String, String> map) {
		// TODO Auto-generated method stub
		
		String orderType = map.get("orderType");
		int orderNo = Integer.parseInt(String.valueOf(map.get("orderNo")));
		int recomNo = Integer.parseInt(String.valueOf(map.get("recomNo")));
		
		System.out.println(String.format("recomNo:%d, orderNo:%d, orderType:%s", recomNo, orderNo, orderType));

		int newOrderNo = orderType.equals("down") ? orderNo + 1 : orderNo - 1;
		
		//바뀌어야할 오더를 가진 추천에 오더를 변경 한다
		IndexRecommendation indexRecommendationSwitch =  indexRecommendationsDAO.selectOneByOrderNo_K(newOrderNo);
		indexRecommendationSwitch.setOrderNo(orderNo);
		indexRecommendationsDAO.updateOrder_K(indexRecommendationSwitch);
		
		IndexRecommendation indexRecommendation =  indexRecommendationsDAO.selectOneByNo_K(recomNo);
		indexRecommendation.setOrderNo(newOrderNo);
		indexRecommendationsDAO.updateOrder_K(indexRecommendation);
		
		return true;
	}
	
	/**
	 *	Writer___________K__180628 
	 */
	@Override
	public boolean remove_K(int no) {
		// TODO Auto-generated method stub
		indexRecommendationsDAO.delete_K(no);
		
		List<IndexRecommendation> list = indexRecommendationsDAO.selectListForAdmin_K();
		
		//삭제후 오더 재 정렬
		for (int i = 0; i <list.size(); i++) {			
			IndexRecommendation recom  = list.get(i);
			recom.setOrderNo(i+1);
			indexRecommendationsDAO.updateOrder_K(recom);
		}
		
		return true;
	}
	
	/**
	 * Writer___________K__180629
	 */
	@Override
	public boolean registerRecom_K(IndexRecommendation indexRecommendation) {
		// TODO Auto-generated method stub
		
		return 1 == indexRecommendationsDAO.insert_K(indexRecommendation);
	}
	
	/**
	 * Writer___________K__180701
	 */
	@Override
	public void generateRelInfo_K() {
		// TODO Auto-generated method stub
		
		List<Nolgo> nolgos = nolgosDAO.selectListForGenerateRelInfo_K();
		
		for (Nolgo nolgo : nolgos) {
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
		}//end for		
	}//end gen
}

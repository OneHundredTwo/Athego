package com.hexacore.athego.controller;

import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hexacore.athego.service.NolgosService;
import com.hexacore.athego.service.UsersService;
import com.hexacore.athego.vo.IndexRecommendation;
import com.hexacore.athego.vo.Menu;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.NolgoConvenient;
import com.hexacore.athego.vo.Rating;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.SubCategory;
import com.hexacore.athego.vo.Tag;
import com.hexacore.athego.vo.User;

@Controller
public class AthegoController {
	private UsersService usersService;
	private NolgosService nolgosService;
	
	public UsersService getUsersService() {
		return usersService;
	}

	public void setNolgosService(NolgosService nolgosService) {
		this.nolgosService = nolgosService;
	}
	
	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
	}

	/* Writer___________Y__180626 */
	@RequestMapping(value="/nolgo/modify", method= RequestMethod.PUT)
	public String modify_Y(HttpServletRequest request, HttpSession session, Nolgo nolgo,String opTimeAmPm, String edTimeAmPm, int opHour,
			int opMin, int edHour, int edMin, String stayHour, String stayMin, String[] pictures, int categoryNo, 
			String[] tags, String[] optionName, int[] optionPrice, int[] convenients) {
		
		//로그인 한 유저번호
		User loginUser = (User) session.getAttribute("loginUser");
		nolgo.setUserNo(loginUser.getNo());
				
		//사진
		String pictureStr = null;
		if(pictures != null) {
			for(String picture : pictures) {
				pictureStr = pictureStr + picture + ",";
			}
			pictureStr = pictureStr.substring(4, pictureStr.length()-1);
			nolgo.setPictures(pictureStr);
		}
		// open_time, close_time (pm이면 시간 + 12)
		if (opTimeAmPm.equals("pm"))
			opHour += 12;
		if (edTimeAmPm.equals("pm"))
			edHour += 12;
		try {
			String strOpTime = opHour + ":" + opMin;
			String strEdTime = edHour + ":" + edMin;
			SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm");
			java.util.Date parsedDate1 = dateFormat.parse(strOpTime);
			java.util.Date parsedDate2 = dateFormat.parse(strEdTime);
			Timestamp openTime = new java.sql.Timestamp(parsedDate1.getTime());
			Timestamp closeTime = new java.sql.Timestamp(parsedDate2.getTime());
			nolgo.setOpenTime(openTime);
			nolgo.setCloseTime(closeTime);

			//체류시간.    시 ,분을 합쳐서 4자리로 만듬
			if(Integer.parseInt(stayHour) < 10) {
				stayHour = "0" + stayHour;
			}
			if(Integer.parseInt(stayMin) < 10) {
				stayMin = "0" + stayMin;
			}
			String stayTime = stayHour + stayMin;
			nolgo.setStayTime(stayTime);
		} catch (Exception e) {
			e.printStackTrace();
		}
		//지역번호 설정
		nolgo.setLocationNo(nolgosService.getLocationNo(nolgo.getAddress()));
		nolgosService.modifyNolgo_Y(nolgo);
		
		if(optionName != null) {
			for(int i = 0 ; i<optionName.length ; i++) {
				Menu menu = new Menu(optionName[i], optionPrice[i], nolgo.getNo());
				nolgosService.registerMenu_Y(menu);
			}
		}

		if(tags != null) {
			for(String subCategory : tags) {
				Tag tag = new Tag(nolgo.getNo(), "N", subCategory, nolgo.getUserNo());
				nolgosService.registerTag_Y(tag);
				
				SubCategory subcategoryVO = new SubCategory(categoryNo, tag.getNo(), nolgo.getNo());
				nolgosService.registerSubCategory_Y(subcategoryVO);
			}
		}
		
		if(convenients != null) {
			for(int convenient : convenients) {
				NolgoConvenient nolgoConvenient = new NolgoConvenient(nolgo.getNo(), convenient);
				nolgosService.registerNolgoConvenient_Y(nolgoConvenient);
			}
		}
		
		nolgosService.updateCategoryCnt_Y(nolgo.getCategoryNo());

		return "redirect:/nolgo/" + nolgo.getNo();
	}
	
	/* Writer___________Y__180621 */
	@RequestMapping(value = "/nolgo/register", method = RequestMethod.GET)
	public String registerForm_Y(HttpSession session, Model model) {
		//세션이 없으면 index로
		User loginUser = (User) session.getAttribute("loginUser");
		if(loginUser == null)
			return "redirect:/index";
		model.addAttribute("convenientList", nolgosService.convenientList());
		return "editForm";
	}
	
	/* Writer___________Y__180625 */
	@RequestMapping(value = "/nolgo/modify/{nolgoNo}", method = RequestMethod.GET)
	public String modifyForm_Y(@PathVariable int nolgoNo, HttpSession session, Model model) {
		//세션이 없으면 index로
		User loginUser = (User) session.getAttribute("loginUser");
		if(loginUser == null)
			return "redirect:/index";
		model.addAllAttributes(nolgosService.selectNolgo_Y(nolgoNo));
		model.addAttribute("convenientList", nolgosService.convenientList());
		return "editForm";
	}

	/* Writer___________Y__180621 */
	@RequestMapping(value = "/ajax/upload", method = RequestMethod.POST)
	@ResponseBody
	public String uploadImg_Y(HttpServletRequest request, MultipartFile upload) throws Exception {
		
		// 1) ServletContext얻기
		ServletContext sc = request.getServletContext();

		// 2) 기본경로 얻기
		String path = sc.getRealPath("");
		
		// 3) upload경로
		String uploadPath = path + "img" + File.separator;
		
		// 5) 고유한 값을 위한 UUID
		UUID uuid = UUID.randomUUID();

		String ext = upload.getOriginalFilename();

		int dotIdx = ext.lastIndexOf(".");

		ext = ext.substring(dotIdx, ext.length());

		String fileName = uuid + ext;
		
		// 6) 경로+파일이름
		String fullPath = uploadPath + fileName;

		// 7) 실제 생성될 파일
		File file = new File(fullPath);
		
		// 8) 파일 옮기기
		upload.transferTo(file);

		return "{\"name\":\"" + fileName + "\"}";
	}

	/* Writer___________Y__180621 */
	@RequestMapping(value = "/nolgo/register", method = RequestMethod.POST)
	public String register_Y(HttpServletRequest request, HttpSession session, Nolgo nolgo, String opTimeAmPm, String edTimeAmPm, int opHour,
			int opMin, int edHour, int edMin, String stayHour, String stayMin, String[] pictures, 
			int categoryNo, String[] tags, String[] optionName, int[] optionPrice, 
			int[] convenients) {
		System.out.println(nolgo.getAddress());
		//로그인 한 유저번호
		User loginUser = (User) session.getAttribute("loginUser");
		nolgo.setUserNo(loginUser.getNo());
		
		//사진
		String pictureStr = null;
		if(pictures != null) {
			for(String picture : pictures) {
				pictureStr = pictureStr + picture + ",";
			}
			pictureStr = pictureStr.substring(4, pictureStr.length()-1);
			nolgo.setPictures(pictureStr);
		}
		// open_time, close_time (pm이면 시간 + 12)
		if (opTimeAmPm.equals("pm"))
			opHour += 12;
		if (edTimeAmPm.equals("pm"))
			edHour += 12;
		try {
			String strOpTime = opHour + ":" + opMin;
			String strEdTime = edHour + ":" + edMin;
			SimpleDateFormat dateFormat = new SimpleDateFormat("hh:mm");
			java.util.Date parsedDate1 = dateFormat.parse(strOpTime);
			java.util.Date parsedDate2 = dateFormat.parse(strEdTime);
			Timestamp openTime = new java.sql.Timestamp(parsedDate1.getTime());
			Timestamp closeTime = new java.sql.Timestamp(parsedDate2.getTime());
			nolgo.setOpenTime(openTime);
			nolgo.setCloseTime(closeTime);
			
			//체류시간.    시 ,분을 합쳐서 4자리로 만듬
			if(Integer.parseInt(stayHour) < 10) {
				stayHour = "0" + stayHour;
			}
			if(Integer.parseInt(stayMin) < 10) {
				stayMin = "0" + stayMin;
			}
			String stayTime = stayHour + stayMin;
			nolgo.setStayTime(stayTime);
		} catch (Exception e) {
			e.printStackTrace();
		}
		nolgo.setLocationNo(nolgosService.getLocationNo(nolgo.getAddress()));
		
		nolgosService.registerNolgo_Y(nolgo);
		nolgosService.addLocationNolgoCnt_Y(nolgo.getLocationNo());
		
		if(optionName != null) {
			for(int i = 0 ; i<optionName.length ; i++) {
				Menu menu = new Menu(optionName[i], optionPrice[i], nolgo.getNo());
				nolgosService.registerMenu_Y(menu);
			}
		}
		if(tags != null) {
			for(String subCategory : tags) {
				Tag tag = new Tag(nolgo.getNo(), "N", subCategory, nolgo.getUserNo());
				nolgosService.registerTag_Y(tag);
				
				SubCategory subcategoryVO = new SubCategory(categoryNo, tag.getNo(), nolgo.getNo());
				nolgosService.registerSubCategory_Y(subcategoryVO);
			}
		}
		
		if(convenients != null) {
			for(int convenient : convenients) {
				NolgoConvenient nolgoConvenient = new NolgoConvenient(nolgo.getNo(), convenient);
				nolgosService.registerNolgoConvenient_Y(nolgoConvenient);
			}
		}
		
		nolgosService.updateCategoryCnt_Y(nolgo.getCategoryNo());
		
		return "redirect:/nolgo/" + nolgo.getNo();
	}
	
	
	/**
	 * Writer___________K__180620
	 * 
	 * @param no
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/nolgo/{no}", method = RequestMethod.GET)
	public String getNolgo_K(@PathVariable int no, Model model, HttpSession session) {

		User loginUser = (User) session.getAttribute("loginUser");		
		int loginUserNo = loginUser == null ?0 : loginUser.getNo(); 
		Map<String, Object> map =  nolgosService.getNolgo_K(no, loginUserNo);
		
		//하단 추천 영역
		ObjectMapper om = new ObjectMapper();
		String json = "";
		try {
			json = om.writeValueAsString(map.get("recoms"));
			map.put("recoms", json);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("error:" + e.getMessage());			
		}
		model.addAllAttributes(map);
		return "detail";
	}

	/**
	 * Writer___________K__180620
	 * 
	 * @param review
	 * @param bindingResult
	 * @param no
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/nolgo/{no}/review", method = RequestMethod.POST)
	@ResponseBody
	public boolean registerReview_K(@ModelAttribute Review review, BindingResult bindingResult,
			@RequestParam(value = "tag") String[] tags, @PathVariable int no, HttpSession session) {

		System.out.println("nolgoNo:" + no);
		System.out.println("title:" + review.getTitle());
		System.out.println("content:" + review.getContent());
		for (String tag : tags) {
			System.out.println("tag:" + tag);
		}

		User loginUser = (User) session.getAttribute("loginUser");

		review.setNolgoNo(no);
		review.setUserNo(loginUser.getNo());

		return nolgosService.registerReview_K(review, tags);
	}

	/**
	 * Writer___________K__180624
	 * 
	 * @param review
	 * @param bindingResult
	 * @param no
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/review/{no}", method = RequestMethod.PUT)
	@ResponseBody
	public boolean modifyReview_K(@RequestBody String reviewStr, BindingResult bindingResult,
			 @PathVariable int no, HttpSession session) throws Exception {

		System.out.println("reviewStr:" + reviewStr);
		System.out.println("reviewNo:" + no);
		
		ObjectMapper mapper = new ObjectMapper();
		
		Review review = mapper.readValue(reviewStr, Review.class);
		/*
		System.out.println("title:" + review.getTitle());
		System.out.println("content:" + review.getContent());
		for (String tag : review.getTags()) {
			System.out.println(tag);
		}
		*/
		User loginUser = (User) session.getAttribute("loginUser");

		review.setUserNo(loginUser.getNo());
		review.setNo(no);

		return nolgosService.modifyReview_K(review, review.getTags());		
	}
	
	/**
	 * Writer___________K__180625
	 *
	 */
	@RequestMapping(value = "/ajax/rating/{no}", method = RequestMethod.PUT)
	@ResponseBody
	public boolean modifyRating_K(@RequestBody String ratingStr, BindingResult bindingResult,
			 @PathVariable int no, HttpSession session) throws Exception {

		System.out.println("ratingStr:" + ratingStr);
		System.out.println("ratingNo:" + no);
		
		ObjectMapper mapper = new ObjectMapper();
		
		Rating rating = mapper.readValue(ratingStr, Rating.class);
		/*
		System.out.println("title:" + review.getTitle());
		System.out.println("content:" + review.getContent());
		for (String tag : review.getTags()) {
			System.out.println(tag);
		}
		*/
		User loginUser = (User) session.getAttribute("loginUser");

		rating.setUserNo(loginUser.getNo());
		rating.setNo(no);

		return nolgosService.modifyRating_K(rating, rating.getTags());		
	}
	

	/**
	 * Writer___________K__180620
	 * 
	 * @param width
	 * @param height
	 * @param size
	 * @param session
	 * @param file
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/ajax/registerPicture", method = RequestMethod.POST)
	@ResponseBody
	public String registerPicture_K(@RequestParam(required = false) Integer width,
			@RequestParam(required = false) Integer height, @RequestParam(required = false) Integer size,
			HttpSession session, MultipartFile file, HttpServletRequest request) throws Exception {

		// 1) ServletContext얻기
		ServletContext sc = request.getServletContext();

		// 2) 기본경로 얻기
		String path = sc.getRealPath("");

		// 3) upload경로
		String uploadPath = path + "img" + java.io.File.separator;

		// 4) image경로
		// String resizePath = path + "img/profile" + File.separator;

		// 5) 고유한 값을 위한 UUID
		UUID uuid = UUID.randomUUID();

		String ext = file.getOriginalFilename();

		int dotIdx = ext.lastIndexOf(".");

		ext = ext.substring(dotIdx, ext.length());

		System.out.println(ext);

		String fileName = uuid + ext;

		System.out.println("fileName:" + fileName);

		// 6) 경로+파일이름
		String fullPath = uploadPath + fileName;
		System.out.println("fullPath:" + fullPath);

		// 7) 실제 생성될 파일
		File newFile = new File(fullPath);

		// 8) 파일 옮기기
		file.transferTo(newFile);
		System.out.println("파일 생성 성공");
		// 9) 리사이징 (200x200)
		if (size != null) {
			width = size;
			height = size;
		}

		// ResizeImageUtil.resize(fullPath, resizePath + fileName, width, height);

		return "{\"name\":\"" + fileName + "\"}";
	}

	/**
	 * Writer___________K__180620 timestamp 깨짐현상 참조
	 * :http://seongilman.tistory.com/135
	 * 
	 * @param no
	 * @param page
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/ajax/nolgo/{no}/review/{page}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getReviewList_K(@PathVariable int no, @PathVariable int page, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		int loginUserNo = loginUser == null ? 0 : loginUser.getNo();

		return nolgosService.getReviewListByNolgoNo_K(no, page, loginUserNo);
	}

	/**
	 * Writer___________K__180624 리뷰 삭제
	 * 
	 * @param no
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/review/{no}", method = RequestMethod.DELETE)
	@ResponseBody
	public boolean removeReview_K(@PathVariable int no, HttpSession session) {

		return nolgosService.removeReviewByNo_K(no);
	}

	/***
	 * Writer___________K__180623 좋아요 등록 /review/1/liking /nolgo/1/liking
	 *
	 * @return
	 */
	@RequestMapping(value = "/ajax/{contentType}/{contentNo}/liking", method = RequestMethod.POST)
	@ResponseBody
	public int registerLiking_K(@PathVariable String contentType, @PathVariable int contentNo, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");

		// System.out.println(contentType);
		// System.out.println(contentNo);

		return nolgosService.registerLiking_K(contentType, contentNo, loginUser.getNo());
	}

	/***
	 * Writer___________K__180623 좋아요 삭제
	 * 
	 * @return
	 */
	@RequestMapping(value = "/ajax/{contentType}/{contentNo}/liking", method = RequestMethod.DELETE)
	@ResponseBody
	public int removeLiking_K(@PathVariable String contentType, @PathVariable int contentNo, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		// System.out.println(contentType);
		// System.out.println(contentNo);

		return nolgosService.removeLiking_K(contentType, contentNo, loginUser.getNo());
	}

	/**
	 * Writer___________K__180624
	 * 
	 * @param review
	 * @param bindingResult
	 * @param no
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/nolgo/{no}/rating", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> registerRating_K(@ModelAttribute Rating rating, BindingResult bindingResult,
			@RequestParam(value = "tag") String[] tags, @PathVariable int no, HttpSession session) {

		System.out.println("nolgoNo:" + no);
		System.out.println("content:" + rating.getContent());
		System.out.println("score:" + rating.getScore());

		for (String tag : tags) {
			System.out.println("tag:" + tag);
		}

		User loginUser = (User) session.getAttribute("loginUser");

		rating.setNolgoNo(no);
		rating.setUserNo(loginUser.getNo());

		return nolgosService.registerRating_K(rating, tags);
	}

	/**
	 * Writer___________K__180620 timestamp 깨짐현상 참조
	 * :http://seongilman.tistory.com/135
	 * 
	 * @param no
	 * @param page
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/ajax/nolgo/{no}/rating/{page}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getRatingList_K(@PathVariable int no, @PathVariable int page, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		int loginUserNo = loginUser == null ? 0 : loginUser.getNo();

		return nolgosService.getRatingListByNolgoNo_K(no, page, loginUserNo);
	}

	/**
	 * Writer___________K__180624 평점 삭제
	 * 
	 * @param no
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/rating/{no}", method = RequestMethod.DELETE)
	@ResponseBody
	public boolean removeRating_K(@PathVariable int no, HttpSession session) {

		return nolgosService.removeRatingByNo_K(no);
	}
	
	/**
	 * Writer___________K__180625 신고
	 * @param contentType
	 * @param contentNo
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/{contentType}/{contentNo}/report", method = RequestMethod.POST)
	@ResponseBody
	public boolean registerReport_K(@PathVariable String contentType,@PathVariable int contentNo, @RequestParam String content, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");

		// System.out.println(contentType);
		// System.out.println(contentNo);

		return nolgosService.registerReport_K(contentType, contentNo, content, loginUser.getNo());
	}
	

	/**
	 * Writer___________H__180625
	 * 
	 * */
	@RequestMapping(value= {"/","/index"})
	public String getNolgo(Model model, HttpSession session) {

		System.out.println("test");
		
		User loginUser = (User)session.getAttribute("loginUser");

		// List<Nolgo> nolgos = nolgosService.getNolgo();

		// List<Nolgo> nolgos = new ArrayList<>();		

		List<IndexRecommendation> recommList = nolgosService.getRecommendation();
		List<Map<String,Object>> result = new ArrayList<>();
		for (int i = 0; i < recommList.size(); i++) {
			Map<String, Object> map = new HashMap<>();
			System.out.println(i + ":" + recommList.get(i).getNolgoNos());
			List<Map<String,Object>> nolgos = nolgosService.getNolgoListByNolgoNos_H(recommList.get(i).getNolgoNos(), loginUser==null?-1:loginUser.getNo());
			map.put("title", recommList.get(i).getTitle());
			map.put("list", nolgos);
			result.add(map);
		}

		ObjectMapper om = new ObjectMapper();
		String json = "";
		try {
			json = om.writeValueAsString(result);	
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		model.addAttribute("recommList",recommList);
		model.addAttribute("nolgos", json);
		return "index";

	}
	
	/**
	 * Writer___________K__180626 
	 * 
	 * @param no
	 * @param page
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/ajax/user/{no}/review/{page}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getReviewListByUserNo_K(@PathVariable int no, @PathVariable int page, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		int loginUserNo = loginUser == null ? 0 : loginUser.getNo();

		return usersService.getReviewListByUserNo_K(no, page, loginUserNo);
	}
	
	/**
	 * Writer___________K__180626 
	 * 
	 * @param no
	 * @param page
	 * @param model
	 * @return
	 */
	///ajax/user/"+userNo+"/rating/1
	@RequestMapping(value = "/ajax/user/{no}/rating/{page}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getRatingListByUserNo_K(@PathVariable int no, @PathVariable int page, HttpSession session) {
		User loginUser = (User) session.getAttribute("loginUser");
		loginUser = new User();
		int loginUserNo = loginUser == null ? 0 : loginUser.getNo();

		return usersService.getRatingListByUserNo_K(no, page, loginUserNo);
	}
	
	/**
	 * Writer___________K__180701
	 * @param no
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/nolgo/{no}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getNolgoAjax_K(@PathVariable int no, Model model, HttpSession session) {

		User loginUser = (User) session.getAttribute("loginUser");		
		int loginUserNo = loginUser == null ? 0 : loginUser.getNo(); 
		Map<String, Object> map =  nolgosService.getNolgo_K(no, loginUserNo);

		return map;
	} 
	
	/**
	 * Writer___________K__180701
	 * @param no
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/ajax/nolgo/topten-for-userrecom", method = RequestMethod.GET)
	@ResponseBody
	public List<Map<String, Object>> getNolgoListTopTenForUserRecom_K(HttpSession session) {

		User loginUser = (User) session.getAttribute("loginUser");		
		int loginUserNo = loginUser == null ? 0 : loginUser.getNo(); 
		List<Map<String, Object>>  map =  nolgosService.getNolgoListTopTenForUserRecom_K(loginUserNo);

		return map;
	}  
}

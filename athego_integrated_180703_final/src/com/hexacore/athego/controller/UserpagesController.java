package com.hexacore.athego.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hexacore.athego.dao.UsersDAO;
import com.hexacore.athego.service.NolgosService;
import com.hexacore.athego.service.UsersService;
import com.hexacore.athego.util.PaginateUtil;
import com.hexacore.athego.vo.Nolgo;
import com.hexacore.athego.vo.NolgoSimple;
import com.hexacore.athego.vo.User;

@Controller
public class UserpagesController {
	private UsersService usersService;
	private NolgosService nolgosService;
	
	public NolgosService getNolgosService() {
		return nolgosService;
	}
	public void setNolgosService(NolgosService nolgosService) {
		this.nolgosService = nolgosService;
	}
	public UsersService getUsersService() {
		return usersService;
	}
	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
	}
	
	/*********************************************************************************************************/
	
	/* Writer___________A__180622 */
	/* 사용 하지 않음
	@RequestMapping(value="/mypage", method=RequestMethod.GET)
	public String toMyPage(Model model, HttpSession session) {
		User user = (User)session.getAttribute("loginUser");
		if(session.getAttribute("loginUser") == null) { return "redirect:/index"; }		//비로그인자가 접근시 거부 
		else {
			int loginUserNo = user.getNo(); //로그인한 세션의유저 번호니까 나중에 바뀔수 있음.
			model.addAttribute("myCommt",usersService.getComment(loginUserNo));			//SESSION_loginUser가 필요
			//리뷰 5개 땡겨오기 _________구현씨 담당소스 끌어올 곳 
			//model.addAttribute("reviewList",usersService.getReviews(loginUserNo));
			return "mypage";
		}
	} 
	*/
	/* Writer___________A__180622 */ 
	@RequestMapping(value="/user/{userNo}", method=RequestMethod.GET)
	public String toOtherPage(Model model,@PathVariable int userNo, HttpSession session) {
		
		//모델에 isfollower가 없으면 비로그인자, 있고 값이 Y면 로그인유저가 그페이지사람을 팔로우중.
		
		User loginUser = (User)session.getAttribute("loginUser");
		if(loginUser != null) {
			System.out.println("로그인자의 출입");
			model.addAttribute("isfollower",usersService.getlgnFollowPageOwn(loginUser.getNo()));
		}
		model.addAttribute("pageOwner", usersService.getpageOwner(userNo)); //userVo 리턴
		
		//리뷰 5개 땡겨오기 _________구현씨 담당소스 끌어올 곳  
		//model.addAttribute("reviewList",usersService.getReviews(session.getAttribute("userno")));		
		return "mypage";
	}
	
	/* Writer___________A__180624 */ 
	@RequestMapping(value="/ajax/userTxtInfo", method=RequestMethod.POST)
	@ResponseBody
	public String updateUserInfo(User user, HttpSession session){
		user.setNo((Integer)session.getAttribute("no"));
		boolean result = usersService.setUserTextInfo(user);
		if(result) {
			return "complete";
		}
		else {return null;}
	}
	
	/* Writer___________A__180624 */ 
	@RequestMapping(value="/ajax/user/{pageOwnerNo}/followers", method=RequestMethod.POST)
	@ResponseBody
	public String getUserFollower(Model model, @RequestParam("loginUserNo") String loginUserNo, @PathVariable String pageOwnerNo){
		int pageOwnNo = Integer.parseInt(pageOwnerNo);
		
		// 비로그인자의 경우
		if(loginUserNo==null || loginUserNo.length() == 0) {
			model.addAttribute("poFollowerList",usersService.getFollowers(pageOwnNo));
		}
		else {
			int lgnUNo = Integer.parseInt(loginUserNo);
			if(lgnUNo==pageOwnNo) { //로그인자의 자기페이지인 경우
				model.addAttribute("myFollowerList",usersService.getFollowers(lgnUNo));
			}
			else { 					//로그인자의 남의 페이지인 경우
				model.addAttribute("poFollowerList",usersService.getFollowers(pageOwnNo,lgnUNo));
			}
		}
		return "ajax_done";
	}
	/* Writer___________A__180624 */ 
	@RequestMapping(value="/ajax/user/{pageOwnerNo}/followings", method=RequestMethod.POST)
	@ResponseBody
	public String getUserFollowing(Model model, @RequestParam("loginUserNo") String loginUserNo, @PathVariable String pageOwnerNo){
		int pageOwnNo = Integer.parseInt(pageOwnerNo);
		// 비로그인자의 경우
				if(loginUserNo==null || loginUserNo.length() == 0) {
					model.addAttribute("poFollowingList",usersService.getFollowings(pageOwnNo)); 	// po_PageOwner
				}
				//로그인자의
				else {
					int lgnUNo = Integer.parseInt(loginUserNo);
					if(lgnUNo==pageOwnNo) { // 자기페이지인 경우
						model.addAttribute("myFollowingList",usersService.getFollowings(lgnUNo));
					}
					else { //남의 페이지인 경우
						model.addAttribute("poFollowingList",usersService.getFollowings(pageOwnNo,lgnUNo));
					}
				}
		return "ajax_done";
	}
	
	
	/* Writer___________A__180624 */ 
	@RequestMapping(value="/ajax/user/{pageOwnerNo}/search/{type}/{strPageNo}", method=RequestMethod.POST)
	@ResponseBody
	public String getUserContentsByKeyw(Model model, @RequestParam("keyword") String keyword, @PathVariable String pageOwnerNo,@PathVariable String type,@PathVariable String strPageNo){
		int userNo = Integer.parseInt(pageOwnerNo);
		int pageNo = 0;
		if(strPageNo!=null) {pageNo = Integer.parseInt(strPageNo);}
		
		//최초의 검색 시, ajax/user/1/search/rv
		// 탭 메뉴 눌러서 평점볼 시, ajax/user/1/search/rt
		//if(keyword.contains("#")) { //#이 검색어에 있을 경우, 태그만 검색.
		
		
		if(type.equals("rv")) { model.addAttribute("resultRv",usersService.getReviewsOnKeyw(keyword, pageOwnerNo,pageNo)); }
		else {	model.addAttribute("resultRt",usersService.getRatingsOnKeyw(keyword,pageOwnerNo,pageNo)); }
		//리뷰는 놀곳이름, 리뷰제목, 리뷰내용(_가능?), 카테고리명(대?대소 둘다?) 뒤져서 붙이기 
				//평점은 놀곳이름, 평점내용(_가능?) 뒤져서 붙이기 
		
		return "done";
	}
	
	/* Writer___________A__180627 */
	@RequestMapping(value="/ajax/user/{strUserNo}/{type}/{strPageNo}", method=RequestMethod.POST)	
	@ResponseBody
	public Map<String, Object> getPickedNolgos(Model model, @PathVariable String strUserNo, @PathVariable String strPageNo, @PathVariable String type){
		Map<String, Object> map = new HashMap<>();
			
		int userNo = Integer.parseInt(strUserNo);
		int pageNo = 1;
		if(strPageNo!=null) {pageNo = Integer.parseInt(strPageNo);}
		int numPage = 8;
		int numBlock = 3;
		String url="";
		int total=0;
		List<Nolgo> list = new ArrayList<Nolgo>();
		url = String.format("/ajax/user/"+userNo+"/"+type+"/");
		total = nolgosService.getUserNolgoCnt(userNo,type);
	
		list = usersService.getNolgos_A(userNo,pageNo,numPage,numBlock,type);
		List<NolgoSimple> simpleList = new ArrayList<NolgoSimple>();
		
		for (Nolgo nolgo : list) {
			NolgoSimple simpN = new NolgoSimple();
			simpN.setNo(nolgo.getNo());
			simpN.setNolgoName(nolgo.getName());
			simpN.setPicture(nolgo.getPictures());
			simpN.setLocationA(nolgosService.getLocationUntilMid(nolgo.getLocationNo()));
			simpN.setCategory(nolgo.getCategoryName());
			simpleList.add(simpN);
		}

		map.put("simpleList",simpleList);
		map.put("paginate",PaginateUtil.getPaginate(pageNo, total, numPage, numBlock, url));
		
		return map;
	}
	/* Writer___________A__180627 */ 
	@RequestMapping(value="/ajax/review/{strReviewNo}/clicklik/{type}", method=RequestMethod.POST)
	@ResponseBody
	public String getUserFollower(HttpSession session, @PathVariable String strReviewNo, @PathVariable String type){
		
		System.out.println(session.equals("no"));
		int result = usersService.toggleLikingBtn((Integer)session.getAttribute("no"),strReviewNo,type);
		
		//reviewsTB에 update like_cnt --
		//likingsTB에 delete 행 자체
		
		if(result==2) return "done";
		else {
			System.out.println(result);
			return "err";
		} 
		
	}
	
	/**
	 * Writer___________K__180630
	 * @return
	 */
	@RequestMapping(value="/ajax/user/profile", method=RequestMethod.PUT)
	@ResponseBody
	public boolean modifyProfile_K (@RequestBody String paramJson, HttpSession session) {
		User user = (User)session.getAttribute("loginUser");
		Map<String,String> map = new HashMap<String,String>();
		boolean result = false;
		ObjectMapper om = new ObjectMapper();
		try {
			map = om.readValue(paramJson, new TypeReference<HashMap<String,String>>(){});
			
			user.setProfile(map.get("profile"));
			
			result = usersService.modifyProfile_K(user);
			
			session.setAttribute("loginUser", user);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}//end try
		 
		return result;		
	}

	/**
	 * Writer___________K__180630
	 * @return
	 */
	@RequestMapping(value="/ajax/user/cover", method=RequestMethod.PUT)
	@ResponseBody
	public boolean modifyCover_K (@RequestBody String paramJson, HttpSession session) {
		User user = (User)session.getAttribute("loginUser");
		Map<String,String> map = new HashMap<String,String>();
		boolean result = false;
		ObjectMapper om = new ObjectMapper();
		try {
			map = om.readValue(paramJson, new TypeReference<HashMap<String,String>>(){});
			
			user.setCover(map.get("cover"));
			
			result = usersService.modifyCover_K(user);
			
			session.setAttribute("loginUser", user);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}//end try
		 
		return result;		
	}
}

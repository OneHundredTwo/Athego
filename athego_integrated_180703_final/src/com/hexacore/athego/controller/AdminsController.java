package com.hexacore.athego.controller;

import java.util.HashMap;
import java.util.Map;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hexacore.athego.service.AdminsService;
import com.hexacore.athego.vo.IndexRecommendation;
import com.hexacore.athego.vo.Report;
import com.hexacore.athego.vo.Review;
import com.hexacore.athego.vo.User;

@Controller
public class AdminsController {

	AdminsService adminsService;

	public void setAdminsService(AdminsService adminsService) {
		this.adminsService = adminsService;
	}
	
	/**
	 * 
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin/session"}, method = RequestMethod.POST)
	public String registerSession_K(@ModelAttribute User user, Model model, HttpSession session, RedirectAttributes ra) {
		
		User adminUser = adminsService.getUserForLogin_K(user);
		if (adminUser == null) {
			ra.addFlashAttribute("msg", "아이디 혹은 비밀번호가 틀렸습니다.");
			return "redirect:/admin/login";
		} else {
			session.setAttribute("loginUser", adminUser);
			return "redirect:/admin";
		}
	}
	
	@RequestMapping(value = {"/admin/session"}, method = RequestMethod.DELETE)
	public String removeSession_K(Model model, HttpSession session) {
		
		session.invalidate();
		
		return "redirect:/admin/login";
	}
	
	
	/**
	 * Writer___________K__180627
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin/login"}, method = RequestMethod.GET)
	public String index_K(Model model, HttpSession session) {
		
		return "adminLogin";
	}
	/**
	 * Writer___________K__180626
	 * @param page
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin","/admin/dashboard"}, method = RequestMethod.GET)
	public String getDashboard_K(Model model, HttpSession session) {
		
		model.addAllAttributes(adminsService.getNolgoListForAdminIndexRecom_K(null, 1));
		
		return "adminDashboard";
	}

	/**
	 * Writer___________K__180626
	 * 
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin/report","/admin/report/page/{pageStr}"}, method = RequestMethod.GET)
	public String getReportList_K(@PathVariable(required = false) String pageStr, Model model,
			HttpSession session) {

		int page = 1; 
		if(pageStr != null) {
			try { page = Integer.parseInt(pageStr);}
			catch (Exception ex){}
		}
		Map<String, Object> map = adminsService.getReportList_K(page);
		
		model.addAllAttributes(map);
		
		return "adminReportList";
	}
	

	/**
	 * Writer___________K__180626 
	 * @param contentNo
	 * @return
	 */
	@RequestMapping(value = "/ajax/review/{no}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getReviewByNo_K(@PathVariable int no) {
		
		return adminsService.getReviewByNo_K(no);
	}
	
	/**
	 * Writer___________K__180626 
	 * @param contentNo
	 * @return
	 */
	@RequestMapping(value = "/ajax/rating/{no}", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getRatingByNo_K(@PathVariable int no) {
		
		return adminsService.getRatingByNo_K(no);
	}
	
	/**
	 * Writer___________K__180627 
	 * @param contentNo
	 * @return
	 */
	@RequestMapping(value = "/ajax/report/{no}", method = RequestMethod.PUT)
	@ResponseBody
	public Map<String, Object> modifyReportByNo_K(@PathVariable int no, @RequestBody String data, BindingResult bindingResult) {
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			Map<String,Object> map  = mapper.readValue(data, HashMap.class);	
			System.out.println(map.get("status"));
			
			return adminsService.modifyReportStatus(no, Integer.parseInt(map.get("status").toString()));
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		 
		return null;
	}
	
	/**
	 * Writer___________K__180628
	 * @param page
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin/index-recommendation-add","/admin/index-recommendation-add/{keyword}",
			"/admin/index-recommendation-add/{keyword}/page/{pageNoStr}"}, method = RequestMethod.GET)
	public String indexRecommendationAdd_K(@PathVariable(required = false) String keyword, @PathVariable(required = false) String pageNoStr, Model model, HttpSession session) {
		
		Map<String, Object> map = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		
		int page = 1;
		try {
			page = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		keyword = keyword != null && keyword.equals("null") ? null: keyword;
	 	map = adminsService.getNolgoListForAdminIndexRecom_K(keyword, page);
		map.put("keyword", keyword);
		
		String json = "";
		try {
			json = om.writeValueAsString(map.get("nolgos"));
			map.put("nolgosJson", json);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		model.addAllAttributes(map);
		
		return "adminIndexRecommendationAdd";
	}
	
	/**
	 * Writer___________K__180628
	 * @param page
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin/nolgo", "/admin/nolgo/page/{pageNoStr}"}, method = RequestMethod.GET)
	public String getNolgoList_K(@PathVariable(required = false) String pageNoStr, Model model, HttpSession session) {
		
		Map<String, Object> map = new HashMap<>();
		ObjectMapper om = new ObjectMapper();
		
		int page = 1;
		try {
			page = Integer.parseInt(pageNoStr);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		map = adminsService.getNolgoListForAdmin_K(page);
		
		String json = "";
		try {
			json = om.writeValueAsString(map.get("nolgos"));
			map.put("nolgosJson", json);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		model.addAllAttributes(map);
		
		return "adminNolgoList";
	}
	
	/**
	 * Writer___________K__180629
	 * @param paramJson
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/ajax/admin/index-recommendation-add"}, method = RequestMethod.PUT)
	@ResponseBody
	public boolean updateRecom_K(@RequestBody String paramJson, Model model, HttpSession session) {
		Map<String,String> map = new HashMap<String,String>();
		boolean result = false;
		ObjectMapper om = new ObjectMapper();
		try {
			map = om.readValue(paramJson, new TypeReference<HashMap<String,String>>(){});
			
			result = adminsService.modifyIndexRecomOrder_K(map);
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}//end try
		 
				
		return result;
	}
	
	/**
	 * Writer___________K__180629
	 * @param no
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/ajax/admin/index-recommendation-add/{no}"}, method = RequestMethod.DELETE)
	@ResponseBody
	public boolean removeRecom_K(@PathVariable int no, Model model, HttpSession session) {
	
		return adminsService.remove_K(no);
	}
	
	/**
	 * Writer___________K__180629
	 * @param no
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/ajax/admin/index-recommendation-add"}, method = RequestMethod.POST)
	@ResponseBody
	public boolean registerRecom_K(IndexRecommendation indexRecommendation, BindingResult bindingResult, Model model, HttpSession session) {
	
		return adminsService.registerRecom_K(indexRecommendation);
	}
	
	/**
	 * Writer___________K__180701 
	 * 테스트 페이지/전체 놀고에 대해서 relinfo 갱신
	 * @param model
	 * @param session
	 * @return
	 */
	@RequestMapping(value = {"/admin/_relInfo"}, method = RequestMethod.GET)
	public String generateRelInfo_K( Model model, HttpSession session) {
		
			adminsService.generateRelInfo_K();
		return "_for_relInfo";
	}
}

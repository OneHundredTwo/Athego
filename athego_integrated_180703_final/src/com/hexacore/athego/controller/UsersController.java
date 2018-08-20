package com.hexacore.athego.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hexacore.athego.dao.UsersDAO;
import com.hexacore.athego.service.NolgosService;
import com.hexacore.athego.service.UsersService;
import com.hexacore.athego.vo.InterestCategory;
import com.hexacore.athego.vo.InterestLocation;
import com.hexacore.athego.vo.Location;
import com.hexacore.athego.vo.SearchVO;
import com.hexacore.athego.vo.User;

@Controller
public class UsersController {
	private static final String LOGIN_USER = "loginUser";

	private UsersService usersService;
	private NolgosService nolgosService;

	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
	}

	public void setNolgosService(NolgosService nolgosService) {
		this.nolgosService = nolgosService;
	}

	@RequestMapping("/indexx")
	public String sdfjedf(Model model) {
		model.addAttribute("user", usersService.getUser(1));
		return "index";
	}

	// 기원 start
	/* Writer___________B__180621 */
	// simple search
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String getSearchPage(Model model, SearchVO searchParams, HttpSession session) {
		System.out.println(searchParams.toString());
		User loginUser = (User) session.getAttribute(LOGIN_USER);
		searchParams.setLoginUserNo(loginUser != null ? loginUser.getNo() : -1);
		model.addAllAttributes(nolgosService.getSearchFilterValues_B(searchParams));
		return "searchList";
	}

	/* Writer___________B__180624 */
	@ResponseBody
	@RequestMapping(value = "/ajax/search/all", method = RequestMethod.GET)
	public Map<String, Object> searchAll(SearchVO searchParams, HttpSession session) {
		User loginUser = (User) session.getAttribute(LOGIN_USER);
		searchParams.setLoginUserNo(loginUser != null ? loginUser.getNo() : -1);
		System.out.println("/ajax/search/all : " + searchParams.toString());
		return usersService.searchAll_B(searchParams);
	}

	/* Writer___________B__180626 */
	@ResponseBody
	@RequestMapping(value = "/ajax/search/nolgo", method = RequestMethod.GET)
	public List<Map<String, Object>> searchNolgoItems(SearchVO searchParams, HttpSession session) {
		User loginUser = (User) session.getAttribute(LOGIN_USER);
		searchParams.setLoginUserNo(loginUser != null ? loginUser.getNo() : -1);
		System.out.println("/ajax/search/nolgo : " + searchParams.toString());
		return usersService.searchNolgo_B(searchParams);
	}

	/* Writer___________B__180626 */
	@ResponseBody
	@RequestMapping(value = "/ajax/search/user", method = RequestMethod.GET)
	public List<User> searchUserItems(SearchVO searchParams, HttpSession session) {
		User loginUser = (User) session.getAttribute(LOGIN_USER);
		searchParams.setLoginUserNo(loginUser != null ? loginUser.getNo() : -1);
		System.out.println("/ajax/search/user : " + searchParams.toString());
		return usersService.searchUser_B(searchParams);
	}

	/* Writer___________B__180626 */
	@ResponseBody
	@RequestMapping(value = "/ajax/search/review", method = RequestMethod.GET)
	public List<Map<String, Object>> searchReviewItems(SearchVO searchParams, HttpSession session) {
		User loginUser = (User) session.getAttribute(LOGIN_USER);
		searchParams.setLoginUserNo(loginUser != null ? loginUser.getNo() : -1);
		System.out.println("/ajax/search/review : " + searchParams.toString());
		return usersService.searchReview_B(searchParams);
	}

	/* Writer___________B__180625 */
	// seartch filter 중 위치 select 아이템 변경시 하위 location들 받아오는 url
	@ResponseBody
	@RequestMapping(value = "/ajax/location/depth1/{depth1Code}", method = RequestMethod.GET)
	public List<Location> getDepth2Locations(@PathVariable int depth1Code) {
		return nolgosService.getDepth2List_B(depth1Code);
	}

	@ResponseBody
	@RequestMapping(value = "/ajax/location/depth2/{depth2Code}", method = RequestMethod.GET)
	public List<Location> getDepth3Locations(@PathVariable int depth2Code) {
		return nolgosService.getDepth3List_B(depth2Code);
	}

	/* Writer___________B__180620 */
	// 로그인
	@ResponseBody
	@RequestMapping(value = "/session", method = RequestMethod.POST)
	public String login(HttpSession session, User loginUser) {
		loginUser = usersService.login_B(loginUser);
		if (loginUser != null) {
			session.setAttribute(LOGIN_USER, loginUser);
		}

		return "{\"isFail\":" + (loginUser == null) + "}";
	}

	/* Writer___________B__180620 */
	// 로그아웃
	@RequestMapping(value = "/session", method = RequestMethod.DELETE)
	public String logout(HttpSession session, HttpServletRequest reqeust, String currentUrl) {
		session.invalidate();
		return "redirect:" + currentUrl;
	}
	// 기원 end
	
	// 상준 시작

	// Writer_________N__180625
	@RequestMapping(value = "/user/join", method = RequestMethod.GET)

	public String user_N(Model model) {

		System.out.println("회원가입중입니다 ~~!!");
		List<Location> locations = usersService.getAttentionDepth1List_N();
		for (Location l : locations) {
			System.out.println(l.getDepth1());

		}
		// depth1의 정보를 불러온다
		model.addAttribute("depths1", usersService.getAttentionDepth1List_N());
		return "joinform";
	}

	// Writer_________N__180628
	@RequestMapping(value = "/ajax/user/join/location/depth1", method = RequestMethod.GET)
	@ResponseBody
	public List<Location> locationDepth2List(int depth1Code) {

		usersService.getDepth2List_B(depth1Code);
		List<Location> locations = usersService.getDepth2List_B(depth1Code);
		for (Location ln : locations) {
			System.out.println(ln.getDepth1Code());

		}
		return locations;
	}

	// 회원가입폼 접속 페이지
	// Writer_________N__180625
	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public String insertUser_N(User user, String phone1, String phone2, String phone3, String year, String[] service,
			String month, String date, String introduce, int[] locationNo, String userProfile) {
//		System.out.println(user.getEmail());
//		System.out.println(user.getPassword());
//		System.out.println(user.getNickname());
//		System.out.println(user.getGender());
//		System.out.println(user.getBirthDate());
//		System.out.println(user.getIntroduce());
		//System.out.println("관심지역번호 : " + locationNo);
//		for (int i : locationNo) {
////			System.out.println(i);
//		}
		// System.out.println("locationNo="+interestLocation.getLocationNo());
		// 회원가입 기본적인 가입(아이디,비밀번호,닉네임) 추가사항 부분(생년월일, 전화번호,소개말)
		boolean result = usersService.register_N(user, phone1, phone2, phone3, year, month, date, introduce, userProfile);
		System.out.println("userNo=" + user.getNo());
		// 회원가입 추가사항 부분 관심사 부분
		if (service != null) {
			for (String s : service) {
				System.out.println("service:" + s);

				InterestCategory interestCategory = new InterestCategory();

				interestCategory.setUserNo(user.getNo());

				interestCategory.setCategoryNo(Integer.parseInt(s));

				boolean interest = usersService.interest_N(interestCategory);

			}
		}
		// System.out.println(usersService.getAttentionCity_N(interestLocation));
		// usersService.getAttentionCity_N(interestLocation);
		if (locationNo != null) {
			for (int ss : locationNo) {
				InterestLocation interestLocation = new InterestLocation();
				interestLocation.setLocationNo(ss);
				interestLocation.setUserNo(user.getNo());
				boolean rell = usersService.getAttentionCity_N(interestLocation);

			}
		}

		System.out.println(" 회원가입에 성공 햇어요!! ~~!!");
		return "redirect:/index";
	}

	// Writer_________N__180626
	// 페스워드 팝업창(임시 페이지)
	@RequestMapping(value = "/password", method = RequestMethod.GET)
	public String password_N() {

		return "password";
	}

	// Writer_________N__180626
	// 비밀번호찾기에서 이메일이 db에 있는 것과 같은지 검사하고 참이면 다음으로 넘어가고 거짓이면 틀렸다는 얼랏창 뜸
	@RequestMapping(value = "/find_pass", method = RequestMethod.GET)
	@ResponseBody
	public String find_pass_N(User user, HttpSession session) {

		System.out.println(user.getEmail());

		User loginUser = usersService.passwordFind_N(user);

		return "{\"result\":" + (loginUser != null) + "}";
	}

	// Writer_________N__180626
	// 비밀번호 찾기 인증이 끝나면 비밀번호 수정 팝업으로 이동하고 팝업에서
	// 비밀번호를 수정하고 수정하기 버튼을 누르면 해당 유저의 정보가 변경됨
	@RequestMapping(value = "/find_pass", method = RequestMethod.PUT)
	public String find_passd_N(User user, BindingResult result) {
		// System.out.print(user.getNo());
		System.out.println(result.getFieldErrorCount());
		// 에러코드 잡아주는 곳
		List<FieldError> list = result.getFieldErrors();

		for (FieldError error : list) {
			System.out.println(error.getField() + " " + error.getCode());
		}
		System.out.println(user.getEmail());
		System.out.println(user.getPassword());
		boolean permute = usersService.modify_N(user);
		return "redirect:/index";
	}

	// 나의 정보 수정 페이지
	// Writer_________N__180622
	@RequestMapping("/userupdateform")
	public String userupdateform_N() {

		return "userupdateform";
	}
	// 상준 END

}

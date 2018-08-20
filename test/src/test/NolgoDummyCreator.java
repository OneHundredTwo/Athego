package test;

import java.io.FileWriter;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Element;

/*
 * 1 서울
2 인천
3 대전
4 대구
5 광주
6 부산
7 울산
8 세종특별자치시
31 경기도
32 강원도
33 충청북도
34 충청남도
35 경상북도
36 경상남도
37 전라북도
38 전라남도
39 제주도

륜동 키
XQHi2IRHrpVh%2F3WF5YkPbyYAFqv8V2UX091ZkHjwBJCGJ4ud4BPfn9IfwckFhKgd6fvlfePD%2FhOUelOAHYfC%2BQ%3D%3D 

내 키
ihyFEu32fZeh9zZg9lHwXI8EhS0Feo43bH9UGPCe3%2BWhzJGVI00XCZgtwDiY5JNHknZET7lc4i%2B5aq%2BnZVxgOw%3D%3D

형 키
SkXou9iNxpsrru8aeI6a4F8coUJm3Xh1Pyv6s1gu1KjViAlzOUeEMN%2BaGIEez2SFl9a%2FfZUt1OgH%2Bro0WpORpw%3D%3D
 * */

public class NolgoDummyCreator {
	/*
	 * 0:2972 1:766 2:315 3:552 4:316 5:849 6:305 7:65 8:3046 9:3363 10:1161 11:1534
	 * 12:2126 13:1985 14:1863 15:2007 16:1069
	 */
	public static final String[] AREAS = new String[] { "1", "2", "31", "3", "4", "5", "6", "7", "8", "32", "33", "34",
			"35", "36", "37", "38", "39" };
	public static final String[] AREA_NAMES = new String[] { "서울", "인천", "경기도", "대전", "대구", "광주", "부산", "울산", "세종자치특별시",
			"강원도", "충청북도", "충천남도", "경상북도", "경상남도", "전라북도", "전라남도", "제주도" };
	public static final int LIMIT_PAGES[] = new int[] { 29, 7, 3, 5, 3, 8, 3, 5, 30, 30, 10, 15, 20, 19, 18, 20, 10 };

	public static final String KEY[] = new String[] {
			"XQHi2IRHrpVh%2F3WF5YkPbyYAFqv8V2UX091ZkHjwBJCGJ4ud4BPfn9IfwckFhKgd6fvlfePD%2FhOUelOAHYfC%2BQ%3D%3D",
			"ihyFEu32fZeh9zZg9lHwXI8EhS0Feo43bH9UGPCe3%2BWhzJGVI00XCZgtwDiY5JNHknZET7lc4i%2B5aq%2BnZVxgOw%3D%3D",
			"SkXou9iNxpsrru8aeI6a4F8coUJm3Xh1Pyv6s1gu1KjViAlzOUeEMN%2BaGIEez2SFl9a%2FfZUt1OgH%2Bro0WpORpw%3D%3D" };
	public static final String HOST = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/";

	public static final String PREFIX_PARAMS = "&MobileOS=ETC&MobileApp=AppTest";
	public static int keyIndex = 0;

	public static final int DELAY = 200;

	public static final String DUMMY_ROOT = "D:\\jbm\\project\\athego\\Atehgo_workspace\\dummy_results\\";

	public static String reqUrl(String method, Map<String, String> params, int pageNo) {
		String url = "";
		url = HOST + method + "?ServiceKey=" + KEY[keyIndex] + PREFIX_PARAMS + "&rowOfNum=10&pageNo=" + pageNo;
		Set<String> keys = params.keySet();

		for (String key : keys) {
			url += "&" + key + "=" + params.get(key);
		}
		return url;
	}

	public static void main(String args[]) throws Exception {
		start();
	}

	public static void start() {
		try {
			FileWriter fw = new FileWriter(DUMMY_ROOT + "Nolgos_Base_Data.sql");
			fw.write("set define off;\r\n");
			Map<String, String> params = new HashMap<String, String>();
			params.put("arrange", "B");
			params.put("listYN", "Y");

			int k = 1;

			for (int i = 0; i < AREAS.length; i++) {
				params.put("areaCode", AREAS[i]);
				for (int j = 1; j <= LIMIT_PAGES[i]; j++) {
					try {
						Document doc = getXMLDocument(reqUrl("areaBasedList", params, j));
						if (isError(doc) == 0) {
							NodeList contents = doc.getElementsByTagName("item");
							for (int temp = 0; temp < contents.getLength(); temp++) {
								Element el = (Element) contents.item(temp);
								String contentId = el.getElementsByTagName("contentid").item(0).getTextContent();
								String value = getValuesString(contentId);
								if (value != null) {
									System.out.print(k + ") " + AREAS[i] + ":" + AREA_NAMES[i] + ":page=" + j
											+ ":num : " + temp + ": contentid=" + contentId + " START ");
									k++;
									String insert = "\r\n INSERT INTO NOLGOS(no, name, user_no, location_no, category_no, regdate, rating_cnt, review_cnt, avg_score, lng, lat, address, content, pictures, phone, stay_time, max_budget, min_budget, off_day) \r\n";
									insert += "VALUES( nolgos_seq.nextval, ";
									insert += value;
									insert += ");";
									fw.write(insert);
									System.out.println("... DONE");
									delay();
								} else {
									finishDummyCreate(i, j, fw);
									return;
								}
							}
						} else {
							if (isError(doc) == 1) {
								finishDummyCreate(i, j, fw);
								return;
							}
						}
						delay();
					} catch (Exception e) {
						e.printStackTrace();
						finishDummyCreate(i, j, fw);
						return;
					}

				}

			}
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static void finishDummyCreate(int i, int j, FileWriter fw) {
		try {
			FileWriter rfw = new FileWriter(DUMMY_ROOT + "nolgo_dummy_insert_result.txt");
			rfw.write("\r\n 마지막 수집지역  : " + i + ":" + AREA_NAMES[i] + " , 마지막 페이지 : " + j);
			rfw.close();
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getValuesString(String contentId) throws Exception {
		Map<String, String> params = new HashMap();

		params.put("contentId", contentId);
		params.put("defaultYN", "Y");
		params.put("firstImageYN", "Y");
		params.put("areacodeYN", "Y");
		params.put("catcodeYN", "Y");
		params.put("addrinfoYN", "Y");
		params.put("overviewYN", "Y");
		params.put("mapinfoYN", "Y");

		Document doc = getXMLDocument(reqUrl("detailCommon", params, 1));

		if (isError(doc) == 0) {

			Element el = (Element) doc.getElementsByTagName("item").item(0);

			// 안바뀌는거
			String user_no = "", regdate = "", category_no = "", rating_cnt = "", review_cnt = "", avg_score = "",
					stay_time = "", max_budget = "", min_budget = "", off_day = "";
			user_no = "1";
			category_no = (new Random().nextInt(10) + 1) + "";
			regdate = "systimestamp";
			rating_cnt = "0";
			review_cnt = "0";
			avg_score = "0";
			stay_time = "'0200'";
			max_budget = "1000";
			min_budget = "10000";
			off_day = "'연중무휴'";

			// 바뀌는거
			String location_no = "", name = "", lng = "", lat = "", address = "", content = "", pictures = "",
					phone = "";
			// location
			try {
				String addr = el.getElementsByTagName("addr1").item(0).getTextContent();
				location_no = "(SELECT no FROM locations WHERE " + getLocationQuery(addr) + " )";
			} catch (NullPointerException e) {
				location_no = "1442";
			}
			// name
			try {
				name = "'" + el.getElementsByTagName("title").item(0).getTextContent().replace("'", "") + "'";
			} catch (NullPointerException e) {
				name = "'버거킹'";
			}
			// lng
			try {
				lng = el.getElementsByTagName("mapx").item(0).getTextContent();
				lng = "'" + lng + "'";
			} catch (NullPointerException e) {
				lng = "'127'";
			}
			// lat
			try {
				lat = el.getElementsByTagName("mapy").item(0).getTextContent();
				lat = "'" + lat + "'";
			} catch (NullPointerException e) {
				lat = "'36'";
			}
			// address
			try {
				address = el.getElementsByTagName("addr1").item(0).getTextContent() + " "
						+ el.getElementsByTagName("addr2").item(0).getTextContent();
				address = "'" + address + "'";
			} catch (NullPointerException e) {
				address = "'서울시 관악구 옐로우 빌딩 14층 글로벌 아이티'";
			}
			// content
			try {
				content = "<p>" + el.getElementsByTagName("homepage").item(0).getTextContent() + "</p>";

				try {
					content += "<p><img src='" + el.getElementsByTagName("firstimage").item(0).getTextContent()
							+ "'/></p>";
				} catch (NullPointerException e) {

				}

				content = content.replace("'", "\"");
				content = "'" + content + "' || '<p>' || ";

				String overview = el.getElementsByTagName("overview").item(0).getTextContent();
				overview = overview.replaceAll("'", "\"");

				String clobedOverview = "";
				int length = 1000;
				if (overview.length() > length) {
					System.out.println(name);
					int overlength = overview.length();
					int cnt = overlength / length;
					String tmpStr = "";
					for (int z = 0; z < cnt; z++) {
						tmpStr = overview.substring(z * length, z * length + length);
						clobedOverview += " to_clob('" + tmpStr + "') || ";

						overlength -= length;
					}
					tmpStr = overview.substring(cnt * length, overview.length());
					clobedOverview += " to_clob('" + tmpStr + "') || ";

					content += clobedOverview + " '</p>'";

				} else {
					content += "'" + overview + "' || '</p>'";
				}

			} catch (NullPointerException e) {
				content = "<p>" + "맛있고 재밌는 놀곳" + "</p>" + "<p>" + "<img src=\"/img/def(1024x440).png\"/>" + "</p>";
				content = "'" + content + "'";
			}
			// pictures
			try {
				pictures = "'" + el.getElementsByTagName("firstimage").item(0).getTextContent() + "'";
			} catch (NullPointerException e) {
				pictures = "'def(1024x440).png'";
			}
			// phone
			try {
				Pattern p = Pattern.compile("^\\d{2,3}-\\d{3,4}-\\d{4}$");

				phone = el.getElementsByTagName("tel").item(0).getTextContent();
				String[] ph = phone.split(" ", 1);

				Matcher m = p.matcher(ph[0]);
				if (m.find()) {
					phone = phone.substring(0, 13);
					phone = "'" + phone + "'";
				} else {
					throw new Exception();
				}
			} catch (Exception e) {
				phone = "'010-1234-1234'";
			}

			String result = "";

			result = name + "," + user_no + "," + location_no + "," + category_no + "," + regdate + "," + rating_cnt
					+ "," + review_cnt + "," + avg_score + "," + lng + "," + lat + "," + address + "," + content + ","
					+ pictures + "," + phone + "," + stay_time + "," + max_budget + "," + min_budget + "," + off_day;
			return result;
		} else {
			System.out.println("error");
			return null;
		}

	}

	public static String getLocationQuery(String addr) throws Exception {
		String[] addrtk = addr.split(" ");
		String query = "";

		Pattern p1 = Pattern.compile("^.*(시|군|구)$");
		Pattern p2 = Pattern.compile("^.*(읍|면|동)$");

		// (SELECT no FROM locations where depth1 like '%서울특별시%' AND depth2 like
		// '%영등포구%' AND depth3 like '%여의서로%'),
		if (addrtk.length >= 3) {
			for (int i = 0; i < 3; i++) {
				Matcher m1 = p1.matcher(addrtk[i]);
				Matcher m2 = p2.matcher(addrtk[i]);
				System.out.print("\r\n" + addrtk[i]);
				if (i == 1 && !m1.find()) {
					query += " depth" + (i + 1) + " is null AND";
				} else if (i == 2 && !m2.find()) {
					query += " depth" + (i + 1) + " is null AND";
				} else {
					query += " depth" + (i + 1) + " LIKE '" + addrtk[i] + "%' AND";
				}
			}

			query = query.substring(0, query.length() - 3);

		}

		return query;

	}

	public static Document getXMLDocument(String url) throws Exception {
		URL u = new URL(url);
		InputStream uis = u.openStream();

		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

		Document doc = dBuilder.parse(uis);
		doc.getDocumentElement().normalize();
		return doc;
	}

	public static void delay() {
		try {
			new Thread().sleep(DELAY);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static int isError(Document doc) {
		String code = doc.getElementsByTagName("resultCode").item(0).getTextContent();
		System.out.println(code);
		if (code.equals("22")) {
			if (keyIndex != KEY.length) {
				System.out.println(KEY[keyIndex] + " 키 만료됨.");
				keyIndex++;
				return 0;
			} else {
				System.out.println("모든 키 만료됨.");
				return 1;
			}
		} else if (!code.equals("0000")) {
			return 1;
		}
		return 0;
	}
}

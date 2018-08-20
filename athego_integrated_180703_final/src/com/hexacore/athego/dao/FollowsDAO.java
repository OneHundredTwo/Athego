package com.hexacore.athego.dao;

import java.util.List;
import com.hexacore.athego.vo.Follow;

public interface FollowsDAO {
	List<Integer> getFollowersNo(int userNo);/* Writer___________A__180622 */
	List<Integer> getFollowingsNo(int userNo);/* Writer___________A__180622 */
	int removeFollow(Follow follow);/* Writer___________A__180625 */
	int addFollow(Follow follow);/* Writer___________A__180625 */
	 
}

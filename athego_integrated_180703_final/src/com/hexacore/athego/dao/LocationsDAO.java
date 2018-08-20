package com.hexacore.athego.dao;

import java.util.List;

import com.hexacore.athego.vo.Location;

public interface LocationsDAO {
	/* Writer___________Y__180627 */
	public Location selectOne(Location location);

	/* Writer___________Y__180624 */
	public int updateNolgoCnt_Y(int no);

	// 기원 start
	public List<Location> selectDepth1List_B();/* Writer___________B__180624 */

	public List<Location> selectDepth2List_B(int depth1Code);/* Writer___________B__180624 */

	public List<Location> selectDepth3List_B(int depth2Code);/* Writer___________B__180624 */

	public Location selectNolgoLocation_B(int nolgoLocationNo);/* Writer___________B__180626 */
	// 기원 end

	/* Writer___________A__180627 */
	public String selectDepth12_A(int locationNo);

	// 상준 start
	public List<Location> selectDepth1List_N();/* Writer___________N__180628 */

	public List<Location> selectDepth2List_N(int depth1Code);/* Writer___________N__180628 */
	// 상준 END
}

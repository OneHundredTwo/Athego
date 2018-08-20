package com.hexacore.athego.vo;

/* Writer___________B__180624 */
public class SearchVO {
	  private String keyword;
      private int[] categories;
      private int[] convenients;
      private int minBudget;
      private int maxBudget;
      private int loginUserNo;
      
      public SearchVO() {
		// TODO Auto-generated constructor stub
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}


	public int[] getCategories() {
		return categories;
	}

	public void setCategories(int[] categories) {
		this.categories = categories;
	}

	public int[] getConvenients() {
		return convenients;
	}

	public void setConvenients(int[] convenients) {
		this.convenients = convenients;
	}

	public int getMinBudget() {
		return minBudget;
	}

	public void setMinBudget(int minBudget) {
		this.minBudget = minBudget;
	}

	public int getMaxBudget() {
		return maxBudget;
	}

	public void setMaxBudget(int maxBudget) {
		this.maxBudget = maxBudget;
	}
	
	
      
      
    public int getLoginUserNo() {
		return loginUserNo;
	}

	public void setLoginUserNo(int loginUserNo) {
		this.loginUserNo = loginUserNo;
	}

	public String toString() {
    	String result = "keyword="+keyword+" : ";
    	result+= "locations="+depth1Code +":"+depth2Code+":"+depth3Code+":";
    	if(categories!=null) {
    		result += "categories=[";
    		for(int c : categories) {
    			result += c+",";
    		}
    		result = result.substring(0, result.length()-1);
    		result += "] : ";
    	}else {
    		result += "null : ";
    	}
    	
    	if(convenients != null) {
    		result += "convenients=[";
    		for(int c : convenients) {
    			result += c+",";
    		}
    		result = result.substring(0, result.length()-1);
    		result += "] : ";
    	}else {
    		result += "null : ";
    	}
		result += "minBudget="+minBudget+" : "+
    			"maxBudget="+maxBudget+" : ";
		
		result += "page = "+page+" : pageNo="+pageNo;
		result += " : start="+start+" : end = "+end;
		
		return result;

    }
	
	//0625 기원
	private int depth1Code, depth2Code, depth3Code;

	public int getDepth1Code() {
		return depth1Code;
	}

	public void setDepth1Code(int depth1Code) {
		this.depth1Code = depth1Code;
	}

	public int getDepth2Code() {
		return depth2Code;
	}

	public void setDepth2Code(int depth2Code) {
		this.depth2Code = depth2Code;
	}

	public int getDepth3Code() {
		return depth3Code;
	}

	public void setDepth3Code(int depth3Code) {
		this.depth3Code = depth3Code;
	}
	
	/* 0626 */
	private int page, pageNo, start, end;
	
	public void setStartEnd() {
		start = ((page-1) * pageNo)+1;
		end = page*pageNo;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}
	
      
}

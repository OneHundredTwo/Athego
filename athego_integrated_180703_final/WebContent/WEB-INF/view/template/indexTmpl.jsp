<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="tetx/template" id="nolgo_item_area_tmpl">
<@console.log("recommList in tmpl");@>	 
<@console.log(recommList);@>
<@_.each(recommList,function(nolgoList){@>
    <section class="recommendation_area_place_area">
        <div>
            <div class="recommendationPlaceTitle">
                <span><@=nolgoList.title@></span>
                <form action="/index" method="get">
                    <button>MORE <strong>놀GO </strong><i class="fas fa-sign-out-alt"></i></button>
                </form>
            </div>
            <div class="recommendationCardBox">
                <ul>
                    <@_.each(nolgoList.list,function(nolgoItem){ @>
					<@ var nolgo= nolgoItem.nolgo; var nolgoConvenients = nolgoItem.nolgoConvenients; var location = nolgoItem.location; @>
                        <li class="searchItem nolGoItem shutterable" data-id="<@=nolgo.no@>">
                            <a href="/nolgo/<@=nolgo.no@>">
                                <!--nolgo 상세페이지 링크 -->
                                <div class="imgBox">
									<@ var src = nolgo.pictures!=null?nolgo.pictures.split(',',1):'def(1024x440).png'; @>
									<@ src = /^http:/.test(src) ? src : "/img/" + src; @>
                                    <img class="nolGoImg" src="<@=src@>" onError="this.src='/img/def(1024x440).png';"/>
                                </div>
                                <div class="infoBundle">
                                    <span class="cntGo" title="Go수">
                                        <@if(nolgo.isGoCheck){@>
                                            <i class="fas fa-heart"></i>
                                        <@}else{@>
                                            <i class="far fa-heart"></i>
                                        <@}@>
                                        <@=nolgo.goCnt@>
                                    </span>
                                    <div class="basicInfoBox">
                                        <div class="catImg">
                                            <img src="/img/cat_<@=nolgo.categoryNo@>.png" />
                                        </div>
                                        <div class="basicTextInfo">
                                            <div class="row nolgoName">
                                                <span><@=nolgo.name@></span>
                                            </div>
                                            <div class="row nolgoLocation">
                                                <i class="fas fa-map-marker-alt"></i>
                                                <span><@=location.depth1@> <@=location.depth2@></span>
                                            </div>
                                            <div class="row nolgoSubCategories">
                                                <span class="relInfos decoable">
													<@ var relInfo = nolgo.relInfo == null ? '': nolgo.relInfo; @>
													<@ relInfo = relInfo.replace(/:\w+ */g,""); @>
													<@ relInfo = relInfo.replace(/, */g , ""); @>
													<@ var cutLength = relInfo.length < 20 ? relInfo.length : 20; console.log('cutLength:',cutLength); @>
													<@ relInfo = relInfo.substring(0, cutLength); @>
													<@=relInfo@>
												</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="shutterInfoBox">
                                        <div class="row price">
                                            <i class="fas fa-dollar-sign"></i> 1인당 최소<span><@=nolgo.minBudget@></span>원 최대 <span><@=nolgo.maxBudget@></span>원
                                        </div>
                                        <div class="row facilityBox">
                                            <@for(var i in nolgoConvenients){@>
                                                <span class="f<@=nolgoConvenients[i].convenientNo@>"></span>
                                            <@}@>
                                        </div>
                                        <div class="row">
                                            <span>평점</span>
                                            <@ var score= Math.round(nolgo.avgScore);@>
                                                <select class="averageRatingOptionList" data-rating="<@=score@>">
                                                    <option value="1" <@=score==1?'selected':''@>>1</option>
                                                    <option value="2" <@=score==2?'selected':''@>>2</option>
                                                    <option value="3" <@=score==3?'selected':''@>>3</option>
                                                    <option value="4" <@=score==4?'selected':''@>>4</option>
                                                    <option value="5" <@=score==5?'selected':''@>>5</option>
                                                </select>
                                                <span class="ratingNumber"><@=nolgo.avgScore@></span>
                                        </div>
                                        <div class="row">
                                            <span class="operTime" title="영업시간">
												<span class="open">OPEN</span>
												<@=isAMPM(nolgo.openTime)@> <strong><@=moment(nolgo.openTime,"x").format("hh:mm")@></strong>
                                            </span>
                                            <span class="operTime" title="영업시간">
												<span class="close">CLOSE</span>
                                                <@=isAMPM(nolgo.closeTime)@> <strong><@=moment(nolgo.closeTime,"x").format("hh:mm")@></strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    <@});@>
                </ul>
            </div>
        </div>
    </section>
<@});@>
</script>
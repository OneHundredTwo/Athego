 //지도 api
    var container = document.getElementById('minimap_area'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.48107255041048, 126.95216526775093), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
    };

    var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

    var geocoder = new daum.maps.services.Geocoder();

    var marker = new daum.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: map.getCenter()
    });

    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    daum.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            if (status === daum.maps.services.Status.OK) {

                // 마커를 클릭한 위치에 표시합니다
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);

                //도로명주소
                var roadAddress = !!result[0].road_address?result[0].road_address.address_name:'';
                var extraAddr = '';

                console.log(result[0]);

                //만약 도로명주소가 있다면 " (법정동명, 건물명)"
                if(result[0].address !== null)
                    extraAddr = " (" + result[0].address.region_3depth_name;
                if(result[0].road_address !== null && result[0].road_address.building_name !== "")
                    extraAddr += ", " + result[0].road_address.building_name + ")";
                else
                    extraAddr += ")"

                // 인포윈도우에 클릭한 위치에 대한 도로명주소나 법정동 상세 주소정보를 표시합니다
                if(roadAddress==''){
                    $('#full_addr').val(result[0].address.address_name);
                }else{
                    $('#full_addr').val(roadAddress + extraAddr);
                }
            }
        });
    });

    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

/*
    //주소기준(키워드나 카테고리x)로 지도검색해서 마커표시
    $('#search').click(function () {
        geocoder.addressSearch($('#full_addr').val(), function(result, status) {

            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {
                var coords = new daum.maps.LatLng(result[0].y, result[0].x);

                marker.setMap(null);

                marker = new daum.maps.Marker({
                });

                // 결과값으로 받은 위치를 마커로 표시합니다
                marker = new daum.maps.Marker({
                    map: map,
                    position: coords
                });


                //검색어의 법정동 상세 주소정보를 주소에 입력
                $('#full_addr').val(result[0].address.address_name);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    })
*/

    //다음 우편 api를 사용해서 얻어오는 주소와 latlng
    function searchMapByAddr() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = data.address; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 기본 주소가 도로명 타입일때 조합한다.
                if(data.addressType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                // 주소 정보를 해당 필드에 넣는다.
                document.getElementById("full_addr").value = fullAddr;
                // 주소로 상세 정보를 검색
                geocoder.addressSearch(data.address, function(results, status) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === daum.maps.services.Status.OK) {

                        var result = results[0]; //첫번째 결과의 값을 활용

                        // 해당 주소에 대한 좌표를 받아서
                        var coords = new daum.maps.LatLng(result.y, result.x);
                        // 지도를 보여준다.
                        //mapContainer.style.display = "block";
                        //map.relayout();

                        marker.setMap(null);

                        marker = new daum.maps.Marker({
                        });

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        marker = new daum.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 지도 중심을 변경한다.
                        map.setCenter(coords);
                        // 마커를 결과값으로 받은 위치로 옮긴다.
                        marker.setPosition(coords)
                    }
                });
            }
        }).open();
    }
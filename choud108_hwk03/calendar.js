var marker;
var map;
var parentMarkerList = [];
var count = 1;
var infoWindow;
var myLatLon = {lat:44.9727, lng: -93.23540000000003};
var markers = [];
var roote;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: myLatLon
  });
  var geocoder = new google.maps.Geocoder();
  var Info = document.getElementById("Fr");
  var Info1 = document.getElementById("5801").innerHTML;
  var FraserCoords = {lat: parseFloat(Info.dataset.lat), lng: parseFloat(Info.dataset.lng)};
  marker1 = new google.maps.Marker({
        map: map,
        position: FraserCoords,
        icon: 'umn_m.png',
        });
  markers.push(marker1);
  console.log("marker1", marker1);
  infowindow1 = new google.maps.InfoWindow({
        content: Info1
        });
  google.maps.event.addListener(marker1, 'mouseover', createWindow(map,infowindow1, marker1));

  var Info = document.getElementById("Brn");
  var Info2 = document.getElementById("4061").innerHTML;
  var BruininksCoords = {lat: parseFloat(Info.dataset.lat), lng: parseFloat(Info.dataset.lng)};
  marker2 = new google.maps.Marker({
        map: map,
        position: BruininksCoords,
        icon: 'umn_m.png',
        });
  markers.push(marker2);
  infowindow2 = new google.maps.InfoWindow({
        content: Info2
        });
  google.maps.event.addListener(marker2, 'mouseover', createWindow(map,infowindow2, marker2));

  var Info = document.getElementById("Li");
  var Info3 = document.getElementById("1401").innerHTML;
  var LindCoords = {lat: parseFloat(Info.dataset.lat), lng: parseFloat(Info.dataset.lng)};
  marker3 = new google.maps.Marker({
        map: map,
        position: LindCoords,
        icon: 'umn_m.png',
        });
  markers.push(marker3);
  infowindow3 = new google.maps.InfoWindow({
        content: Info3
        });
  google.maps.event.addListener(marker3, 'mouseover', createWindow(map,infowindow3, marker3));

  var Info = document.getElementById("An");
  var Info4 = document.getElementById("4131").innerHTML;
  var AndersonCoords = {lat: parseFloat(Info.dataset.lat), lng: parseFloat(Info.dataset.lng)};
  marker4 = new google.maps.Marker({
        map: map,
        position: AndersonCoords,
        icon: 'umn_m.png',
        });
  markers.push(marker4);
  infowindow4 = new google.maps.InfoWindow({
        content: Info4
        });
  google.maps.event.addListener(marker4, 'mouseover', createWindow(map,infowindow4, marker4));

  var Info = document.getElementById("Kh");
  var Info5 = document.getElementById("4061_Disc").innerHTML;
  var KellerCoords = {lat: parseFloat(Info.dataset.lat), lng: parseFloat(Info.dataset.lng)};
  marker5 = new google.maps.Marker({
        map: map,
        position: KellerCoords,
        icon: 'umn_m.png',
        });
  markers.push(marker5);
  infowindow5 = new google.maps.InfoWindow({
        content: Info5
        });
  google.maps.event.addListener(marker5, 'mouseover', createWindow(map,infowindow5, marker5));


    navigator.geolocation.getCurrentPosition(
            function( position ){

                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var google_map_pos = new google.maps.LatLng( lat, lng );

                var google_maps_geocoder = new google.maps.Geocoder();
                google_maps_geocoder.geocode(
                    { 'latLng': google_map_pos },
                    function( results, status ) {
                        if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
                            roote = results[0].formatted_address;
                            //alert(roote);
                            //document.getElementById('three').innerText = roote;

                        }
                    }
                );
            },
            function(){

            }
        );
  //
  // // Geolocation
  // infoWindow6 = new google.maps.InfoWindow;
  //
  // // Try HTML5 geolocation.
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         var pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude
  //         };
  //
  //         infoWindow6.setPosition(pos);
  //         infoWindow6.setContent('Location found.');
  //         infoWindow6.open(map);
  //         map.setCenter(pos);
  //       }, function() {
  //           handleLocationError(true, infoWindow6, map.getCenter());
  //           });
  //   } else {
  //         // Browser doesn't support Geolocation
  //         handleLocationError(false, infoWindow6, map.getCenter());
  //       }

 // Google maps search
  var type = document.getElementById('type');
    document.getElementById('Search').addEventListener('click', function() {
      if(count == 1){
        console.log("after second iteration");
        removeParentMarker();
        markers = [];
        parentMarkerList = [];
      }
      count = 1;
        infowindow = new google.maps.InfoWindow();
        var radius = document.getElementById('radius').value;
        var service = new google.maps.places.PlacesService(map);
        if(type.options[type.selectedIndex].value == 'rs') {
          type1 = ['restaurant'];
        } else if(type.options[type.selectedIndex].value == 'hp') {
          type1 = ['hospital'];
        } else if(type.options[type.selectedIndex].value == 'pa') {
          type1 = ['parking'];
        } else if(type.options[type.selectedIndex].value == 'sm') {
          type1 = ['supermarket'];
        } else
          // var o = document.getElementById('other').value;
          type1 = document.getElementById('other').value;;
          service.nearbySearch({
            location: myLatLon,
            radius: radius,
            type: type1,
          }, callback);
        });


    // Direction
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('left-panel'));
    // var control = document.getElementById('floating-panel');
    // control.style.display = 'block';
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    // document.getElementById('start').addEventListener('change', onChangeHandler);
    // infoWindow6.GetLatlong().addEventListener('change', onChangeHandler);
    document.getElementById('address').addEventListener('change', onChangeHandler);

} // end initMap()

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
              'Error: The Geolocation service failed.' :
              'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  // var x = document.getElementById('walk').checked;
  // var y = document.getElementById('drive').checked;
  // var z = document.getElementById('transit').checked;
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var start = roote;
    //var start = document.getElementById('start').value;
    var end = document.getElementById('address').value;
    directionsService.route({
      origin: start,
      destination: end,
      // if(x == true) {
      //   travelMode: document.getElementById('walk').value;
      // } else if (y == true) {
      //     travelMode: document.getElementById('walk').value;
      // } else if (z == true) {
      //    travelMode: document.getElementById('walk').value;
      // }
      travelMode: 'DRIVING'
    }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
              window.alert('Directions request failed due to ' + status);
          }
      });
  }

  function removeParentMarker(){
    for (var i = 0; i < parentMarkerList.length; i++) {
      removeMarker(parentMarkerList[i]);
    }
    for (var i = 0; i < markers.length; i++) {
      removeMarker(markers[i]);
    }
  }

function removeMarker(marker){
  marker.setMap(null);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  //console.log("placeLoc", placeLoc)
  var marker = new google.maps.Marker({
      map : map,
      position: place.geometry.location
  });
  //console.log(parentMarkerList);
  parentMarkerList.push(marker);
  //console.log(parentMarkerList);

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.setContent("<b>" +place.name + "</b><br/> Address: " +place.vicinity);
    infowindow.open(map, this);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location,
              title:address
              });
        infowindow = new google.maps.InfoWindow({
              content: address
              });
        google.maps.event.addListener(marker, 'mouseover', createWindow(resultsMap,infowindow, marker));
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    } //end if-then-else
  });
}

function createWindow(rmap, rinfowindow, rmarker){
            return function(){
      rinfowindow.open(rmap, rmarker);
          }
  }//end create (info) window

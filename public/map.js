var map, infoWindow

// function createMap () {
//     var a = 23.685,
//         b = 90.3563,
//         diff = 0.0033;

//     var options = {
//         center: {lat: a, lng: b},
//         zoom: 16,
//         mapTypeId: 'terrain'
//     };

//     map = new google.maps.Map(document.getElementById('map'), options)

//     infoWindow = new google.maps.InfoWindow;

//     //current location
//     if(navigator.geolocation) { 
//         navigator.geolocation.getCurrentPosition(function(p) {
//             var position = {
//                 lat: p.coords.latitude,
//                 lng: p.coords.longitude
//             }
//             infoWindow.setPosition(position)
//             infoWindow.setContent('Your location')
//             infoWindow.open(map)
//         }, function() {
//             handleLocationError('No geolocation available', map.center())
//         })
//     } else {
//         handleLocationError('No geolocation support available', map.center())
//     }


//     // Searching places
//     var input = document.getElementById('searchText');
//     var searchBox = new google.maps.places.SearchBox(input)

//     map.addListener('bounds_changed', function() {
//         searchBox.setBounds(map.getBounds())
//     })

//     var markers = [];
//     searchBox.addListener('places_changed', function() {
//         var places = searchBox.getPlaces();
//         if(places.length === 0) {
//             return
//         }

//         markers.forEach(function(m) {m.setMap(null)})
//         markers = [];
//         var bounds = new google.maps.LatLngBounds()

//         places.forEach(function(p) {
//             if(!p.geometry)
//                 return

//             markers.push(new google.maps.Marker({
//                 map,
//                 title: p.name,
//                 position: p.geometry.location
//             }))

//             if(p.geometry.viewport){
//                 bounds.union(p.geometry.viewport)
//             } else {
//                 bounds.extends(p.geometry.location)
//             }

//             map.fitBounds(bounds)
//         })
//     });


//     // data visualization
//     var script = document.createElement('script')
//     script.src = "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
//     document.getElementsByTagName('head')[0].appendChild(script)

//     map.data.setStyle(function(feature) {
//         var magnitude = feature.getProperty('mag');
//         return {
//             icon: getEarthQuakeCircle(magnitude)
//         }
//     })

//     //ADDING EDITABLE POLYGONS
//     var polygonCoordinates = [
//         { lat: a - diff, lng: b - diff },
//         { lat: a + diff, lng: b - diff },
//         { lat: a + diff, lng: b + diff },
//         { lat: a - diff, lng: b + diff },
//     ];

//     var polygon = new google.maps.Polygon({
//         map,
//         paths: polygonCoordinates,
//         strokeColor: "blue",
//         fillColor: "blue",
//         fillOpacity: 0.4,
//         draggable: true,
//         editable: true,
//     });

//     console.log(polygon);
    
// }


function createMap() {
    var a = 23.685,
        b = 90.3563,
        diff = 1;

    var options = {
        center: { lat: 40.52, lng: 34.34 },
        zoom: 5,
    };

    map = new google.maps.Map(document.getElementById("map"), options);

    var polygonCoordinates = [
        { lat: a - diff, lng: b - diff },
        { lat: a + diff, lng: b - diff },
        { lat: a + diff, lng: b + diff },
        { lat: a - diff, lng: b + diff },
    ];

    const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: 40.52, lng: 34.34 },
        radius: 16093.4,
        draggable: true,
        editable: true,
    });

    // var polygon = new google.maps.Polygon({
    //     map: map,
    //     paths: polygonCoordinates,
    //     strokeColor: "blue",
    //     fillColor: "blue",
    //     fillOpacity: 0.4,
    //     draggable: true,
    //     editable: true,
    // });

    // google.maps.event.addListener(polygon.getPath(), "set_at", function () {
    //     console.log(polygon);
    //     logArray(polygon.getPath());
    // });
    // google.maps.event.addListener(polygon.getPath(), "insert_at", function () {
    //     logArray(polygon.getPath());
    //     console.log(polygon);
    // });

    // listen to changes
    ["bounds_changed", "dragstart", "drag", "dragend"].forEach((eventName) => {
        circle.addListener(eventName, () => {
            console.log({ bounds: circle.getBounds()?.toJSON(), eventName });
        });
    });
} 


//polygon
function logArray(array) {
    var vertices = [];

    for (var i = 0; i < array.getLength(); i++) {
        vertices.push({
            lat: array.getAt(i).lat(),
            lng: array.getAt(i).lng(),
        });
    }

    console.log(vertices);
}




function handleLocationError(content, position) {
    infoWindow.setPosition(position)
    infoWindowsetContent(content)
    infoWindow.open(map)
}


//data visualization styles
function getEarthQuakeCircle(value) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, value) / 2,
        strokeColor: 'grey',
        strokeWeight: .5
    }
}

//data visualization callback
function eqfeed_callback(geojson) {
    map.data.addGeoJson(geojson)
}
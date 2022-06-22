console.log('map');

var map, 
    infoWindow,
    marker = 1,
    polygon = 1,
    circle = 1
    // markers = [], 
    // polygons = [], 
    // circles = [];

function createMap () {
    var a = 23.685,
        b = 90.3563,
        diff = 0.0033;

    var options = {
        center: { lat: a, lng: b },
        zoom: 8,
    };

    map = new google.maps.Map(document.getElementById("map"), options);

    // Searching places
    var input = document.getElementById("searchText");
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();
        if (places.length === 0) {
            return;
        }

        marker !== 1 && marker.setMap(null);
        polygon !== 1 && polygon.setMap(null);
        circle !== 1 && circle.setMap(null);
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (p) {
            if (!p.geometry) return;

            // markers.push(
            marker = new google.maps.Marker({
                map,
                title: p.name,
                position: p.geometry.location,
                animation: google.maps.Animation.DROP,
            });
            // );

            if (p.geometry.viewport) {
                bounds.union(p.geometry.viewport);
            } else {
                bounds.extends(p.geometry.location);
            }

            map.fitBounds(bounds);
        });
    });

    let zone = document.getElementById("zone");
    zone.addEventListener("change", (e) => {
        radiusDiv = document.getElementById("radiusDiv");
        if (zone.checked) {
            radiusDiv.style.display = "none";
            let markerLat = marker.getPosition().lat();
            let markerLng = marker.getPosition().lng();
            let difference = 0.01;
            // let difference = parseFloat(document.getElementById("zoneDiff").value/100);

            //ADDING EDITABLE POLYGONS
            var polygonCoordinates = [
                { lat: markerLat - difference, lng: markerLng - difference },
                { lat: markerLat + difference, lng: markerLng - difference },
                { lat: markerLat + difference, lng: markerLng + difference },
                { lat: markerLat - difference, lng: markerLng + difference },
            ];

            polygon = new google.maps.Polygon({
                map,
                paths: polygonCoordinates,
                strokeColor: "blue",
                fillColor: "blue",
                fillOpacity: 0.4,
                // draggable: true,
                editable: true,
            });
        } else {
            polygon.setMap(null);
            radiusDiv.style.display = "block";
        }
    });

    let radius = document.getElementById("radius");
    radius.addEventListener("change", (e) => {
        zoneDiv = document.getElementById("zoneDiv");
        if (radius.checked) {
            zoneDiv.style.display = "none";
            let markerLat = marker.getPosition().lat();
            let markerLng = marker.getPosition().lng();

            //ADDING EDITABLE CIRCLES
            circle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: { lat: markerLat, lng: markerLng },
                radius: 1000,
                // draggable: true,
                editable: true,
            });
        } else {
            circle.setMap(null);
            zoneDiv.style.display = 'block';
        }
    });
}


// polygon vertices
function logArray(array) {
    let vertices = [];
    for (var i = 0; i < array.getLength(); i++) {
        vertices.push({
            lat: array.getAt(i).lat(),
            lng: array.getAt(i).lng(),
        });
    }

    return vertices;
}

function submit() {
    let zone = document.getElementById('zone').checked;
    let radius = document.getElementById('radius').checked;
    
    let areaData = null
    let type = null
    let placeName = document.getElementById('searchText').value;
    let deliveryCharge = document.getElementById("deliveryCharge").value;

    console.log(placeName, deliveryCharge);
    
    if(placeName === ""){
        alert("Please enter a place name");
        return;
    }

    if(deliveryCharge === ""){
        alert("Please enter a deliveryCharge");
        return; 
    }
    
    if(zone || radius){
        if(zone){
            type = "zone";
            data = logArray(polygon.getPath())
            areaData = {
                type, 
                placeName, 
                deliveryCharge, 
                data
            }
            addArea(areaData)
        } else {
            type = "radius";
            areaData = {
                type,
                placeName, 
                deliveryCharge,
                data: {
                    bounds: circle.getBounds()?.toJSON(),
                    center: circle.getCenter().toJSON(),
                    radius: circle.getRadius()
                }
            }
            addArea(areaData)
        }
    } else {
        alert('Please select zone or radius');
        return
    }
}

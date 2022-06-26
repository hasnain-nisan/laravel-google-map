
console.log("map", areas);

var map,
    infoWindow,
    markers = [],
    marker,
    polygon = 1,
    polygons = [],
    circle = 1,
    polygonIntersection = false;
circles = [];

// var polygonCoordinates1 = modifyCoordinatesLatLngToXY(
//         JSON.parse(polygons[0].data)
//     ),
//     polygonCoordinates2 = modifyCoordinatesLatLngToXY(
//         JSON.parse(polygons[2].data)
//     ),
//     intersection = intersect(polygonCoordinates1, polygonCoordinates2);

function createMap() {
    //start create a map
    var a = 23.685,
        b = 90.3563,
        diff = 0.0033;
    var options = {
        center: { lat: a, lng: b },
        zoom: 8,
    };
    map = new google.maps.Map(document.getElementById("map"), options);
    //end create a map

    marker = new google.maps.Marker({})
    areas.forEach((element) => {
        let type = element.type;
        let data = JSON.parse(element.data);

        //adding marker
        markers.push(
            new google.maps.Marker({
                map,
                title: element.name,
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                position: modifyPolygonCenter(data.center),
                animation: google.maps.Animation.DROP,
            })
        );

        if (type === "zone") {
            //adding polygon
            polygons.push(
                new google.maps.Polygon({
                    map,
                    paths: modifyPolygonVertices(data.vertices),
                    strokeColor: "blue",
                    fillColor: "blue",
                    fillOpacity: 0.4,
                    // draggable: true,
                    // editable: true,
                })
            );
        } else {
            console.log("circle");
        }
    });

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

            // check if marker exist on the place selected
            let isMarkerExists = false;
            markers.forEach(function (marker) {
                if (isMarkerExists === false) {
                    if (
                        JSON.stringify(marker.getPosition().toJSON()) ===
                        JSON.stringify(p.geometry.location.toJSON())
                    ) {
                        alert("Marker existed");
                        marker.setIcon(
                            "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        );
                        isMarkerExists = true;
                    }
                }
            });

            if (isMarkerExists === false) {
                // marker = new google.maps.Marker({
                //     map,
                //     title: p.name,
                //     position: p.geometry.location,
                //     animation: google.maps.Animation.DROP,
                //     draggable: true,
                // });
                marker.setMap(map)
                marker.setTitle(p.name);
                marker.setPosition(p.geometry.location);
                marker.setAnimation(google.maps.Animation.DROP);
                marker.setDraggable(true);
                marker.setIcon(
                    "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                );

                //change marker icon color
                markers.forEach(function (marker) {
                    marker.setIcon(
                        "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    );
                });
            }

            if (p.geometry.viewport) {
                bounds.union(p.geometry.viewport);
            } else {
                bounds.extends(p.geometry.location);
            }

            map.fitBounds(bounds);
        });
    });

    google.maps.event.addListener(marker, "dragend", function (event) {
        getCoordinateDetails(marker.getPosition().toJSON())
    });

    let zone = document.getElementById("zone");
    zone.addEventListener("change", (e) => {
        radiusDiv = document.getElementById("radiusDiv");
        if (zone.checked) {
            radiusDiv.style.display = "none";
            let markerLat = marker.getPosition().lat();
            let markerLng = marker.getPosition().lng();
            let difference = 0.01;

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

            intersectPolygon = checkPolygonIntersection(polygon, polygons);
            if (intersectPolygon) {
                alert('Intersection detected')
            }
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
            zoneDiv.style.display = "block";
        }
    });

    // google.maps.event.addListener(polygon.getPath(), "set_at", function () {
    //     console.log(polygon);
    //     logArray(polygon.getPath());
    // });
    // google.maps.event.addListener(polygon.getPath(), "insert_at", function () {
    //     logArray(polygon.getPath());
    //     console.log(polygon);
    // });
}

function submit() {
    let zone = document.getElementById("zone").checked;
    let radius = document.getElementById("radius").checked;

    let areaData = null;
    let type = null;
    let placeName = document.getElementById("searchText").value;
    let deliveryCharge = document.getElementById("deliveryCharge").value;

    if (placeName === "") {
        alert("Please enter a place name");
        return;
    }

    if (deliveryCharge === "") {
        alert("Please enter a deliveryCharge");
        return;
    }

    if(polygon !== 1){
        polygonIntersection = checkPolygonIntersection(polygon, polygons);
        console.log(polygonIntersection);
        if (polygonIntersection) {
            alert("Intersection detected");
            createMap();
        }
    }

    if (zone || radius) {
        if (zone) {
            type = "zone";
            data = logArray(polygon.getPath());

            areaData = {
                type,
                placeName,
                deliveryCharge,
                data: {
                    center: marker.getPosition().toJSON(),
                    vertices: logArray(polygon.getPath()),
                },
            };

            let inpolygon = setPolygonMarker(marker, polygon);
            if(!inpolygon){
                alert('Please drag marker into the polygon')
            } else {
                !polygonIntersection && addArea(areaData);
                location.reload();
            }
        } else {
            type = "radius";
            areaData = {
                type,
                placeName,
                deliveryCharge,
                data: {
                    bounds: circle.getBounds()?.toJSON(),
                    center: circle.getCenter().toJSON(),
                    radius: circle.getRadius(),
                },
            };
            addArea(areaData);
            location.reload();
        }
    } else {
        alert("Please select zone or radius");
        return;
    }
}

function modifyCoordinatesLatLngToXY(coordinates) {
    let newCoordinates = [];
    coordinates.forEach((coord) => {
        let newCoord = {};
        newCoord.x = parseFloat(coord.lat);
        newCoord.y = parseFloat(coord.lng);
        newCoordinates.push(newCoord);
    });
    return newCoordinates;
}

function modifyCoordinatesXYToLatLng(coordinates) {
    let newCoordinates = [];
    coordinates.forEach((coord) => {
        let newCoord = {};
        newCoord.lat = parseFloat(coord.x);
        newCoord.lng = parseFloat(coord.y);
        newCoordinates.push(newCoord);
    });
    return newCoordinates;
}

function modifyPolygonVertices(coordinates) {
    let newCoordinates = [];
    coordinates.forEach((coord) => {
        let newCoord = {};
        newCoord.lat = parseFloat(coord.lat);
        newCoord.lng = parseFloat(coord.lng);
        newCoordinates.push(newCoord);
    });
    return newCoordinates;
}

function modifyPolygonCenter(coordinate) {
    let newCoord = {};
    newCoord.lat = parseFloat(coordinate.lat);
    newCoord.lng = parseFloat(coordinate.lng);
    return newCoord;
}

function modifyCoordinatesObjectToArray(coordinateObject) {
    let newCoordinates = [];
    coordinateObject.forEach((coord) => {
        let newCoord = [parseFloat(coord.lat), parseFloat(coord.lng)];
        newCoordinates.push(newCoord);
    });
    return newCoordinates;
}

function latLngModify(array) {
    let coords = {};
    (coords.lat = array[0]), (coords.lng = array[1]);
    return coords;
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

function checkPolygonIntersection(polygon1, polygonArray) {
    let result = false
    polygonCoordinates1 = modifyCoordinatesLatLngToXY(
        logArray(polygon1.getPath())
    );
    polygonArray.forEach(function (polygon) {
        let array = (
            intersect(modifyCoordinatesLatLngToXY(logArray(polygon.getPath())),
            polygonCoordinates1)
        );
        if(array.length > 0){
            result = array
        }   
    })
    return result
}

function setPolygonMarker(marker, polygon) {
    mPosition = {
        x: marker.getPosition().toJSON().lat,
        y: marker.getPosition().toJSON().lng
    };

    pVertices = modifyCoordinatesLatLngToXY(logArray(polygon.getPath()));
    let inPolygon = pointIsInPoly(mPosition, pVertices);

    return inPolygon;
}

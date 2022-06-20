console.log('map');

var map, infoWindow;

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
    var input = document.getElementById('searchText');
    var searchBox = new google.maps.places.SearchBox(input)

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds())
    })

    var markers = [];
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if(places.length === 0) {
            return
        }

        // markers.forEach(function(m) {m.setMap(null)})
        markers = [];
        var bounds = new google.maps.LatLngBounds()

        places.forEach(function(p) {
            if(!p.geometry)
                return

            console.log(p.geometry.location.lat(), p.geometry.location.lng());
            markers.push(
                new google.maps.Marker({
                    map,
                    title: p.name,
                    position: p.geometry.location,
                    animation: google.maps.Animation.DROP,
                })
            );

            if(p.geometry.viewport){
                bounds.union(p.geometry.viewport)
            } else {
                bounds.extends(p.geometry.location)
            }

            map.fitBounds(bounds)
        })
    });


}

function checkBox(el) {
    let id = el.id
    if(el.checked){
        createMap(id)
    }
}

    //ADDING EDITABLE POLYGONS
    // var polygonCoordinates = [
    //     { lat: a - diff, lng: b - diff },
    //     { lat: a + diff, lng: b - diff },
    //     { lat: a + diff, lng: b + diff },
    //     { lat: a - diff, lng: b + diff },
    // ];

    // var polygon = new google.maps.Polygon({
    //     map,
    //     paths: polygonCoordinates,
    //     strokeColor: "blue",
    //     fillColor: "blue",
    //     fillOpacity: 0.4,
    //     draggable: true,
    //     editable: true,
    // });
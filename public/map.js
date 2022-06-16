var map, infoWindow

function createMap () {
    var options = {
        center: { lat: 23.685, lng: 90.3563 },
        zoom: 10,
    };

    map = new google.maps.Map(document.getElementById('map'), options)

    infoWindow = new google.maps.InfoWindow;

    if(navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(p) {
            var position = {
                lat: p.coords.latitude,
                lng: p.coords.longitude
            }
            console.log(infoWindow);
            infoWindow.setPosition(position)
            infoWindow.setContent('Your location')
            infoWindow.open(map)
        }, function() {
            handleLocationError('No geolocation available', map.center())
        })
    } else {
        handleLocationError('No geolocation support available', map.center())
    }
}

function handleLocationError(content, position) {
    infoWindow.setPosition(position)
    infoWindowsetContent(content)
    infoWindow.open(map)
}
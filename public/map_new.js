console.log('map');

var map, infoWindow;

function createMap () {
    var a = 23.685,
        b = 90.3563,
        diff = 0.0033;

     var options = {
        center: {lat: a, lng: b},
        zoom: 8,
    };

    map = new google.maps.Map(document.getElementById('map'), options)
}
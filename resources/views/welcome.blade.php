<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Google Map in Laravel</title>

    
        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        <style type="text/css">
            #map {
                height: 700px;
            }
        </style>
    </head>
    
    <body>
        <div class="container mt-5">
            <h2 style="text-align: center;">Google map Laravel</h2>
            <div id="map"></div>
        </div>

        <script>
            const getPosition = () => {
                return new Promise((res, rej) => {
                    navigator.geolocation.getCurrentPosition(res, rej, {
                        enableHighAccuracy: true,
                    });
                });
            }

            const getLatLang = async () => {
                var position = await getPosition();  // wait for getPosition to complete

                console.log(
                    position
                );

                return {
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude
                }
            }

            getLatLang()
        </script>
    
        <script type="text/javascript">
            async function initMap () {
                const myLatLng = await getLatLang()

                // new map //
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 10,
                    center: {
                        lat: 23.6850,
                        lng: 90.3563
                    },
                });

                //marker //
                let marker = new google.maps.Marker({
                    position: myLatLng,
                    map,
                    icon: "https://img.icons8.com/nolan/1x/marker.png",
                    // title: "Current Location",
                    // label: "Current Location"
                });
                marker.setAnimation(google.maps.Animation.DROP)
                marker.setDraggable(true);

                //infowindow//
                let infoWindow = new google.maps.InfoWindow({
                    content: `<div style='float:left'>
                                <img src='data:image/png;base64,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'></div>
                                <div style='float:right; padding: 10px;'>
                                    <b>Title</b>
                                    <br/>
                                    123 Address
                                    <br/> 
                                    City,Country
                                </div>`
                })
                marker.addListener("mouseover", () => {
                    infoWindow.open(map, marker)
                })
                marker.addListener("mouseout", () => {
                    infoWindow.close(map, marker)
                })


                map.addListener("click", (mapsMouseEvent) => {
                    // Close the current InfoWindow.
                    infoWindow.close();

                    // Create a new InfoWindow.
                    infoWindow = new google.maps.InfoWindow({
                        position: mapsMouseEvent.latLng,
                    });
                    infoWindow.setContent(
                        JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                    );

                    infoWindow.open(map);

                    marker = new google.maps.Marker({
                        position: mapsMouseEvent.latLng,
                        map,
                        icon: "https://img.icons8.com/nolan/1x/marker.png",
                        // title: "Current Location",
                        // label: "Current Location"
                    });
                    marker.setAnimation(google.maps.Animation.DROP)
                    marker.setDraggable(true);

                    marker.addListener("mouseover", () => {
                        infoWindow.open(map, marker)
                    })
                    marker.addListener("mouseout", () => {
                        infoWindow.close(map, marker)
                    })
                });
            }
    
            window.initMap = initMap;
        </script>
    
        <script type="text/javascript"
            src="https://maps.google.com/maps/api/js?key={{ env('GOOGLE_MAP_KEY') }}&callback=initMap">
        </script>
    
    </body>
</html>
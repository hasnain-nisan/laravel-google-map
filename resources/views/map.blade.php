<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Google Map in Laravel</title>

    
        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

        <style type="text/css">
            #map {
                height: 600px;
            }
        </style>
    </head>
    
    <body>
        <div class="container align-items-center justify-content-center mt-5">
            <div class="card mt-5 mb-5">
                <div class="card-header">
                    <h2 style="text-align: center;">Google map Laravel</h2>
                </div>
                <div class="card-body">
                    <div class="form-group p-3">
                        <label for="exampleInputEmail1">Address</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name of the address">
                    </div>
                    <div id="map"></div>
                </div>
            </div>
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
                var position = await getPosition();
                return {
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude
                }
            }
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

                marker = addMarker(map, myLatLng)

                const center = myLatLng;
                // Create a bounding box with sides ~10km away from the center point
                const defaultBounds = {
                    north: center.lat + 0.1,
                    south: center.lat - 0.1,
                    east: center.lng + 0.1,
                    west: center.lng - 0.1,
                };
                const input = document.getElementById("exampleInputEmail1");
                const options = {
                    bounds: defaultBounds,
                    // componentRestrictions: { country: "us" },
                    fields: ["address_components", "geometry", "icon", "name"],
                    strictBounds: false,
                    // types: ["establishment"],
                };

                const autocomplete = new google.maps.places.Autocomplete(input, options);

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    if (!place.geometry || !place.geometry.location) {
                        // User entered the name of a Place that was not suggested and
                        // pressed the Enter key, or the Place Details request failed.
                        window.alert("No details available for input: '" + place.name + "'");
                        return;
                    }

                    // If the place has a geometry, then present it on a map.
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);
                    }

                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);
                    marker.setAnimation(google.maps.Animation.DROP)
                })

                console.log(autocomplete);
            }
    
            window.initMap = initMap;
        </script>

        <script>
            //add marker
            const addMarker = (map, location, icon) => {
                let marker = new google.maps.Marker({
                    position: location,
                    map
                });
                marker.setAnimation(google.maps.Animation.DROP)

                if(icon){
                    marker.setIcon(icon)
                }

                addInfoWindow(map, marker, marker.position.toJSON())
                return marker
            }

            //infoWindow
            const addInfoWindow = (map, marker, content) => {
                infoWindow = new google.maps.InfoWindow({
                    content: JSON.stringify(content)
                })
            }

        </script>
    
        <script type="text/javascript"
            src="https://maps.google.com/maps/api/js?key={{ env('GOOGLE_MAP_KEY_1') }}&libraries=drawing,places&callback=initMap">
        </script>
    
    </body>
</html>
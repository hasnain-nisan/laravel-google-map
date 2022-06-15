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
                var position = await getPosition();
                return {
                    lat: position.coords.latitude, 
                    lng: position.coords.longitude
                }
            }
        </script>
    
        <script type="text/javascript">
            async function initMap () {
                let markers = [];
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

                marker.addListener("mouseover", () => {
                    infoWindow.open(map, marker)
                })
                marker.addListener("mouseout", () => {
                    infoWindow.close(map, marker)
                })

                map.addListener('click', (e) => {
                    addMarker(map, e.latLng)
                })

                service = new google.maps.places.PlacesService(map);
                console.log(service);

                const request = {
                    query: "Ontik technology",
                    fields: ["name", "geometry"],
                };

                //search places
                service.findPlaceFromQuery(
                    request,
                    (res) => {
                        console.log(res[0].geometry.location.toJSON());
                        addMarker(map, res[0].geometry.location.toJSON())
                    }
                );

                //marker //
                // let marker = new google.maps.Marker({
                //     position: myLatLng,
                //     map,
                //     icon: "https://img.icons8.com/nolan/1x/marker.png",
                //     // title: "Current Location",
                //     // label: "Current Location"
                // });
                // marker.setAnimation(google.maps.Animation.DROP)
                // marker.setDraggable(true);

                // markers.push(marker);

                //infowindow//
                // let infoWindow = new google.maps.InfoWindow({
                //     content: `<div style='float:right; padding: 10px;'>
                //                     <b>Title</b>
                //                     <br/>
                //                     123 Address
                //                     <br/> 
                //                     City,Country
                //                 </div>`
                // })
                // marker.addListener("mouseover", () => {
                //     infoWindow.open(map, marker)
                // })
                // marker.addListener("mouseout", () => {
                //     infoWindow.close(map, marker)
                // })


                // map.addListener("click", (mapsMouseEvent) => {
                //     console.log(mapsMouseEvent.latLng.toJSON());

                //     marker = new google.maps.Marker({
                //         position: mapsMouseEvent.latLng,
                //         map,
                //         icon: "https://img.icons8.com/nolan/1x/marker.png",
                //         // title: "Current Location",
                //         // label: "Current Location"
                //     });
                //     marker.setAnimation(google.maps.Animation.DROP)
                //     marker.setDraggable(true);

                //     markers.push(marker);

                //     markers.forEach(marker => {
                //         marker.position.toJSON()

                //         infoWindow = new google.maps.InfoWindow({
                //             content: `<div padding: 5px;'>
                //                             <b>Lat: ${marker.position.toJSON().lat}
                //                             </b>
                //                             <br/>
                //                             <b>lng: ${marker.position.toJSON().lng}
                //                             </b>
                //                         </div>`
                //         })

                //         marker.addListener("mouseover", () => {
                //             infoWindow.open(map, marker)
                //         })
                //         marker.addListener("mouseout", () => {
                //             infoWindow.close(map, marker)
                //         })
                //     });
                // });


                //ADD MARKER TO THE MAP

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
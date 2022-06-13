<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Google Map in Laravel</title>

    
        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        <style type="text/css">
            #map {
                height: 400px;
            }
        </style>
    </head>
    
    <body>
        <div class="container mt-5">
            <h2 style="text-align: center;">Google map Laravel</h2>
            <div id="map"></div>
        </div>

        <script>

        //     const getPosition = () => {
        //         return new Promise((res, rej) => {
        //             navigator.geolocation.getCurrentPosition(res, rej, {
        //                 enableHighAccuracy: true,
        //             });
        //         });
        //     }

        //     const getLatLang = async () => {
        //         var position = await getPosition();  // wait for getPosition to complete

        //         console.log(
        //             position
        //         );

        //         return {
        //             lat: position.coords.latitude, 
        //             lng: position.coords.longitude
        //         }
        //     }

        //     getLatLang()
        // </script>
    
        <script type="text/javascript">
            async function initMap () {
                // const myLatLng = await getLatLang()
                const myLatLng = {
                    lat: 23.786066851485757, 
                    lng: 90.41650662845164
                }

                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 5,
                    center: myLatLng,
                });
    
                new google.maps.Marker({
                    position: myLatLng,
                    map,
                    title: "Hello Rajkot!",
                });
            }
    
            window.initMap = initMap;
        </script>
    
        <script type="text/javascript"
            src="https://maps.google.com/maps/api/js?key={{ env('GOOGLE_MAP_KEY') }}&callback=initMap">
        </script>
    
    </body>
</html>
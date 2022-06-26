<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Google Map in Laravel</title>

    
        <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

        {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/wicket/1.3.8/wicket.min.js" integrity="sha512-aaiN+QIXD0N9Id865vSDEfttZJV9v8ZGh7jXMnYI2zbZhkSYOulS4IH0u4pC61/KXT20UedYzL5xi5siIg6mlw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> --}}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jsts/2.9.0/jsts.min.js" integrity="sha512-XrQsFgFkIrrXvkt2Kh3ePU/f5rfAA2ftGwL16/qs702F1wgF4mlRiJhXimkTSVVw/u89iQpUMoslwMczq8Hjmg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <style type="text/css">
            #map {
                height: 600px;
            }
        </style>
    </head>
    
    <body>
        <div class="container align-items-center justify-content-center mt-5">
            <div class="mb-5">
                <div class="form-group">
                    <input type="text" class="my-3 form-control" id="searchText" placeholder="Enter the location...">
                </div>
                <div class="form-group">
                    <input type="text" class="my-3 form-control" id="deliveryCharge" placeholder="Enter the charge...">
                </div>
                <div class="col-12" id="zoneDiv">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="zone">
                        <label class="form-check-label" for="zone">Zone</label>
                    </div>
                </div>
                <div class="col-12" id="radiusDiv">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="radius">
                        <label class="form-check-label" for="radius">Radius</label>
                    </div>
                    {{-- <input type="number" name="" id=""> --}}
                </div>
                <button class="btn btn-primary mt-3" onclick="submit()">Submit</button>
            </div>
            <div id="map"></div>
        </div>

        <script src="{{ asset('polygon_intersect.js') }}"></script>

        <script>
            let areas =  @json($areas)
            
            const addArea = (data) => {
                $.ajax({
                    type: "POST",
                    url: "{{ route('add-area') }}",
                    data: {
                        "_token": "{{ csrf_token() }}",
                        data,
                    },
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (e) {
                        console.log({
                            msg: e.responseJSON.message,
                             line: e.responseJSON.line
                        });
                    },
                });
            };

            function getCoordinateDetails (position){
                url =
                    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    position.lat + "," + position.lng +
                    "&sensor=true&key={{ env('GOOGLE_MAP_KEY_1') }}";
                $.ajax({
                    type: "GET",
                    url,
                    success: function (res) {
                        let address = ""
                        for (let index = 1; index < res.results[0].address_components.length; index++) {
                            address += res.results[0].address_components[index].long_name
                            address += ", "
                            
                        }
                        document.getElementById('searchText').value = address
                    },
                    error: function (e) {
                        console.log({
                            msg: e.responseJSON.message,
                            line: e.responseJSON.line,
                        });
                    },
                });
            }
        </script>

        <script src="{{ asset('map_new.js') }}"></script>
    
        <script type="text/javascript"
            src="https://maps.google.com/maps/api/js?key={{ env('GOOGLE_MAP_KEY_1') }}&libraries=drawing,places&callback=createMap">
        </script>
    </body>
</html>
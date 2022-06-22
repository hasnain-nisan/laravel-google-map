<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Delivery areas</title>

    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <h1 class="text-center">Delivery areas</h1>
        </div>
        <div class="row">
            <a href="{{ route('map') }}" class="btn btn-primary">Add Delivery Area</a>
        </div>
        <table class="table table-bordered mt-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">charge</th>
                    <th scope="col">type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                @php $x = 0; @endphp
                @foreach ($areas as $area)
                    <tr>
                        <td>{{ $x++ }}</td>
                        <td>{{ $area->name }}</td>
                        <td>{{ $area->delivery_charge }}</td>
                        <td>{{ $area->type }}</td>
                        <td>action</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
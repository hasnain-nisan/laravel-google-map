<?php

namespace App\Http\Controllers;

use App\Models\DeliveryArea;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function map()
    {
        $areas = DeliveryArea::all();
        return view('google-map');
    }

    public function addArea(Request $request)
    {
        return $request;
    }
}

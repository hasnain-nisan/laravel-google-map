<?php

namespace App\Http\Controllers;

use App\Models\DeliveryArea;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function index()
    {
        $areas = DeliveryArea::all();
        return view('home', compact('areas'));
    }

    public function map()
    {
        $areas = DeliveryArea::find(2);
        return view('google-map', compact('areas'));
    }

    public function addArea(Request $request)
    {
        $deliveryCharge = $request->data['deliveryCharge'];
        $name = $request->data['placeName'];
        $type = $request->data['type'];
        $data = $request->data['data'];

        $area = new DeliveryArea();
        $area->name = $name;
        $area->delivery_charge = $deliveryCharge;
        $area->type = $type;
        $area->data = json_encode($data);
        $area->save();

        return redirect()->back();
    }
}

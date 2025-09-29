import { useMapEvents } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPolygonPosition } from "../redux/features/polygonSlice";
import { ModeContext } from "../contexts/modeContext";
import { editMode } from "../contstants";
import { addMarker } from "../redux/features/markersSlice";

export function LocationMarker({onPositionClicked,onMarkerPositionClicked}) {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch()
  const modeContext = useContext(ModeContext);
 

  // Listen to clicks on the map
  useMapEvents({
    click(e) {
     // setPosition(e.latlng); // latlng has {lat, lng}
      console.log("Clicked at:", e.latlng);
      if(modeContext === editMode.EDIT_POLIGONS){
      onPositionClicked(e.latlng)
      dispatch(addPolygonPosition(e.latlng))
      }
        if(modeContext === editMode.EDIT_MARKERS){
     // onPositionClicked(e.latlng)
     
      dispatch(addMarker(e.latlng))
      }
    },
  });

  return position ? (
    <div style={{ position: "absolute", top: 10, left: 10, background: "white", padding: "5px" }}>
      Lat: {position.lat.toFixed(5)}, Lng: {position.lng.toFixed(5)}
    </div>
  ) : null;
}
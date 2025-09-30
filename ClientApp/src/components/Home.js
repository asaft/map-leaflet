import React,{useEffect, useRef, useState} from "react";
import { MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map } from "./map";
import MapReact from "./MapReact";
import { PolygonSection } from "./PolygonSection";
import { ModeContext } from "../contexts/modeContext";
import { editMode as editModeConstant } from "../contstants";
import { MarkerSection } from "./MarkerSection";
import { ObjectsTable } from "./objectsTable";

// Fix default marker icon (otherwise it might not show up in some setups)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export  function Home() {

const [editMode ,setEditMode] = useState(editModeConstant.NONE);


 

  return (<ModeContext.Provider value={editMode}><div style={{display:"flex",flexDirection:'row'}}>
    <div style={{flex:1}}>
    <MapReact />
  </div>
  <div style={{flex:1}}>
    <PolygonSection title="poligon" onAddClicked={setEditMode} />
    <MarkerSection title={'marker'}   onAddClicked={setEditMode}/>
    <ObjectsTable />
  </div>
  </div></ModeContext.Provider> );
}

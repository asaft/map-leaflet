import React,{useEffect, useRef} from "react";
import { MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon (otherwise it might not show up in some setups)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export  function Map() {
  const mapRef = useRef();
  useEffect(()=>{
    mapRef.current =  L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo( mapRef.current );
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mapRef.current);

var polygon2 = L.polygon([
    [51.509, -0.12],
    [51.503, -0.26],
    [51.51, -0.047]
]).addTo(mapRef.current);
polygon.addEventListener('click',(e,r)=>{
    e.originalEvent.stopPropagation()
       console.log( e.sourceTarget._latlngs)
})
polygon2.addEventListener('click',(e,r)=>{
    e.originalEvent.stopPropagation()
       console.log( e.sourceTarget._latlngs)
})




mapRef.current.on('click', onMapClick);
  },[])
  const onMapClick = (e)=> {
    alert("You clicked the map at " + e.latlng);
}
  return ( <div id="map" ref={mapRef}></div>);
}

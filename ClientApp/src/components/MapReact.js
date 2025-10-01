//import "./styles.css";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup,Polygon } from "react-leaflet";

import { Icon, divIcon, point } from "leaflet";
import {  useEffect, useState } from "react";
import { LocationMarker } from "./LocationMarker";
import { addPolygonToDelete, getAllPolygons, removePolygonToDelete, setPoligons } from "../redux/features/polygonSlice";
import { getAllMarkers, setMarkerId } from "../redux/features/markersSlice";
import { PolygonsUtil } from "../utils/polygonsUtil";
import { MarkersUtil } from "../utils/markersUtil";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};



export default function MapReact({editMode}) {
   
    const [markers, setMarkers] = useState([]);
    const [polygons ,setPolygons]= useState([])
    const [polygonsToDelete ,setPolygonsToDelete]= useState([])
   
    
     const savedPolygons = useSelector(state=>state.polygon.list);
     const newPolygon = useSelector(state=>state.polygon.newPolygon)
     const newMarkers = useSelector(state=>state.marker.newMarkers)
     const savedMarkers = useSelector(state=>state.marker.list)
    
     const dispatch = useDispatch();

     useEffect(()=>{
      dispatch(getAllPolygons())
      dispatch(getAllMarkers())
     },[])

     useEffect(()=>{
     
        const convertedArr = PolygonsUtil.convertToLeatletPolygons(savedPolygons)
        if(convertedArr.length > 0){
          setPolygons(convertedArr)
        }
        setPolygonsToDelete([]);

     },[savedPolygons])

     useEffect(()=>{
      const mrkrs = MarkersUtil.convertToLeafletMarkers(savedMarkers);
      if(mrkrs.length > 0)
      setMarkers([...mrkrs])
     },[savedMarkers])

     useEffect(()=>{
      if(newMarkers && newMarkers.length >0){
        const geocodes = newMarkers.map(m=>{return {geocode:[m.latitude,m.longitude],popUp:''}})
      setMarkers([...markers,...geocodes])
      }
     },[newMarkers])
    
     
    
     
     const onPolygonToDeleteClicked = (index,id) =>{
      setPolygonsToDelete([...polygonsToDelete, polygons[index]])
      setPoligons(polygons.filter((p,i)=>i !== index)) 
      dispatch(addPolygonToDelete(id))
     }
     const onPolygonToUndeleteClicked = (index,id) =>{
     setPoligons([...polygons, polygonsToDelete[index]])
      setPolygonsToDelete(polygonsToDelete.filter((p,i)=>i !== index))
      dispatch(removePolygonToDelete(id)) 
     }
   
    

    

  return (<>
  
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* WATERCOLOR CUSTOM TILES */}
      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
      {/* GOOGLE MAPS TILES */}
      {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}

      {/* <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      > */}
        {/* Mapping through the markers */}
        {markers.map((marker,i) => (
          <Marker position={marker.geocode} key={i} icon={customIcon} eventHandlers={{
            click:(e)=>{
              const id = markers[i].id
              dispatch(setMarkerId(id))
              }
          }} >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      <Polygon positions={newPolygon && newPolygon.length > 0 ? newPolygon : []} color="red" />
        {polygons.map((p,i)=>(<Polygon key={i} positions={p.positions} color={'blue'} eventHandlers={{
        click: (e) => {
          onPolygonToDeleteClicked(i,polygons[i].id);
          
        },
      }}/>))}
       {polygonsToDelete.map((p,i)=>(<Polygon key={i} positions={p.positions} color={'orange'} eventHandlers={{
        click: (e) => {
          onPolygonToUndeleteClicked(i,polygonsToDelete[i].id);
          
        },
      }}/>))}
        {/* <Polygon positions={[]} /> */}

        {/* Hard coded markers */}
        {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
       */}
      {/* </MarkerClusterGroup> */}
      <LocationMarker onPositionClicked={()=>{}} />
    </MapContainer></>
  );
}

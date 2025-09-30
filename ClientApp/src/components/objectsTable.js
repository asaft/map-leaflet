import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export const ObjectsTable = ()=>{

    const savedMarkers = useSelector(state=>state.marker.list)

   const getTableRows = () =>{
    if(savedMarkers && savedMarkers.length > 0){
        return savedMarkers.map(m=>(<tr>
            <td>{m.name}</td>
            <td>{m.latitude}</td>
            <td>{m.longitude}</td>
        </tr>))
    }
   }

    return(<table class="table">
  <thead>
    <tr>
  
      <th scope="col">Object</th>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
    </tr>
  </thead>
  <tbody>
    {getTableRows()}
    </tbody>
    </table>)
}

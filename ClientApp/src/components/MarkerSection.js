import { useSelector, useDispatch } from "react-redux";
import { saveMarker } from "../redux/features/markersSlice";
import { editMode } from "../contstants";


export function MarkerSection({title,onAddClicked}){
    const newMarkers = useSelector((state) => state.marker.newMarkers);
  const dispatch = useDispatch();
const onSaveClicked = ()=>{
  dispatch(saveMarker(newMarkers))
}
    return(<>
    <div>{title}</div>
    <button className="btn btn-primary" onClick={() =>{onAddClicked(editMode.EDIT_MARKERS)}}>Add</button>
    <button className="btn btn-primary" onClick={()=>{}}>Delete</button>
    <button className="btn btn-primary" onClick={onSaveClicked}>Save</button>

    </>)
}
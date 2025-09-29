import { useSelector, useDispatch } from "react-redux";
import { saveMarker } from "../redux/features/markersSlice";
import { editMode } from "../contstants";


export function MarkerSection({title,onAddClicked}){
    const polygon = useSelector((state) => state.marker.newMarker);
  const dispatch = useDispatch();
const onSaveClicked = ()=>{
  dispatch(saveMarker(polygon))
}
    return(<>
    <div>{title}</div>
    <button className="btn btn-primary" onClick={() =>{onAddClicked(editMode.EDIT_MARKERS)}}>Add</button>
    <button className="btn btn-primary" onClick={()=>{}}>Delete</button>
    <button className="btn btn-primary" onClick={onSaveClicked}>Save</button>

    </>)
}
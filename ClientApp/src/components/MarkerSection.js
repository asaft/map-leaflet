import { useSelector, useDispatch } from "react-redux";
import { saveMarker ,deleteMarker} from "../redux/features/markersSlice";
import { editMode } from "../contstants";


export function MarkerSection({title,onAddClicked}){
    const {newMarkers,markerId} = useSelector((state) => state.marker);
  const dispatch = useDispatch();
const onSaveClicked = ()=>{
  dispatch(saveMarker(newMarkers))
}
const onDeleteClicked = ()=>{
  dispatch(deleteMarker(markerId))
}
    return(<>
    <div>{title}</div>
    <button className="btn btn-primary" onClick={() =>{onAddClicked(editMode.EDIT_MARKERS)}}>Add</button>
    <button className="btn btn-primary" onClick={onDeleteClicked}>Delete</button>
    <button className="btn btn-primary" onClick={onSaveClicked}>Save</button>

    </>)
}
import { useSelector, useDispatch } from "react-redux";
import { saveMarker ,deleteMarker} from "../redux/features/markersSlice";
import { editModeConstants  } from "../contstants";


export function MarkerSection({title,onAddClicked,editMode}){
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
    <button className="btn btn-primary" onClick={() =>{onAddClicked(editMode !== editModeConstants.EDIT_MARKERS ? editModeConstants.EDIT_MARKERS : editModeConstants.NONE)}}>{editMode === editModeConstants.EDIT_MARKERS ? 'Close' :  'Add'}</button>
    <button className="btn btn-primary" onClick={onDeleteClicked}>Delete</button>
    <button className="btn btn-primary" onClick={onSaveClicked}>Save</button>

    </>)
}
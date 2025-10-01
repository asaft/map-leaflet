import { useSelector, useDispatch } from "react-redux";
import { savePolygon ,deletePolygons} from "../redux/features/polygonSlice";
import { editModeConstants } from "../contstants";


export function PolygonSection({title,onAddClicked,editMode}){
const {newPolygon,poligonsToDelete} = useSelector((state) => state.polygon);
const dispatch = useDispatch();

const onSaveClicked = ()=>{
  dispatch(savePolygon(newPolygon))
}

const onDeleteClicked = ()=>{
  dispatch(deletePolygons(poligonsToDelete))
}
    return(<>
    <div>{title}</div>
    <button className="btn btn-primary" onClick={() =>{onAddClicked(editMode !== editModeConstants.EDIT_POLIGONS ? editModeConstants.EDIT_POLIGONS : editModeConstants.NONE)}}>{editMode === editModeConstants.EDIT_POLIGONS ? 'Close' : 'Add'}</button>
    <button className="btn btn-primary" onClick={onDeleteClicked}>Delete</button>
    <button className="btn btn-primary" onClick={onSaveClicked}>Save</button>

    </>)
}
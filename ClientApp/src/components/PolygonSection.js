import { useSelector, useDispatch } from "react-redux";
import { savePolygon } from "../redux/features/polygonSlice";
import { editMode } from "../contstants";


export function PolygonSection({title,onAddClicked}){
    const polygon = useSelector((state) => state.polygon.newPolygon);
  const dispatch = useDispatch();
const onSaveClicked = ()=>{
  dispatch(savePolygon(polygon))
}
    return(<>
    <div>{title}</div>
    <button className="btn btn-primary" onClick={() =>{onAddClicked(editMode.EDIT_POLIGONS)}}>Add</button>
    <button className="btn btn-primary" onClick={()=>{}}>Delete</button>
    <button className="btn btn-primary" onClick={onSaveClicked}>Save</button>

    </>)
}
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstancs";

const axios = axiosInstance.getInstance();

export const getAllPolygons = createAsyncThunk('get/pligons',async ()=>{
    
  const response = await axios.get("/api/polygons");
  return response.data; // This becomes the payload
})
export const savePolygon = createAsyncThunk("post/polygons", async (polygon) => {
  const positions = polygon.map(p =>{
    return {
      latitude:p[0],
      longitude:p[1]
    }
  })
  const response = await axios.post("/api/polygons",{positions});
  return response.data; // This becomes the payload
});


const polygonSlice = createSlice({
  name: "counter",
  initialState: { 
    loading:false,
    error:false,
    list:[ ],newPolygon:[],poligonsToDelete:[]},
  reducers: {
  
    addPolygonPosition: (state, action) => {
      state.newPolygon.push([action.payload.lat,action.payload.lng]);
    },
     setPoligons: (state, action) => {
      state.list = action.payload
    },addPolygonToDelete:(state, action)=>{
      state.poligonsToDelete.push(action.payload);
    },removePolygonToDelete:(state, action)=>{
      state.poligonsToDelete = state.poligonsToDelete.filter((pId)=> pId !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePolygon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePolygon.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(savePolygon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
        .addCase(getAllPolygons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPolygons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllPolygons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addPolygonPosition,setPoligons , addPolygonToDelete,removePolygonToDelete} = polygonSlice.actions;
export default polygonSlice.reducer;

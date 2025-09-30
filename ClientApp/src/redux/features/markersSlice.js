import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstancs";

const axios = axiosInstance.getInstance();

export const getAllMarkers = createAsyncThunk('get/markers',async ()=>{
    
  const response = await axios.get("/api/markers/get");
  return response.data; // This becomes the payload
})
export const saveMarker = createAsyncThunk("post/markers", async (markers) => {
  
  const response = await axios.post("/api/markers/postbulk",markers);
  return response.data; // This becomes the payload
});
export const deleteMarker = createAsyncThunk("delete/markers", async (id) => {
  
  const response = await axios.delete("/api/markers/delete/"+ id);
  return response.data; // This becomes the payload
});


const markersSlice = createSlice({
  name: "counter",
  initialState: { 
    loading:false,
    error:false,
    list:[],
    markerId:null,
    newMarkers:[]},
  reducers: {
    setMarkerId:(state,action)=>{
      state.markerId = action.payload;
    },
    addMarker: (state, action) => {
      state.newMarkers = [...state.newMarkers,{latitude:action.payload.lat,longitude:action.payload.lng,name:"marker"}];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMarker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveMarker.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(saveMarker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
        .addCase(getAllMarkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMarkers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllMarkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(deleteMarker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMarker.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(m => m.id !== action.payload);
      })
      .addCase(deleteMarker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addMarker,setMarkerId } = markersSlice.actions;
export default markersSlice.reducer;

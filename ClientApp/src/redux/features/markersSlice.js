import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axiosInstancs";

const axios = axiosInstance.getInstance();

export const getAllMarkers = createAsyncThunk('get/markers',async ()=>{
    
  const response = await axios.get("/api/polygons");
  return response.data; // This becomes the payload
})
export const saveMarker = createAsyncThunk("post/markers", async ({latitude,longitude}) => {
  
  const response = await axios.post("/api/markers",{latitude,longitude});
  return response.data; // This becomes the payload
});


const markersSlice = createSlice({
  name: "counter",
  initialState: { 
    loading:false,
    error:false,
    list:[],
    newMarkers:[]},
  reducers: {
  
    addMarker: (state, action) => {
      state.newMarkers = [...state.newMarkers,{latitude:action.payload.lat,longitude:action.payload.lng}];
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
      });
  }
});

export const { addMarker } = markersSlice.actions;
export default markersSlice.reducer;

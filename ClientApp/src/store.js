import { configureStore } from "@reduxjs/toolkit";
import polygonSlice from "./redux/features/polygonSlice";
import markerSlice from "./redux/features/markersSlice"

export const store = configureStore({
  reducer: {
    polygon: polygonSlice,
    marker:markerSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

});
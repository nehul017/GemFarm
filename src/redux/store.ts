import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import farmReducer from "./slices/farmSlice";
import containerReducer from "./slices/containerSlice";
import uploadReducer from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    farm: farmReducer,
    container: containerReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

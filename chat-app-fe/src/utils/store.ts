import { configureStore, createSlice,PayloadAction } from "@reduxjs/toolkit";

// Create a slice (reducers + actions)
const requestType = createSlice({
  name: "request",
  initialState: { value: "create" },
  reducers: {
    setRequest: (state, action) => { state.value = action.payload; },
  }
});




// Export actions
export const { setRequest } = requestType.actions;

// Create store
const store = configureStore({
  reducer: {
    request: requestType.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

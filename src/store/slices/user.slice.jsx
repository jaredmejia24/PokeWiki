import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const userSlice = createSlice({
  name: "user",
  initialState: {userName: ''},
  reducers: {
    changeUserName: (state, action) =>{
      state.userName = action.payload;
    }
  },
});

export const {changeUserName} = userSlice.actions;

export default userSlice.reducer;

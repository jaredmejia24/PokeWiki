import { createSlice } from "@reduxjs/toolkit";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const itemsPerPageSlice = createSlice({
  name: "itemsPerPage",
  initialState: 12,
  reducers: {
    changeItems: (state, action) =>{
      return action.payload;
    }
  },
});

export const {changeItems} = itemsPerPageSlice.actions;

export default itemsPerPageSlice.reducer;

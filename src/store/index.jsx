import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user.slice";
import backgroundColorsSlice from "./slices/backgroundColors.slice";
import itemsPerPageSlice from "./slices/itemsPerPage.slice";

export default configureStore({
  reducer: {
    user: user,
    backgroundColors: backgroundColorsSlice,
    itemsPerPage: itemsPerPageSlice
  },
});

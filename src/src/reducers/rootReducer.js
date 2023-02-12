import { combineReducers } from "redux";
import navbarSlice from "./NavbarReducer";

const rootReducer = combineReducers({
  flipNavbar: navbarSlice,
});

export default rootReducer;
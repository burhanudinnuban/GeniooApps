import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  profile: profileReducer,
});

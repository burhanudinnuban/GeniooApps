import {
  SHOW_HIDE_PROFILE,
  SHOW_HIDE_LOGIN,
  FETCH_PROFILE_DATA,
  LOGOUT_PROFILE,
  LOGIN_FROM_CART,
} from "../actions/types";

const initialState = {
  showLogin: true,
  showProfile: false,
  dataProfile: [],
  id_user: '',
  loginFromCart:0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_DATA:
      if (action.payload[0] == false) {
        return {
          dataProfile: action.payload[0],
          id_user: '',
        };
      }
      else {
        return {
          dataProfile: action.payload[0],
          id_user: action.payload[0][0].id_konsumen,
        };
      }

    case SHOW_HIDE_PROFILE:
      return {
        showLogin: false,
        showProfile: true,
      };
    case SHOW_HIDE_LOGIN:
      return {
        showLogin: true,
        showProfile: false,
      };
    case LOGOUT_PROFILE:
      return {
        dataProfile: [],
        id_user: '',
      };
    case LOGIN_FROM_CART:
      return {
        loginFromCart: action.payload
      };  

    default:
      return state;
  }
}

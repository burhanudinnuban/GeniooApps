import {
  SHOW_HIDE_PROFILE,
  SHOW_HIDE_LOGIN,
  FETCH_PROFILE_DATA,
  LOGOUT_PROFILE,
  LOGIN_FROM_CART,
} from "./types";

export const showHideProfile = () => {
  return {
    type: SHOW_HIDE_PROFILE,
  };
};

export const showHideLogin = () => {
  return {
    type: SHOW_HIDE_LOGIN,
  };
};

export const loginFromCart = (data) => {
  return {
    type: LOGIN_FROM_CART,
    payload: data
  };
};

export const logoutProfileData = profileData => {
  return {
    type: LOGOUT_PROFILE,
    payload: profileData,
  };
};

export const setProfileData = profileData => {
  return {
    type: FETCH_PROFILE_DATA,
    payload: profileData,
  };
};

export const fetchProfileData = buyerid => {
  return async dispatch => {
    try {
      const profileItemsData = await fetch("https://genio.co.id/geniooapi/api/authentication/buyer/user/detail?id_konsumen=" + buyerid, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
      ).then(response => {
        return response.json();
      });
      // console.log('\n cartInfoData of CartActions:' + JSON.stringify(cartInfoData));

      // jika, cartnya tidak kosong maka diisi produknya

      const profileData = [profileItemsData];

      dispatch(setProfileData(profileData));


    } catch (error) {
      console.error(error);
    }
  };
};


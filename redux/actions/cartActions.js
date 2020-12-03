import {
  ADD_TO_CART,
  ADD_TO_CART_UNLOGIN,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_UNLOGIN,
  EMPTY_CART,
  EMPTY_CART_UNLOGIN,
  UPDATE_ITEM_TO_CART,
  UPDATE_ITEM_TO_CART_UNLOGIN,
  CHECKED_ITEM_TO_PAY,
  UNCHECKED_ITEM_TO_PAY,
  FETCH_CART_DATA,
  FETCH_CART_DATA_UNLOGIN,
  LOGOUT_CART,
  SET_INFO_COST,
  SET_INFO_CITY,
  SET_INFO_PROVINCE,
  ADD_TO_CHECKOUT,
  SET_KURIR,
  IS_LOADING,
  TOTAL_COST
} from "./types";
import store from "../store";
import AsyncStorage from "@react-native-community/async-storage";

export const setTotalCost = item => dispatch => {
  dispatch({
    type: TOTAL_COST,
    payload: item,
  });
};

export const addToCartUnlogin = item => dispatch => {
  dispatch({
    type: ADD_TO_CART_UNLOGIN,
    payload: item,
  });
};

export const addToCart = item => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
};

export const addToCartData = data => {
  return async dispatch => {
    const reducer = store.getState().cart;
    try {
      const totalquantity = parseInt(reducer.itemsQty) + parseInt(data.qtyy);
      const totalharga = parseInt(reducer.total) + parseInt(data.sellprice);
      const id_user = await AsyncStorage.getItem("id_konsumen");
      const cartItemsData = await fetch(`https://genio.co.id/geniooapi/api/Cartitems/add_cart`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            id_user: id_user,
            buyerid: reducer.buyerid,
            cartid: reducer.cartid,
            productid: data.idproduct,
            qty: data.qtyy,
            totalqty: totalquantity,
            totalprice: totalharga
          }),
        }
      ).then(response => {
        return response.json();
      });
      console.log("rsp", cartItemsData)
      const cartData = [cartItemsData];
      dispatch(addToCart(cartData));

    } catch (error) {
      console.error(error);
    }
  };
};

export const mergeCartData = data => {
  return async dispatch => {
    const reducer = store.getState().cart;
    console.log("Data merge : ", data)
    const hasil = JSON.stringify(data);
    try {
      const id_user = await AsyncStorage.getItem("id_konsumen");
      const cartItemsData = await fetch(`https://genio.co.id/geniooapi/api/Cartitems/merge_cart`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            id_user: id_user,
            array: hasil,
            totalprice: reducer.total,
            totalqty: reducer.itemsQty
          }),
        }
      ).then(response => {
        return response.json();
      });

      const cartData = [cartItemsData];
      dispatch(setCartData(cartData));

    } catch (error) {
      console.error(error);
    }
  };
};

export const setKurir = item => dispatch => {
  dispatch({
    type: SET_KURIR,
    payload: item,
  });
};

export const deleteItemUnlogin = item => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART_UNLOGIN,
    payload: item,
  });
};

export const deleteItem = item => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item,
  });
};

export const deleteItemData = data => {
  return async dispatch => {
    const reducer = store.getState().cart;
    try {
      const totalquantity = parseInt(reducer.itemsQty) - 1;
      const totalharga = parseInt(reducer.total) - parseInt(data.sellprice);
      const quantity = parseInt(data.qty) - 1
      const id_user = await AsyncStorage.getItem("id_konsumen");
      const cartItemsData = await fetch(`https://genio.co.id/geniooapi/api/Cartitems/update_item`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            id_user: id_user,
            buyerid: reducer.cart[0].buyerid,
            cartid: reducer.cart[0].cartid,
            productid: data.idproduct,
            qty: quantity,
            totalqty: totalquantity,
            totalprice: totalharga
          }),
        }
      ).then(response => {
        return response.json();
      });

      const index = cartItemsData.findIndex(item => item.idproduct == data.idproduct);
      const cartData = [cartItemsData[index]];
      dispatch(deleteItem(cartData));

    } catch (error) {
      console.error(error);
    }
  };
};

export const removeItemUnlogin = item => dispatch => {
  dispatch({
    type: EMPTY_CART_UNLOGIN,
    payload: item,
  });
};

export const removeItem = item => dispatch => {
  dispatch({
    type: EMPTY_CART,
    payload: item,
  });
};

export const removeItemData = data => {
  return async dispatch => {
    const reducer = store.getState().cart;
    try {

      const totalquantity = parseInt(reducer.itemsQty) - 1;
      const totalharga = parseInt(reducer.total) - parseInt(data.sellprice);
      const quantity = parseInt(data.qty) - 1
      const cartItemsData = await fetch(`https://genio.co.id/geniooapi/api/Cartitems/delete_item`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            buyerid: reducer.cart[0].buyerid,
            cartid: reducer.cart[0].cartid,
            productid: data.idproduct,
            qty: quantity,
            totalqty: totalquantity,
            totalprice: totalharga
          }),
        }
      ).then(response => {
        return response.json();
      });

      //const index = cartItemsData.findIndex(item => item.idproduct == data.idproduct);
      const cartData = [data];
      dispatch(emptyCart(cartData));

    } catch (error) {
      console.error(error);
    }
  };
};

export const emptyCartUnlogin = item => dispatch => {
  dispatch({
    type: EMPTY_CART_UNLOGIN,
    payload: item,
  });
};

export const emptyCart = item => dispatch => {
  dispatch({
    type: EMPTY_CART,
    payload: item,
  });
};

export const emptyCartData = data => {
  return async dispatch => {
    const reducer = store.getState().cart;
    try {
      const totalquantity = parseInt(reducer.itemsQty) - parseInt(data.qty);
      const totalharga = parseInt(reducer.total) - parseInt(data.sellprice) * parseInt(data.qty);
      const quantity = parseInt(data.qty) - 1
      const cartItemsData = await fetch(`https://genio.co.id/geniooapi/api/Cartitems/delete_item`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            buyerid: reducer.cart[0].buyerid,
            cartid: reducer.cart[0].cartid,
            productid: data.idproduct,
            qty: quantity,
            totalqty: totalquantity,
            totalprice: totalharga
          }),
        }
      ).then(response => {
        return response.json();
      });

      //const index = cartItemsData.findIndex(item => item.idproduct == data.idproduct);
      const cartData = [data];
      dispatch(emptyCart(cartData));

    } catch (error) {
      console.error(error);
    }
  };
};

export const updateItemToCartUnlogin = upItem => {
  return {
    type: UPDATE_ITEM_TO_CART_UNLOGIN,
    payload: upItem,
  };
};

export const updateItemToCart = upItem => {
  return {
    type: UPDATE_ITEM_TO_CART,
    payload: upItem,
  };
};

export const updateItemToCartData = data => {
  return async dispatch => {
    const reducer = store.getState().cart;
    try {

      const totalquantity = parseInt(reducer.itemsQty) + 1;
      const totalharga = parseInt(reducer.total) + parseInt(data.sellprice);
      const quantity = parseInt(data.qty) + 1
      const cartItemsData = await fetch(`https://genio.co.id/geniooapi/api/Cartitems/update_item`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            buyerid: reducer.cart[0].buyerid,
            cartid: reducer.cart[0].cartid,
            productid: data.idproduct,
            qty: quantity,
            totalqty: totalquantity,
            totalprice: totalharga
          }),
        }
      ).then(response => {
        return response.json();
      });
      // console.log('\n cartInfoData of CartActions:' + JSON.stringify(cartInfoData));
      // jika, cartnya tidak kosong maka diisi produknya

      const index = cartItemsData.findIndex(item => item.idproduct == data.idproduct);
      const cartData = [cartItemsData[index]];
      dispatch(updateItemToCart(cartData));

    } catch (error) {
      console.error(error);
    }
  };
};

export const updateItemToPay = upItem => {
  return {
    type: CHECKED_ITEM_TO_PAY,
    payload: upItem,
  };
};

export const checkedItemToPayData = upItem => {
  return {
    type: CHECKED_ITEM_TO_PAY,
    payload: upItem,
  };
};

export const uncheckedItemToPayData = upItem => {
  return {
    type: UNCHECKED_ITEM_TO_PAY,
    payload: upItem,
  };
};


export const logoutCartData = cartData => {
  return {
    type: LOGOUT_CART,
    payload: cartData,
  };
};

export const setCartData = cartData => {
  return {
    type: FETCH_CART_DATA,
    payload: cartData,
  };
};

export const fetchCartDataUnlogin = cartData => {
  return {
    type: FETCH_CART_DATA_UNLOGIN,
    payload: cartData,
  };
};

export const addDataCheckout = item => {
  console.log("test", { item });
  return {
    type: ADD_TO_CHECKOUT,
    payload: item,
  };
};

export const fetchCartData = buyerid => {
  return async dispatch => {
    try {
      const cartItemsData = await fetch("https://genio.co.id/geniooapi/api/Cartitems/detail_cartitems?buyerid=" + buyerid, {
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

      const cartData = [cartItemsData];

      dispatch(setCartData(cartData));


    } catch (error) {
      console.error(error);
    }
  };
};

export const setInfoCost = item => {
  return {
    type: SET_INFO_COST,
    payload: item,
  };
};

export const setInfoCity = item => {
  return {
    type: SET_INFO_CITY,
    payload: item,
  };
};

export const setInfoProvince = item => {
  AsyncStorage.setItem("dataCity", item);
  return {
    type: SET_INFO_PROVINCE,
    payload: item,
  };
};

export const setIsLoading = item => {
  return {
    type: IS_LOADING,
    payload: item,
  };
};

export const fetchCost = item => {
  return async dispatch => {
    try {
      const costPengiriman = await fetch(
        "https://api.rajaongkir.com/starter/cost",
        {
          method: "POST",
          headers: {
            key: "cf91d83df6f437bd200ec7495b6f2687",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ini parameternya
            origin: "154",
            destination: item.originTo,
            weight: "5",
            courier: item.kurir,
          }),
        }
      ).then(response => {
        return response.json();
      });
      console.log("\n cartInfoData of CartActions:" + JSON.stringify(costPengiriman));

      // jika, cartnya tidak kosong maka diisi produknya

      const cartData = [costPengiriman];

      dispatch(setInfoCost(cartData[0].rajaongkir));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCity = () => {
  return async dispatch => {
    try {
      const city = await fetch("https://api.rajaongkir.com/starter/city", {
        method: "GET",
        headers: {
          key: "cf91d83df6f437bd200ec7495b6f2687",
        },
      }).then(response => {
        return response.json();
      });

      // jika, cartnya tidak kosong maka diisi produknya

      const cartData = [city];
      const newCartData = cartData[0].rajaongkir;
      dispatch(setInfoCity(newCartData));
      AsyncStorage.setItem("dataCity", newCartData);
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchProvince = () => {
  return async dispatch => {
    try {
      const city = await fetch("https://api.rajaongkir.com/starter/province", {
        method: "GET",
        headers: {
          key: "cf91d83df6f437bd200ec7495b6f2687",
        },
      }).then(response => {
        return response.json();
      });

      // jika, cartnya tidak kosong maka diisi produknya

      const cartData = [city];
      console.log("\n cityInfo:", cartData[0].rajaongkir);
      dispatch(setInfoProvince(cartData[0].rajaongkir));
    } catch (error) {
      console.error(error);
    }
  };
};

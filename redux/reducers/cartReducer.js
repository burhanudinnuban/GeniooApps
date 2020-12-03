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
} from "../actions/types";

const initialState = {
  cart: [],
  total: 0,
  totalCart: 0,
  itemsQty: 0,
  itemsQtyCart: 0,
  cartInfo: [],
  buyerid: '',
  cartid: '',
  cityResult: [],
  costResult: [],
  costs: 0,
  costs2: 0,
  waktuKirim: "",
  waktuKirim2: "",
  service: "",
  service2: "",
  kurir: "jne",
  provinceResult: [],
  buyerID: "",
  cartID: "",
  penerimaAwal: "",
  penerimaAkhir: "",
  kota: "",
  provinsi: "",
  alamat: "",
  telepon: "",
  originTo: "",
  email: "",
  code: "",
  postal_code: "",
  isLoading: false,
  totalCost: 0,
  brand: "",
  merchant_name: "",
  category: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartInfo: action.payload[0],
        cart: action.payload[0],
        merchant_name: action.payload[0][0].sellername,
        brand: action.payload[0][0].name,
        category: action.payload[0][0].type,
        total: action.payload[0][0].totalprice,
        totalCart: action.payload[0][0].totalprice,
        totalCost: parseInt(action.payload[0][0].totalprice) + state.totalCost,
        itemsQty: action.payload[0][0].totalqty,
        itemsQtyCart: action.payload[0][0].totalqty,
        buyerid: action.payload[0][0].buyerid,
        cartid: action.payload[0][0].cartid,
        
      };
    case ADD_TO_CART_UNLOGIN:
      return {
        ...state,
        cartInfo: [action.payload, ...state.cart],
        cart: [action.payload, ...state.cart],
        total: state.total + parseInt(action.payload.sellprice),
        totalCart: state.totalCart + parseInt(action.payload.sellprice),
        itemsQty: parseInt(state.itemsQty) + parseInt(action.payload.qty),
        itemsQtyCart: parseInt(state.itemsQty) + parseInt(action.payload.qty),
        buyerid: action.payload.buyerid,
        cartid: action.payload.cartid,
      };
    case UPDATE_ITEM_TO_CART:

      const indexUpdate = state.cart.findIndex(item => item.idproduct == action.payload[0].idproduct);
      let newCartUpdate = state.cart;
      newCartUpdate[indexUpdate].qty = action.payload[0].qty;

      if (newCartUpdate[indexUpdate].checked == '') {
        return {
          ...state,
          cart: [...newCartUpdate],
          total: action.payload[0].totalprice,
          totalCart: state.totalCart,
          totalCost: state.totalCost,
          itemsQty: action.payload[0].totalqty,
          itemsQtyCart: state.itemsQtyCart,
          buyerid: action.payload[0].buyerid,
          cartid: action.payload[0].cartid,
        };
      }
      else {
        return {
          ...state,
          cart: [...newCartUpdate],
          total: action.payload[0].totalprice,
          totalCart: parseInt(state.totalCart) + parseInt(action.payload[0].sellprice),
          totalCost: parseInt(state.totalCost) + parseInt(action.payload[0].sellprice),
          itemsQty: action.payload[0].totalqty,
          itemsQtyCart: action.payload[0].totalqty,
          buyerid: action.payload[0].buyerid,
          cartid: action.payload[0].cartid,
        };
      }

    case UPDATE_ITEM_TO_CART_UNLOGIN:

      const indexUpdate2 = state.cart.findIndex(item => item.idproduct == action.payload.idproduct);
      const itemQtyUpdate = parseInt(state.cart[indexUpdate2].qty) + 1;
      let newCartUpdate2 = state.cart;
      newCartUpdate2[indexUpdate2].qty = itemQtyUpdate;

      if (newCartUpdate2[indexUpdate2].checked == '') {
        return {
          ...state,
          cart: [...newCartUpdate2],
          total: state.total + parseInt(action.payload.sellprice),
          totalCart: state.totalCart,
          itemsQty: state.itemsQty + 1,
          itemsQtyCart: state.itemsQty + 1,
          buyerid: action.payload.buyerid,
          cartid: action.payload.cartid,
        };
      }
      else {
        return {
          ...state,
          cart: [...newCartUpdate2],
          total: state.total + parseInt(action.payload.sellprice),
          totalCart: state.totalCart + parseInt(action.payload.sellprice),
          totalCost: state.totalCost + parseInt(action.payload.sellprice),
          itemsQty: state.itemsQty + 1,
          itemsQtyCart: state.itemsQty + 1,
          buyerid: action.payload.buyerid,
          cartid: action.payload.cartid,
        };
      }
    case REMOVE_FROM_CART:
      const indexRemove = state.cart.findIndex(item => item.idproduct == action.payload[0].idproduct);
      let newCartRemove = state.cart;
      newCartRemove[indexRemove].qty = action.payload[0].qty;
      if (newCartRemove[indexRemove].checked == '') {
        return {
          ...state,
          cart: [...newCartRemove],
          total: action.payload[0].totalprice,
          totalCart: state.totalCart,
          totalCost: state.totalCost,
          itemsQty: action.payload[0].totalqty,
          itemsQtyCart: state.itemsQtyCart,
          buyerid: action.payload[0].buyerid,
          cartid: action.payload[0].cartid,
        };
      }
      else {
        return {
          ...state,
          cart: [...newCartRemove],
          total: action.payload[0].totalprice,
          totalCart: parseInt(state.totalCart) - parseInt(action.payload[0].sellprice),
          totalCost: parseInt(state.totalCost) - parseInt(action.payload[0].sellprice),
          itemsQty: action.payload[0].totalqty,
          itemsQtyCart: action.payload[0].totalqty,
          buyerid: action.payload[0].buyerid,
          cartid: action.payload[0].cartid,
        };
      }
    case REMOVE_FROM_CART_UNLOGIN:
      const indexRemove2 = state.cart.findIndex(item => item.idproduct == action.payload.idproduct);
      const itemQtyRemove = parseInt(state.cart[indexRemove2].qty) - 1;
      let newCartRemove2 = state.cart;
      newCartRemove2[indexRemove2].qty = itemQtyRemove;
      if (newCartRemove2[indexRemove2].checked == '') {
        return {
          ...state,
          cart: [...newCartRemove2],
          total: state.total - parseInt(action.payload.sellprice),
          totalCart: state.totalCart,
          itemsQty: state.itemsQty - 1,
          itemsQtyCart: state.itemsQty - 1,
          buyerid: action.payload.buyerid,
          cartid: action.payload.cartid,
        };
      }
      else {
        return {
          ...state,
          cart: [...newCartRemove2],
          total: state.total - parseInt(action.payload.sellprice),
          totalCart: state.totalCart - parseInt(action.payload.sellprice),
          totalCost: state.totalCost - parseInt(action.payload.sellprice),
          itemsQty: state.itemsQty - 1,
          itemsQtyCart: state.itemsQty - 1,
          buyerid: action.payload.buyerid,
          cartid: action.payload.cartid,
        };
      }
    case UNCHECKED_ITEM_TO_PAY:
      const index = state.cart.findIndex(item => item.idproduct == action.payload.idproduct);
      let newCart1 = state.cart;
      newCart1[index] = action.payload;

      return {
        ...state,
        cart: [...newCart1],
        total: state.total,
        totalCart: state.totalCart - parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
        totalCost: state.totalCost - parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
        itemsQty: state.itemsQty,
        itemsQtyCart: state.itemsQty - parseInt(action.payload.qty),
        buyerid: action.payload.buyerid,
        cartid: action.payload.cartid,
      };
    case CHECKED_ITEM_TO_PAY:
      const index2 = state.cart.findIndex(item => item.idproduct == action.payload.idproduct);
      let newCart2 = state.cart;
      newCart2[index2] = action.payload;
      return {
        ...state,
        cart: [...newCart2],
        total: state.total,
        totalCart: state.totalCart + parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
        totalCost: state.totalCost + parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
        itemsQty: state.itemsQty,
        itemsQtyCart: state.itemsQty + parseInt(action.payload.qty),
        buyerid: action.payload.buyerid,
        cartid: action.payload.cartid,
      };
    case FETCH_CART_DATA:
      if (action.payload[0] == '') {
        return {
          ...state,
          cart: action.payload[0],
          total: state.total,
          totalCart: state.total,
          itemsQty: state.itemsQty,
          buyerid: '',
          cartid: '',
        };
      }
      else {
        return {
          ...state,
          cart: action.payload[0],
          total: action.payload[0][0].totalprice,
          totalCart: action.payload[0][0].totalprice,
          itemsQty: action.payload[0][0].totalqty,
          buyerid: action.payload[0][0].buyerid,
          cartid: action.payload[0][0].cartid,
        };
      }

    case FETCH_CART_DATA_UNLOGIN:
      if (action.payload == '') {
        return {
          ...state,
          cart: state.cart,
          total: state.total,
          totalCart: state.total,
          itemsQty: state.itemsQty,
          buyerid: '',
          cartid: '',
        };
      }
      else {
        return {
          ...state,
          cart: action.payload[0],
          total: action.payload[0][0].totalprice,
          totalCart: action.payload[0][0].totalprice,
          itemsQty: action.payload[0][0].totalqty,
          buyerid: action.payload[0][0].buyerid,
          cartid: action.payload[0][0].cartid,
        };
      }

    case EMPTY_CART:
      const indexEmpty = state.cart.findIndex(item => item.idproduct == action.payload[0].idproduct);
      let newCart3 = state.cart;
      let newCart4 = state.cart;
      newCart4 = newCart4.filter(item => item.idproduct !== action.payload[0].idproduct);

      if (newCart3[indexEmpty].checked == '') {
        return {
          ...state,
          cart: [...newCart4],
          total: parseInt(state.total) - parseInt(action.payload[0].qty) * parseInt(action.payload[0].sellprice),
          totalCart: state.totalCart,
          totalCost: state.totalCost,
          itemsQty: parseInt(state.itemsQty) - parseInt(action.payload[0].qty),
          itemsQtyCart: parseInt(state.itemsQty) - parseInt(action.payload[0].qty),
          buyerid: action.payload[0].buyerid,
          cartid: action.payload[0].cartid,
        };
      }
      else {
        return {
          ...state,
          cart: [...newCart4],
          total: parseInt(state.total) - parseInt(action.payload[0].qty) * parseInt(action.payload[0].sellprice),
          totalCart: parseInt(state.totalCart) - parseInt(action.payload[0].qty) * parseInt(action.payload[0].sellprice),
          totalCost: parseInt(state.totalCost) - parseInt(action.payload[0].qty) * parseInt(action.payload[0].sellprice),
          itemsQty: parseInt(state.itemsQty) - parseInt(action.payload[0].qty),
          itemsQtyCart: parseInt(state.itemsQty) - parseInt(action.payload[0].qty),
          buyerid: action.payload[0].buyerid,
          cartid: action.payload[0].cartid,
        };
      }
    case EMPTY_CART_UNLOGIN:
      const indexEmpty2 = state.cart.findIndex(item => item.idproduct == action.payload.idproduct);
      let newCartEmpty = state.cart;
      let newCartEmpty2 = state.cart;
      newCartEmpty2 = newCartEmpty2.filter(item => item.idproduct !== action.payload.idproduct);

      if (newCartEmpty[indexEmpty2].checked == '') {
        return {
          ...state,
          cart: [...newCartEmpty2],
          total: state.total - parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
          totalCart: state.totalCart,
          itemsQty: state.itemsQty - parseInt(action.payload.qty),
          itemsQtyCart: state.itemsQty - parseInt(action.payload.qty),
          buyerid: action.payload.buyerid,
          cartid: action.payload.cartid,
        };
      }
      else {
        return {
          ...state,
          cart: [...newCartEmpty2],
          total: state.total - parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
          totalCart: state.totalCart - parseInt(action.payload.qty) * parseInt(action.payload.sellprice),
          itemsQty: state.itemsQty - parseInt(action.payload.qty),
          itemsQtyCart: state.itemsQty - parseInt(action.payload.qty),
          buyerid: action.payload.buyerid,
          cartid: action.payload.cartid,
        };
      }
    case LOGOUT_CART:
      return {
        ...state,
        cart: [],
        total: 0,
        totalCart: 0,
        itemsQty: 0,
        itemsQtyCart: 0,
        cartInfo: []
      };
    case SET_INFO_COST:
      return {
        ...state,
        costResult: action.payload.results[0],
        costs: action.payload.results[0].costs[0].cost[0].value,
        waktuKirim: action.payload.results[0].costs[0].cost[0].etd,
        service: action.payload.results[0].costs[0].service,
        code: action.payload.results[0].code,
      };
    case SET_INFO_CITY:
      return {
        ...state,
        cityResult: action.payload.results,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_KURIR:
      return {
        ...state,
        kurir: action.payload,
      };
    case SET_INFO_PROVINCE:
      return {
        ...state,
        provinceResult: action.payload.results,
      };
    case ADD_TO_CHECKOUT:
      return {
        ...state,
        penerimaAwal: action.payload.penerimaAwal,
        penerimaAkhir: action.payload.penerimaAkhir,
        alamat: action.payload.alamat,
        telepon: action.payload.telepon,
        kota: action.payload.kota,
        provinsi: action.payload.provinsi,
        originTo: action.payload.originTo,
        email: action.payload.email,
        postal_code: action.payload.postal_code,
      };
    case TOTAL_COST:
      return {
        ...state,
        totalCost: state.costs + parseInt(state.totalCart)
      }
    default:
      return state;
  }
}

import { FETCH_PRODUCTS } from './types';
import { getProducts } from '../../data';

export const fetchProducts = productData => {
  return {
    type: FETCH_PRODUCTS,
    payload: productData
  };
}

export const fetchDataProduct = buyerid => {
  return async dispatch => {
    try {
      const ItemsData = await fetch("https://genio.co.id/geniooapi/api/product?id_user=" + buyerid, {
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

      const productData = [ItemsData];
      dispatch(fetchProducts(productData));


    } catch (error) {
      console.error(error);
    }
  };
};
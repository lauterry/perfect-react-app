import { fetchProducts } from "./api";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const getProducts = () => {
	return dispatch => {
		return fetchProducts().then(res => {
			dispatch({
				type: FETCH_PRODUCTS,
				products: res.data.products,
			});
		});
	};
};

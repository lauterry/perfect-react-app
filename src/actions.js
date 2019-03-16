import { fetchProducts } from "./api";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const getProducts = () => {
	return dispatch => {
		fetchProducts().then(products => {
			// Yay! Can invoke sync or async actions with `dispatch`
			dispatch({
				type: FETCH_PRODUCTS,
				products: products.default,
			});
		});
	};
};

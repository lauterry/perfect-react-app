export const fetchProducts = () => {
	return import(/* webpackChunkName: "products" */ "./Data/products");
};
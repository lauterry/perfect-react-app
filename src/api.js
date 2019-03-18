import axios from "axios";

export const fetchProducts = () => {
	return axios.get("http://localhost:9000/current/fr-FR/products-merchandising.json");
};

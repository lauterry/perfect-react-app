import { combineReducers } from "redux";
import { FETCH_PRODUCTS } from "./actions";

const products = (state = [], action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.products;
		default:
			return state;
	}
};

const reducers = combineReducers({
	products,
});

export default reducers;

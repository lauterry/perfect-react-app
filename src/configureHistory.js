import createBrowserHistory from "history/createBrowserHistory";

let history;

export default (shop) => {
	if (!history) {
		history = createBrowserHistory({ basename: `/${shop}` });
	}

	return history;
};

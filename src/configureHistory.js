import createBrowserHistory from "history/createBrowserHistory";

let history;

export default () => {
	if (!history) {
		history = createBrowserHistory();
	}

	return history;
};

import React, { Fragment } from "react";
import "./styles.css";
import { Link, Switch, Route } from "react-router-dom";
import About from "./About";
import List from "./List";
import Product from "./Product";

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<header>
					<Link to={"/about"}>A propos de</Link>
					<Link to={"/list"}>Liste de produits</Link>
				</header>
				<div>
					<Switch>
						<Route path="/about" component={About} />
						<Route path="/list" component={List} />
						<Route path="/product/:name" component={Product} />
					</Switch>
				</div>
			</Fragment>
		);
	}
}

export default App;

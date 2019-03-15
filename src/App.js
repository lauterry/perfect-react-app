import React, {Fragment} from "react";
import "./styles.css";
import {Link, Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";

const AsyncAbout = loadable(() => import(/* webpackChunkName: "about" */ "./About"));
const AsyncProduct = loadable(() => import(/* webpackChunkName: "product" */ "./Product"));
const AsyncList = loadable(() => import(/* webpackChunkName: "list" */ "./List"));

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
						<Route path="/about" render={() => {
							return <AsyncAbout />
						}}/>
						<Route path="/list" render={() => {
							return <AsyncList />
						}}/>
						<Route path="/product/:name" render={() => {
							return <AsyncProduct />
						}}/>
					</Switch>
				</div>
			</Fragment>
		);
	}
}

export default App;

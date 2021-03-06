import React, { Fragment } from "react";
import "./styles.css";
import { Link, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import About from "./About";
import {FormattedDate} from "react-intl";

const AsyncProduct = loadable(() => import(/* webpackChunkName: "product" */ "./Product"));
const AsyncList = loadable(() => import(/* webpackChunkName: "list" */ "./ListContainer"));

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<h1><FormattedDate value={new Date()}/></h1>
				<header>
					<Link to={"/about"}>A propos de</Link>
					<Link to={"/list"}>Liste de produits</Link>
				</header>
				<div>
					<Switch>
						<Route path="/about" component={About} />
						<Route
							path="/list"
							render={props => {
								return <AsyncList {...props} />;
							}}
						/>
						<Route
							path="/:id"
							render={props => {
								return <AsyncProduct {...props} />;
							}}
						/>
					</Switch>
				</div>
			</Fragment>
		);
	}
}

export default App;

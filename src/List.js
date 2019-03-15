import React from "react";
import { Link } from "react-router-dom";
import {fetchProducts} from "./api";

class List extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
		};
	}

	componentDidMount() {
		fetchProducts().then(products => {
			this.setState({
				products: products.default,
			});
		});
	}

	render() {
		return (
			<div>
				{this.state.products.map(product => {
					return (
						<Link key={product.id} to={`/${product.id}`}>
							{product.name}
						</Link>
					);
				})}
			</div>
		);
	}
}

export default List;

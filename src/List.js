import React from "react";
import { Link } from "react-router-dom";

class List extends React.PureComponent {
	render() {
		const { products = [] } = this.props;
		return (
			<div>
				{products.map(product => {
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

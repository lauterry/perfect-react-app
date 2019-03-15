import React from "react";
import "./product.scss";

class Product extends React.Component {
	render() {
		const {match} = this.props;
		return <div className="product">{match.params.id}</div>;
	}
}

export default Product;

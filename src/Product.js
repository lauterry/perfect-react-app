import React from "react";
import "./product.scss";

class Product extends React.Component {
	render() {
		return <div className="product">{this.props.name}</div>;
	}
}

export default Product;

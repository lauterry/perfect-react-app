import React from "react";
import ListItem from "ListItem";

class List extends React.PureComponent {
	render() {
		const {products = []} = this.props;
		return (
			<div>
				{products.map(product => {
					return (
						<ListItem key={product.id} id={product.id} name={product.name}/>
					);
				})}
			</div>
		);
	}
}

export default List;

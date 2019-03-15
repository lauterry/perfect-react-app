import React from 'react';

class List extends React.Component {
	constructor(){
		super();
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		import( /* webpackChunkName: "products" */ "./Data/products").then(products => {
			this.setState({
				products: products.default
			});
		});
	}

	render () {
		return <div>
			{
				this.state.products.map (product => {
					return <div key={product.name}>{product.name}</div>;
				})
			}
		</div>
	}
}

export default List;
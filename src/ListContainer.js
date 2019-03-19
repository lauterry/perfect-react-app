import React from "react";
import {connect} from "react-redux";
import List from "./List";
import {getProducts} from "./actions";
import {bindActionCreators} from "redux";

class ListContainer extends React.Component {
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		return <List {...this.props} />;
	}
}

const mapStateToProps = state => {
	return {
		products: state.products
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({getProducts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);

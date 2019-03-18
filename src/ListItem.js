import React from "react";
import {Link} from "react-router-dom";

class ListItem extends React.PureComponent {
	render() {
		const {id, name} = this.props;
		return (
			<Link to={`/${id}`}>
				{name}
			</Link>
		);
	}
}

export default ListItem;

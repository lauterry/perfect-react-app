import React from "react";
import "./about.scss";
import {FormattedMessage} from "react-intl";

class About extends React.Component {
	render() {
		return (
			<div className="about">
				<FormattedMessage id="about.us"/>
			</div>
		);
	}
}

export default About;

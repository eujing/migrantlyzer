import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"

require("../styles.css")

export default class MigrationBar extends React.Component {
    render() {

	   	var origin = this.props.origin;
		var emigration = this.props.emigration;
		var destination = this.props.destination;
		var immigration = this.props.immigration;

        if (!origin || !destination) {
            return <Row></Row>
        }

        return (
            <Row>
                <Col xs={6} className={"text-center"} id={"display-left"}>
                    <div className={"text_country"}>{origin}</div>
                    <svg width={100} height={100}>
                        <circle className={"circle-left"} fill={"#D7D7D7"} cx={50} cy={50} r={45*Math.log(emigration)/Math.log(12500000)}></circle>
                    </svg>
                    <div className={"text_count"}>{emigration}</div>
                </Col>

                <Col xs={6} className={"text-center"} id={"display-right"}>
                    <div className={"text_country"}>{destination}</div>
                        <svg width={100} height={100}>
                            <circle className={"circle-right"} fill={"#0F8BDA"} cx={50} cy={50} r={45*Math.log(immigration)/Math.log(12500000)}></circle>
                        </svg>
                    <div className={"text_count"}>{immigration}</div>
                </Col>
            </Row>
        )

        /* return (
            <div>
	            <p>MigrationBar</p>
	            	<div>
	              		<div>
	              			{origin}
	              		</div>
	              		<div>
	              			{emigration}
	              		</div>
	            	</div>
	            	<div>
	            		<span> arrow </span>
	            	</div>
	            	<div>
	            		<div>
	            			{destination}
	            		</div>
	            		<div>
	            			{immigration}
	            		</div>
	            	</div>
            </div>
        ) */
    }
}

MigrationBar.propTypes = {
    origin: PropTypes.string,
    emigration: PropTypes.number,
    destination: PropTypes.string,
    immigration: PropTypes.number
}

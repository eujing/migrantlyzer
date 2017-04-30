import React from "react"
import PropTypes from "prop-types"

export default class MigrationBar extends React.Component {

	

    render() {

	   	var origin = this.props.origin;
		var emigration = this.props.emigration;
		var destination = this.props.destination;
		var immigration = this.props.immigration;

        return (
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
        )
    }
}

MigrationBar.propTypes = {
    origin: PropTypes.string,
    emigration: PropTypes.number,
    destination: PropTypes.string,
    immigration: PropTypes.number
}

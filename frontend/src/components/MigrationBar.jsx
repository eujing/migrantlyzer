import React from "react"

export default class MigrationBar extends React.Component {

    render() {
        return (
            <div>
	            <p>MigrationBar</p>
	            	<div>
	              		<div>
	              			{this.props.origin}
	              		</div>
	              		<div>
	              			{this.props.emigration}
	              		</div>
	            	</div>
	            	<div>
	            		<span> arrow </span>
	            	</div>
	            	<div>
	            		<div>
	            			{this.props.destination}
	            		</div>
	            		<div>
	            			{this.props.immigration}
	            		</div>
	            	</div>
            </div>
        )
    }
}

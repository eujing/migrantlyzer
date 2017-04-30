import React from "react"
import Factor from "./Factor.jsx"

export default class Category extends React.Component {
    render() {

    	var indexData = this.props.indexData;

        var origin = this.props.origin;
        var destination = this.props.destination;

        var originData = indexData[origin];
    	var destinationData = indexData[destination];
        var year = this.props.year;

        var category = this.props.category;
        var categoryMap = this.props.categoryMap;

        return (
            <ul>
                <h1>{category}</h1>
                {
                	
                	categoryMap[category].map(function(value, index) {
                		if (originData[value]) {
                			return <Factor name={value} origin_value={originData[value][year]["value"]} destination_value={destinationData[value][year]["value"]} />
                		}
                	})
					
                }
            </ul>
        )
    }
}

//test
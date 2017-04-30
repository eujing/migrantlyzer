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

        console.log(this.props)
        return (
            <ul>
                <h1>{category}</h1>
                {
                	
                	categoryMap[category].map(function(obj, index) {
                		if (originData[obj.name]) {
                			return <Factor name={obj.name} origin_value={originData[obj.name][year]["value"]} destination_value={destinationData[obj.name][year]["value"]} />
                		}
                	})
					
                }
            </ul>
        )
    }
}

//test

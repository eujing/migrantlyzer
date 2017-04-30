import React from "react"
import MigrationMap from "../containers/MigrationMap.jsx"
import DataDisplay from "./DataDisplay.jsx"
import MigrationYearSlider from "../containers/MigrationYearSlider.jsx"

export default class App extends React.Component {

	constructor() {
	  	super();
	  	this.state = {
		  	year: "2015"
	  	}
	}

	handleClick(e) {
		this.state.year = e.target.firstChild;
	}

    render() {


        return (
            <div>
                <MigrationMap />
                <DataDisplay year={this.state.year}/>
                <MigrationYearSlider />
            </div>
        )
    }
}

import React from "react"

export default class YearSlider extends React.Component {

    render() {
    	var yearList = [];
    	for (var i = 1990; i < 2016; i = i + 5) {
    		yearList.push(i)
    	};

    	console.log(yearList);
        return (
        	<div>
	            <h1>YearSlider</h1>
	            {
	            	yearList.map((year) => {
	            		return <div onClick={(e) => this.props.onClick(e)}>{year}</div>
	            	})
	            }
            </div>
        )
    }
}

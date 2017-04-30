import React from "react"
import Category from "./Category.jsx"

export default class CategoryList extends React.Component {
    render() {

        var indexData = this.props.exclusiveIndexData;
        var origin = this.props.origin;
        var destination = this.props.destination;
        var year = 2015;

        var categoryMap = this.props.categoryMap;


        var originData = indexData[origin];
        var destinationData = indexData[destination];

        for (var category in categoryMap) {
            console.log("This is a category");
            console.log(category);
        };

        var categoryList = [];

        for (var category in categoryMap) {
            categoryList.push(category);
        };

        console.log(categoryList)


        return (
            <div>
                <p>CategoryList</p>
                <ul>
                    <li>CategoryList</li>
                    {
                        categoryList.map(function(value) {
                            return (
                                <Category 
                                    origin={origin}
                                    destination={destination}
                                    indexData={indexData}
                                    category={value}
                                    categoryMap={categoryMap}
                                />

                                )
                        })
                    }
                </ul>
            </div>)
    }
}

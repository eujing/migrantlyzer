import React from "react"
import { Row, Col, Accordion } from "react-bootstrap"
import PropTypes from "prop-types"
import Category from "./Category.jsx"

export default class CategoryList extends React.Component {
    render() {

        var indexData = this.props.exclusiveIndexData;
        var origin = this.props.origin;
        var destination = this.props.destination;
        var year = this.props.year;

        var categoryMap = this.props.categoryMap;

        if (!origin || !destination) {
            return <Row>
                <Col xs={12} className={"text-center"}><h1>Index Categories</h1></Col>
            </Row>
        }

        var originData = indexData[origin];
        var destinationData = indexData[destination];

        var categoryList = [];

        for (var category in categoryMap) {
            categoryList.push(category);
        };

        return (
            <Row>
                <Col xs={12} className="text-center">
                    <Accordion>
                        {/*<h1>Index Categories</h1>*/}
                        {
                            categoryList.map(function(value, i) {
                                return (
                                    <Category
                                        origin={origin}
                                        destination={destination}
                                        indexData={indexData}
                                        category={value}
                                        categoryMap={categoryMap}
                                        year={year}
                                        key={i}
                                    />

                                    )
                            })
                        }
                </Accordion>
                </Col>
            </Row>)
    }
}

CategoryList.propTypes = {
    exclusiveIndexData: PropTypes.object,
    origin: PropTypes.string,
    destination: PropTypes.string,
    year: PropTypes.number.isRequired,
    categoryMap: PropTypes.object,
}

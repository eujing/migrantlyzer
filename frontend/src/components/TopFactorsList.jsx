import React from "react"
import { Row } from "react-bootstrap"
import PropTypes from "prop-types"
import Factor from "./Factor.jsx"

export default class TopFactorsList extends React.Component {

	extractFactorWeights(originData, destinationData, year) {
		// primitively takes the difference in rank for that particular year
		var factorsWeights = {};
		var factorsList = Object.keys(destinationData);
		factorsList.forEach(function(value, index) {
			var weight = destinationData[value][year].rank - originData[value][year].rank;
			factorsWeights[value] = weight;			
			return 0;
		})
		return factorsWeights;
	}

	extractTopPull(originData, destinationData, factorWeights, year) {
		//top pull for that year only
		var cur;
		var topFactor;
		var next;
		for (var factor in factorWeights) {
			if (!cur) {
				cur = factorWeights[factor];
				topFactor = factor
			} else {
				next = factorWeights[factor];
				if (next > cur) {
					cur = next;
					topFactor = factor;
				}
			}
		};
		return topFactor;
	}

	extractTopNumberOfPulls(originData, destinationData, factorWeights, year, number) {
		var topPulls = [];
		var internalOriginData = Object.assign({}, originData);
		var internalDestinationData = Object.assign({}, destinationData);
		var internalFactorWeights = Object.assign({}, factorWeights);
		var curTop;
		for (var i = 0; i < number; i++ ){
			curTop = this.extractTopPull(internalOriginData, internalDestinationData, internalFactorWeights, year);
			topPulls.push(curTop);
			delete internalOriginData[curTop];
			delete internalDestinationData[curTop];
			delete internalFactorWeights[curTop];
		}
		return topPulls;
	}

	extractTopPush(originData, destinationData, factorWeights, year) {
		//top push for that year only
		var cur;
		var worstFactor;
		var next;
		for (var factor in factorWeights) {
			if (!cur) {
				cur = factorWeights[factor];
				worstFactor = factor
			} else {
				next = factorWeights[factor];
				if (next < cur) {
					cur = next;
					worstFactor = factor;
				}
			}
		};
		return worstFactor;
	}

	extractTopNumberOfPushes(originData, destinationData, factorWeights, year, number) {
		var topPushes = [];
		var internalOriginData = Object.assign({}, originData);
		var internalDestinationData = Object.assign({}, destinationData);
		var internalFactorWeights = Object.assign({}, factorWeights);
		var curTop;
		for (var i = 0; i < number; i++ ){
			curTop = this.extractTopPush(internalOriginData, internalDestinationData, internalFactorWeights, year);
			topPushes.push(curTop);
			delete internalOriginData[curTop];
			delete internalDestinationData[curTop];
			delete internalFactorWeights[curTop];
		}
		return topPushes;
	}

    render() {
    	var indexData = this.props.exclusiveIndexData;
    	var origin = this.props.origin;
    	var destination = this.props.destination;

        if (!indexData || !origin || !destination) {
            return <h1>No data yet!</h1>
        }

    	var year = 2015;
    	var topNumber = 2;
    	console.log(this.props);

    	var factorWeights = this.extractFactorWeights(indexData[origin], indexData[destination], year);
    	var topPulls = this.extractTopNumberOfPulls(indexData[origin], indexData[destination], factorWeights, year, topNumber);
    	var topPushes = this.extractTopNumberOfPushes(indexData[origin], indexData[destination], factorWeights, year, topNumber);

        return (
            <Row>
                <div>
                    <h4>Top Pull Factors</h4>
                    <ul>
                        {
                            topPulls.map(function(name) {
                                let originValue = indexData[origin][name][year]["value"];
                                let destinationValue = indexData[destination][name][year]["value"];
                                return <Factor name={name} origin_value={originValue} destination_value={destinationValue} />
                            })
                        }
                    </ul>
                </div>
                <div>
                    <h4>Top Push Factors</h4>
                    <ul>
                        {
                            topPushes.map(function(name) {
                                let originValue = indexData[origin][name][year]["value"];
                                let destinationValue = indexData[destination][name][year]["value"];
                                
                                return <Factor name={name} origin_value={originValue} destination_value={destinationValue} />
                            })
                        }
                    </ul>
                </div>
            </Row>
            )
    }
}

TopFactorsList.propTypes = {
    origin: PropTypes.string,
    destination: PropTypes.string,
    exclusiveIndexData: PropTypes.object
}

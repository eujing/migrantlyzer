import React from "react"
import Factor from "./Factor.jsx"

export default class TopFactorsList extends React.Component {

	extractFactorWeights(originData, destinationData, year) {
		//primitively takes the difference in rank for that particular year
		var factorsWeights = {};
		var factorsList = Object.keys(destinationData);
		factorsList.forEach(function(value, index) {
			var weight = destinationData[value][year]["rank"] - originData[value][year]["rank"];
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
    	var year = 2015;

    	var factorWeights = this.extractFactorWeights(indexData[origin], indexData[destination], year);
    	var topPulls = this.extractTopNumberOfPulls(indexData[origin], indexData[destination], factorWeights, year, 2);
    	var topPushes = this.extractTopNumberOfPushes(indexData[origin], indexData[destination], factorWeights, year, 2);

        return (
            <div>
                <p>TopFactorsList</p>
                <div>top two factors: {topPulls}</div>
                <div>top two factors: {topPushes}</div>
                <ul>
                    <Factor name={"Test"} origin_value={10} destination_value={5}/>
                </ul>
            </div>)
    }
}


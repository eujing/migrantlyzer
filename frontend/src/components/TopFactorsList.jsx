import React from "react"
import { Row, Col } from "react-bootstrap"
import PropTypes from "prop-types"
import Factor from "./Factor.jsx"

export default class TopFactorsList extends React.Component {

    extractFactorWeights(originData, destinationData, year) {
        // primitively takes the difference in rank for that particular year
        const factorsWeights = {}
        const factorsList = Object.keys(destinationData)
        factorsList.forEach((value) => {
            if (!destinationData[value][year] || destinationData[value][year].rank == 0) {
                console.log(`${year} index data for ${this.props.destination} not available!`, destinationData[value])
                factorsWeights[value] = 0
                return 0
            }
            if (!originData[value][year] || originData[value][year].rank == 0) {
                console.log(`${year} index data for ${this.props.origin} not available!`, originData[value])
                factorsWeights[value] = 0
                return 0
            }
            const weight = destinationData[value][year].rank - originData[value][year].rank
            factorsWeights[value] = weight
            return 0
        })
        return factorsWeights
    }

    extractTopPull(originData, destinationData, factorWeights, year) {
        // top pull for that year only
        let cur
        let topFactor
        let next
        for (let factor in factorWeights) {
            if (!cur) {
                cur = factorWeights[factor]
                topFactor = factor
            } else {
                next = factorWeights[factor]
                if (next > cur) {
                    cur = next
                    topFactor = factor
                }
            }
        }
        return topFactor
    }

    extractTopNumberOfPulls(originData, destinationData, factorWeights, year, number) {
        const topPulls = []
        const internalOriginData = Object.assign({}, originData)
        const internalDestinationData = Object.assign({}, destinationData)
        const internalFactorWeights = Object.assign({}, factorWeights)
        let curTop
        for (let i = 0; i < number; i++) {
            curTop = this.extractTopPull(internalOriginData, internalDestinationData, internalFactorWeights, year)
            topPulls.push(curTop)
            delete internalOriginData[curTop]
            delete internalDestinationData[curTop]
            delete internalFactorWeights[curTop]
        }
        return topPulls
    }

    extractTopPush(originData, destinationData, factorWeights, year) {
        //top push for that year only
        let cur
        let worstFactor
        let next
        for (let factor in factorWeights) {
            if (!cur) {
                cur = factorWeights[factor]
                worstFactor = factor
            } else {
                next = factorWeights[factor]
                if (next < cur) {
                    cur = next
                    worstFactor = factor
                }
            }
        }
        return worstFactor
    }

    extractTopNumberOfPushes(originData, destinationData, factorWeights, year, number) {
        const topPushes = []
        const internalOriginData = Object.assign({}, originData)
        const internalDestinationData = Object.assign({}, destinationData)
        const internalFactorWeights = Object.assign({}, factorWeights)
        let curTop
        for (let i = 0; i < number; i++) {
            curTop = this.extractTopPush(internalOriginData, internalDestinationData, internalFactorWeights, year)
            topPushes.push(curTop)
            delete internalOriginData[curTop]
            delete internalDestinationData[curTop]
            delete internalFactorWeights[curTop]
        }
        return topPushes
    }

    render() {
        const indexData = this.props.exclusiveIndexData
        const origin = this.props.origin
        const destination = this.props.destination
        const year = this.props.year

        if (!indexData || !origin || !destination) {
            return <Row>
                <Col xs={6} className={"text-center"}><h1>Top Pull Factors</h1></Col>
                <Col xs={6} className={"text-center"}><h1>Top Push Factors</h1></Col>
            </Row>
        }

        const topNumber = 2

        const factorWeights = this.extractFactorWeights(indexData[origin], indexData[destination], year)
        const topPulls = this.extractTopNumberOfPushes(indexData[origin], indexData[destination], factorWeights, year, topNumber)
        const topPushes = this.extractTopNumberOfPulls(indexData[origin], indexData[destination], factorWeights, year, topNumber)

        return (
            <Row>
                <Col xs={6} className={"text-center"}>
                    <h1>Top Pull Factors</h1>
                    <ul>
                        {
                            topPulls.map((name, i) => {
                                const originValue = indexData[origin][name][year].value
                                const destinationValue = indexData[destination][name][year].value
                                return <Factor key={i}
                                    name={name}
                                    origin_value={originValue}
                                    destination_value={destinationValue} />
                            })
                        }
                    </ul>
                </Col>
                <Col xs={6} className={"text-center"}>
                    <h1>Top Push Factors</h1>
                    <ul>
                        {
                            topPushes.map((name, i) => {
                                const originValue = indexData[origin][name][year].value
                                const destinationValue = indexData[destination][name][year].value

                                return <Factor key={i}
                                    name={name}
                                    origin_value={originValue}
                                    destination_value={destinationValue} />
                            })
                        }
                    </ul>
                </Col>
            </Row>
        )
    }
}

TopFactorsList.propTypes = {
    origin: PropTypes.string,
    destination: PropTypes.string,
    exclusiveIndexData: PropTypes.object,
    year: PropTypes.number.isRequired
}

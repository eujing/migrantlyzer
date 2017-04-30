import React from "react"
import PropTypes from "prop-types"
import d3 from "d3"

let factorID = 0

require("../styles.css")

export default class Factor extends React.Component {
    constructor(props) {
        super(props)

        this.uid = `bar-chart-${factorID}`
        factorID += 1
    }

    addBarPair(rootSelector, text, dataUpper, dataLower) {
        const root = d3.select(rootSelector)

        const barWidth = 500
        const barHeight = 20
        const barBorder = 150
        const colorUpper = "#D7D7D7"
        const colorLower = "#0F8BDA"

        const svg = root.append("svg")
            .attr("class", "barpair")
            .attr("width", barWidth + barBorder + 50)
            .attr("height", barHeight * 2)
        const max = Math.max(dataUpper, dataLower)
        svg.append("rect")
            .attr("width", (dataUpper / max) * barWidth)
            .attr("height", barHeight)
            .attr("fill", colorUpper)
            .attr("x", barBorder)
        svg.append("rect")
            .attr("width", (dataLower / max) * barWidth)
            .attr("height", barHeight)
            .attr("fill", colorLower)
            .attr("x", barBorder)
            .attr("y", barHeight)
        svg.append("text")
            .attr("class", "text_head")
            .attr("x", barBorder - 5)
            .attr("y", barHeight + 5)
            .text(text)
        svg.append("text")
            .attr("class", "text_tail")
            .attr("x", barBorder + barWidth + 5)
            .attr("y", barHeight - 6)
            .text(dataUpper)
        svg.append("text")
            .attr("class", "text_tail")
            .attr("x", barBorder + barWidth + 5)
            .attr("y", (barHeight * 2) - 6)
            .text(dataLower)
    }

    componentDidMount() {
        this.addBarPair(`#${this.uid}`, this.props.name, this.props.origin_value, this.props.destination_value)
    }

    render() {
        return <div id={this.uid}></div>
    }
}

Factor.propTypes = {
    name: PropTypes.string.isRequired,
    origin_value: PropTypes.number.isRequired,
    destination_value: PropTypes.number.isRequired
}

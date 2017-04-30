import React from "react"
import PropTypes from "prop-types"
import d3 from "d3"
import * as topojson from "topojson"

const mapTopoJson = require("./map.json")

export default class Map extends React.Component {
    renderMap() {
        const width = document.getElementById("map").offsetWidth
        const mapWidth = this.props.mapWidth
        const mapHeight = this.props.mapHeight
        const projection = d3.geo.mercator().scale(150).translate(
            [mapWidth / 2, mapHeight / 1.6])
        this.path = d3.geo.path().projection(projection)
        this.svg = d3.select("#map").append("svg")
            .attr("preserveAspectRatio", "xMidYMid")
            .attr("viewBox", `0 0 ${mapWidth} ${mapHeight}`)
            .attr("width", width)
            .attr("height", width * (mapHeight / mapWidth))

        const outlineGroup = this.svg.append("g")
        outlineGroup.attr("id", "outlines")
            .selectAll("path")
            .data(topojson.feature(mapTopoJson, mapTopoJson.objects.countries).features)
            .enter()
            .append("path")
            .attr("id", d => d.id)
            .attr("d", this.path)
            .on("click", d => this.props.onCountryClick(d))

        window.resize = () => {
            const newWidth = document.getElementById("map").offSetWidth
            this.svg.attr("width", newWidth)
            this.svg.attr("height", newWidth * (mapHeight / mapWidth))
        }
    }

    addArc(origin, destinations, thicknesses) {
        this.arcGroup = this.svg.append("g")
        for (let i = 0; i < thicknesses.length; i += 1) {
            this.arcGroup.append("path")
                .datum({
                    type: "LineString",
                    coordinates: [origin, destinations[i]]
                })
                .attr("class", "route")
                .attr("d", this.path)
                .style({ "stroke-width": `${thicknesses[i]}px` })
                .on("click", d => this.props.onLineClick(d))
        }
    }

    clearArcs() {
        this.arcGroup.remove()
    }

    componentDidMount() {
        this.renderMap()
        if (this.props.originLongLat && this.props.destinationLongLats && this.props.thicknesses) {
            this.addArc(
                this.props.originLongLat,
                this.props.destinationLongLats,
                this.props.thicknesses)
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.originLongLat && nextProps.destinationLongLats && nextProps.thicknesses) {
            if (this.arcGroup) {
                this.clearArcs()
            }
            this.addArc(
                nextProps.originLongLat,
                nextProps.destinationLongLats,
                nextProps.thicknesses)
        }
    }

    render() {
        return <div id="map"></div>
    }
}

Map.propTypes = {
    mapWidth: PropTypes.number.isRequired,
    mapHeight: PropTypes.number.isRequired,
    originLongLat: PropTypes.arrayOf(PropTypes.number),
    destinationLongLats: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    thicknesses: PropTypes.arrayOf(PropTypes.number),
    onLineClick: PropTypes.func.isRequired,
    onCountryClick: PropTypes.func.isRequired
}

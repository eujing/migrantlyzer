import React from "react"
import d3 from "d3"
import * as topojson from "topojson"

const mapTopoJson = require("./map.json")

export default class Map extends React.Component {
    renderMap() {
        const width = document.getElementById("map").offsetWidth
        const mapWidth = 938
        const mapHeight = 500
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
    }

    addArc(origin, destinations, thicknesses) {
        const arcGroup = this.svg.append("g")
        for (let i = 0; i < thicknesses.length; i += 1) {
            arcGroup.append("path")
                .datum({
                    type: "LineString",
                    coordinates: [origin, destinations[i]]
                })
                .attr("class", "route")
                .attr("d", this.path)
                .style({ "stroke-width": `${thicknesses[i]}px` })
        }
    }

    componentDidMount() {
        this.renderMap()
        this.addArc([-3.44, 55.38], [[-95.71, 37.09], [46.87,-18.77], [103.82,1.35]], [4, 1, 2])
    }

    render() {
        return <div id="map"></div>
    }
}

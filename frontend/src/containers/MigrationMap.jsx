import { connect } from "react-redux"
import Map from "../components/Map.jsx"

const mapWidth = 938
const mapHeight = 500

const mapStateToProps = (state) => {
    const year = state.selectedOptions.year
    const origin = state.selectedOptions.orgin
    const dest = state.selectedOptions.destination

    if (!origin) {
        return { mapWidth, mapHeight }
    }

    return {
        mapWidth,
        mapHeight,
        originLongLat: origin && state.countryPositions[origin],
        destinationLongLats: dest ?
            [state.countryPositions[dest]] :
            Object.entries(state.migrationData[year][origin]).map((pair) => {
                return state.countryPositions[pair[0]]
            })
    }
}

const mapDispatchToProps = () => {
    return {}
}

const MigrationMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map)

export default MigrationMap

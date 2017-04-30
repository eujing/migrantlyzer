import { connect } from "react-redux"
import Map from "../components/Map.jsx"
import { fetchMigrationData, selectCountry } from "../actions"

const mapWidth = 938
const mapHeight = 500

const mapStateToProps = (state) => {
    const year = state.selectedOptions.year
    const origin = state.selectedOptions.origin
    const dest = state.selectedOptions.destination

    if (!origin || !state.migrationData) {
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
            }),
        thicknesses: dest ?
            [Math.sqrt(state.migrationData[year][origin][dest]) / 15] :
            Object.entries(state.migrationData[year][origin]).map((pair) => {
            return Math.sqrt(pair[1]) / 15
        })
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLineClick: (lineData) => {
            const destLongLat = lineData.coordinates[1]
            console.log(`Destination is ${destLongLat}`)
        },
        onCountryClick: (countryData) => {
            console.log(countryData)
            const country = countryData.properties.name
            dispatch(fetchMigrationData(country, 2015)).then(() =>
                dispatch(selectCountry(country)))
        }
    }
}

const MigrationMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map)

export default MigrationMap

import { connect } from "react-redux"
import Map from "../components/Map.jsx"
import { fetchMigrationData, fetchIndexData, selectCountry } from "../actions"

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
        originLongLat: state.countryPositions[origin],
        destinationLongLats: dest ?
            [state.countryPositions[dest]] :
        Object.entries(state.migrationData[year][origin]).map(pair =>
                state.countryPositions[pair[0]]
            ),
        thicknesses: dest ?
        [Math.pow(state.migrationData[year][origin][dest], 1/3) / 43] :
        Object.entries(state.migrationData[year][origin]).map(pair => Math.pow(pair[1], 1/3) / 43)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLineClick: (lineData) => {
            const destLongLat = lineData.coordinates[1]
            console.log(`Destination is ${destLongLat}`)
        },
        onCountryClick: (countryData) => {
            console.log(countryData)
            const country = countryData.properties.name
            Promise.all([
                dispatch(fetchMigrationData(country)),
                dispatch(fetchIndexData(country))]).then(() =>
                    dispatch(selectCountry(country)))
        }
    }
}

const MigrationMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Map)

export default MigrationMap

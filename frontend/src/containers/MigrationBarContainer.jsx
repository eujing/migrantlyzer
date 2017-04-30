import { connect } from "react-redux"
import MigrationBar from "../components/MigrationBar.jsx"

const mapStateToProps = (state) => {
    const year = state.selectedOptions.year
    const origin = state.selectedOptions.origin
    const destination = state.selectedOptions.destination

    if (!origin) {
        return {}
    }

    return {
        origin,
        emigration: Object.entries(state.migrationData[year][origin]).reduce((sum, pair) => {
            return sum + pair[1]
        }, 0),
        destination,
        immigration: destination ?
            state.migrationData[year][origin][destination] :
            null
    }
}

const mapDispatchToProps = () => {
    return {}
}

const MigrationBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MigrationBar)

export default MigrationBarContainer

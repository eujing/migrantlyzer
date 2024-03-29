import { connect } from "react-redux"
import TopFactorsList from "../components/TopFactorsList.jsx"

const mapStateToProps = (state) => {
    const origin = state.selectedOptions.origin
    const destination = state.selectedOptions.destination
    const year = state.selectedOptions.year

    if (!origin || !destination) {
        return { year }
    }

    const result = {
        origin,
        destination,
        year,
        exclusiveIndexData: {
            [origin]: state.indexData[origin],
            [destination]: state.indexData[destination]
        }
    }

    return result
}

const mapDispatchToProps = () => {
    return {}
}

const MigrationFactorsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopFactorsList)

export default MigrationFactorsList

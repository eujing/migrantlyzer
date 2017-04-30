import { connect } from "react-redux"
import TopFactorsList from "../components/TopFactorsList.jsx"

const mapStateToProps = (state) => {
    const origin = state.selectedOptions.origin
    const destination = state.selectedOptions.destination

    if (!origin || !destination) {
        return {}
    }

    const result = {
        origin,
        destination,
        exclusiveIndexData: {
            [origin]: state.indexData[origin],
            [destination]: state.indexData[destination]
        }
    }

    console.log(result)

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

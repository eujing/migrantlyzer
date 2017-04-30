import { connect } from "react-redux"
import CategoryList from "../components/CategoryList.jsx"

const mapStateToProps = (state) => {
    const origin = state.selectedOptions.origin
    const destination = state.selectedOptions.destination
    const year = state.selectedOptions.year

    if (!origin || !destination) {
        return { year }
    }

    return {
        origin,
        destination,
        year,
        exclusiveIndexData: {
            [origin]: state.indexData[origin],
            [destination]: state.indexData[destination]
        },
        categoryMap: state.categories
    }
}

const mapDispatchToProps = (state) => {
    return {}
}

const IndexCategoryList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default IndexCategoryList

import { connect } from "react-redux"
import YearSlider from "../components/YearSlider.jsx"
import { changeYear } from "../actions"

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: year => dispatch(changeYear(year))
    }
}

const MigrationYearSlider = connect(
    mapStateToProps,
    mapDispatchToProps
)(YearSlider)

export default MigrationYearSlider


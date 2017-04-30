import { connect } from "react-redux"
import YearSlider from "../components/YearSlider.jsx"
import selectYear from "../actions"

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => {
            return dispatch(selectYear())
        }
    }
}

const MigrationYearSlider = connect(
    mapStateToProps,
    mapDispatchToProps
)(YearSlider)

export default MigrationYearSlider


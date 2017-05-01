import React from "react"
import { Grid, Row } from "react-bootstrap"
import MigrationBarContainer from "../containers/MigrationBarContainer.jsx"
import MigrationFactorsList from "../containers/MigrationFactorsList.jsx"
import IndexCategoryList from "../containers/IndexCategoryList.jsx"

export default class DataDisplay extends React.Component {
    render() {
        return (
            <Grid id={"display"} className={"container"}>
                <Row><div style={{ height: "20px" }}></div></Row>
                <MigrationBarContainer />
                <MigrationFactorsList />
                <IndexCategoryList />
            </Grid>)
    }
}

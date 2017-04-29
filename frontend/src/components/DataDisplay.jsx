import React from "react"
import MigrationBar from "./MigrationBar.jsx"
import TopFactorsList from "./TopFactorsList.jsx"
import CategoryList from "./CategoryList.jsx"

export default class DataDisplay extends React.Component {
    render() {
        return (
            <div>
                <h1>DataDisplay</h1>
                <MigrationBar />
                <TopFactorsList />
                <CategoryList />
            </div>)
    }
}

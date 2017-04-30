import React from "react"
import MigrationMap from "../containers/MigrationMap.jsx"
import DataDisplay from "./DataDisplay.jsx"
import YearSlider from "./YearSlider.jsx"

export default class App extends React.Component {
    render() {
        return (
            <div>
                <MigrationMap />
                <DataDisplay />
                <YearSlider />
            </div>
        )
    }
}

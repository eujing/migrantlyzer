import React from "react"
import Map from "./Map.jsx"
import DataDisplay from "./DataDisplay.jsx"
import YearSlider from "./YearSlider.jsx"

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Map />
                <DataDisplay />
                <YearSlider />
            </div>
        )
    }
}

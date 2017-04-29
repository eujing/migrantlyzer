import React from "react"
import Factor from "./Factor.jsx"

export default class TopFactorsList extends React.Component {
    render() {
        return (
            <div>
                <p>TopFactorsList</p>
                <ul>
                    <Factor name={"Test"} origin_value={10} destination_value={5}/>
                </ul>
            </div>)
    }
}

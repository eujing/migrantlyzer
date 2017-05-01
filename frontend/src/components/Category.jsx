import React from "react"
import Factor from "./Factor.jsx"

export default class Category extends React.Component {
    render() {
        const indexData = this.props.indexData

        const origin = this.props.origin
        const destination = this.props.destination

        const originData = indexData[origin]
        const destinationData = indexData[destination]
        const year = this.props.year

        const category = this.props.category
        const categoryMap = this.props.categoryMap

        return (
            <div>
                <h1>{category}</h1>
                {
                categoryMap[category].map((index, i) => {
                    if (originData[index.name]) {
                        return <Factor
                            key={i}
                            name={index.name}
                            origin_value={originData[index.name][year].value}
                            destination_value={destinationData[index.name][year].value} />
                    }
                }) }
            </div>
        )
    }
}

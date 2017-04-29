import React from "react"
import Category from "./Category.jsx"

export default class CategoryList extends React.Component {
    render() {
        return (
            <div>
                <p>CategoryList</p>
                <ul>
                    <li>CategoryList</li>
                    <Category />
                </ul>
            </div>)
    }
}

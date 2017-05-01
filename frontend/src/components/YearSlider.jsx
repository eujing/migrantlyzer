import React from "react"
import { Row, Col } from "react-bootstrap"

export default class YearSlider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedYear: 2015
        }
    }

    onClick(year) {
        this.setState({ selectedYear: year })
        this.props.onClick(year)
    }

    render() {
        const yearList = []
        for (let i = 1990; i < 2016; i += 5) {
            yearList.push(i)
        }

        return (
            <Row id={"timeline"}>
                {
                    yearList.map((year, i) => {
                        return <Col xs={2}
                            key={i}
                            className={"text-center"}
                            style={{ color: this.state.selectedYear === year ?
                                "#0F8BDA" : "#D7D7D7" }}
                            onClick={() => this.onClick(year)}>{year}</Col>
                    })
                }
            </Row>
        )
    }
}

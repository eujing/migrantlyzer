import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"

export default class MigrationBar extends React.Component {
    render() {
        const origin = this.props.origin
        const emigration = this.props.emigration
        const destination = this.props.destination
        const immigration = this.props.immigration

        return (
            <Row>
                { origin ?
                <Col xs={6} className={"text-center"} id={"display-left"}>
                    <div className={"text_country"}>{origin}</div>
                    <svg width={100} height={100}>
                        <circle className={"circle_left"}
                            cx={50} cy={50}
                            r={45 * (Math.log(emigration) / Math.log(12500000))}></circle>
                    </svg>
                    <div className={"text_count"}>{`${emigration} Emigrants`}</div>
                </Col>
                : <div></div> }

                { destination ?
                <Col xs={6} className={"text-center"} id={"display-right"}>
                    <div className={"text_country"}>{destination}</div>
                        <svg width={100} height={100}>
                            <circle className={"circle_right"}
                                cx={50} cy={50}
                                r={45 * (Math.log(immigration) / Math.log(12500000))}></circle>
                        </svg>
                    <div className={"text_count"}>{`${immigration} Immigrants`}</div>
                </Col>
                : <div></div> }
            </Row>
        )
    }
}

MigrationBar.propTypes = {
    origin: PropTypes.string,
    emigration: PropTypes.number,
    destination: PropTypes.string,
    immigration: PropTypes.number
}

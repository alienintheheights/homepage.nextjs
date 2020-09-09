import React from 'react'
import PropTypes from 'prop-types'

import { Card, Row, Col } from 'react-bootstrap'

import { musicJson } from '../data/music'
import { listFilter } from '../utils/listfilter'

export default function MusicLinks(props) {
    const displayCount = (props && props.number) || 0
    const useFeatured = (props && props.featured) || false
    const hideTitle = props && props.hideTitle
    return (
        <div>
            {musicJson &&
                listFilter(musicJson, useFeatured, displayCount).map((value, index) => {
                    return (
                        <Card key={`fauxmat-music-${index}`} className="fauxmat-music-photo">
                            <div className="fauxmat-title">{!hideTitle && value.title}</div>
                            <Row>
                                <Col>
                                    <Card.Body>
                                        <div dangerouslySetInnerHTML={{ __html: value.linkHtml }} />
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    )
                })}
        </div>
    )
}

MusicLinks.propTypes = {
    number: PropTypes.number.isRequired,
    featured: PropTypes.bool.optional,
    hideTitle: PropTypes.bool.optional
}

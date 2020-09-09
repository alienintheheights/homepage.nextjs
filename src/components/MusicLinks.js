import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

import { musicJson } from '../data/music'
import { listFilter } from '../utils/listfilter'

export default function MusicLinks(props) {
    // eslint-disable-next-line react/prop-types
    const displayCount = (props && props.number) || 0
    // eslint-disable-next-line react/prop-types
    const useFeatured = (props && props.featured) || false
    // eslint-disable-next-line react/prop-types
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

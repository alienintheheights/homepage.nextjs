import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Card, Row, Col } from 'react-bootstrap'

import { linkJson } from '../data/links'
import { listFilter } from '../utils/listfilter'
import { MOBILE_MAX } from '../constants'

export default function PhotoLinks(props) {
    const displayCount = (props && props.number) || 0
    const useFeatured = props && props.featured
    const alternate = props && props.alternate

    const shouldAlternate = (w) => w > MOBILE_MAX && w < 1000

    const [width, setWidth] = useState(0)
    const updateMedia = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener('resize', updateMedia)
    })

    const getPhoto = (value) => {
        return (
            <Col md={8} sm={12}>
                <div dangerouslySetInnerHTML={{ __html: value.photoLink }} />
            </Col>
        )
    }

    const getTitle = (value) => {
        return (
            <Col md={4} sm={12}>
                <Card.Body className="fauxmat-link-photo-text">
                    <div dangerouslySetInnerHTML={{ __html: value.linkHtml }} />
                    <div className="fauxmat-photo-credit">photo: {value.photoCredit}</div>
                </Card.Body>
            </Col>
        )
    }

    let toggle = 0
    return (
        <div>
            {linkJson &&
                listFilter(linkJson, useFeatured, displayCount).map((value, index) => {
                    if (alternate && shouldAlternate(width)) toggle++
                    return (
                        <Card key={`fauxmat-links-${index}`} className="fauxmat-link-photo-card">
                            <Row>
                                {toggle % 2 === 0 ? getPhoto(value) : getTitle(value)}
                                {toggle % 2 === 0 ? getTitle(value) : getPhoto(value)}
                            </Row>
                        </Card>
                    )
                })}
        </div>
    )
}

PhotoLinks.propTypes = {
    number: PropTypes.number.optional,
    featured: PropTypes.bool.optional,
    alternate: PropTypes.bool.optional
}

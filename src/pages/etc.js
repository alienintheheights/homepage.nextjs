import React, { useEffect } from 'react'
import Head from 'next/head'

import PhotoLinks from '../components/PhotoLinks'

export default function Etc() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="">
            <Head>
                <title>Fauxmat: links, etc.</title>
            </Head>
            <div className="fauxmat-jumbo fauxmat-link-photo">
                Links <small>(with unrelated photos)</small>
            </div>
            <PhotoLinks alternate={false} />
            <div className="fauxmat-disclaimer">
                Note: many of these links go to an S3 bucket on Amazon. Don't mind the strange URLs.
            </div>
        </div>
    )
}

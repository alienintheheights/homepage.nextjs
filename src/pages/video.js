import React, { useEffect } from 'react'
import Head from 'next/head'

import VideoLinks from '../components/VideoLinks'

export default function Video() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="">
            <Head>
                <title>Fauxmat: video</title>
            </Head>
            <div className="fauxmat-jumbo">Videos</div>
            <VideoLinks />
        </div>
    )
}

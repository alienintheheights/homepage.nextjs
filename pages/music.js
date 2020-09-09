import React, {  useEffect }  from 'react'
import Head from 'next/head'

import Bandcamp from '../components/Bandcamp'
import MusicLinks from '../components/MusicLinks'

export default function Music() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className=''>
            <Head>
                    <title>Fauxmat: music</title>
            </Head>
            <div className='fauxmat-jumbo fauxmat-music-photo'>
                Solos and Collaborations
            </div>
            <div className=''>
                <Bandcamp/>
                <MusicLinks/>
            </div>
        </div>
    )
}
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Welcome from '../components/Welcome'
import PhotoLinks from '../components/PhotoLinks'
import MusicLinks from '../components/MusicLinks'
import Bandcamp from '../components/Bandcamp'
import About from '../components/About'

export default function Home() {
    const router = useRouter()
    const { rd } = router.query
    console.log('received rd', rd)
    if (rd) {
        router.push(rd)
    }
    return (
        <div id="fauxmat-home">
            <Head>
                <title>Hi there!</title>
                <link rel="icon" href="/favicon.ico" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: ` window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
            
                  gtag('config', 'UA-177463739-1');
                  window.addEventListener("hashchange", e => {
                    if (window.location.hash === '#!' || window.location.hash === '#') {
                      gtag('config', 'UA-177463739-1', {
                              'page_path': location.pathname + location.search
                      });
                    } else {
                      gtag('config', 'UA-177463739-1', {
                              'page_path': location.pathname + location.search + location.hash
                      });
                    };
                  });`
                    }}
                />
            </Head>
            <Welcome />
            <About />
            <MusicLinks number="1" hideTitle={true} />
            <PhotoLinks number="1" />
            <div className="fauxmat-pad"></div>
            <Bandcamp hideTitle={true} />
        </div>
    )
}

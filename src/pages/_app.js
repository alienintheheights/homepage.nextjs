import React from 'react'
import { Container } from 'react-bootstrap'

import Head from 'next/head'
import NavHome from '../components/NavHome'
import Footer from '../components/Footer'

import 'bootstrap/dist/css/bootstrap.css'
import '../scss/main.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
    return (
        <div id="root">
            <Head>
                <title>Hi there!</title>
                <link rel="icon" href="/favicon.ico" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: ` window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-177463739-1'); `
                    }}
                />
            </Head>
            <div className="fauxmat-main">
                <div id="fauxmat-root">
                    <Container>
                        <NavHome />
                        <Component {...pageProps} />
                        <Footer />
                    </Container>
                </div>
            </div>
        </div>
    )
}
export default MyApp

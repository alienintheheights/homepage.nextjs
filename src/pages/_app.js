import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import Head from 'next/head'
import NavHome from '../components/NavHome'
import Footer from '../components/Footer'

import 'bootstrap/dist/css/bootstrap.css'
import '../scss/main.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import { GA_TRACKING_ID } from '../constants'
function MyApp({ Component, pageProps }) {
    return (
        <div id="root">
            <Head>
                <title>Hi there!</title>
                <link rel="icon" href="/favicon.ico" />
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                        });
                        `
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

MyApp.propTypes = {
    Component: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired
}

export default MyApp

import 'bootstrap/dist/css/bootstrap.css'
import '../scss/main.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import React from 'react'
import { Container } from 'react-bootstrap'

import NavHome from '../components/NavHome'
import Footer from '../components/Footer'

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
    return (
        <div id="root">
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

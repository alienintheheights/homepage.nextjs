import "bootstrap/dist/css/bootstrap.css";
import '../scss/main.scss'

import {Container} from 'react-bootstrap'

import NavHome from '../components/NavHome'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div id='fauxmat-root'>
      <Container>
        <NavHome/>
        <Component {...pageProps} />
      </Container>
      <Footer/>
    </div>
  )
}

export default MyApp

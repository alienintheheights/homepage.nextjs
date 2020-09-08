import React from 'react'
import Welcome from '../components/Welcome'
import PhotoLinks from '../components/PhotoLinks'
import MusicLinks from '../components/MusicLinks'
import Bandcamp from '../components/Bandcamp'
import About from '../components/About'

export default function OldHome() {
    return (
        <div id='fauxmat-home'>
            <Welcome/>
            <About/>
            <MusicLinks number='1' hideTitle={true} />
            <PhotoLinks number='1'/>
            <div className='fauxmat-pad'></div>
            <Bandcamp hideTitle={true} />
        </div>)
}
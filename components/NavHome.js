import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import Social from './Social'

export default function NavHome() {
    const linkClass = 'fauxmat-navspacing nav-link'
    return (
        <Navbar id='fauxmat-navcenter'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <span>
                    <Nav className="mr-auto">
                        <Link href="/">
                            <a className={linkClass}>Home</a>
                        </Link>
                        <Link href="/blog">
                            <a className={linkClass}>Blog</a>
                        </Link>
                        <Link href="/music">
                            <a className={linkClass}>Music</a>
                        </Link>
                        <Link href="/video">
                            <a className={linkClass}>Video</a>
                        </Link>
                        <Link href="/etc">
                            <a className={linkClass}>Etc</a>
                        </Link>
                    </Nav>
                </span>
                <span id='fauxmat-nav-social'><Social/></span>
            </Navbar.Collapse>
        </Navbar>    
    )
}                                                                                                
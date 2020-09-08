import React from 'react'

import { Row, Col } from 'react-bootstrap'

import Link from 'next/link'
import { WP_POSTS_URL } from '../constants'

export default function Blog({ posts }) {
    
    return (
        <div id='fauxmat-postgrid'>
            <Row>
                {posts && posts.map((post, index) => {
                    const divStyle = {
                        backgroundRepeat : 'no-repeat',
                        backgroundSize   : 'cover',
                        backgroundImage  : 'url(' + (post['_embedded']['wp:featuredmedia'] ? post['_embedded']['wp:featuredmedia'][0].source_url : '') + ')'
                    }
                    return (
                        <Link href="/post/[id]" as={`/post/${post.id}`}>
                            <Col sm={12} md={6} 
                            className='fauxmat-grid-card' 
                                key={`post-${index}`}
                                style={divStyle}
                            >
                                <div className='fauxmat-post-masthead-list'>
                                    <div className='fauxmat-post-title-large' dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                                </div>
                            </Col> 
                        </Link>
                    )})}
            </Row>    
        </div>
    )
}


  // This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch(WP_POSTS_URL + 1)
    const posts = await res.json()
  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }
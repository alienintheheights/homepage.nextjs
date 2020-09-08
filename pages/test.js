import { Button, Row, Col } from 'react-bootstrap'

export const WP_PER_PAGE = 4
export const WP_BASE_URL = '/press/wp-json/wp/v2'
export const WP_POSTS_URL =  WP_BASE_URL + '/posts?_embed=1&per_page=' + WP_PER_PAGE + '&page='
export const WP_POST_URL =  WP_BASE_URL + '/posts/'
export const WP_COMMENTS_URL = WP_BASE_URL + '/comments?per_page=100&post='

function Blog({ posts }) {
    console.log(posts)
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
                    <Col sm={12} md={6} 
                        onClick={() => handleOpen(post.id)} 
                        className='fauxmat-grid-card' 
                        key={`post-${index}`}
                        style={divStyle}
                    >
                        <div className='fauxmat-post-masthead-list'>
                            <div className='fauxmat-post-title-large' dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                        </div>
                    </Col> 
                )})}
        </Row>    
    </div>
    )
  }

  // This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://andrewlienhard.io' + WP_POSTS_URL + 1)
    const posts = await res.json()
  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }
  
  export default Blog
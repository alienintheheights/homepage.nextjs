import React, {  useEffect, useRef } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import 'moment-timezone'
import { sortBy } from 'lodash'

import LoadingIndicator from '../../components/LoadingIndicator'
import { WP_POSTS_URL, WP_POST_URL, WP_COMMENTS_URL } from '../../constants'

export default function Post({ post, comments}) {
    const router = useRouter();

    if (router.isFallback) {
      return <LoadingIndicator/>
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const commentRef = useRef(null)
    const scrollToBottom = () => {
        commentRef.current.scrollIntoView({
            behavior : 'smooth'
        })
    }
    const postRef = useRef(null)
    const scrollToTop = () => {
        postRef.current.scrollIntoView({
            behavior : 'smooth'
        })
    }

    const getTitle = (currentPost) => {
        return (
            <div ref={postRef} className='fauxmat-post-masthead'>
                <Head>
                    <title>{currentPost.title.rendered}</title>
                </Head>
                <div id='fauxmat-post-title' 
                    dangerouslySetInnerHTML={{__html: currentPost.title.rendered}} />
                <div id='fauxmat-post-masthead-image' style={getMastImage(currentPost)} />         
                <div id='fauxmat-post-author'>
                    {currentPost['_embedded']['author'][0] && (
                        <span>
                            <img className='fauxmat-post-author-avatar' alt='avatar' src={currentPost['_embedded']['author'][0].avatar_urls[48]}/>
                            {currentPost['_embedded']['author'][0].name}
                        </span>
                    )}
                    <span className='fauxmat-post-date'>
                        <Moment format='MMMM D, YYYY'>{post.date}</Moment>
                    </span>
                </div>

                <div id='fauxmat-post-comment-teaser'>
                    {(comments.length>0) && (<span>
                        <div onClick={() => scrollToBottom()}>Comments ({comments.length})</div>
                    </span>)}
                    {(post.modified !== post.date) && <span>last updated <Moment format='MMMM D, YYYY' date={post.modified}/></span>}
                </div>
               
            </div>
        ) 
    }

    const getMastImage = (currentPost) => {
        return {
            backgroundRepeat   : 'no-repeat',
            backgroundSize     : 'cover',
            backgroundPosition : 'center',
            backgroundImage    : 'url(' + currentPost['_embedded']['wp:featuredmedia'][0].source_url + ')'
        }
    }

    const getComment = (thread) => {
        return  (
            <div key={`comment-${thread.id}`} className='fauxmat-comment-body-wrapper'>
                <div className='fauxmat-comment-post-author'>
                    {thread.author_url && <a href={thread.author_url}><img className='fauxmat-post-author-avatar' alt='avatar' src={thread.author_avatar_urls[48]}/></a>}
                    {!thread.author_url && <img className='fauxmat-post-author-avatar' alt='avatar' src={thread.author_avatar_urls[48]}/>}
                    {thread.author_name}
                </div>
                <div className='fauxmat-post-date'>
                    <Moment format='MMMM D, YYYY hh:mm:ss A' date={thread.date}/>
                </div>
                <div className='fauxmat-comment-body' dangerouslySetInnerHTML={{__html: thread.content.rendered}}/>
            </div>
        ) 
    }
                
    const singleComment = comments.length > 1
    const commentMessage = (!singleComment ? '' : comments.length) + ' Comment' + (singleComment ? 's': '') 
    return (
        <div id='fauxmat-post'>
            {post && post.title && 
                <div id='fauxmat-post-inner'>
                    <div className='fauxmat-post-title-wrapper'>
                        <span>{getTitle(post)}</span>
                    </div>
                    <div id='fauxmat-post-content-wrapper'>
                        <div id='fauxmat-post-content' dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                     
                        {comments.length>0 && <div ref={commentRef}  id='fauxmat-post-comments-wrapper'>
                            <h2>{comments.length && commentMessage}</h2>
                            <div id='fauxmat-post-comments-replies'>
                                {comments.filter(c => c.parent === 0).map((thread, index) => {
                                    const childThreads = comments.filter(c => c.parent === thread.id)
                                    if (childThreads.length) {
                                        return (
                                            <div key={`comment-parent-${thread.id}`}>
                                                {getComment(thread)}
                                                <div className='fauxmat-post-reply-thread'>
                                                    {childThreads.map(subthread => {
                                                        return (
                                                            getComment(subthread)
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return getComment(thread)
                                    }
                                   
                                })}
                            </div>
                        </div>}
                        <div id='fauxmat-post-comment-teaser' onClick={() => scrollToTop()}>Top</div>
                    </div>
                </div>}
        </div>
    )
}

// for /post/[postId]
export const getStaticPaths = async () => {
     // Call an external API endpoint to get posts
     const res = await fetch(WP_POSTS_URL + 1)
     const posts = await res.json()
     
     const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: false }

 
 }

  // This function gets called at build time
  export const getStaticProps = async ({ params }) => {
    // you have access to the postId params that you returns from
    // getStaticPaths here
    const postId = params.id 

    // Call an external API endpoint to get posts
    const res = await fetch(WP_POST_URL  + postId + '?_embed=1')
    const post = await res.json()
  
    const commentsRes = await fetch(WP_COMMENTS_URL + postId)
    const commentsRaw = await commentsRes.json()
    const comments = sortBy(commentsRaw, ['parent', 'date'])

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        post,
        comments
      },
    }
  }
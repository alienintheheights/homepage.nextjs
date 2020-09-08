import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

const useInfiniteScroll = (callback) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log('scroll effect called')
        const debounceWrapper = debounce(handleScroll, 300)
        window.addEventListener('scroll', debounceWrapper)
        return () => {
            window.removeEventListener('scroll', debounceWrapper)
        }
    }, [])

    useEffect(() => {
        console.log('effect called')
        if (!isLoading) return
        callback(() => {
            console.log('called back')
        })
    }, [isLoading])


    function handleScroll() {
        const offsetHeight = document.documentElement.offsetHeight
        const innerHeight = window.innerHeight
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        
        console.log(offsetHeight, innerHeight, scrollTop)
        if (isLoading || innerHeight < scrollTop)
            return
        console.log('made it')
       
        setIsLoading(true)
    }


    return [isLoading, setIsLoading]
}

export default useInfiniteScroll
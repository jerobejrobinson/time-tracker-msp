import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
export default function Breadcrumbs() {
    const {pathname} = useLocation()
    const [url, setUrl] = useState(pathname)
    useEffect(() => {
        setUrl(prev => {
            const removed = prev.split('/').slice(0, -1)
            // console.log(prev)
            console.log(removed)
            return prev
        })
        console.log(url)
    }, [])
    // const paths = pathname.split('/').pop()
    // console.log(pathname)
    return (
        <div className="breadcrumbs">
            here
        </div>
    )
}
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import DOMPurify from 'dompurify';
import { BACKEND_URL } from "../../../constants/Constants";

const BlogPostDisplay = () => {
    const {id} = useParams()
    const [post, setPost] = useState("")

    useEffect(() => {
        axios.get(`${BACKEND_URL}/portfolio/api/v1/blog/posts/${id}`)
        .then((res) => {
            setPost(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    return <div className="flex flex-col gap-6 my-8">

        <div className="text-4xl text-center font-bold">{post.title}</div>

        <img src={post.main_image_source} alt={post.title} className="max-h-96 object-contain"/>

        <div className="flex flex-col gap-2">
            <div className="text-3xl font-semibold">TLTR;</div>
            <div className="txt-md">{post.description}</div>
        </div>
        
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.post_contents)}}></div>

    </div>
}

export default BlogPostDisplay
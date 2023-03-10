
import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

import { LoadingContext } from "../context/loading.context"
import { postt } from "../services/authService"

const EditPost = () => {

    const [ file, setFile ] = useState([])

    const { post, setPost, getPost, posts, setPosts } = useContext(LoadingContext)

    const { id } = useParams()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPost((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        handleUpload()
            .then((response) =>  {
                postt(`/posts/edit-post/${post._id}`, {...post, postImages: response})
                    .then((results) => {
                        let newPosts = [...posts]
                        setPosts(newPosts)
                        navigate(`/post-details/${results.data._id}`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async() => {
        try {
            const uploadData = new FormData()
            uploadData.append('postImages', file)
            const response = await axios.post('https://priceit.fly.dev/posts/upload-image', uploadData)
            console.log(response)
            return(response.data.url)
        } catch (error) {
            console.log(error)
        }
    }
 
    useEffect(() => {
        if(!post){
            getPost(id)
        }
    }, [])

    return(
        <div className="post-details-organization" >
            <h1>Edit Post</h1>

            {
                post ?
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="edit-post-details" >
                            <span>Post Image <input type='file' name="postImages" onChange={handleFile} /></span>

                            <span>Title <input type='text' name="title" value={post.title} onChange={handleChange} /></span>

                            <span>Price <input type='number' name='price' value={post.price} onChange={handleChange} /></span>

                            <span>Condition <input type='text' name='condition' value={post.condition} onChange={handleChange} /></span>

                            <span>Description <textarea name="description" value={post.description} onChange={handleChange} /></span>
                            
                            <button type="submit" className="edit-post-button" ><h4>Update Item</h4></button>
                        </div>

                    </form>
                </div>
                : <h4>Loading...</h4>
            }
        </div>
    )
}

export default EditPost
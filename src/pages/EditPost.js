
import { useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { postt } from "../services/authService"

const EditPost = () => {

    const { post, setPost, getPost, posts, setPosts } = useContext(LoadingContext)

    const { id } = useParams()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPost((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postt(`/posts/edit-post/${post._id}`, post)
            .then((results) => {
                let newPosts = [...posts]
                setPosts(newPosts)
                navigate(`/post-details/${results.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }
 
    useEffect(() => {
        if(!post){
            getPost(id)
        }
    }, [])

    return(
        <div>
            <h1>Edit Post</h1>

            {
                post ?
                <div>
                    <img src={post.postImages} height={"500px"} />
                    
                    <form onSubmit={handleSubmit} >
                        
                        <input type='text' name="title" value={post.title} onChange={handleChange} />
                        <br/>
                        <input type='number' name='price' value={post.price} onChange={handleChange} />
                        <br/>
                        <textarea name="description" value={post.description} onChange={handleChange} />
                        <br/>
                        <input type='text' name='condition' value={post.condition} onChange={handleChange} />
                        <br/>
                        <button type="submit" >Update Item</button>
                    </form>
                </div>
                : <h4>Loading...</h4>
            }
        </div>
    )
}

export default EditPost
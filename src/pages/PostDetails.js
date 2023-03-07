
import { useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { get } from "../services/authService"

const PostDetails = () => {

    const { user, post, getPost, posts, setPosts } = useContext(LoadingContext)

    const { id } = useParams()

    const navigate = useNavigate()

    const checkOwner = (postOwner, userId) => {
        return (postOwner === userId)
    }

    const handleDelete = () => {
        get(`/posts/delete-post/${post._id}`, posts)
            .then((results) => {
                let newPosts = [...posts]
                newPosts.splice( newPosts.findIndex((newPost) => newPost._id === results.data._id ) , 1 )
                setPosts(newPosts)

                navigate(`/selling/${user._id}`)
            })
    }

    useEffect(() => {
        if(!post){
            getPost(id)
        }
    }, [])

    return(
        <div>
            <h1>PostDetails</h1>

            {
                post ?
                <div>
                    <h2>{post.title}</h2>
                    <img src={post.postImages} width={"500px"} />
                    <h2>${post.price}</h2>
                    <h4>{post.description}</h4>
                    <h5>{post.condition}</h5>

                    <br/>
                    {
                        user &&
                        (checkOwner(post.seller._id, user._id)) 
                        && 
                        <div>
                            <button>Edit Post</button>
                            <button onClick={handleDelete} >Delete</button>
                        </div>
                    }
                </div>
                : <h4>Loading...</h4>
            }
        </div>
    )
}

export default PostDetails

import { useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { DateTime, Interval } from "luxon"

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

    const getDiff = (time) => {
        const now = new Date()
        const created = DateTime.fromISO(time)
        const diff = Interval.fromDateTimes(created, now )

        if( Math.ceil(diff.length('days')) === 1 ){
            return `Posted ${Math.ceil(diff.length('hours'))} hours ago `
        } else {
            return `Posted ${Math.ceil(diff.length('days'))} days ago `
        }
      }

    useEffect(() => {
        getPost(id)
    }, [])

    return(
        <div>
            {
                post ?
                <div className="post-details-organization" >
                    <div className="post-details-img" >
                        <img src={post.postImages} width={"500px"} />
                    </div>

                    <div className="post-details" >
                        <h2>{post.title}</h2>
                        <h2>${post.price}</h2>
                        <h3>{getDiff(post.createdAt)}</h3>
                        <h3>Condition: {post.condition}</h3>
                        <h3>Description:</h3>
                        <h4>{post.description}</h4>
                    </div>
                    {   user && 
                        <>
                        {
                            (checkOwner(post.seller._id, user._id)) ?

                            <Link to={`/selling/${user._id}`} ><button>{post.seller.firstName}</button></Link>
                            :
                            <Link to={`/public-profile/${post._id}`} ><button>{post.seller.firstName}</button></Link>
                        }
                        </>
                    }
                    
                    <br/>
                    {
                        user && 
                            <>
                            {
                                (checkOwner(post.seller._id, user._id)) 
                            && 
                            <div>
                                <Link to={`/edit-post/${post._id}`} ><button>Edit Post{post._id}</button></Link>
                                <button onClick={handleDelete} >Delete</button>
                            </div>
                            }
                            </>
                        
                    }
                </div>
                : <h4>Loading...</h4>
            }
        </div>
    )
}

export default PostDetails
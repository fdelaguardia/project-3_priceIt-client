
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
        if(!post){
            getPost(id)
        }
    }, [])

    return(
        <div>
            {
                post ?
                <div>
                    <h2>{post.title}</h2>
                    <img src={post.postImages} width={"500px"} />
                    <h2>${post.price}</h2>
                    <h4>{post.description}</h4>
                    <h5>{post.condition}</h5>
                    <h5>{getDiff(post.createdAt)}</h5>
                    {
                        (checkOwner(post.seller._id, user._id)) ?

                        <Link to={`/selling/${user._id}`} ><button>{post.seller.firstName}</button></Link>
                        :
                        <Link to={`/public-profile/${post._id}`} ><button>{post.seller.firstName}</button></Link>
                    }
                    
                    <br/>
                    {
                        user && 
                            <>
                            {
                                (checkOwner(post.seller._id, user._id)) 
                            && 
                            <div>
                                <Link to={`/edit-post/${post._id}`} ><button>Edit Post</button></Link>
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
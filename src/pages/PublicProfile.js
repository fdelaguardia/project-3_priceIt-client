
import { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

const PublicProfile = () => {

    const { post, posts, setPost, getPost } = useContext(LoadingContext)

    const { id } = useParams()

    useEffect(() => {
        if(!post){
            getPost(id)
        }
    }, [])

    return(
        <div>
            <h1>Public Profile</h1>

            <hr/>
            <h3>{post.seller._id}</h3>
            <h3>{post.seller.firstName}</h3>
            <h3>Contact Info: {post.seller.email}</h3>
            <hr/>

            <div className="posts-organization" >{
                posts ?
                <>
                    {
                        posts.map((matchingPost) => {
                            if(matchingPost.seller._id === post.seller._id){
                                return (<Link key={matchingPost._id} onClick={() => setPost(matchingPost)} to={`/post-details/${matchingPost._id}`} className='posts-link' >
                                            <div className="posts-display" >
                                                <div className="img-div" >
                                                    <img src={matchingPost.postImages} alt="post" width='300px' />
                                                </div>
                                                <div className="p-div" >
                                                    <p>{matchingPost.title}</p>
                                                    <p>${matchingPost.price}</p>
                                                </div>
                                            </div>
                                        </Link>)
                            }
                        })
                    }
                </>
                :
                <h4>Loading...</h4>
            }</div>

        </div>
    )
}

export default PublicProfile
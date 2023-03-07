
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

const Selling = () => {

    const { posts, getPosts, setPost } = useContext(LoadingContext)

    const currentUser = useParams()

    useEffect(() => {
        if (!posts.length) {
            getPosts()
        }
    }, [])

    return(
        <div className="posts-organization" >
            {
                posts ?
                <>
                    {
                        posts.map((post) => {
                            if(post.seller._id === currentUser.id){
                                return (<Link onClick={() => setPost(post)} to={`/post-details/${post._id}`} className='posts-link' >
                                            <div key={post._id} className="posts-display" >
                                                <div className="img-div" >
                                                <img src={post.postImages} alt="post" width='300px' />
                                                </div>
                                                <div className="p-div" >
                                                    <p>{post.title}</p>
                                                    <p>${post.price}</p>
                                                </div>
                                            </div>
                                        </Link>)
                            }
                        })
                    }
                </>
                :
                <h4>Loading...</h4>
            }
        </div>
    )
}

export default Selling
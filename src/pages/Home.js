
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { LoadingContext } from "../context/loading.context"

const Home = () => {

    const { posts, getPosts, setPost } = useContext(LoadingContext)

    useEffect(() => {
        if(!posts.length){
            getPosts()
        }
    }, [posts])

    return(
        <div className="posts-organization" >
            {
                posts ?
                <>
                    {
                        posts.map((post) => {
                            return (<Link onClick={() => setPost(post)} to={`/post-details/${post._id}`} className='posts-link' >
                                        <div key={post._id} className="posts-display" >
                                            <div className="img-div" >
                                                <img src={post.postImages} alt="post"/>
                                            </div>
                                            <div className="p-div" >
                                                <p>{post.title}</p>
                                                <p>${post.price}</p>
                                            </div>
                                        </div>
                                    </Link>)
                        })
                    }
                </>
                :
                <h4>Loading...</h4>
            }
        </div>
    )
}

export default Home
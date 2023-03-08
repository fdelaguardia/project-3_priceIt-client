
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

const Home = () => {

    const { posts, getPosts, setPost } = useContext(LoadingContext)

    const [ searchTerm, setSearchTerm ] = useState('')

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        if(!posts.length){
            getPosts()
        }
    }, [posts])
    
    let filteredPosts = searchTerm ? [...posts].filter((post) => {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase())
    }) : [...posts]

    return(
        <div>
            <form onSubmit={(e) => e.preventDefault()} >
                <input className="searchBar" type='text' name="searchTerm" value={searchTerm} onChange={handleChange} placeholder="Search Items" />
            </form>
            <div className="posts-organization" >
                {
                    !filteredPosts.length && <p>No items found</p>
                }
                {
                    posts ?
                    <>
                        {
                            filteredPosts.map((post) => {
                                return (<Link key={post._id} onClick={() => setPost(post)} to={`/post-details/${post._id}`} className='posts-link' >
                                            <div className="posts-display" >
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
        </div>
    )
}

export default Home
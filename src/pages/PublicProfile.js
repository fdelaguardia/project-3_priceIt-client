
import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { postt } from "../services/authService"

const PublicProfile = () => {

    const [ newReview, setNewReview ] = useState({
        rates: '',
        review: '',
    })

    const { post, posts, setPost, getPost, user, reviews, setReviews } = useContext(LoadingContext)

    const { id } = useParams()

    const handleChange = (e) => {
        setNewReview((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postt(`/reviews/create-review/${post.seller._id}`, newReview)
            .then((results) => {
                let newReviews = [...reviews] 
                newReviews.unshift(results.data)
                console.log(results.data)
                setReviews(newReviews)
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
            <h1>Public Profile</h1>

            <hr/>
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

            
            <details>
                <summary>Reviews</summary>
                <form onSubmit={handleSubmit} >
                    <label>
                        <p>Rate {post.seller.firstName}</p>
                        <select name="rates" value={newReview.rates} onChange={handleChange} >
                            <option value={'1'} >1</option>
                            <option value={'2'} >2</option>
                            <option value={'3'} >3</option>
                            <option value={'4'} >4</option>
                            <option value={'5'} >5</option>
                        </select>
                    </label>
                    <input type='text' name="review" value={newReview.review} onChange={handleChange} placeholder='Write a review' />
                    <button type="submit" >Send</button>
                </form>

                {
                    reviews ?
                    <>
                        {reviews.map((foundReview) => {
                            return (
                                <div key={foundReview._id} >
                                    <p>{user.firstName}</p>
                                    <p>Rating: {foundReview.rates}</p>
                                    <p>{foundReview.review}</p>
                                </div>
                            )
                        })}
                    </>
                    : <h4>No Reviews Found</h4>
                }

            </details>

        </div>
    )
}

export default PublicProfile
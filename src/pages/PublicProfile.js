
import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { postt } from "../services/authService"

const PublicProfile = () => {

    const [ newReview, setNewReview ] = useState({
        rates: '★☆☆☆☆',
        review: '',
    })

    const { post, posts, setPost, getPost, user, reviews, setReviews, getReviews } = useContext(LoadingContext)

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
        getPost(id)
    }, [])

    

    return(
        <div className="post-details-organization" >
            <div className="public-details" >
                {
                    post &&
                    <>
                        <h3>{post.seller.firstName} {post.seller.lastName}</h3>
                        <div className="post-details-user-img" ><img src={post.seller.profileImage} alt="profile" /></div>
                        <h3>Location: {post.seller.city}, {post.seller.state} </h3>
                        <h3>Contact Info: {post.seller.email}</h3>
                    </>
                }
            </div>

            <div className="posts-organization" >{
                posts ?
                <>
                    {
                        posts.map((matchingPost) => {
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
                        })
                    }
                </>
                :
                <h4>Loading...</h4>
            }</div>

            
            <details className="public-reviews" >
                <summary>Reviews</summary>
                
                <form onSubmit={handleSubmit} >
                    <label>
                        <span className='public-form' >Rate {post && post.seller.firstName} </span>
                        <select name="rates" value={newReview.rates} onChange={handleChange} >
                            <option value={'★☆☆☆☆'} >1</option>
                            <option value={'★★☆☆☆'} >2</option>
                            <option value={'★★★☆☆'} >3</option>
                            <option value={'★★★★☆'} >4</option>
                            <option value={'★★★★★'} >5</option>
                        </select>
                    </label><br/>
                    <div className="public-form-span" >
                        <input type='text' name="review" value={newReview.review} onChange={handleChange} placeholder='Write a review' />
                        <button type="submit" >Send</button>
                    </div>

                </form>

                <main className="public-reviews-main scroll" >
                    {
                        reviews ?
                        <>
                            {reviews.map((foundReview) => {
                                return (
                                    <div key={foundReview._id} >
                                        <p>Rating: <span>{foundReview.rates}</span></p>
                                        <p>{foundReview.review}</p>
                                    </div>
                                )
                            })}
                        </>
                        : <h4>No Reviews Found</h4>
                    }
                </main>
            </details>

        </div>
    )
}

export default PublicProfile
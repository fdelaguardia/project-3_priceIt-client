
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { postt } from "../services/authService"

const NewPost = () => {

    const { user, posts, setUser, setPosts } = useContext(LoadingContext)

    const navigate = useNavigate()

    const [ newPost, setNewPost ] = useState(
        {
            title: '',
            description: '',
            price: '',
            condition: '',
            postImages: '',
        }
    )

    const handleChange = (e) => {
        setNewPost((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postt(`/posts/create-post/${user._id}`, newPost)
            .then((results) => {
                console.log(results.data)
                let newPosts = [...posts]
                newPosts.unshift(results.data)
                setPosts(newPosts)

                let newUser = Object.assign({}, user)
                newUser.posts.push(results.data)
                setUser(newUser)

                console.log(results.data)

                navigate(`/post-details/${results.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return(
        <div className="profile-outer" >
            <h2>Add Item</h2>
            {
                user ?
                    <form onSubmit={handleSubmit}>
                        <div className="new-item-info" >
                            <label>Post Images
                            <input type='text' name='postImages' value={newPost.postImages} onChange={handleChange} />
                            </label>
                            <label>Title
                            <input type='text' name='title' value={newPost.title} onChange={handleChange} />
                            </label>
                            <label>Price
                            <input type='number' name='price' value={newPost.price} onChange={handleChange} />
                            </label>
                            <label>Description
                            <textarea name='description' value={newPost.description} onChange={handleChange} rows={10} cols={22} />
                            </label>
                            <label>Condition
                            <input type='text' name='condition' value={newPost.condition} onChange={handleChange} />
                            </label>
                        </div>

                        <button type="submit" className="new-item-button" ><h4>Submit</h4></button>
                    </form>
                :
                    <h4>Loading...</h4>
            }
        </div>
    )
}

export default NewPost
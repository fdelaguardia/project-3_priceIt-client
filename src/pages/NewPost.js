
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { post } from "../services/authService"

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

        post(`/posts/create-post/${user._id}`, newPost)
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
        <div>
            <h1>New Post</h1>
            {
                user ?
                    <form onSubmit={handleSubmit}>

                        <label>Title</label>
                        <input type='text' name='title' value={newPost.title} onChange={handleChange} />
                        <br/>
                        <label>Price</label>
                        <input type='number' name='price' value={newPost.price} onChange={handleChange} />
                        <br/>
                        <label>Description</label>
                        <textarea name='description' value={newPost.description} onChange={handleChange} />
                        <br/>
                        <label>Condition</label>
                        <input type='text' name='condition' value={newPost.condition} onChange={handleChange} />
                        <br/>
                        <label>Post Images</label>
                        <input type='text' name='postImages' value={newPost.postImages} onChange={handleChange} />
                        <br/>
                        <button type="submit">Add Item</button>
                    </form>
                :
                    <h4>Loading...</h4>
            }
        </div>
    )
}

export default NewPost
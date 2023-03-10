
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { postt } from "../services/authService"
import axios from "axios"

const NewPost = () => {

    const [ file, setFile ] = useState([])

    const { user, posts, setUser, setPosts } = useContext(LoadingContext)

    const navigate = useNavigate()

    const [ newPost, setNewPost ] = useState(
        {
            title: '',
            description: '',
            price: '',
            condition: '',
        }
    )

    const handleChange = (e) => {
        setNewPost((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        handleUpload()
            .then((response) => {
                postt(`/posts/create-post/${user._id}`, {...newPost, postImages: response})
                    .then((results) => {
                        console.log(results.data)
                        navigate(`/post-details/${results.data._id}`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async() => {
        try {
            const uploadData = new FormData()
            uploadData.append('profileImage', file)
            const response = await axios.post('https://priceit.fly.dev/auth/upload-image', uploadData)
            console.log(response)
            return(response.data.url)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="profile-outer" >
            <h2>Add Item</h2>
            {
                user ?
                    <form onSubmit={handleSubmit}>
                        <div className="new-item-info" >
                            <label>Post Images
                            <input type='file' name='postImages' value={newPost.postImages} onChange={handleFile} />
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
                            <button type="submit" className="new-item-button" ><h4>Submit</h4></button>
                        </div>

                    </form>
                :
                    <h4>Loading...</h4>
            }
        </div>
    )
}

export default NewPost
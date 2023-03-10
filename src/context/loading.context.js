import { useState, createContext } from "react";
import { get } from "../services/authService";

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [ isLoading, setIsLoading ] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState('')

    const [ reviews, setReviews ] = useState([])
    const [ posts, setPosts ] = useState([])
    const [ post, setPost ] = useState(null)


    const setTimedMessage = (newMessage) => {
        setMessage(newMessage);
        setTimeout(() => {
            setMessage('')
        }, 4000)
    }

    const getPosts = () => {
        get('/posts')
            .then((results) => {
                setPosts(results.data)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getPost = (id) => {
        get(`/posts/post-detail/${id}`)
            .then((results) => {
                console.log("reults data: ", results.data)
                setPost(results.data)
                setReviews(results.data.seller.reviews)
                setPosts(results.data.seller.posts)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getReviews = (id) => {
        get(`/reviews/${id}`)
            .then((results) => {
                console.log("reults data: ", results.data)
                setReviews(results.data)
            })
            .catch((err) => {
                console.log("error: ", err)
            })
    }

    return (
        <LoadingContext.Provider value={{ getReviews, reviews, setReviews, posts, post, isLoading, message, setUser, user, setPost, setPosts, setIsLoading, setMessage, setTimedMessage, getPosts, getPost  }} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }
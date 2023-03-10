
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"
import { postt } from "../services/authService"
import axios from "axios"

const EditAccount = () => {

    const [ file, setFile ] = useState([])

    const { user, setUser } = useContext(LoadingContext)
    const { authenticateUser } = useContext(AuthContext) 

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        handleUpload()
            .then((response) => {
                postt(`/users/edit-profile/${user._id}`, {...user, profileImage: response})
                    .then((results) => {
                        setUser(results.data)
                        navigate(`/profile/${user._id}`)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    .finally(() => {
                        authenticateUser()
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
            const response = await axios.post('https://priceit.fly.dev/users/upload-image', uploadData)
            console.log(response)
            return(response.data.url)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="profile-outer" >
            {
                user &&
                <>
                    <div className="profile-img-edit" >
                        <img src={user.profileImage} alt='profile' />
                    </div>
                </>
            }
            {
                user &&
                <>
                    <form onSubmit={handleSubmit} >
                        <div className="profile-info-edit" >
                            <span>Profile Image <input type='file' name='profileImage' onChange={handleFile} /></span>
                            
                            <span>First Name <input type='text' name='firstName' value={user.firstName} onChange={handleChange} /></span>
                            
                            <span>Last Name <input type='text' name='lastName' value={user.lastName} onChange={handleChange} /></span>
                            
                            <span>Email <input type='email' name='email' value={user.email} onChange={handleChange} /></span>
                            
                            <span>State <input type='text' name='state' value={user.state} onChange={handleChange} /></span>
                            
                            <span>City <input type='text' name='city' value={user.city} onChange={handleChange} /></span>
                            
                            <button className="profile-button" type="submit" ><h4>Edit Account</h4></button>
                        </div>

                    </form>
                </>
                
            }
        </div>
    )
}

export default EditAccount
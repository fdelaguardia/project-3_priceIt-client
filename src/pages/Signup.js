
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { postt } from "../services/authService"
import { AuthContext } from "../context/auth.context"
import axios from 'axios'

const Signup = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ file, setFile ] = useState([])

    const [ newUser, setNewUser ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        state: "",
        city: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
       handleUpload()
            .then((response) => {
                postt('/auth/signup',  {...newUser, profileImage: response})
            })
            .then((results) => {
                console.log("Created User", results)
                navigate(`/login`)
              
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                authenticateUser()
            }) 
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async() => {
        try {
            const uploadData = new FormData()
            uploadData.append('profileImage', file)
            const response = await axios.post('http://localhost:4000/auth/upload-image', uploadData)
            console.log(response)
            return(response.data.url)
        } catch (error) {
            console.log(error)
        }
    }
 
    return(
        <div className="profile-outer" >
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} >
                <div className="new-item-info" >
                    <label>Profile Image 
                        <input type='file' name="profileImage" onChange={handleFile} />  
                    </label>

                    <label>First Name 
                        <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange} />    
                    </label>

                    <label>Last Name 
                        <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange} />  
                    </label>

                    <label>State 
                        <input type='text' name="state" value={newUser.state} onChange={handleChange} />    
                    </label>

                    <label>City 
                        <input type='text' name="city" value={newUser.city} onChange={handleChange} />  
                    </label>

                    <label>Email 
                        <input type='email' name="email" value={newUser.email} onChange={handleChange} />   
                    </label>

                    <label>Password 
                        <input type='password' name="password" value={newUser.password} onChange={handleChange} />  
                    </label>
                    <button type="submit" className="new-item-button" ><h4>Sign Up</h4></button>
                </div>

            </form>
        </div>
    )
}

export default Signup
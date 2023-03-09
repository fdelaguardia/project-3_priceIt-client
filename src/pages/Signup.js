
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { postt } from "../services/authService"
import { AuthContext } from "../context/auth.context"

const Signup = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ newUser, setNewUser ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        state: "",
        city: "",
        profileImage: "",
        password: "",
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setNewUser((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postt('/auth/signup', newUser)
            .then((results) => {
                console.log("Created User", results.data)
                navigate(`/`)
                localStorage.setItem('authToken', results.data.token )
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                authenticateUser()
            }) 
    }
 
    return(
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} >

                <label>Profile Image </label>
                <input type='text' name="profileImage" value={newUser.profileImage} onChange={handleChange} />
                <br/>
                <label>First Name </label>
                <input type='text' name="firstName" value={newUser.firstName} onChange={handleChange} />
                <br/>
                <label>Last Name </label>
                <input type='text' name="lastName" value={newUser.lastName} onChange={handleChange} />
                <br/>
                <label>State </label>
                <input type='text' name="state" value={newUser.state} onChange={handleChange} />
                <br/>
                <label>City </label>
                <input type='text' name="city" value={newUser.city} onChange={handleChange} />
                <br/>
                <label>Email </label>
                <input type='email' name="email" value={newUser.email} onChange={handleChange} />
                <br/>
                <label>Password </label>
                <input type='password' name="password" value={newUser.password} onChange={handleChange} />
                <br/>
                <button type="submit" >Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
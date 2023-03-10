
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { postt } from "../services/authService"

const Login = () => {

    const { authenticateUser } = useContext(AuthContext)

    const [ thisUser, setThisUser ] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setThisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postt('/auth/login', thisUser)
            .then((results) => {
                localStorage.setItem('authToken', results.data.token )
                navigate(`/`)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                authenticateUser()
            })
    }

    return(
        <div className="profile-outer" >
            <h2>Login</h2>
            <form onSubmit={handleSubmit} >
                <div className="new-item-info" >
                    <label>Email
                        <input type='email' name="email" value={thisUser.email} onChange={handleChange} />
                    </label>

                    <label>Password
                        <input type='password' name="password" value={thisUser.password} onChange={handleChange} />
                    </label>
                    <button type="submit" className="new-item-button" ><h4>Login</h4></button>
                </div>
                
            </form>
        </div>
    )
}

export default Login
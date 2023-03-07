
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { post } from "../services/authService"

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

        post('/auth/login', thisUser)
            .then((results) => {
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >

                <label>Email</label>
                <input type='email' name="email" value={thisUser.email} onChange={handleChange} />

                <label>Password</label>
                <input type='password' name="password" value={thisUser.password} onChange={handleChange} />
                
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
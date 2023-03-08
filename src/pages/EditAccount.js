
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"
import { postt } from "../services/authService"

const EditAccount = () => {

    const { user, setUser } = useContext(LoadingContext)
    const { authenticateUser } = useContext(AuthContext) 

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postt(`/users/edit-profile/${user._id}`, user)
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
    }

    return(
        <div>
            <h1>Edit Account Info</h1>
            {
                user &&
                <>
                    <form onSubmit={handleSubmit} >

                        <input type='text' name='firstName' value={user.firstName} onChange={handleChange} />
                        <br/>

                        <button type="submit" >Submit</button>
                    </form>
                </>
                
            }
        </div>
    )
}

export default EditAccount

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
        <div className="profile-outer" >
            <h2>Edit Account Info</h2>
            {
                user &&
                <>
                    <div className="profile-img-edit" >
                        <img src={user.profileImage} alt='profile' />
                    </div>
                    {/* <form onSubmit={(e) => e.preventDefault()} >
                        <input type='text' name='profileImage' value={user.profileImage} onChange={handleImageChange} />
                    </form> */}
                </>
                
            }
            {
                user &&
                <>
                    <form onSubmit={handleSubmit} >
                        <div className="profile-info-edit" >
                            <span>Profile Image <input type='text' name='profileImage' value={user.profileImage} onChange={handleChange} /></span>
                            
                            <span>First Name <input type='text' name='firstName' value={user.firstName} onChange={handleChange} /></span>
                            
                            <span>Last Name <input type='text' name='lastName' value={user.lastName} onChange={handleChange} /></span>
                            
                            <span>Email <input type='email' name='email' value={user.email} onChange={handleChange} /></span>
                            
                            <span>State <input type='text' name='state' value={user.state} onChange={handleChange} /></span>
                            
                            <span>City <input type='text' name='city' value={user.city} onChange={handleChange} /></span>
                            
                        </div>

                        <button className="profile-button" type="submit" ><h4>Submit</h4></button>
                    </form>
                </>
                
            }
        </div>
    )
}

export default EditAccount
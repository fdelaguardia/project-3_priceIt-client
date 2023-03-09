
import { useContext } from "react"
import { Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

const Account = () => {

    const { user } = useContext(LoadingContext)

    return(
        <div>
            {
                user &&
                <div className="profile-outer" >
                    <div className="profile-img" >
                        <img src={user.profileImage} alt='profile' />
                    </div>
                    <div className="profile-info" >
                        <h3>{user.firstName} {user.lastName}</h3>
                        <h4>Email:<br/> <u>{user.email}</u></h4>
                        <h4>Location:<br/> <u>{user.city}, {user.state}</u></h4>                        
                    </div>
                        <Link to={`/edit-profile/${user._id}`} className='link-decoration' ><h4 className="profile-h4" >Edit Account Info</h4></Link>

                </div>
                
            }
        </div>
    )
}

export default Account
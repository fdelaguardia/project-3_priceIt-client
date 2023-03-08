
import { useContext } from "react"
import { Link } from "react-router-dom"

import { LoadingContext } from "../context/loading.context"

const Account = () => {

    const { user } = useContext(LoadingContext)
    console.log(user)

    return(
        <div>
            {
                user &&
                <>
                    <h3>{user.firstName}</h3>
                    <h4>{user.email}</h4>

                    <div>
                        <Link to={`/edit-profile/${user._id}`} ><button>Edit Account Info</button></Link>
                    </div>
                </>
                
            }
        </div>
    )
}

export default Account
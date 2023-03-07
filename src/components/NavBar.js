
import { Link } from "react-router-dom"
import { useContext } from "react"
import { LoadingContext } from "../context/loading.context"
import { AuthContext } from "../context/auth.context"

const NavBar = () => {

    const getToken = () => {
        return localStorage.getItem("authToken")
    }

    const { user } = useContext(LoadingContext)
    const { logout } = useContext(AuthContext)

    return(
        <nav className="nav-bar" >

            <Link to={'/'} className='link-decoration' ><h2>Home</h2></Link>

            {
                getToken() ?
                <div className="row" >
                    { user && <Link to={`/profile/${user._id}`}  className='link-decoration' ><h2>Account</h2></Link> }
                    <Link to={'/new-post'}  className='link-decoration' ><h2>Post</h2></Link>
                    { user && <Link to={`/selling/${user._id}`}  className='link-decoration' ><h2>Selling</h2></Link> }
            
                    <button onClick={logout} className='link-decoration' ><h2>Logout</h2></button>
                </div>
                :
                <div>
                    <Link to={'/signup'}  className='link-decoration' ><h2>Sign up</h2></Link>
                    <Link to={'/login'}  className='link-decoration' ><h2>Log in</h2></Link>
                </div>
            }
        </nav>
    )
}

export default NavBar
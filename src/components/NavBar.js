
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
            <div className="home-class" >
                <Link to={'/'} className='link-decoration' ><img src='https://res.cloudinary.com/dq2p3qqqk/image/upload/v1678412615/PriceITlogo_nk2ihf.png' alt="logo" /></Link>
            </div>

            {
                getToken() ?
                <div className="row" >
                    <ul>
                        <li><div className="nav-profile-img" >
                                { user && <img src={user.profileImage} alt='profile' /> }
                            </div>
                            <ul>
                                <li className="select" >
                                    { user && <Link to={`/profile/${user._id}`}  className='link-decoration' ><h3>Account</h3></Link> }
                                    <Link to={'/new-post'}  className='link-decoration' ><h3>Post</h3></Link>
                                    { user && <Link to={`/selling/${user._id}`}  className='link-decoration' ><h3>Selling</h3></Link> }
                                    <button onClick={logout} ><h3>Logout</h3></button>
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                    
                </div>
                :
                <div className="sign-log" >
                    <Link to={'/login'}  className='link-decoration' ><h3 className="log-h3" >Log in</h3></Link>
                    <Link to={'/signup'}  className='link-decoration' ><h3 className="sign-h3" >Sign up</h3></Link>
                </div>
            }
        </nav>
    )
}

export default NavBar
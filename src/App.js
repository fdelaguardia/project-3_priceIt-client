
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Selling from './pages/Selling';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';
import EditAccount from './pages/EditAccount';
import PublicProfile from './pages/PublicProfile';

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to={'/'} />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to={'/'} />
  }

  return (
    <div className="App">
      <NavBar />

      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/post-details/:id' element={<PostDetails/>} />

          <Route element={<LoggedIn/>} >
              <Route path='/new-post' element={<NewPost/>} />
              <Route path='/selling/:id' element={<Selling/>} />
              <Route path='/profile/:id' element={<Account/>} />
              <Route path='/edit-post/:id' element={<EditPost/>} />
              <Route path='/edit-profile/:id' element={<EditAccount/>} />
              <Route path='/public-profile/:id' element={<PublicProfile/>} />
          </Route>

          <Route element={<NotLoggedIn/>} >
              <Route path='/signup' element={<Signup/>} />
              <Route path='/login' element={<Login/>} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;

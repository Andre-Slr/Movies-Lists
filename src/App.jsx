import './css/App.css'
import Home from './pages/Home'
import Profile from './pages/auth/Profile'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import Lists from './pages/Lists'
import ListDetails from './pages/ListDetails'
import ActorDetails from './pages/ActorDetails'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { MovieProvider } from './contexts/MovieContext'
import { ListProvider } from './contexts/ListContext'
import NavBar from './components/NavBar' 

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <ListProvider>
          <NavBar/>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path='/movie_details/:id' element={<MovieDetails />} />
              <Route path='/lists' element={<Lists />} />
              <Route path='/list_details/:id' element={<ListDetails />} />
              <Route path='/actor_details/:id' element={<ActorDetails />} />
            </Routes>
          </main>
        </ListProvider>
      </MovieProvider>
    </UserProvider>
  )
}

export default App

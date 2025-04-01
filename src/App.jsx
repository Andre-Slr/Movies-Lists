import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import Lists from './pages/Lists'
import ListDetails from './pages/ListDetails'
import ActorDetails from './pages/ActorDetails'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import { ListProvider } from './contexts/ListContext'
import NavBar from './components/NavBar' 

function App() {
  return (
    <MovieProvider>
      <ListProvider>
        <NavBar/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path='/movie_details/:id' element={<MovieDetails />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/list_details/:id' element={<ListDetails />} />
            <Route path='/actor_details/:id' element={<ActorDetails />} />
          </Routes>
        </main>
      </ListProvider>
    </MovieProvider>
  )
}

export default App

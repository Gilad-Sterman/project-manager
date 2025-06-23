import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'

import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
import { UserPreview } from './cmps/UserPreview'
import { BoardPage } from './pages/BoardPage'
import { AppHeader } from './cmps/AppHeader'
import { Team } from './pages/Team'

function App() {
  const loggedUser = useSelector(storeState => storeState.userModule.user)

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    })
  }, [])

  return (
    <Router>
      <section className="full-page">
        <AppHeader />
        <section className="main-content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings/" element={<Settings />} />
            <Route path="/team" element={<Team />} />
            <Route path="/boards/:id" element={<BoardPage />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </section>
      </section>
    </Router>
  )
}

export default App

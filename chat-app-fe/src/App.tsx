import Landing from './pages/Landing'
import Room from './pages/Room'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
  )
}

export default App

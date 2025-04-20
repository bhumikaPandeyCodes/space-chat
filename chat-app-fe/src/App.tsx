import Landing from './pages/Landing'
import Room from './pages/Room'
import ChatContainer from './components/Containers/ChatContainer'
import { Provider } from "react-redux";
import store from "./utils/store";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/chat" element={<ChatContainer />} />
      </Routes>
    </Router>
  )
}

export default App

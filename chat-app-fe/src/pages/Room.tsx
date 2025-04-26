import ChatContainer from '@/components/Containers/ChatContainer'
import RoomContainer from '@/components/Containers/RoomContainer'
import { useEffect, useState } from 'react'

const Room = () => {

  const [ws, setWs] = useState<WebSocket | null>(null)
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  useEffect(()=>{
    console.log(ws)
  },[ws])
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-b from-primary-blue to-black px-5'>
      {
        !ws ? <RoomContainer setWs={setWs} setUsername={setUsername} setRoom={setRoom}/>:
        <ChatContainer ws={ws} username={username} room={room}/>
      }
    </div>
  )
}

export default Room

import { DotPattern } from "@/components/magicui/dot-pattern"
import { cn } from "@/lib/utils"
import React, { RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import generateRandomRoom from "@/utils/roomcode"
import { BACKEND_URL } from "@/config"
import { useSelector  } from "react-redux"
import { RootState } from "../../utils/store"
import {  useDispatch } from "react-redux";

interface RoomContainerType{
    setWs : React.Dispatch<SetStateAction<WebSocket | null>>,
    setUsername: React.Dispatch<SetStateAction<string>>
    setRoom: React.Dispatch<SetStateAction<string>>
}

const RoomContainer = ({setWs, setUsername, setRoom}: RoomContainerType) => {

  const roomRef=useRef<HTMLInputElement | null>(null)
  const usernameRef=useRef<HTMLInputElement | null>(null)
  const request = useSelector((state:RootState) => state.request.value);
  const [error, setError] = useState<string | null>(null)
  const [copyText, setCopyText] = useState<"Copy" | "Copied!">("Copy")
  const dispatch = useDispatch()

  useEffect(()=>{

    console.log(request)
    if(roomRef.current){  //checking for inputbox
      if(request=="create"){
        console.log(roomRef.current)
        roomRef.current.value=generateRandomRoom()
        }
    }

  },[])

  function handleSubmit(){
    console.log("clicked")
    const username = usernameRef.current?.value
    const room = roomRef.current?.value
    const reqBody = {type: "connect", payload: {request, username, room}}
    console.log(reqBody)

    const ws = new WebSocket(BACKEND_URL)
    setWs(ws)
    if(username)
      setUsername(username)
    if(room)
      setRoom(room)
    if(ws){
      ws.onopen = ()=>{
        ws.send(JSON.stringify(reqBody))
      }
      ws.onmessage = (event) =>{
        const message = JSON.parse(event.data)
        if(!message.success)
            setError("room code doesn't exist")       
    }
  }
    
  }
  function handleCopy(){
    if(roomRef.current){
      setCopyText("Copied!")
    navigator.clipboard.writeText(roomRef.current?.value)
    setTimeout(() => {
    setCopyText("Copy")
    }, 1000);
    }
    
  }

  return (
    <div className='h-screen  flex flex-col  items-center bg-gradient-to-b from-primary-blue to-black px-5 py-40'>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)]  ",
        )}
      />
      <div className='flex flex-col justify-center items-center gap-5  shadow-gray-2 shadow-sm bg-black z-20 py-10 pb-20 px-10 rounded-2xl'>
          {request=="join" ? 
        <div className="flex flex-col items-center gap-5">
          <div className='bg-gray-1 rounded-sm font-normal flex items-center'>
            <input className='py-1  px-4 ' placeholder="Enter room code"  ref={roomRef}  />
          </div> 
          <input className='py-1 px-4 bg-gray-1 rounded-sm' placeholder="Username" ref={usernameRef}/>
          <button className='mt-2 px-5 py-1 text-lg border-[1.6px] border-gray-2 text-white rounded-4xl cursor-pointer hover:bg-gray-2 hover:text-primary-blue hover:scale-95 transition-all ease-in-out'
          onClick={handleSubmit}>Join Room</button>
        </div>:
        <div className="flex flex-col items-center gap-5">
          <div className='bg-gray-1 rounded-sm font-normal flex items-center'>
          <input className='py-1 w-36 px-4 ' value={roomRef.current?.value} ref={roomRef} disabled/>
          <button className='px-4 py-1 font-medium shadow-lg rounded-sm cursor-pointer hover:bg-gray-2 hover:text-primary-blue hover:scale-95 transition-all ease-in-out'
            onClick={handleCopy}>
            {copyText}</button>
          </div> 
          <input className='py-1 px-4 bg-gray-1 rounded-sm' placeholder="Username" ref={usernameRef}/>
          <button className='mt-2 px-5 py-1 text-lg border-[1.6px] border-gray-2 text-white rounded-4xl cursor-pointer hover:bg-gray-2 hover:text-primary-blue hover:scale-95 transition-all ease-in-out'
          onClick={handleSubmit}>Create Room</button>
          </div> 
        }
        {error && <p className="text-gray-3 -mt-4">{error}</p>}
      </div>
    </div>
  )
}

export default RoomContainer

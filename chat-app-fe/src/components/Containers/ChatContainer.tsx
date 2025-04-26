import  { useEffect, useRef, useState } from 'react'
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

type chat = {
  username: string,
  message: string,
}


const ChatContainer = ({ws, username, room}: {ws: WebSocket, username: string, room: string}) => {
  const [chatArray, setChatArray] = useState<chat[]>([])
  const [error, setError] = useState<string>("")
  const messageRef = useRef<HTMLInputElement| null>(null)



  function handleSend(){
    if(messageRef.current?.value){
    const request = {type: "chat", payload: {message: messageRef.current?.value}}
      ws.send(JSON.stringify(request))
      messageRef.current.value = ""
    }
    else{
      setError("Enter message")
    }
  }

  useEffect(()=>{
    ws.onmessage = (ev)=>{
      console.log(ev.data)
      const data: chat = JSON.parse(ev.data)
      if(data)
      setChatArray((prev) => [...prev, data])
    }
  },[chatArray])

  useEffect(()=>{
    document.body.addEventListener("keydown",(e)=>{
      if(e.key=="Enter")
        handleSend()
    })
  },[])

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-b from-primary-blue to-black p-5'>
      <DotPattern
              className={cn(
                "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              )}
            />
      
        <div className='w-full md:w-[400px] h-full rounded-2xl bg-gradient-to-b from-primary-blue to-black py-2 px-4 flex flex-col  items-center shadow-sm shadow-gray-4'> 
            <h1 className='text-white font-secondary font-semibold text-2xl'>Room - <span className='font-primary font-medium'>{room}</span></h1>
            
              <div className={`w-full h-5/6 px-5 rounded-[40px] text-white flex flex-col gap-4 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-dark-blue hover:scrollbar-thumb-dark-blue scrollbar-track-primary-blue  overflow-y-auto `}>
              {chatArray.length>1 ?
                chatArray.map((chat,i)=>{
                  return (username != chat.username?<div key={i} className='flex flex-col gap-[2px] shadow-xs shadow-gray-5 w-fit px-2 py-1 rounded-lg rounded-bl-none bg-dark-blue z-20'>
                    <span className='text-xs  text-gray-4'>{chat.username}</span>
                    <span className=''>{chat.message} </span>    
                    </div>:
                    <div key={i} className='self-end flex flex-col gap-[2px] shadow-xs shadow-gray-5 w-fit px-2 py-1 rounded-lg rounded-br-none bg-dark-blue z-20'>
                    <span className='text-xs  text-gray-4'>You</span>
                    <span className=''>{chat.message} </span>    
                    </div>)
                }): ""
              }
            </div> 
            <div className='flex gap-4 font-secondary text-lg'>
              <input className='px-5 py-1 border-2 border-gray-2 text-white rounded-sm outline-none' onChange={()=>setError("")} placeholder='Send message' ref={messageRef}/>
              <button className='px-5 py-1  border-[1.6px] border-gray-2 text-white rounded-4xl cursor-pointer hover:bg-gray-2 hover:text-primary-blue hover:scale-95 transition-all ease-in-out' 
              onClick={handleSend} >Send</button>
            </div>
            {error && <p className='text-red-300'>{error}</p>}
        </div>

    </div>
  )
}

export default ChatContainer

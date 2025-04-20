import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import {motion} from "motion/react"
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { setRequest} from "../utils/store";

const Landing = () => {
  const dispatch = useDispatch();

  
  const navigate = useNavigate()

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-b from-primary-blue to-black px-5'>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
      />
      <div className='font-primary flex flex-col items-center text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-gray-1 to-gray-5 '>
        <h1 className=''>Connect. Chat.</h1> 
        <h1 className=''>Collaborate.</h1>
      </div>
      <motion.h3 className='mt-10 text-center text-lg md:text-2xl font-secondary text-gray-3'
      initial={{z:0, y:20}}
      animate={{z:1, y:0,
      transition: { duration:0.5, ease: "easeInOut"}
      }}
      >
        Create your space. Join the conversation. Anytime, Anywhere
      </motion.h3>
      <motion.div className='flex gap-4 mt-10 font-secondary text-primary-blue font-semibold z-20'
      initial={{z:0, y:20}}
      animate={{z:1, y:0,
      transition: { delay:0.5,duration:0.5, ease: "easeInOut"}}}  
      >
        <button className=' px-5 py-1 text-lg bg-gray-2 rounded-4xl cursor-pointer hover:bg-gray-3 hover:scale-95 transition-all ease-in-out ' 
        onClick={()=>{navigate('/room')
          dispatch(setRequest("create"))
        }}
        >Create Room</button>
        <button className='px-5 py-1 text-lg border-2 border-gray-2 text-white rounded-4xl cursor-pointer bg-dark-blue hover:bg-gray-2 hover:text-primary-blue hover:scale-95 transition-all ease-in-out'
        onClick={()=>{navigate('/room')
          dispatch(setRequest("join"))
        }}
        >Join Room</button>
      </motion.div>
    </div>
  )
}

export default Landing

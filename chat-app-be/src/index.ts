import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})
 type userType = {
    username: string,
    room: string
}

const allSockets = new Map<WebSocket,Set<userType>>()

wss.on("connection",(socket)=>{
    console.log("new user connected")

   socket.on("message", (message)=>{
        // console.log("message is received")
        // console.log(message)
        const data = JSON.parse(message.toString())
        console.log(data)
        try{

            if(data.type=="connect"){
                // console.log("connect message received")
                if (data.payload.request == "join"){
                    const room = data.payload.room
                    let flag = 0
                    for(const[_,users] of allSockets.entries()){
                        console.log("---arleady user----")
                        console.log(users)
                        if(flag==1)
                            break
                        else{
                            for(const user of users){
                                if(user.room==room){ 
                                    console.log("-----user room----")  
                                    console.log(user.room)
                                    flag = 1
                                }
                            }
                        }
                    } 
                    if(flag==0) {
                        socket.send(JSON.stringify({success: false})) 
                    }
                    else{
                    const user = {username: data.payload.username, room: data.payload.room}
                    allSockets.set(socket, new Set())
                    allSockets.get(socket)?.add(user)
                    console.log(allSockets.get(socket))
                        socket.send(JSON.stringify({success: true}))
                    }
                }
                //  check if room is already created
                //    if yes, add user to the room
                //    if no send error

                else{
                    const user = {username: data.payload.username, room: data.payload.room}
                    allSockets.set(socket, new Set())
                    allSockets.get(socket)?.add(user)
                    console.log(allSockets.get(socket))
                    socket.send(JSON.stringify({success: true}))
                }
                // console.log("------ allscokets size: ----------")
                // console.log(allSockets.size)
                // console.log("------ allscokets: ----------")
                // console.log(allSockets)

            }
            if(data.type=="chat"){
                console.log("new chat sent")
                const user = allSockets.get(socket)
                const userInfo = user?.values().next().value
                const username = userInfo?.username
                const room = userInfo?.room
                const message = data.payload.message
                const response = {username, message} 

                
                
                // console.log("------ printing all the users ----")
                for(const[socket,users] of allSockets.entries()){
                    for(const user of users){
                        if(user.room==room){
                            socket.send(JSON.stringify(response))
                        }
                    }
                }    
            }   
        }
        catch(error){
            console.log(error)
        }
    })
})
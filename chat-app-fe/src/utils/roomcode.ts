export default function generateRandomRoom(){

    let roomCode = ""
    const characters = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    for(let i=0; i<5; i++){
        const randomNum = Math.floor(Math.random()*62)
        roomCode+=characters[randomNum]
    }
    console.log(roomCode)
    return roomCode
}
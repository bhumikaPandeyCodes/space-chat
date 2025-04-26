"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allSockets = new Map();
wss.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("message", (message) => {
        var _a, _b;
        // console.log("message is received")
        // console.log(message)
        const data = JSON.parse(message.toString());
        console.log(data);
        try {
            if (data.type == "connect") {
                if (data.payload && data.payload.room && data.payload.username) {
                    const request = data.payload.request;
                    const room = data.payload.room;
                    const username = data.payload.username;
                    // console.log("connect message received")
                    if (request == "join") {
                        let flag = 0;
                        for (const [_, users] of allSockets.entries()) {
                            console.log("---arleady user----");
                            console.log(users);
                            if (flag == 1)
                                break;
                            else {
                                for (const user of users) {
                                    if (user.room == room) {
                                        console.log("-----user room----");
                                        console.log(user.room);
                                        flag = 1;
                                    }
                                }
                            }
                        }
                        if (flag == 0) {
                            socket.send(JSON.stringify({ success: false }));
                        }
                        else {
                            const user = { username, room };
                            allSockets.set(socket, new Set());
                            (_a = allSockets.get(socket)) === null || _a === void 0 ? void 0 : _a.add(user);
                            console.log(allSockets.get(socket));
                            socket.send(JSON.stringify({ success: true }));
                        }
                    }
                    //  check if room is already created
                    //    if yes, add user to the room
                    //    if no send error
                    //data.payload.request ==join
                    else {
                        const user = { username: data.payload.username, room: data.payload.room };
                        allSockets.set(socket, new Set());
                        (_b = allSockets.get(socket)) === null || _b === void 0 ? void 0 : _b.add(user);
                        console.log(allSockets.get(socket));
                        socket.send(JSON.stringify({ success: true }));
                    }
                    // console.log("------ allscokets size: ----------")
                    // console.log(allSockets.size)
                    // console.log("------ allscokets: ----------")
                    // console.log(allSockets)
                    //if user joins the room notify everyone 
                    for (const [socket, users] of allSockets.entries()) {
                        for (const user of users) {
                            if (user.room == data.payload.room) {
                                socket.send(JSON.stringify(username));
                                console.log(username, " new user connected");
                            }
                        }
                    }
                }
            }
            if (data.type == "chat") {
                console.log("new chat sent");
                const user = allSockets.get(socket);
                const userInfo = user === null || user === void 0 ? void 0 : user.values().next().value;
                const username = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username;
                const room = userInfo === null || userInfo === void 0 ? void 0 : userInfo.room;
                const message = data.payload.message;
                const response = { username, message };
                // console.log("------ printing all the users ----")
                for (const [socket, users] of allSockets.entries()) {
                    for (const user of users) {
                        if (user.room == room) {
                            socket.send(JSON.stringify(response));
                        }
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    socket.on("close", () => {
        console.log("connection closed");
        const user = allSockets.get(socket);
        const userInfo = user === null || user === void 0 ? void 0 : user.values().next().value;
        const username = userInfo === null || userInfo === void 0 ? void 0 : userInfo.username;
        const room = userInfo === null || userInfo === void 0 ? void 0 : userInfo.room;
        const response = { username, room };
        for (const [socket, users] of allSockets.entries()) {
            for (const user of users) {
                if (user.room == room) {
                    socket.send(JSON.stringify(username));
                    console.log(response, " disconnected");
                }
            }
        }
    });
});

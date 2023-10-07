websocket = new WebSocket(`ws://${domain}/websocket`)

websocket.onopen = function (event) {
    console.log('WebSocket connection established')
    websocket.send(`$id:${sessionUser.id}`)
};

websocket.onmessage = function (event) {
    const data = event.data.toString()
    console.log("DATA", data)
    if (data === "NullPointerException") return

    if (data.includes("$online:")) {
        const id = data.slice(8)
        const friend = friends.find(friend => friend.id === id)
        friend.ref.userStatus.className = "status online"
        friend.status = "online"
        if (receiver && receiver.id === friend.id)
            receiver.status = "online"
        console.log("$online:", id);
        return;
    } else if (data.includes("$offline:")) {
        const id = data.slice(9)
        const friend = friends.find(friend => friend.id === id)
        friend.ref.userStatus.className = "status offline"
        friend.status = "offline"
        friend.canRead = false

        if (receiver && receiver.id === friend.id) {
            receiver.status = "offline"
            receiver.canRead = false
        }
        console.log("$offline:", id);
        return;
    }

    if (data.includes("$chat-active:")) {
        const ID = data.slice(13).split("&")
        console.log(data, ID)
        const friend = friends.find(f => f.id === ID[1])
        friend.canRead = true;

        receiver && receiver.unreadMessages.forEach(msg => msg.className = "read-receipt read")

        // if (receiver && (!receiver.canRead && receiver.id === friend.id)) {
        //     receiver.canRead = true;
        //     sessionUser.chatActiveWith = receiver.id
        //     websocket.send(`$chat-active:${receiver.id}&${sessionUser.id}`)
        //     console.log("SESSION USER:", sessionUser.chatActiveWith, "RECEIVER:", receiver)
        // }
        return;
    }

    if (data.includes("$chat-inactive:")) {
        const ID = data.slice(15).split("&")
        const friend = friends.find(friend => friend.id === ID[1])
        console.log(data, ID)
        friend.canRead = false;
        if (receiver && receiver.id === friend.id) {
            receiver.canRead = false;
        }
        return;
    }

    try {
        const msg = JSON.parse(data)
        if (receiver && receiver.id === msg.senderID) {
            receiver.ref.userLastMsg.title = msg.message
            receiver.ref.userLastMsg.textContent = msg.message
            putReceiverMsg(msg.message, msg.timestamp)
        } else {
            const friend = friends.find(friend => friend.id === msg.senderID)
            friend.ref.userLastMsg.title = msg.message
            friend.ref.userLastMsg.textContent = msg.message
        }
    } catch (e) {
        console.log(e)
    }
};

websocket.onclose = function (event) {
    if (event.wasClean)
        console.log('WebSocket connection closed cleanly, code=' + event.code)
    else
        console.log('WebSocket connection abruptly closed')
};

window.addEventListener('beforeunload', () => {
    websocket.send("$offline:" + sessionUser.id)
    websocket.close()
})


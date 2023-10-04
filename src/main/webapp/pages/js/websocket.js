websocket = new WebSocket("ws://localhost:8080/TalkWave_war_exploded/websocket")

websocket.onopen = function (event) {
    console.log('WebSocket connection established')
    websocket.send(`$id:${sessionUser.id}`)
};

websocket.onmessage = function (event) {
    const data = event.data.toString()

    if (data.includes("$online:")) {
        const id = data.slice(8)
        const friend = friends.find(friend => friend.id === id)
        friend.ref.userStatus.className = "status online"
        console.log("$online:", id);
        return;
    } else if (data.includes("$offline:")) {
        const id = data.slice(9)
        const friend = friends.find(friend => friend.id === id)
        friend.ref.userStatus.className = "status offline"
        console.log("$offline:", id);
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
    websocket.send("$offline:"+sessionUser.id)
    websocket.close()
})


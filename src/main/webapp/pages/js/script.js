const textBox = document.querySelector("#text-box")
const chatBody = document.querySelector(".chat-body")

async function sendMsg() {
    const value = textBox.value
    const time = getCurrentTime()
    textBox.value = ""
    if (value === "") return
    putSenderMsg(value, time)

    const msgData = {
        senderID: sessionUser.id,
        receiverID: receiver.id,
        message: value,
        timestamp: time
    }
    //
    // await fetch(apiPostMsgTempURL, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(msgData)
    // })
    websocket && websocket.send(JSON.stringify(msgData));
    console.log(JSON.stringify(msgData))
}

function getCurrentTime() {
    const now = new Date();
    const options = {hour: '2-digit', minute: '2-digit', hour12: true};
    return now.toLocaleTimeString('en-US', options);
}

textBox.onkeyup = e => {
    if (e.keyCode === 13) {
        sendMsg()
    }
}

function putSenderMsg(msg, time) {
    chatBody.innerHTML +=
        `<div class="row right">
            <div class="right-msg msg">
                <div class="content">${msg}</div>
                    <div class="msg-info">
                        <div class="read-receipt unread">
                            <img src="pages/img/icon/double_tick.svg" alt="">
                        </div>
                    <div class="msg-time">${time}</div>
                </div>
            </div>
        </div>`
    chatBody.scrollTop = chatBody.scrollHeight
}

function putReceiverMsg(msg, time) {
    chatBody.innerHTML +=
        `<div class="row left">
            <div class="left-msg msg">
                <div class="content">${msg}</div>
                <div class="msg-info">
                    <div class="msg-time">${time}</div>
                </div>
            </div>
        </div>`
    chatBody.scrollTop = chatBody.scrollHeight
}

document.addEventListener("DOMContentLoaded", function () {
    // if (arr !== null)
        // getChatHistory();
});

async function getChatHistory() {
    const url = apiGetChatMsgTempURL+ "?senderID=" + sessionUser.id + "&receiverID=" + receiver.id
    const res = await fetch(url, {method: 'GET'})
    const arr = await res.json()

    const parsedArray = await Promise.all(arr.map(async (jsonString) => {
        const msg = JSON.parse(jsonString);
        if (msg.senderId.toString() === sessionUser.id) {
            putSenderMsg(msg.content, msg.timestamp);
        } else {
            putReceiverMsg(msg.content, msg.timestamp);
        }
        return msg;
    }));
}

async function fetchFriends() {
    const res = await fetch(apiGetFriendsTempURL + "?senderID="+sessionUser.id, {method: "GET"})
    friends = await res.json()

    friends.forEach((friend) => {
        friend.ref = generateUserCard(friend);
    });
}

fetchFriends().then(r => console.log(friends))

function startChat(user) {
    const chat_name = document.querySelector(".chat-name")
    chat_name.textContent = user.profileName;
    websocket =new WebSocket("ws://localhost:8080/TalkWave_war_exploded/websocket")
    receiver = user

    websocket.onopen = function(event) {
        console.log('WebSocket connection established')
        websocket.send(`$id:${sessionUser.id}`)
    };

    websocket.onmessage = function(event) {
        if (event.data.includes("\"sessionId\"")) {
            const obj = JSON.parse(event.data)
            sessionUser.sessionId = obj.sessionId;
            return;
        }

        console.log('Server says: ' + event.data.toString())
        try {
            const msg = JSON.parse(event.data.toString())
            console.log(msg)
            putReceiverMsg(msg.message, msg.timestamp)
        } catch (e) {
            console.log(e)
        }
    };

    websocket.onclose = function(event) {
        if (event.wasClean) {
            console.log('WebSocket connection closed cleanly, code=' + event.code)
        } else {
            console.log('WebSocket connection abruptly closed')
        }
    };

    getChatHistory()
}

function generateUserCard(userData) {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.onclick = () => {
        if (!userCard.className.includes("user-card-active")) {
            userCard.className += " user-card-active"
            startChat(userData);
        }
    };

    userCard.innerHTML =
            `<div class="user-profile">
                <img src="pages/img/AK.png" alt="">
                <div class="status ${userData.status}"></div>
            </div>
            <div class="user-name">${userData.profileName}</div>
            <div class="user-msg">${userData.lastMsg}</div>
            <div class="user-config"></div>`;

    const userStatus = userCard.querySelector(".status")

    const usersContainer = document.querySelector(".users");
    usersContainer.appendChild(userCard);

    return {
        userCard,
        userStatus
    }
}

// let interval = setInterval(() => {
//     chatBody.innerHTML = ""
//     getChatHistory(receiver).then(res => console.log("chat restored"));
// }, 500)
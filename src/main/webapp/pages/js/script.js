const textBox = document.querySelector("#text-box")
const chatBody = document.querySelector(".chat-body")
const chatMask = document.querySelector(".chat-mask")

function sendMsg() {
    const value = textBox.value
    const time = getCurrentTime()
    textBox.value = ""
    if (value === "" || !isChatActive) return
    let receipt = ""

    if (receiver.canRead)
        receipt = "read";
    else
        receipt = "unread";

    putSenderMsg(value, time, receipt)

    const msgData = {
        senderID: sessionUser.id,
        receiverID: receiver.id,
        message: value,
        timestamp: time,
        readReceipt: receipt,
    }
    receiver.ref.userLastMsg.title = value
    receiver.ref.userLastMsg.textContent = "You: " + value

    receiver.unreadMessages = document.querySelectorAll('.read-receipt.unread')

    websocket && websocket.send(JSON.stringify(msgData));
}

function getCurrentTime() {
    const now = new Date();
    const options = {hour: '2-digit', minute: '2-digit', hour12: true};
    return now.toLocaleTimeString('en-US', options);
}

textBox.onkeyup = e => { if (e.keyCode === 13) sendMsg() }

function putSenderMsg(msg, time, readReceipt) {
    chatBody.innerHTML +=
        `<div class="row right">
            <div class="right-msg msg">
                <div class="content">${msg}</div>
                    <div class="msg-info">
                        <div class="read-receipt ${readReceipt}">
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

async function getChatHistory() {
    const url = apiGetChatMsgURL + "?senderID=" + sessionUser.id + "&receiverID=" + receiver.id
    const res = await fetch(url, {method: 'GET'})
    messages = await res.json()
    messages.map((msg) => {
        if (msg.senderID.toString() === sessionUser.id) {
            putSenderMsg(msg.content, msg.timestamp, msg.readReceipt);
        } else {
            putReceiverMsg(msg.content, msg.timestamp);
        }
        return msg;
    });
    receiver.unreadMessages = document.querySelectorAll(".read-receipt.unread");
}

function startChat(user) {
    const chat_name = document.querySelector(".chat-name")
    chat_name.textContent = user.profileName;
    chatBody.innerHTML = ""
    receiver = user
    if (!isChatActive)
        chatMask.style.display = "none";
    isChatActive = true;
    const friend = friends.find(f => f.canRead)
    console.log("START CHAT FRIEND:", friend, friends[0].canRead)
    if (friend)
        websocket.send(`$chat-inactive:${friend.id}&${sessionUser.id}`)
    websocket.send(`$chat-active:${receiver.id}&${sessionUser.id}`)
    getChatHistory().then()
}

function generateUserCard(userData) {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.onclick = () => {
        friends.forEach(friend => friend.ref.userCard.className = "user-card")
        userCard.className += " user-card-active"
        startChat(userData);
    };

    userCard.innerHTML =
        `<div class="user-profile">
                <img src="pages/img/AK.png" alt="">
                <div class="status ${userData.status}"></div>
            </div>
            <div class="user-name">${userData.profileName}</div>
            <div class="user-last-msg" title="${userData.lastMsg}">${userData.lastMsg}</div>
            <div class="user-config"></div>`;

    const userStatus = userCard.querySelector(".status")
    const userLastMsg = userCard.querySelector(".user-last-msg")

    const usersContainer = document.querySelector(".users");
    usersContainer.appendChild(userCard);

    return {
        userCard,
        userLastMsg,
        userStatus
    }
}

async function fetchFriends() {
    const res = await fetch(apiGetFriendsURL + "?senderID=" + sessionUser.id, {method: "GET"})
    friends = await res.json()

    if (friends.error !== undefined) {
        console.log(friends.error);
        return;
    }

    friends.forEach((friend) => {
        friend.ref = generateUserCard(friend);
    });
}

fetchFriends().then(() => console.log("Friends Fetched Successfully"))
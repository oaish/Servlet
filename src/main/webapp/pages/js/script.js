const textBox = document.querySelector("#text-box")
const chatBody = document.querySelector(".chat-body")

async function sendMsg() {
    const value = textBox.value
    const time = getCurrentTime()
    textBox.value = ""
    if (value === "") return
    putSenderMsg(value, time)

    const msgData = {
        senderID: username,
        receiverID: receiver,
        message: value,
        timestamp: time
    }

    const res = await fetch(apiPostTempURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgData)
    })
    const data = await res.json()
    console.log(data)

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
    if (arr !== null)
        getChatHistory();
});

async function getChatHistory() {
    const parsedArray = await Promise.all(arr.map(async (jsonString) => {
        const msg = JSON.parse(jsonString);
        if (msg.senderId.toString() === username) {
            console.log(msg.senderId, "yeah same");
            putSenderMsg(msg.content, msg.timestamp);
        } else {
            console.log(msg.senderId);
            putReceiverMsg(msg.content, msg.timestamp);
        }
        return msg;
    }));

    console.log(parsedArray);
}

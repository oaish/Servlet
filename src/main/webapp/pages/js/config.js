const apiGetFriendsURL = 'http://localhost:8080/TalkWave/api-get-friends'
const apiGetFriendsTempURL = 'http://localhost:8080/TalkWave_war_exploded/api-get-friends'
const apiGetChatMsgURL = 'http://localhost:8080/TalkWave/api-get-chat-msg'
const apiGetChatMsgTempURL = 'http://localhost:8080/TalkWave_war_exploded/api-get-chat-msg'
const apiPostMsgURL = 'http://localhost:8080/TalkWave/api-post-msg'
const apiPostMsgTempURL = 'http://localhost:8080/TalkWave_war_exploded/api-post-msg'

let websocket = null;

let sessionUser = {
    id: prompt("Enter userID"),
    name: "oaish",
    profileName: "Oaish Qazi"
}

let receiver = {
    id: "1",
    name: "oaish",
    profileName: "Oaish Qazi",
    status: "offline"
}

let friends = {}
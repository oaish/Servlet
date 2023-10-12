const protocol = 'http://';
let domain = ""
if (window.location.hostname === "localhost")
    domain = 'localhost:8080/TalkWave_war_exploded'
else
    domain = '16.170.66.215:8080/TalkWave'

const apiGetFriendsURL = protocol + domain + '/api-get-friends'
const apiGetChatMsgURL = protocol + domain + '/api-get-chat-msg'
const apiValidateUsername = protocol + domain + '/api-validate-username'
const apiRegisterUser = protocol + domain + '/api-register-user'

const ssh = 'ssh -i "mercenary.pem" ubuntu@16.170.66.215'
const ip = '16.170.66.215'

let websocket = null;
let isChatActive = false;

let sessionUser = {
    // id: prompt("Enter userID"),
    id: "1",
    name: "oaish",
    profileName: "Oaish Qazi",
}

let receiver = null

let friends = {}

let messages = []

let profileB64 = ""

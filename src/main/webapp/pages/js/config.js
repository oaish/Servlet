const apiGetURL = 'http://localhost:8080/TalkWave/api-get'
const apiGetTempURL = 'http://localhost:8080/TalkWave_war_exploded/api-get'
const apiPostURL = 'http://localhost:8080/TalkWave/api-post'
const apiPostTempURL = 'http://localhost:8080/TalkWave_war_exploded/api-post'

let user = {
    id: "2",
    name: "dawg",
    profileName: "Abdurrahman Qureshi"
}

let receiver = {
    id: "1",
    name: "oaish",
    profileName: "Oaish Qazi",
    status: "offline"
}

let friends = [
    {
        id: "1",
        ref: "",
        name: "oaish",
        profileName: "Oaish Qazi",
        lastMsg: "sup bro",
        status: "offline"
    }
]
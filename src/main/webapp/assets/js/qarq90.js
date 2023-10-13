function openChats() {
    myChats.className = "users";
    mySuggested.className = "suggestions hidden";
    titleBar.innerHTML = "Chats";

    fetchFriends().then(() => console.log("friends fetched successfully again"))
}

function openProfile() {
    myProfile.classList.toggle("slide-animate");
    myProfile.classList.toggle("slide-hidden");
    myProfileName.innerHTML = sessionUser.profileName;
    myUserName.innerHTML = "@" + sessionUser.username;
}

document.onclick = function (e) {
    if (!myProfile.contains(e.target) && !settingsBtn.contains(e.target)) {
        myProfile.classList.remove("slide-animate");
        myProfile.classList.add("slide-hidden");
    }
}

function openSuggested() {
    myChats.className = "users hidden";
    mySuggested.className = "suggestions";
    titleBar.innerHTML = "Add Friends";

    fetchSuggestions().then(() => console.log("suggestions fetched"))
}

function generateSuggestedCard(userData) {
    const suggestedCard = document.createElement("div");
    suggestedCard.className = "user-card";

    suggestedCard.innerHTML =
        `<div class="user-profile">
            <img src="${userData.image}" alt="">
        </div>
        <div class="user-info">
            <div class="user-name">${userData.profileName}</div>
            <div class="user-config"></div>
            <img src="assets/img/icon/add_user.svg" id="add-friend-btn" class="req-button" alt="plus-icon"/>
        </div>`;

    const addFriendBtn = suggestedCard.querySelector("#add-friend-btn")
    addFriendBtn.onclick = () => {
        suggestedCard.parentNode.removeChild(suggestedCard);
        sendFriendRequest(userData.id).then(() => console.log("req sent"));
        websocket.send(`$add-friend:${userData.id}&${sessionUser.id}`)
    }

    const usersContainer = document.querySelector(".suggestions");
    usersContainer.appendChild(suggestedCard);
}

async function fetchSuggestions() {
    const url = apiGetSuggestionsURL + "?senderID=" + sessionUser.id
    const res = await fetch(url, {method: "GET"})
    suggestions = await res.json()

    if (suggestions.error !== undefined) {
        console.log(suggestions.error);
        return;
    }
    mySuggested.innerHTML = ""

    suggestions.forEach((suggestion) => {
        generateSuggestedCard(suggestion);
    });
}

async function sendFriendRequest(userId) {
    const url = apiAddFriendURL + "?senderID=" + sessionUser.id + "&receiverID=" + userId;
    const res = await fetch(url, {method: "GET"});

    if (res.status === 200)
        console.log("Friend request sent successfully");
    else
        console.error("Failed to send friend request");
}
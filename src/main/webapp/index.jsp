<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="pages/css/main.css">
    <link rel="stylesheet" href="pages/css/sidebar.css">
    <link rel="stylesheet" href="pages/css/users-container.css">
    <link rel="stylesheet" href="pages/css/chat-container.css">
    <script src="pages/js/config.js"></script>
    <script defer>
        let arr = <%= request.getAttribute("messages") %>;
        let user = <%= request.getAttribute("user") %>;
    </script>
    <script src="pages/js/script.js" defer></script>
</head>
<body>
<main>
    <div class="sidebar">
        <div class="sb-top">
            <div class="chat-icon icon" style="background-image: url('pages/img/icon/chat_room.svg')">
                <div class="pill"></div>
            </div>
            <div class="user-icon icon" style="background-image: url('pages/img/icon/user.svg')">
                <div class="pill"></div>
            </div>
        </div>
        <div class="sb-bottom">
            <div class="settings-icon icon" style="background-image: url('pages/img/icon/settings.svg')"></div>
            <div class="profile-icon icon" style="background-image: url('pages/img/icon/cv.svg')"></div>
        </div>
    </div>

    <div class="users-container">
        <div class="title-bar">
            <h2>Chats</h2>
            <img src="" alt="">
        </div>
        <div class="search-bar">
            <label><input type="text" id="search-box" placeholder="Search or start a new chat"></label>
            <div class="search-icon">
                <img src="pages/img/icon/search.svg" alt="">
            </div>
        </div>
        <div class="users">
            <div class="user-card user-card-active" onclick="getChatHistory()">
                <div class="user-profile">
                    <img src="pages/img/AK.png" alt="">
                </div>
                <div class="user-name">Oaish Qazi</div>
                <div class="user-last-seen">Yesterday</div>
                <div class="user-msg">What r u doing</div>
                <div class="user-config"></div>
            </div>
            <div class="user-card">
                <div class="user-profile">
                    <img src="pages/img/PC.jpg" alt="">
                </div>
                <div class="user-name">Niggalators</div>
                <div class="user-last-seen">12:19 AM</div>
                <div class="user-msg">Yeah</div>
                <div class="user-config"></div>
            </div>
            <div class="user-card">
                <div class="user-profile">
                    <img src="pages/img/dawg.png" alt="">
                </div>
                <div class="user-name">Dawg</div>
                <div class="user-last-seen">30/09/23</div>
                <div class="user-msg">Image</div>
                <div class="user-config"></div>
            </div>
        </div>
    </div>

    <div class="chat-container">
        <div class="chat-header">
            <div class="chat-profile">
                <img src="pages/img/AK.png" alt="">
                <div class="profile-info">
                    <div class="chat-name">Oaish Qazi</div>
                    <div class="chat-info">select for more info</div>
                </div>
            </div>
        </div>

        <div class="chat-body">

        </div>

        <div class="chat-input">
            <div class="x btn" style="background-image: url('pages/img/icon/emoji.svg')"></div>
            <div class="x btn" style="background-image: url('pages/img/icon/attach.svg')"></div>
            <label for="text-box"></label>
            <input class="btn" id="text-box" placeholder="Text a message">
            <div class="send-btn btn" style="background-image: url('pages/img/icon/sent.svg')"
                 onclick="sendMsg()"></div>
        </div>
    </div>

</main>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>TalkWave</title>
    <link rel="stylesheet" href="pages/css/main.css" />
    <link rel="stylesheet" href="pages/css/sidebar.css" />
    <link rel="stylesheet" href="pages/css/users-container.css" />
    <link rel="stylesheet" href="pages/css/chat-container.css" />
    <script src="pages/js/config.js"></script>
    <script src="pages/js/script.js" defer></script>
    <script src="pages/js/websocket.js" defer></script>
    <script>
      let u = JSON.parse(localStorage.getItem("json"))

      sessionUser = {
        id: u.id,
        username: u.username,
        profileName: u.profileName,
        image: u.image,
      }
    </script>
  </head>

  <body>
    <main>
      <div class="sidebar">
        <div class="sb-top">
          <div
            class="chat-icon icon"
            style="background-image: url('pages/img/icon/chat_room.svg')"
            onclick="handleTabClick('chat-icon')"
          ></div>
          <div
            class="user-icon icon"
            style="background-image: url('pages/img/icon/user.svg')"
            onclick="handleTabClick('user-icon')"
          ></div>
          <div class="pill"></div>
        </div>
        <div class="sb-bottom">
          <div
            class="settings-icon icon"
            style="background-image: url('pages/img/icon/settings.svg')"
          ></div>
          <div
            class="profile-icon icon"
          >
            <img src="pages/img/Default.png" alt="">
          </div>
        </div>
      </div>

      <div class="users-container">
        <div class="title-bar">
          <h2>Chats</h2>
          <img src="" alt="" />
        </div>
        <div class="search-bar">
          <label
            ><input
              type="text"
              id="search-box"
              placeholder="Search or start a new chat"
          /></label>
          <div class="search-icon">
            <img src="pages/img/icon/search.svg" alt="" />
          </div>
        </div>
        <div class="users"></div>
      </div>

      <div class="chat-container">
        <div class="chat-mask">
          <img src="pages/img/icon/chat.svg" alt="" />
        </div>
        <div class="chat-header">
          <div class="chat-profile">
            <img src="pages/img/Default.png" alt="" />
            <div class="profile-info">
              <div class="chat-name"></div>
              <div class="chat-info"></div>
            </div>
          </div>
        </div>

        <div class="chat-body"></div>

        <div class="chat-down-btn down-btn-hidden">
          <img src="pages/img/icon/down.svg" alt="" />
        </div>

        <div class="chat-input">
          <div
            class="x btn"
            style="background-image: url('pages/img/icon/emoji.svg')"
          ></div>
          <div
            class="x btn"
            style="background-image: url('pages/img/icon/attach.svg')"
          ></div>
          <label for="text-box"></label>
          <input class="btn" id="text-box" placeholder="Text a message" />
          <div
            class="send-btn btn"
            style="background-image: url('pages/img/icon/sent.svg')"
            onclick="sendMsg()"
          ></div>
        </div>
      </div>
    </main>
  </body>
</html>

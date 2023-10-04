-- auto-generated definition
create table users
(
    user_id  int auto_increment
        primary key,
    username varchar(45)                   not null,
    password varchar(45)                   not null,
    profile_name varchar(45)               not null,
    status   varchar(10) default 'offline' not null
);

-- auto-generated definition
create table messages
(
    message_id   int auto_increment
        primary key,
    sender_id    int              not null,
    receiver_id  int              not null,
    content      varchar(2000)    not null,
    timestamp    varchar(45)      not null,
    read_receipt char default 'n' not null,
    constraint receiver_fk
        foreign key (receiver_id) references users (user_id),
    constraint sender_fk
        foreign key (sender_id) references users (user_id)
);

create index receiver_id_idx
    on messages (receiver_id);

create index sender_id_idx
    on messages (sender_id);

-- auto-generated definition
create table friends
(
    friend_id int not null
        primary key,
    x_id      int not null,
    y_id      int not null,
    last_msg  varchar(255),
    constraint friends_x__fk
        foreign key (x_id) references users (user_id),
    constraint friends_y__fk
        foreign key (y_id) references users (user_id)
);

########## DML QUERY #############
INSERT INTO users VALUES
    (default, 'oaish', 'qazi', 'Oaish Qazi', default),
    (default, 'dawg', '123', 'Abdurrahman Qureshi', default),
    (default, 'azlan', 'ahmed', 'Azlan Shaikh', default);

########## FRIENDS QUERY #########
SELECT user_id, username, password, profile_name, status
FROM friends f
JOIN users u ON u.user_id = f.y_id
WHERE x_id = '1';

########## LAST MSG QUERY ########
SELECT content FROM messages
WHERE (sender_id = 1 AND receiver_id = 3) OR (sender_id = 3 AND receiver_id = 1)
ORDER BY message_id DESC
LIMIT 1
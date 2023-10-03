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
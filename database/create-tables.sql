pragma foreign_keys = on;

create table tweets (
    id text primary key,
    text text not null,
    url text not null
);

create table users (
    id text primary key, 
    tweet_id text references tweets(id) on delete cascade,
    name text not null, 
    icon_url text not null, 
    user_url text not null
);

create table checks (
    id integer primary key autoincrement,
    user_id text references users(id) on delete cascade
);

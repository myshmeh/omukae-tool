pragma foreign_keys = on;

create table if not exists tweets (
    id text primary key,
    text text not null,
    url text not null
);

create table if not exists users (
    id text primary key, 
    tweet_id text references tweets(id) on delete cascade,
    name text not null, 
    icon_url text not null, 
    user_url text not null
);

create table if not exists omukae_dones (
    tweet_id text references tweets(id) on delete cascade,
    user_id text references users(id) on delete cascade,
    constraint omukae_dones_primary_key  primary key (tweet_id, user_id)
);

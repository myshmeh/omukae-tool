pragma foreign_keys = on;

create table if not exists tweets (
    id text primary key,
    text text not null,
    url text not null,
    datetime text not null,
    created_at integer not null default (strftime('%s'))
);

create table if not exists users (
    id text primary key, 
    name text not null, 
    icon_url text not null, 
    user_url text not null,
    created_at integer not null default (strftime('%s'))
);

create table if not exists tweets_x_users (
    tweet_id text references tweets(id) on delete cascade,
    user_id text references users(id) on delete cascade,
    omukae_done integer not null default 0,
    created_at integer not null default (strftime('%s')),
    constraint tweets_x_users_primary_key  primary key (tweet_id, user_id)
);

create table if not exists scrape_histories (
    completed integer not null default 0,
    created_at integer not null default (strftime('%s'))
);

pragma foreign_keys = on;

insert into tweets(id, text, url) values('tweet_id', 'text', 'url');

insert into users(id, tweet_id, name, icon_url, user_url) values('user_id', 'tweet_id', 'name', 'icon_url', 'user_url');
insert into users(id, tweet_id, name, icon_url, user_url) values('user_id2', 'tweet_id', 'name2', 'icon_url2', 'user_url2');

insert into omukae_dones(tweet_id, user_id) values('tweet_id', 'user_id');

select * from tweets;
select * from users;
select * from omukae_dones;
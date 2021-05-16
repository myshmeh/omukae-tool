pragma foreign_keys = on;

insert into tweets(id, text, url, datetime) values('tweet_id', 'text', 'url', '2021-03-29T10:40:54.000Z');

insert into users(id, name, icon_url, user_url) values('user_id', 'name', 'icon_url', 'user_url');
insert into users(id, name, icon_url, user_url) values('user_id2', 'name2', 'icon_url2', 'user_url2');
insert into users(id, name, icon_url, user_url) values('user_id3', 'name3', 'icon_url3', 'user_url3');

insert into tweets_x_users(tweet_id, user_id) values('tweet_id', 'user_id');
insert into tweets_x_users(tweet_id, user_id) values('tweet_id', 'user_id3');

insert into scrapings(id, status) values('0', 'COMPLETED');
insert into scrapings(id, status) values('1', 'COMPLETED');
insert into scrapings(id, status) values('2', 'COMPLETED');

select * from tweets;
select * from users;
select * from tweets_x_users;
select * from scrapings;
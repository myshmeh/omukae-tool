pragma foreign_keys = on;

insert into tweets(id, text, url) values('tweet_id', 'text', 'url');

insert into users(id, name, icon_url, user_url) values('user_id', 'name', 'icon_url', 'user_url');
insert into users(id, name, icon_url, user_url) values('user_id2', 'name2', 'icon_url2', 'user_url2');
insert into users(id, name, icon_url, user_url) values('user_id3', 'name3', 'icon_url3', 'user_url3');

insert into tweets_x_users(tweet_id, user_id) values('tweet_id', 'user_id');
insert into tweets_x_users(tweet_id, user_id) values('tweet_id', 'user_id3');

insert into scrape_histories(completed) values(0);
insert into scrape_histories(completed) values(0);
insert into scrape_histories(completed) values(0);

select * from tweets;
select * from users;
select * from tweets_x_users;
select * from scrape_histories;
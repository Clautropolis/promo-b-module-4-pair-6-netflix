
CREATE DATABASE Netflix;
USE Netflix;

CREATE TABLE movies (
	idMovies int auto_increment primary key,
    title VARCHAR(45) not null,
    genre VARCHAR(45) not null,
    image VARCHAR(1000) not null,
    category VARCHAR (45) not null,
    year int 
);
CREATE TABLE users (
	idUser int auto_increment primary key,
    user VARCHAR(45) not null,
    password VARCHAR(45) not null,
    name VARCHAR(45) not null,
    email VARCHAR(45) not null,
    plan_details VARCHAR(45) not null
);
CREATE TABLE actors (
	idActor int auto_increment primary key,
    name VARCHAR(45) not null,
    lastname VARCHAR(45) not null,
    country VARCHAR(45) not null,
    birthday date
);

SELECT actors.name, movies.title
FROM actors, movies, movies_actors
WHERE actors.idActor = movies_actors.fk_actors
AND movies.idMovies = movies_actors.fk_movies;

CREATE TABLE movies_actors (
	fk_movies INT NOT NULL,
    fk_actors INT NOT NULL,
    id_movies_actors INT AUTO_INCREMENT PRIMARY KEY,
    CONSTRAINT fk_movies_actors
    FOREIGN KEY (fk_movies) REFERENCES movies (idMovies),
    CONSTRAINT fk_actors_movies
    FOREIGN KEY (fk_actors) REFERENCES actors (idActor)
);

CREATE TABLE favorite_movies (
	fk_movies INT NOT NULL,
	fk_users INT NOT NULL,
	id_favorite_movies INT AUTO_INCREMENT PRIMARY KEY,
    CONSTRAINT fk_movies_users
    FOREIGN KEY (fk_movies) REFERENCES movies (idMovies),
	CONSTRAINT fk_users_movies
    FOREIGN KEY (fk_users) REFERENCES users (idUser)
);

ALTER TABLE favorite_movies ADD COLUMN score TINYINT;

ALTER TABLE favotie_movies RENAME favorite_movies;


insert into movies (title, genre, image, category, year) values
("Pulp Fiction", "Crimen", "https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg", "Top 10",1994 ),
("La vita è bella", "Comedia", "https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg", "Top 10",1996 ),
("Forrest Gump", "Comedia", "https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg", "Top 10",1994 );

insert into users (user, password, name,email, plan_details) values
("laura_dev", "laura","Laura","laura@gmail.com", "Standard"),
("maria_dev", "maria","Maria","maria@gmail.com", "Standard"),
("ester_dev", "ester","Ester","ester@gmail.com", "Standard");

insert into actors (name, lastname, country, birthday) values
("Tom", "Hanks", "Estados Unidos", "1956-07-09"),
("Roberto", "Benigni", "Italia", "1952-10-27"),
("John", "Travolta", "Estados Unidos", "1954-02-18");



select * from movies;
select name, genre from movies where year > 1990;
select genre from movies where year > 1990;
select title, genre from movies where year > 1990;
select * from movies where category= "Top 10";

UPDATE movies SET year = 1997 where ideMovies = 2;
UPDATE movies SET year = 1997 where idMovies = 2;
select * from movies;
select * from actors;
select * from actors where birthday between 1950 and 1960;
select * from actors where birthday between "1950-01-01" and "1960-12-31";
select name, lastname from actors where country = "Estados Unidos";

select * from users;
select * from users where plan_details = "Standard";
DELETE FROM users where name like "M%";
USE Netflix;

SELECT COUNT(fk_movies), users.name
FROM favorite_movies INNER JOIN users
ON users.idUser = favorite_movies.fk_users
GROUP BY fk_users;

SELECT MAX(fk_movies) AS max_fav_movies, users.name
FROM favorite_movies INNER JOIN users
ON users.idUser = favorite_movies.fk_movies
GROUP BY fk_movies;

insert into movies (title, genre, image, category, year) values
("Titanic", "Drama", "https://pics.filmaffinity.com/titanic-321994924-mmed.jpg", "Top 10",1997 );








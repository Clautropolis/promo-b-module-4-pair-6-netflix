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
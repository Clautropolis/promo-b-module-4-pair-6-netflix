SELECT COUNT(fk_movies), users.name
FROM favorite_movies INNER JOIN users
ON users.idUser = favorite_movies.fk_users
GROUP BY fk_users;

SELECT MAX(fk_movies) AS max_fav_movies, users.name
FROM favorite_movies INNER JOIN users
ON users.idUser = favorite_movies.fk_movies
GROUP BY fk_movies;
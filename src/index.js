//esto es back

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


// create and config server
const server = express();

server.use(cors());
server.use(express.json({limit: '25mb'}));
server.set('view engine', 'ejs');

//Crear la conexión
async function connectDB(){
  const conex = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Claugala2024',
    database: 'netflix',
  });
  //Conectarnos
  conex.connect();
  return conex;
};

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//Endpoint
server.get ('/movies', async (req, res) => {
  console.log(req.query);
  try {
  const connection = await connectDB();
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  console.log(sortFilterParam);
  console.log(genreFilterParam);
  let sql = ''
  
  if (genreFilterParam !== ""){
    sql = `SELECT * FROM movies WHERE genre LIKE ? ORDER BY title ${sortFilterParam} `;
  } else {
    sql = `SELECT * FROM movies ORDER BY title ${sortFilterParam}`;
  }
  
  const [result] = await connection.query(sql, [genreFilterParam]);
 
  connection.end();
  console.log(result);

      res.status(200).json({
          success: true,
          movies:  result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

server.get('/movie/:movieId', async (req, res) => {
  const connection = await connectDB();
  console.log(req.params);
  const idMovie = req.params.movieId;
  console.log(idMovie);

  const foundMovies = `SELECT * FROM movies WHERE idMovies = ${idMovie}`;
  const [foundMoviesResult] = await connection.query(foundMovies);
  console.log(foundMoviesResult);

  res.render('movie')
});



//Servidor de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

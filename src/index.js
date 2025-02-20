//esto es back

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


// create and config server
const server = express();

server.use(cors());
server.use(express.json({limit: '25mb'}));

//Crear la conexión
async function connectDB(){
  const conex = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Usera.2025',
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
  console.log(genreFilterParam);

  const sqlGenre = `SELECT * FROM movies WHERE genre LIKE ?`;
  const [result] = await connection.query(sqlGenre, [`%${genreFilterParam}%`]);

  // const sqlSelect = 'SELECT * FROM movies';
  // const [result] = await connection.query(sqlSelect);
  connection.end();
  console.log(result);

    if(result.length === 0) {
      res.status(404).json({
        success: false,
        movies: 'No se encontró la película',
    })
    } else {
      res.status(200).json({
          success: true,
          movies:  result
    })
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      movies: error,
    });
  }
});




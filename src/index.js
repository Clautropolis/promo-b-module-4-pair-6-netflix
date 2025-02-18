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
    password: '#Claugala2024',
    database: 'Netflix',
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

server.get ('/movies', async (req, res) => {
  try {
  const connection = await connectDB();
  const sqlSelect = 'SELECT * FROM movies';
  const [result] = await connection.query(sqlSelect);
  connection.end();
  console.log(result);

    if(result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No se encontró la película',
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
      message: error,
    });
  }
});




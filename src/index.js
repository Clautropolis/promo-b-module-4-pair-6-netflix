//esto es back

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


// create and config server
const server = express();
require('dotenv').config();

server.use(cors());
server.use(express.json({limit: '25mb'}));
server.set('view engine', 'ejs');

//Crear la conexión
async function connectDB(){
  const conex = await mysql.createConnection({
    host: process.env.HOST_DB, 
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE,
    
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
  res.render('movie', {movie : foundMoviesResult [0]});
});

server.post ("/api/signup", async (req, res)=>{
  const connection = await connectDB();
// recibimos los datos de la usuaria desde el front
  const {email, password} = req.body;
// comprobamos si esos existen o no
  const selectEmail = 'SELECT email FROM users WHERE email = ? ';
  const [emailResult] = await connection.query(selectEmail, [email])
  try {
     //si el usuario no existe se añade, 
  if (emailResult.length === 0){
    const passwordEncryp = await bcrypt.hash (password, 10)
    const sqlInsertUser = 'INSERT INTO users (email, password) values (?, ?)';
    const [result] = await connection.query(sqlInsertUser, [email, passwordEncryp]);
    res.status (200).json ({ success:true, id: result.insertId});
    
  } else{
    res.status (400).json ({ success:false, menssage: 'Usuario ya existe'});
  }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
  })  
  }
 


})

//Servidor de estáticos
const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));

const express=require('express')
require('dotenv').config()
const { createServer } = require('node:http');
const app = express();
const PORT= process.env.PORT || 4000;
let path=require('path')
const socketIO=require('socket.io')
let session=require('express-session')
const connectDB=require('./server/config/createDB')
const http = require('http');
const login=require('./server/route/login')
const server=http.createServer(app)
const io=socketIO(server)

connectDB()
app.set('view engine','ejs');
app.use("/public", express.static(path.join(__dirname, "/public")));

app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret:'scretkey',
    resave:false,
    saveUninitialized:false
}))

io.on('connection',(socket)=>{
    app.set('io :',io)
})
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).send('Internal Server Error');
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',login)

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
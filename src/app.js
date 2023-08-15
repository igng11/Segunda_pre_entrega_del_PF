import express from "express";
import {config} from "./config/config.js"
import { productsRouter } from "../routes/home.routes.js";
import { routerFS } from "../routes/product-fs.routes.js";
import { connectBD } from "./config/dbConnection.js";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { ProductManagerMongo } from "./dao/managers/mongo/productMgrMongo.js";
import { pagesRouter } from "../routes/pages.routes.js";
import { Server } from "socket.io";
import { productsModel } from "./dao/managers/models/products.model.js";
import Message from '../src/dao/managers/models/chat.models.js';
import { cartsRouters } from "../routes/carts.routes.js";



const port = config.server.port;
const app = express();

//mildwares
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

//servidor de express (guardar el servidor en una variable para conectarlo al de socket)
const httpServer = app.listen(port,()=>console.log(`Server ${port}`));

//crear el servidor de websocket (lado del servidor)
const io = new Server(httpServer);

//conexion a la base de datos
connectBD();

//configuracion de handlebars
app.engine('.hbs', engine({extname: ".hbs",
runtimeOptions: {allowProtoProperties: true, // Permitir acceso a propiedades no propias
}}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use("/products",productsRouter);
app.use("/fileSystem",routerFS);
app.use("/carts",cartsRouters);
app.use("/",pagesRouter);

const productService = new ProductManagerMongo();

// Definir las rutas
//ruta para renderizar productos
app.get("/home", async (req, res) => {
  try {
  //traer la hoja de estilos
  const products = await productService.get();
  // console.log(products);
  // Renderizar la vista "home.hbs" con los productos como datos
  res.render("home", {products: products});}
catch (error) {
res.render("error");
}});


//ruta para traer json de productos
app.get("/get", async (req, res) => {
  try {
  //traer productos
  const products = await productService.get();
  // Renderizar la vista "home.hbs" con los productos como datos
  res.json(products);}
catch (error) {
res.render("error al obtener products");
}});


// const operations = async ()=> {

//   //paginate parametros:
//   //query o filtro: podemos filtrar la info de la consulta
//   //limit: el numero maz de docs
//   //page: 1

//   const prodFilter = await productsModel.paginate(
//     {p_name:{$regex:"SUNSCREEN"}},
//     {limit: 10, page:1},
//     {sort:{num:1}}
//   );
//   console.log(prodFilter);
// }
// operations();








//sockets
let messages = [];


//sockets
io.on("connection",(socket)=>{
  console.log("nuevo cliente conectado");
  
  //capturamos el ingreso de un nuevo usuario
  socket.on("autenticated",(msg)=>{
      socket.emit("messageHistory", messages);
      //enviamos la informacion de que un nuevo usuario se conecto al resto, excepto al que se conecta
      socket.broadcast.emit("newUser",msg);
  });

  socket.on("message",(data)=>{
      console.log("data", data);
      messages.push(data);

      // Insertar el mensaje en la base de datos
      const newMessage = new Message({
        user: data.user, 
        email: data.email, 
        message: data.message,
        timestamp: new Date().toLocaleString()
      });

      newMessage.save()
        .then(() => {
          console.log('Mensaje guardado en la base de datos');
        })
        .catch(error => {
          console.error('Error al guardar el mensaje en la base de datos:', error);
        });

      //cada vez que recibimos mje, debemos enviarlos a todos los clientes conectados
      io.emit("messageHistory", messages);
  });
});
import express from "express"
import path from "path"
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { articulosRouter, usersRouter } from "./routes/index.js";
import { pedidosRouter } from "./routes/index.js";



dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("conexion exitosa MongoDB"))
.catch((err) => console.log("conexion fallida MongoDB"))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();


app.use(express.json());
app.use(express.static((path.join(__dirname,'public' ))))
app.use('/pedidos', pedidosRouter);

app.use('/articulos', articulosRouter)

app.use('/users', usersRouter)
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html' ))
})


app.listen(3000,() =>{
    console.log("Servidor corriendo en http://localhost:${PORT}")
})

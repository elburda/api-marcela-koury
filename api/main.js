import dotenv from "dotenv";
import express from "express"
import path from "path"
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { articulosRouter, usersRouter, pedidosRouter } from "./routes/index.js";
import cors from 'cors';


dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("conexion exitosa MongoDB"))
.catch((err) => console.log("conexion fallida MongoDB"))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();



app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use(express.json());
app.use(express.static((path.join(__dirname,'public' ))))
app.use('/pedidos', pedidosRouter);
app.use('/articulos', articulosRouter)
app.use('/users', usersRouter)
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html' ))
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Configuración inicial
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
    origin: '*',
    },
});

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGODB_URI)

.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
import articuloRoutes from './routes/articulosRoutes.js';
import userRoutes from './routes/userRoutes.js';
import pedidoRoutes from './routes/pedidosRoutes.js';
import localRoutes from './routes/localRoutes.js';


app.use('/articulos', articuloRoutes);
app.use('/usuarios', userRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/locales', localRoutes);

// WebSocket
io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado vía WebSocket:', socket.id);

    socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
    });
});

app.set('io', io);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});

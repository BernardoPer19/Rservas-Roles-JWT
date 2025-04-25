import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica
app.get('/', (_req: Request, res: Response) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

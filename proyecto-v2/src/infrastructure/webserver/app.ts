import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './errorHandler';

// Importación de Repositorios (InMemory)
import { InMemoryEstudianteRepository } from '../persistence/InMemoryEstudianteRepository';
import { InMemoryLibroRepository } from '../persistence/InMemoryLibroRepository';
import { InMemoryEjemplarRepository } from '../persistence/InMemoryEjemplarRepository';
import { InMemoryPrestamoRepository } from '../persistence/InMemoryPrestamoRepository';
import { InMemoryMultaRepository } from '../persistence/InMemoryMultaRepository';

// Importación de Use Cases
import { SolicitarPrestamoUseCase } from '../../core/use-cases/SolicitarPrestamoUseCase';
import { DevolverLibroUseCase } from '../../core/use-cases/DevolverLibroUseCase';
import { RenovarPrestamoUseCase } from '../../core/use-cases/RenovarPrestamoUseCase';
import { ConsultarHistorialUseCase } from '../../core/use-cases/ConsultarHistorialUseCase';
import { PagarMultaUseCase } from '../../core/use-cases/PagarMultaUseCase';

// Importación de Controladores
import { PrestamoController } from '../controllers/PrestamoController';
import { EstudianteController } from '../controllers/EstudianteController';
import { LibroController } from '../controllers/LibroController';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Inyección de Dependencias (Composición Manual)
const estudianteRepo = new InMemoryEstudianteRepository();
const libroRepo = new InMemoryLibroRepository();
const ejemplarRepo = new InMemoryEjemplarRepository();
const prestamoRepo = new InMemoryPrestamoRepository();
const multaRepo = new InMemoryMultaRepository();

const solicitarUseCase = new SolicitarPrestamoUseCase(prestamoRepo, estudianteRepo, ejemplarRepo, libroRepo);
const devolverUseCase = new DevolverLibroUseCase(prestamoRepo, estudianteRepo, ejemplarRepo, multaRepo);
const renovarUseCase = new RenovarPrestamoUseCase(prestamoRepo, ejemplarRepo, libroRepo);
const historialUseCase = new ConsultarHistorialUseCase(prestamoRepo, estudianteRepo);
const pagarMultaUseCase = new PagarMultaUseCase(estudianteRepo);

const prestamoCtrl = new PrestamoController(solicitarUseCase, devolverUseCase, renovarUseCase);
const estudianteCtrl = new EstudianteController(historialUseCase, pagarMultaUseCase);
const libroCtrl = new LibroController(libroRepo, ejemplarRepo);

// Rutas API
app.get('/libros', (req, res, next) => libroCtrl.listarCatalogo(req, res, next));

app.post('/prestamos', (req, res, next) => prestamoCtrl.solicitar(req, res, next));
app.patch('/prestamos/:id/devolucion', (req, res, next) => prestamoCtrl.devolver(req, res, next));
app.patch('/prestamos/:id/renovacion', (req, res, next) => prestamoCtrl.renovar(req, res, next));

app.get('/estudiantes/:id/historial', (req, res, next) => estudianteCtrl.consultarHistorial(req, res, next));
app.post('/estudiantes/:id/pagar-multas', (req, res, next) => estudianteCtrl.pagarMultas(req, res, next));

// Error Handler Global
app.use(errorHandler);

export default app;

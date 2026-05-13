import 'dotenv/config';
import app from './infrastructure/webserver/app';
import { seedData } from './infrastructure/persistence/seed';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  console.log('--- Inicializando Sistema de Biblioteca v2 ---');
  
  // 1. Inicializar Datos en Memoria (Seed)
  try {
    seedData();
    console.log('[Seed]: Datos de prueba cargados correctamente.');
  } catch (error) {
    console.error('[Seed]: Error al cargar datos iniciales:', error);
  }

  // 2. Levantar Servidor
  app.listen(PORT, () => {
    console.log(`[Server]: Servidor API REST corriendo en http://localhost:${PORT}`);
    console.log('--- Listo para recibir peticiones ---');
  });
}

bootstrap();

import { Client }  from 'pg';

// Función para reiniciar la base de datos
async function resetDatabase() {
  const client = new Client({
    user: 'postgres', // Usuario
    host: 'localhost', // Dirección del servidor
    database: 'postgres', // Base de datos para conectar inicialmente
    password: 'your_password', // Contraseña
    port: 5432, // Puerto
  });

  try {
    await client.connect();

    // Eliminar la base de datos
    await client.query('DROP DATABASE IF EXISTS your_database_name');
    console.log('Base de datos eliminada.');

    // Crear la base de datos nuevamente
    await client.query('CREATE DATABASE your_database_name');
    console.log('Base de datos creada.');

    // Aquí puedes agregar código para ejecutar tus migraciones si las tienes

  } catch (err) {
    console.error('Error al reiniciar la base de datos', err);
  } finally {
    await client.end();
  }
}

// Llamada a la función
resetDatabase();

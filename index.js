const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la conexión a MySQL (XAMPP por defecto)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conectado exitosamente a la base de datos MySQL');
});

// ==========================================
// ENDPOINTS PARA CATEGORÍA
// ==========================================
app.get('/api/categorias', (req, res) => {
    db.query('SELECT * FROM categoria', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json(results[0]);
    });
});

app.post('/api/categorias', (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO categoria (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: results.insertId, nombre, mensaje: 'Categoría creada con éxito' });
    });
});

app.put('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE categoria SET nombre = ? WHERE id_categoria = ?', [nombre, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Categoría actualizada con éxito' });
    });
});

app.delete('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM categoria WHERE id_categoria = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Categoría eliminada con éxito' });
    });
});

// ==========================================
// ENDPOINTS PARA CLIENTE
// ==========================================
app.get('/api/clientes', (req, res) => {
    db.query('SELECT * FROM cliente', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(results[0]);
    });
});

app.post('/api/clientes', (req, res) => {
    const { nombre, correo, ciudad } = req.body;
    db.query('INSERT INTO cliente (nombre, correo, ciudad) VALUES (?, ?, ?)', [nombre, correo, ciudad], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: results.insertId, nombre, correo, ciudad, mensaje: 'Cliente creado con éxito' });
    });
});

app.put('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo, ciudad } = req.body;
    db.query('UPDATE cliente SET nombre = ?, correo = ?, ciudad = ? WHERE id_cliente = ?', [nombre, correo, ciudad, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Cliente actualizado con éxito' });
    });
});

app.delete('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cliente WHERE id_cliente = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Cliente eliminado con éxito' });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
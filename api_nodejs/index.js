const express = require('express')
const sqlite3 = require('sqlite3')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

// creando la bd
const db = new sqlite3.Database('students.sqlite', (err) => {
    if (err) {
        console.error('Error al crear la db SQLite:', err);
    } else {
        console.log('SQLite db creada');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        gender TEXT NOT NULL,
        age INT 
)`, (err) => {
    if (err) {
        console.error('Error al crear la tabla: ', err);
    } else {
        console.log("Tabla students ya existe")
    }
        
    });

// endpoint para la insercion
app.post('/student/insert', (req, res) => {
    const { firstname, lastname, gender, age } = req.body;
    const query = `INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)`

    console.log(req.body)
    if (!firstname || !lastname || !gender ||  !age) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    db.run(query, [firstname, lastname, gender, age], (err) => {
        if (err) {
            console.error('Error al insertar:', err);
            return res.status(500).json({error: 'Error al insertar el registro'})
        } 
        res.json({ message: 'Registro insertado', id: this.lastID})
    });
});

// endpoint para leer todos los registros
app.get('/student/read', (req, res) => {
    const query = `SELECT * FROM students`
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error al leer:', err);
            return res.status(500).json({error: 'Error al leer los registros'});
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en  el puerto ${PORT}`);
});
const express = require('express')
const { pool, probarConexion } = require('./db')

const app = express()
app.use(express.json())

//GET
app.get('/peliculas', async (req, res) => {
    try {
        const [peliculas] = await pool.query('SELECT * FROM peliculas')
        res.json(peliculas)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al obtener peliculas' })
    }
})

app.get('/peliculas/:id', async (req, res) => {

    try {
        const id = parseInt(req.params.id)

        const [filas] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [id])

        if (filas.length === 0) {
            return res.status(404).json({ mensaje: 'Pelicula no encontrada' })
        }

        res.json(filas[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al obtener la pelicula' })
    }
})

//POST
app.post('/peliculas', async (req, res) => {
    try {
        const { titulo, director, anio, genero, duracion } = req.body

        if (!titulo || !anio) {
            return res.status(400).json({ mensaje: 'El titulo y año son obligatorios' })
        }

        const [resultado] = await pool.query(
            'INSERT INTO peliculas (titulo, director, anio, genero, duracion) VALUES (?, ?, ?, ?, ?)',
            [titulo, director, parseInt(anio), genero, duracion ? parseInt(duracion) : null]
        )

        res.status(201).json({
            id: resultado.insertId,
            titulo,
            director,
            anio: parseInt(anio),
            genero,
            duracion: duracion ? parseInt(duracion) : null
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al crear la pelicula' })
    }
})

//PUT
app.put('/peliculas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const { titulo, director, anio, genero, duracion } = req.body

        if (!titulo || !director || !anio || !genero || !duracion) {
            return res.status(400).json({ mensaje: 'Para actualizar se debe enviar el titulo, director, año, genero, duración' })
        }

        const [resultado] = await pool.query(
            'UPDATE peliculas SET titulo = ?, director = ?, anio = ?, genero = ?, duracion = ? WHERE id = ?',
            [titulo, director, parseInt(anio), genero, parseInt(duracion), id]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'La pelicula que estas intentando actualizar no existe!' })
        }

        res.json({
            id,
            titulo,
            director,
            anio: parseInt(anio),
            genero,
            duracion: parseInt(duracion)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al actualizar la pelicula' })
    }
})

//PATCH
app.patch('/peliculas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const [filas] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [id])

        if (filas.length === 0) {
            return res.status(404).json({ mensaje: 'La pelicula que estas intentando modificar no existe!' })
        }

        const actual = filas[0]
        const { titulo, director, anio, genero, duracion } = req.body

        const actualizada = {
            titulo: titulo !== undefined ? titulo : actual.titulo,
            director: director !== undefined ? director : actual.director,
            anio: anio !== undefined ? parseInt(anio) : actual.anio,
            genero: genero !== undefined ? genero : actual.genero,
            duracion: duracion !== undefined ? parseInt(duracion) : actual.duracion
        }

        await pool.query(
            'UPDATE peliculas SET titulo = ?, director = ?, anio = ?, genero = ?, duracion = ? WHERE id = ?',
            [actualizada.titulo, actualizada.director, actualizada.anio, actualizada.genero, actualizada.duracion, id]
        )

        res.json({ id, ...actualizada })
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al modificar la pelicula' })
    }
})

//DELETE
app.delete('/peliculas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const [filas] = await pool.query('SELECT * FROM peliculas WHERE id = ?', [id])

        if (filas.length === 0) {
            return res.status(404).json({ mensaje: 'La pelicula que estas intentando eliminar no existe!' })
        }

        await pool.query('DELETE FROM peliculas WHERE id = ?', [id])

        res.json({
            mensaje: 'Pelicula eliminada',
            pelicula: filas[0]
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al eliminar la pelicula' })
    }
})
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    probarConexion()
})
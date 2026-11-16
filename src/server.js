const express = require('express')
const app = express()

app.use(express.json())

const peliculas = [
    {
        id: 1,
        titulo: 'Project Hail Mary',
        director: 'Phil Lord y Christopher Miller',
        anio: 2026,
        genero: 'Ciencia ficcion, aventura y drama',
        duracion: 156
    },
    {
        id: 2,
        titulo: 'La odisea',
        director: 'Christopher Nolan',
        anio: 2026,
        genero: 'Accion, aventura, fantasia y drama',
        duracion: 172
    },
    {
        id: 3,
        titulo: 'Avengers: Doomsday',
        director: 'Anthony Russo y Joe Russo',
        anio: 2026,
        genero: 'Accion, aventura, ciencia ficcion y superheroes',
        duracion: 162   
    },
]

//GET
app.get('/peliculas', (req, res) => {
    res.json(peliculas)
})

app.get('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pelicula = peliculas.find(p => p.id === id)

    if(!pelicula) {
        return res.status(404).json({ mensaje: 'Pelicula no encontrada' })
    }

    res.json(pelicula)
})

//POST
app.post('/peliculas', (req, res) => {
    const {titulo, director, anio, genero, duracion } = req.body

    if (!titulo || !anio ) {
        return res.status(400).json ({ mensaje: 'El titulo y año son obligatorios'})
    }

    const nuevoId = peliculas.length > 0 ? Math.max(...peliculas.map(p => p.id)) + 1 : 1
     
    const nuevaPelicula = {
        id: nuevoId,
        titulo,
        director,
        anio: parseInt(anio),
        genero,
        duracion: parseInt(duracion)
    }

    peliculas.push(nuevaPelicula)

    res.status(201).json(nuevaPelicula)
})

//PUT
app.put('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = peliculas.findIndex((p) => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'La pelicula que estas intentando actualizar no existe!' })
    }

    const { titulo, director, anio, genero, duracion } = req.body

    if (!titulo || !director || !anio || !genero || !duracion) {
        return res.status(400).json({ mensaje: 'Para actualizar se debe enviar el titulo, director, año, genero, duración'})
    }

    peliculas[index] = {
        id,
        titulo,
        director,
        anio: parseInt(anio),
        genero,
        duracion: parseInt(duracion)
    }

    res.json(peliculas[index])
})

//PATCH
app.patch('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = peliculas.findIndex((p) => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'La pelicula que estas intentando modificar no existe!' })
    }

    const { titulo, director, anio, genero, duracion } = req.body

    if (titulo !== undefined) peliculas[index].titulo = titulo
    if (director !== undefined) peliculas[index].director = director
    if (anio !== undefined) peliculas[index].anio = parseInt(anio)
    if (genero !== undefined) peliculas[index].genero = genero
    if (duracion !== undefined) peliculas[index].duracion = parseInt(duracion)

    res.json(peliculas[index])
})

//DELETE
app.delete('/peliculas/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const index = peliculas.findIndex((p) => p.id === id)

    if (index === -1) {
        return res.status(404).json({ mensaje: 'La pelicula que esta intentando eliminar no existe!' })
    }

    const eliminado = peliculas.splice(index, 1)[0]

    res.json({
        mensaje: 'Pelicula eliminada',
        peliculas: eliminado
    })
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
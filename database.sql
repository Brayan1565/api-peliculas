CREATE DATABASE IF NOT EXISTS cine;
USE cine;

CREATE TABLE IF NOT EXISTS peliculas (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    titulo   VARCHAR(150) NOT NULL,
    director VARCHAR(100),
    anio     INT          NOT NULL,
    genero   VARCHAR(50),
    duracion INT
);

INSERT INTO peliculas (titulo, director, anio, genero, duracion) VALUES
('Project Hail Mary', 'Phil Lord y Christopher Miller', 2026, 'Ciencia ficcion, aventura y drama', 156),
('La odisea', 'Christopher Nolan', 2026, 'Accion, aventura, fantasia y drama', 172),
('Avengers: Doomsday', 'Anthony Russo y Joe Russo', 2026, 'Accion, aventura y ciencia ficcion', 162);
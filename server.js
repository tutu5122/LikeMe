import express from 'express';
const app = express();
console.clear()
// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";

// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

// Importamos nuestras consultas
import {
    nuevoPost,
    mostrarPosts,
    updateLike
} from './consultas.js'

// Creamos nuestro Meddleware para trae un objeto json
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})


// POST /post
app.post('/post', async(req, res) => {
    try {
        const response = await nuevoPost( req.body )
        res.status(200).json( {respuesta : 'OKEY', data:response.rows, rowCount:response.rowCount} )
    } catch (error) {
        console.error('Error al realizar el insert de datos', error)
    }
})

// PUT /post
app.put('/post', async( req, res) => {
    try {
        console.log('Salida de post query-->',  req.query.id )
        const response = await updateLike( req.query.id  )
        res.status(200).json( { respuesta : 'OKEY', data:response } )
    } catch (error) {
        console.error('Error al realizar el insert de datos', error)
    }
})

//GET /posts
app.get('/posts', async(req, res) => {
    try {
        const response = await mostrarPosts()
        res.status(200).json( response.rows )
    } catch (error) {
        console.error('Error al realizar el insert de datos', error)
    }
})







app.listen(3000, () => console.log( 'Server arriba en el puerto 3000 '))
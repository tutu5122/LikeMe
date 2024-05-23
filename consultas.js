import pkg from 'pg';
const { Pool } = pkg

// Creamos una instancia de una constante del objeto new Pool (Método de Conexion)
const pool = new Pool({
    connectionString : 'postgresql://postgres:1234@localhost:5432/likeme'
})

// POST
export const nuevoPost = async( post ) => {
    // console.log( 'salida de post-->', post )
    let client
    const values = Object.values(post)

    const consulta = {
        name : "insert-post",
        text : "INSERT INTO posts ( usuario, url, descripcion ) VALUES ( $1, $2, $3 ) RETURNING *",
        values
    }
    try {
        client = await pool.connect();
        const response = await client.query(consulta)
        return response
    } catch (error) {
        return console.error('Error durante la conexión o la consulta:', error.stack)
    }finally{
        if(client){
            client.release();
        }
    }
}


// GET
export const mostrarPosts = async() => {
   
    let client

    // Para prevenir SQL Injection
    const consulta = {
        name : "fetch-data",
        text : "SELECT * FROM posts ORDER BY id ASC",
    }
    try{
        // Aqui nos conectamos a la base de datos
        client = await pool.connect();
        const response = await client.query(consulta);
        return response
    }catch ( error ) {
        return console.error('Error durante la conexión o la consulta:', error.stack);
    }finally{
        if(client){
            client.release();
        }
    }
}

const mostrarPostsId = async( id ) => {
   
    let client

    // Para prevenir SQL Injection
    const consulta = {
        name : "fetch-data-id",
        text : `SELECT * FROM posts WHERE id = ${id}`,
    }
    
    try{
        // Aqui nos conectamos a la base de datos
        client = await pool.connect();
        const response = await client.query(consulta);
        return response
    }catch ( error ) {
        return console.error('Error durante la conexión o la consulta:', error.stack);
    }finally{
        if(client){
            client.release();
        }
    }
}

// PUT
// PUT
export const updateLike = async ( id  ) => {

    let client
    let getLike = await mostrarPostsId(id)
    const { likes } = getLike.rows[0]
    let curentLike = likes + 1

    const consulta = {
        // usuario, url, descripcion
        name : "update-data",
        text:"UPDATE posts SET likes = $2 WHERE id = $1",
        values : [ id, curentLike ] 
    }

    try {
        client = await pool.connect(); // Intenta obtener una conexión pool
        const result  = await client.query(consulta)
        return result.rows
    } catch (error) {
        return console.error('Error durante la actualizacion del  like:', error.stack);
    }finally{
        if(client){
            client.release() // Nos aseguramos que el cliente se libere siempre
        }
    }
}
import express from 'express'

import fs from 'fs'
const app = express()
app.use(express.json())


let productos:any[] = []




app.get('/productos', (req, res) => {
    if (productos == []){
        res.json({'error': 'No hay productos cargados'})
    }
    res.json(productos)
})

app.post('/productos', (req, res) => {
    let { nombre, precio} = req.body
    let id = productos.length + 1;
    let producto = {
        id,
        nombre,
        precio
       
    }
    
    productos.push(producto)
    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync('./productos.txt', data, 'utf-8')
    
    res.send(producto)
})
app.delete('/productos', (req,res)=>{
    const path = './productos.txt'

    fs.unlink(path, (err) => {
    if (err) {
        console.error(err)
        return
    }

   
    })
        res.send('el archivo ha sido borrado')
    
})
app.get('/productos/:id', (req,res) =>{
    const id = req.params.id
    const producto = productos.find(producto => producto.id == id)
    if (!producto){
        res.json({'error': 'Producto no encontrado'})
    }
    res.json(producto)
})


app.listen(8080, () =>{
    console.log("Running on port 8080")
})

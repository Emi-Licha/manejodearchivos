import express from 'express'
import fs from 'fs'
const app = express()
var router = express.Router()
app.use(express.json())

app.use(express.urlencoded({extended:true}))

let productos:any[] = []

router.get('/', (req,res) =>{
    res.sendFile(__dirname+'/public/index.html')
})


router.get('/', (req, res) => {
    if (productos == []){
        res.json({'error': 'No hay productos cargados'})
    }
    res.json(productos)
})

router.post('/', (req, res) => {
    let { nombre, precio, thumbnail} = req.body
    let id = productos.length + 1;
    let producto = {
        id,
        nombre,
        precio,
        thumbnail
       
    }
    
    productos.push(producto)
    let data = JSON.stringify(productos,null,2);
    fs.writeFileSync('./productos.txt', data, 'utf-8')
    
    res.send(producto)
})

router.get('/:id', (req,res) =>{
    const id = req.params.id
    const producto = productos.find(producto => producto.id == id)
    if (!producto){
        res.json({'error': 'Producto no encontrado'})
    }
    res.json(producto)
})

router.put('/:id', (req,res)=>{
    const id = req.params.id
    const producto = productos.find(producto => producto.id === id)
    if(!producto){
        res.sendStatus(404)
    }
    const {nombre} = req.body
    const {precio} = req.body
    producto.nombre = nombre
    producto.precio = precio
    res.sendStatus(204)
})
router.delete('/:id', (req,res)=>{
    const id = req.params.id
    const producto = productos.find(producto => producto.id == id)
    if(!producto){
        res.status(404).send('El producto que usted intenta eliminar ya no existe')
    }else{
    productos = productos.filter( producto => producto.id != id)
    res.status(200).send('El producto ha sido eliminado') }
    
})

app.use('/productos', router)

app.listen(8080, () =>{
    console.log("Running on port 8080")
})

import express from "express"
import handlebars from "express-handlebars"
import PokemonRouter from "./routes/pokemon.router.js"
import mongoose from "mongoose";

const app = express();
//database url
const uri= 'mongodb+srv://ivega98:teamrocket@cluster0.vhbmpwg.mongodb.net/pokedex'
//setup Json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//setup handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('./src/public'))

app.get('/', (req, res) => res.send("ok"))

//routers
app.use('/pokemon', PokemonRouter)

//mongoose and server
mongoose.set("strictQuery", false)
try {
    await mongoose.connect(uri)
    console.log('DB connected!')
    app.listen(8080, ()=>console.log("Server up"))
} catch (error) {
    console.log('DB conection failed')
}
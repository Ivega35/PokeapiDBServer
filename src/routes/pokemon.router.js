import { Router } from "express";
import pokeModel from "../models/pokemon.model.js";

const router= Router();

//List all pokemons
router.get('/', async(req, res)=>{
    const pokemons = await pokeModel.find().lean().exec()
    res.render('list', {pokemons})
})
//rendering form
router.get('/create', (req, res)=>{
    res.render('create', {})
})
//Showing an especific pokemon
router.get('/:name', async(req, res)=>{
    const name= req.params.name
    const pokemon= await pokeModel.findOne({name}).lean().exec()
    res.render('one', {
        pokemon
    })
})
//register a new pokemon by form
router.post('/', async(req, res)=>{
    const pokemonNew = req.body
    const pokemonGenerated= new pokeModel(pokemonNew)
    await pokemonGenerated.save()
    res.redirect(`/pokemon`)
})
router.delete('/:name', async (req, res) => {
    const name = req.params.name
    try {
        await pokeModel.deleteOne({ name })
        res.send(`Pokemon ${name} borrado exitosamente!`)
    } catch (err) {
        res.send({err})
    }
})
export default router
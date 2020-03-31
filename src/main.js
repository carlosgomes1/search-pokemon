import api from './api'

class App {
    constructor() {
        this.listPokemons = []

        this.formPokemons = document.getElementById('pokemon-form')
        this.inputPokemon = document.querySelector('input[name=pokemon]')

        this.registerPokemon()
    }

    registerPokemon() {
        this.formPokemons.onsubmit = event => this.buscarPokemon(event)
    }

    async buscarPokemon( event ) {
        event.preventDefault()

        let pokemonInput = this.inputPokemon.value

        pokemonInput = pokemonInput.toLowerCase()   

        if( pokemonInput === '' ) {
            alert('Campo vazio')
        }

        try {
            const response = await api.get(`/${ pokemonInput }`)

            const { data: {
                 sprites: { front_default: img }, 
                 species: { name }, 
                 types: { 0: { type: { name: type } } }, 
                 abilities, 
                 weight
                }  } = response

            this.listPokemons.push({
                img,
                name,
                type,
                abilities,
                weight
            })

            this.inputPokemon.value = ''

            this.render()

        } catch( error ) {
            alert('Pokemon nao encontrado')
        }

    }

    render() {
        
    }
}

new App()
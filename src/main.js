import api from './api'

class App {
    constructor() {
        this.listPokemons = []

        this.formPokemons = document.getElementById('pokemon-form')
        this.inputPokemon = document.querySelector('input[name=pokemon]')
        this.pokemonList = document.getElementById('pokemon-list')

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

            const { data: { sprites: { front_default: img }, species: { name }, types: { 0: { type: { name: type } } }, abilities, weight }  } = response

            this.listPokemons.push({
                img,
                name,
                type,
                abilities,
                weight
            })

            this.inputPokemon.value = ''

            console.log(response)

            this.render()
        } catch( error ) {
            this.inputPokemon.value = ''
            alert('Pokemon nao encontrado')
        }

    }

    render() {  
        this.pokemonList.innerHTML = ''
        
        this.listPokemons.forEach( poke => {
            let imgPokemon = document.createElement('img')
            imgPokemon.setAttribute('src', poke.img)

            let namePokemon = document.createElement('strong')
            namePokemon.appendChild(document.createTextNode(poke.name))

            let typePokemon = document.createElement('h3')
            typePokemon.appendChild(document.createTextNode(`Tipo: ${ poke.type }`))

            let abilitiesPokemon = document.createElement('p')
            abilitiesPokemon.innerText = 'Habilidades: '
            poke.abilities.forEach( ability => {
                abilitiesPokemon.innerText += `${ability.ability.name}, `
            })

            let weightPokemon = document.createElement('p')
            weightPokemon.appendChild(document.createTextNode(`Tamanho: ${ poke.weight }`))

            let liPokemon = document.createElement('li')
            liPokemon.appendChild(imgPokemon)
            liPokemon.appendChild(namePokemon)
            liPokemon.appendChild(typePokemon)
            liPokemon.appendChild(abilitiesPokemon)
            liPokemon.appendChild(weightPokemon)

            this.pokemonList.appendChild(liPokemon)
        })

    }
}

new App()
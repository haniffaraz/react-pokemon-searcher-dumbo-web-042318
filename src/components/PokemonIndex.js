import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const url = 'http://localhost:3000/pokemon'

class PokemonIndex extends React.Component {

  state = {
    pokemons: [],
    isLoading: false,
    value: ''
  }

  fetchPokemons() {
    fetch(url)
    .then(r => r.json())
    .then(pokemons => this.setState({
      pokemons: pokemons.sort(function (a,b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() === b.name.toLowerCase()) {
          return 0;
        } else {
          return 1;
        }
      })
    }))
  }

  addPokemon = (pokemon) => {

      this.setState({
        pokemons: [...this.state.pokemons, pokemon]
      })
    }


  componentDidMount() {
    this.fetchPokemons()
    // this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, value: '' })

  handleResultSelect = (e, { pokemon }) => this.setState({ value: pokemon.name })


  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = pokemon => re.test(pokemon.name)

      this.setState({
        isLoading: false,
        pokemons: _.filter(this.state.pokemons, isMatch),
      })
    }, 300)

  }

  render() {
    const { isLoading, value, pokemons } = this.state
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPoke={this.addPokemon}/>
        <br />
        <Search
               loading={isLoading}
               onResultSelect={this.handleResultSelect}
               onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
               showNoResults={false}
               value={value}
               {...this.props}
        />
        <br />
        <PokemonCollection collection={pokemons} />
        <br />
      </div>
    )
  }
}

export default PokemonIndex

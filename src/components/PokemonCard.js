import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    name: this.props.pokemon.name,
    image: this.props.pokemon.sprites.front,
  }


  imageFlip = (e) => {
    e.target.src === this.props.pokemon.sprites.front ? e.target.src = this.props.pokemon.sprites.back :
    e.target.src = this.props.pokemon.sprites.front;
  }

  findHp(stats) {
    if (!stats) {
      return null;
    }
    return stats.find( (stat) => stat.name === 'hp').value
  }

  render() {
    ;
    return (
      <Card>
        <div>
          <div className="image">
            <img onClick = {this.imageFlip} src={this.state.image} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{this.state.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
            {this.findHp(this.props.pokemon.stats)}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard

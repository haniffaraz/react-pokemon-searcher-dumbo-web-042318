import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

    state = {
      name: '',
      hp: '',
      front: '',
      back: ''
    }

  handleSubmit = (e) => {
   e.preventDefault()
   let data = {
     name: this.state.name,
     stats: [
       { value: this.state.hp,
          name: 'hp' }
       ],
     sprites: {
       front: this.state.front,
       back: this.state.back
     }
   }
   fetch('http://localhost:3000/pokemon', {
     body: JSON.stringify(data),
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'content-type': 'application/json'
     }
   })
    .then(r => r.json())
    .then(pokemon => this.props.addPoke(pokemon))
    e.target.reset()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon Or Find One Below!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal" onChange={this.handleChange}>
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="front" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="back" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm

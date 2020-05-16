export default class Component {
  constructor(props, state) {
    this.props = props
    this.state = state
    // this.prevState = state
  }

  setState(newState) {
    // this.prevState = this.state
    this.state = Object.assign({}, this.state, newState)
    // trigger re render
  }
  
  render(props) { throw new Error('not implemented') }
}
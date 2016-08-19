import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class InputTemplateUrl extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      text: ''
    };
  }

  handleSubmit = evt => {
    const text = evt.target.value.trim();
    if (evt.which === 13) {
      console.log('JE VAIS SAVE');
      console.log(this.props.onSave);
      this.props.onSave(text);
      this.setState({...this.state, text: ''});
    }
  }

  handleChange = evt => {
    this.setState({...this.state, text: evt.target.value});
  }

  render() {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.text}
            placeholder="New template url"
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
          />

        </FormGroup>
      </form>
    );
  }
}

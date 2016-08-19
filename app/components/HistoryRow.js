import React, { Component, PropTypes } from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

export default class HistoryRow extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  handleRemoveClick(historyItem) {
    const { history } = this.props.actions;
    history.removeHistory(historyItem.id);
  }

  render() {
    const { history } = this.props;

    return (
      <tr>
        <td>{ history.name } </td>
        <td>{ history.season } </td>
        <td>{ history.episode } </td>
        <td><Button
            bsStyle="link"
            onClick={this.handleRemoveClick.bind(this, history)}>
              <Glyphicon glyph="remove" />
            </Button>
        </td>
      </tr>
    );
  }
}

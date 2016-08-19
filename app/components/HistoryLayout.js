import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import HistoryRow from './HistoryRow';


export default class HistoryLayout extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { history, actions } = this.props;
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Season</th>
            <th>Episode</th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {history.map(history =>
            <HistoryRow key={history.id} history={history} actions={actions} />
          )}
        </tbody>
      </Table>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';

export default class TemplateUrlRow extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    templateUrl: PropTypes.object.isRequired
  };

  handleRemoveClick(templateUrlItem) {
    const { templateUrl } = this.props.actions;
    templateUrl.removeTemplateUrl(templateUrlItem.id);
  }

  render() {
    const { templateUrl } = this.props;

    return (
      <tr>
        <td>{ templateUrl.name }</td>
        <td>
          <Button
            bsStyle="link"
            onClick={this.handleRemoveClick.bind(this, templateUrl)}>
            <Glyphicon glyph="remove" />
          </Button>
        </td>
      </tr>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import TemplateUrlRow from './TemplateUrlRow';
import InputTemplateUrl from './InputTemplateUrl';

export default class TemplatUrleLayout extends Component {

  constructor(props) {
    super(props);
    console.log(props.actions.templateUrl);
  }

  static PropTypes = {
    TemplatesUrl: PropTypes.array.isRequired,
    action: PropTypes.object.isRequired
  }

  render() {
    const { templatesUrl, actions } = this.props;
    console.log(this.props);
    return (
      <div>
        <InputTemplateUrl onSave={actions.templateUrl.addTemplateUrl} />
        <Table striped>
          <thead>
            <tr>
              <th>Url Template</th>
            </tr>
          </thead>
          <tbody>
            {templatesUrl.map(templateUrl => {
              console.log(templateUrl)
              console.log(actions);
              return (<TemplateUrlRow
                key={templateUrl.id}
                actions={actions}
                templateUrl={templateUrl} />);
            })}
          </tbody>
        </Table>
      </div>
    );
  }

}

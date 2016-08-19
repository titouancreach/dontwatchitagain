import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HistoryAction from '../actions/history';
import * as TemplateUrlAction from '../actions/templateUrl.js'

import HistoryLayout from '../components/HistoryLayout';
import TemplateUrlLayout from '../components/TemplateUrlLayout'

import { Nav, NavItem } from 'react-bootstrap';

@connect(
  state => ({
    history: state.history,
    templateUrl: state.templateUrl
  }),
  dispatch => ({
    actions: {
      history: {
        ...bindActionCreators(HistoryAction, dispatch)
      },
      templateUrl: {
        ...bindActionCreators(TemplateUrlAction, dispatch)
      }
    }
  })
)
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {...this.state, selectedTab: 1};
  }

  onChangeTab = (selectedTabKey) => {
    this.setState({
      ...this.state,
      selectedTab: selectedTabKey
    });
    console.log(selectedTabKey);
  }

  static propTypes = {
    history: PropTypes.array.isRequired,
    templateUrl: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { history, actions, templateUrl } = this.props;

    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.selectedTab} onSelect={this.onChangeTab}>
          <NavItem eventKey={1}> Edit URL </NavItem>
          <NavItem eventKey={2}> History </NavItem>
        </Nav>

        {(() => {
          switch (this.state.selectedTab) {
            case 1:
              return (<TemplateUrlLayout actions={actions} templatesUrl={templateUrl}>NOT IMPLEMENTED</TemplateUrlLayout>);
            case 2:
              return (<HistoryLayout history={history} actions={actions}/>);
            default:
              return (<div>NOT IMPLEMENTED</div>);
          }
        })()}
      </div>
    );
  }
}
